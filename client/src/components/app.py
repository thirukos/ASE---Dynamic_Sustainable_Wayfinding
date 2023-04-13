from flask import Flask, jsonify, request
from flask_cors import CORS
from DelayPrediction import predict_delay 


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins

@app.route('/api', methods=['POST'])
def api():
    print("api called")
    data = request.json
    text = data.get('text', '')
    delay_time = predict_delay(text)
    response = f"predicted delay_time: {delay_time}"
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)