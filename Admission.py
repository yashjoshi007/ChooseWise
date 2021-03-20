import numpy as np
import pandas as pd
import os
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import random
from sklearn import metrics
import pickle


df = pd.read_csv('Admission_Predict.csv')

X = df[['CGPA','PCMB Score','SS Score','Extra Act','School Rating']]
Y = df[['Chance of Admit']]

X_train, X_test, Y_train, Y_test = train_test_split(X,Y,random_state=0,test_size=0.2)

reg = LinearRegression()
reg.fit(X_train,Y_train)
pred = reg.predict(X_test)

mse=metrics.mean_squared_error(Y_test,pred)

user_input = [[9.54,334,116,1,1]] #user input from testing data  #while passing op, give(6-rating)
user_pred = reg.predict(user_input)
print((user_pred.flatten()*100).astype(float))

pickle.dump(reg,open('model.pkl','wb'))