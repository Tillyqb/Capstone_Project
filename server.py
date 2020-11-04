from flask import Flask, render_template, request
import model 
import os
import json
import crud
import server
# 
# @app.route("/")
# def show_homepage():
#     """Show the application's homepage."""
# 
#     return render_template("homepage.html")
# 
# @app.route("/option_selector")
# def option_selector(homepage_option):
#   option = homepage_option
#   if option == newPartEntry:
#     return redirect("new-part-type")
# 
# @app.route("/new-part-type")
# 
# @app.route("/newPartData")
# def show_cards():
#     
#     return render_template("newPartData.html")
# 

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
