from flask import Flask, render_template, request, session, redirect, flash
from model import *
import os
import crud
from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "1AmAM3atP0pc1cl3"
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

@app.route("/menu")
def menu():
    """render menu"""
    return render_template("menu.html")

@app.route("/create_user")
def new_user():
    return render_template("new_user.html")

@app.route("/new_user", methods=['POST'])
def create_user():
    """Add a user to the database"""
    
    email = request.args.get('email')
    email2 = request.args.get('email2')
    password = request.args.get('password')
    password2 = request.args.get('password2')

    if email == email2:
        if password == password2:
            crud.create_user(email, password)
            flash("Account created successfully!")
            return redirect("/")
        else:
            flash("Passwords do not match.  Please try again.")
            return redirect("/create_user")
    else:
        flash("Emails do not match.  Please try again.")
        return redirect("/create_user")


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
