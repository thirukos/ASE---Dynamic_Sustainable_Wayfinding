# -*- coding: utf-8 -*-

apiKey = "f1121f747e314c1d9b54f569b0b79d6f"


import json
import os
import pandas as pd

# Replace this with the path to your directory of JSON files
data_dir = "../assets/navigation_files"

all_data = []

# Loop through all files in the directory
for filename in os.listdir(data_dir):
    if filename.endswith(".json"):
        file_path = os.path.join(data_dir, filename)
        with open(file_path, "r") as f:
            data = json.load(f)
            # Loop through all entities in the file
            for entity in data.get('entity', []):
                trip_update = entity.get('trip_update', {})
                # Loop through all stop time updates in the trip update
                for stop_time_update in trip_update.get('stop_time_update', []):
                    stop_sequence = stop_time_update.get('stop_sequence')
                    delay = None
                    # Check for arrival or departure delay
                    if 'arrival' in stop_time_update:
                        delay = stop_time_update['arrival'].get('delay')
                    elif 'departure' in stop_time_update:
                        delay = stop_time_update['departure'].get('delay')
                    # Add the data to the list
                    all_data.append({
                        # 'timestamp': entity.get('timestamp'),
                        'trip_id': trip_update['trip'].get('trip_id'),
                        # 'route_id': trip_update['trip'].get('route_id'),
                        # 'direction_id': trip_update['trip'].get('direction_id'),
                        # 'start_date': trip_update['trip'].get('start_date'),
                        # 'start_time': trip_update['trip'].get('start_time'),
                        'stop_id': stop_time_update.get('stop_id'),
                        'stop_sequence': stop_sequence,
                        'delay': delay
                    })

# Convert the list of dictionaries to a DataFrame
df = pd.DataFrame(all_data)
df = df.dropna()
df.head()

import json
import os
import pandas as pd

# Replace this with the path to your directory of JSON files
data_directory = "../assets/stops_files"

stops = []

# Loop through all files in the directory
for filename in os.listdir(data_directory):
    if filename.endswith(".json"):
        file1_path = os.path.join(data_directory, filename)
        with open(file1_path, "r") as f:
            data = json.load(f)
            # Loop through all entities in the file
            for entity in data:
                stop_id = entity.get('stop_id', '')
                stop_name = entity.get('stop_name', '')
                # Append stop data to the stops list
                stops.append({
                    'stop_id': stop_id,
                    'stop_name': stop_name,
                })

# Create a pandas DataFrame from the stops list and drop missing values
df_stops = pd.DataFrame(stops).dropna()

# Print the first few rows of the DataFrame
# print(df_stops.head())

df_final = pd.merge(df, df_stops, on='stop_id')
pd.set_option('display.max_columns', None)

# df_final.head()

"""Random Forest"""

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import LabelEncoder
import warnings
warnings.filterwarnings("ignore")

# Select the features and target variable
X = df_final[['stop_name']]
y = df_final['delay']

# Encode the stop_id column as integers
le = LabelEncoder()
X['stop_name'] = le.fit_transform(X['stop_name'])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train a random forest regressor
rf = RandomForestRegressor(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Evaluate the model
y_pred = rf.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
# print('MSE: %.2f' % mse)

# Prompt the user to enter a stop_id
# stop_name = input('Enter the stop name for which you want to predict the delay: ')

def predict_delay(stop_name):
    # Encode the stop_name value
    stop_name_encoded = le.transform([stop_name])[0]
    
    # Predict the delay for the given stop_name
    delay_pred = rf.predict([[stop_name_encoded]])
    
    # Return the predicted delay value
    return delay_pred[0]

if __name__ == '__main__':
    # Get the stop_name parameter from sys.argv
    stop_name = sys.argv[1]
    delay_pred = predict_delay(stop_name)
    print('Predicted delay for stop_name: %s: %.2f' % (stop_name, delay_pred))
