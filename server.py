from flask import Flask, render_template, request, session, redirect, flash
from model import *
import os
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "poij;lkrjaf;"
app.jinja_env.undefined = StrictUndefined
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

@app.route("/", methods=['POST', 'GET'])
def show_homepage():
    """Show the application's homepage."""

    return render_template("homepage.html")

@app.route("/login")
def login_user():
    """Log a user into the site"""

    email = request.args.get('email')
    password = request.args.get('password')

    if crud.check_user(email):
        is_valid = crud.validate_user(email, password)
        if is_valid:
            flash ("Logged in successfully!")
            return redirect("/menu")

        else:
            flash("Email and password do not match, please check your login and try again or create an account.")
            return redirect("/")
    else:
        flash("Email is not in our system, Please create a new account.")
        return redirect("/")

@app.route("/create_user")
def new_user():
    return render_template("new_user.html")



@app.route("/option_selector")
def option_selector(homepage_option):
  option = homepage_option
  if option == newPartEntry:
    return redirect("new-part-type")

@app.route("/new-part-type")

@app.route("/newPartData")
def show_cards():
    
    return render_template("newPartData.html")


if __name__ == "__main__":
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
