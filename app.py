import streamlit as st
import numpy as np
import string
import pickle
import pandas as pd
import os
import matplotlib.pyplot as plt
import seaborn as sns

st.set_option('deprecation.showfileUploaderEncoding',False) 
model = pickle.load(open('model.pkl','rb'))

st.markdown("<h1 style='text-align: center; color: White;background-color: Grey'>School Admission Predictor</h1>", unsafe_allow_html=True)
st.markdown("<h3 style='text-align: center; color: Black;'>Drop in The required Inputs and we will do  the rest.</h3>", unsafe_allow_html=True)
st.markdown("<h4 style='text-align: center; color: Black;'>Project by Cookie Clan</h4>", unsafe_allow_html=True)
st.sidebar.header("What is this Project about?")
st.sidebar.text("It a Web app that would help the user in determining whether they will get admission in their desired Schools or not.")
st.sidebar.header("What tools where used to make this?")
st.sidebar.text("The Model was made using a dataset from Kaggle along with using Kaggle notebooks to train the model. We made use of Sci-Kit learn in order to make our Linear Regression Model.")
st.sidebar.header("Would you like to Analyse some our previous data along with statistics?")
nav = st.sidebar.radio("",["I'll Just use the predictor","YES! SHOW ME"])

if nav == "I'll Just use the predictor":
    #cgpa = st.slider("Input Your CGPA",0.0,10.0)
    cgpa = st.number_input("Enter Your Aggregate GPA")
    pcmb = st.number_input("Marks In Maths,Physics,Chemistry and Biology (400)",min_value = 0,max_value=400,value = 30,step = 10)
    pcmb = pcmb * (340/400)
    ss = st.number_input("Marks In Social Studies (200)",min_value = 0,max_value=200,value = 30,step = 10)
    ss = ss * (120/200)
    extra = st.radio("Do You have prior Extra Ciricular Experience",["No","Yes"])
    if extra == "No":
        extra = 0
    else :
        extra = 1
    sch_rating = 6 - st.slider("Rating of the School you wish to get in on a Scale 1-5",1,5)

    inputs = [[cgpa,pcmb,ss,extra,sch_rating]]

    if st.button('Predict'):
        result = model.predict(inputs)
        updated_res = result.flatten().astype(float) * 100
        st.success('The Probability of getting admission is {}'.format(updated_res))

if nav == "YES! SHOW ME":
    df = pd.read_csv('Admission_Predict.csv')
    df['PCMB Score'] = df['PCMB Score'].apply(lambda x: x + 60)
    df['SS Score'] = df['SS Score'].apply(lambda x: x + 80)

    st.markdown("<h4 style='text-align: left; color: Black;'>Here we show some of the analysis performed by our experts : </h4>", unsafe_allow_html=True)

    
    plt.figure(figsize = (10,7))
    sns.distplot(df['PCMB Score'],kde=True,color='red')
    plt.title('Distribution of PCMB Scores')
    plt.xlabel('Scores')
    plt.show()
    st.pyplot(plt)

    plt.figure(figsize=(10,7))
    fig = sns.regplot(x="PCMB Score", y="CGPA",color='red', data=df)
    plt.title("PCMB Score vs CGPA")
    plt.show() 
    st.pyplot(plt) 

    plt.figure(figsize = (10,7))
    sns.distplot(df['SS Score'],kde=True,color='red')
    plt.title('Distribution of SS Scores')
    plt.xlabel('Scores')
    plt.show()
    st.pyplot(plt) 

    plt.figure(figsize=(10,7))
    fig = sns.regplot(x="PCMB Score", y="CGPA",color='red', data=df)
    plt.title("PCMB Score vs Percentage")
    plt.show()
    st.pyplot(plt)

    plt.figure(figsize = (10,7))
    sns.distplot(df['CGPA'],kde=True,color='red')
    plt.title('Distribution of CGPA')
    plt.xlabel('Scores')
    plt.show()
    st.pyplot(plt)

    plt.title("Distribution of School Rating")
    df['School Rating'].value_counts().plot.pie(autopct='%1.1f%%',figsize=(7,5)) 
    plt.show()
    st.pyplot(plt)

    plt.figure(figsize=(10,7))
    sns.set_palette("pastel")
    sns.lineplot(y="CGPA", x="School Rating",hue="Extra Act",palette=("red","blue"),data=df)
    plt.show()
    st.pyplot(plt)
