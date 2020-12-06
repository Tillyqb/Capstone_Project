# Material Web App

    This is an app that is intended to calculate the material 
    requirements for a two web printing operation. 
    The material calculator was designd as a project for the  
    purpose of learning durring the coarse of a Software Engineering 
    fellowship at Hackbright Academy(https://www.hackbrightacademy.com).

    The code for this app was started while I was still working at a previous 
    in a print shop.  While I was working as material slitter, I found myself
    repeating calculations quite often and had an idea to start this to
    improve production and to reduce the amount of material that was sitting 
    around the shop.  The app has evolved now from being a node.js script
    that had to be run from the console to being this deployable web app.

# Use requirements

    As of right now, it is only possible to use this app if it is deployed on 
    your local machine and requires the use of a file to be created in the 
    root directory of the app named secrets.sh, which should be formatted as:
        
        export PRIVATE_KEY="your random key goes here"

    This file needs to be run from ouside the program.

        i.e. in Linux, and MacOS the script is: 
        source secrets.sh
    
    then run the file using:
        
        Python3 server.py
        (starts a web server at localhost:5000)