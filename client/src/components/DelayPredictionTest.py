import unittest
# from DelayPrediction import predict_delay 
#from "../../client/src/components/DelayPrediction" import predict_delay 
# import sys, os
# ml_path ='../../client/src/components'
# current_path = os.getcwd()
# print(current_path)
# new_path= os.path.join(current_path, ml_path)
# print(new_path)
# sys.path.append(new_path)
from DelayPrediction import predict_delay

class TestPredictDelay(unittest.TestCase):
    def test_predict_1(self):
        self.assertAlmostEqual(predict_delay('Fitzmaurice Road'), 29.3864, delta=0.001)
    def test_predict_2(self):
        self.assertAlmostEqual(predict_delay('Phibsborough SC'), 125.1106, delta=0.001)
    def test_predict_delay_nonexistent(self):
        with self.assertRaises(ValueError):
            predict_delay('Nonexistent Bus Stop')

