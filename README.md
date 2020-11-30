# Material Web App

    This is an app that is intended to calculate the material 
    requirements for a two web printing operation. 
    The material calculator was designd as a project for the  
    purpose of learning durring the coarse of a Software Engineering 
    fellowship at Hackbright Academy(https://www.hackbrightacademy.com).

# Use requirements

    As of right now, it is only possible to use this app if it is deployed on 
    your local machine and requires the use of a file to be created in the 
    root directory of the app named secrets.sh, which should be formatted as:
        
        export PRIVATE_KEY="your random key goes here"
        
    then run the file using:
        
        Python3 server.py
