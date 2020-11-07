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

@app.route("/new_user", methods=['POST', 'GET'])
def create_user():
    """Add a user to the database"""
    
    email = request.form.get('email')
    email2 = request.form.get('email2')
    password = request.form.get('password')
    password2 = request.form.get('password2')

    if crud.check_user(email):
        flash("That email is already in the system.")
        return redirect("/create_user")

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


@app.route("/select_action")
def option_selector():
    option = request.args.get('menu_selection')
    if option == 'create_part':
        return render_template("create_part.html")
    elif option == 'calculate_material':
        return render_template("calculate_material.html")
    else:
        return render_template("roll_calculator.html")

@app.route("/roll_calculator_option")
def select_roll_calculator_type():
    option = request.args.get('roll_option')
    if option == 'roll_length':
        return render_template("calculate_length.html")

@app.route("/calculate_roll_length")
def calculate_and_display_roll_length():
    options = [requeest.args.get('roll_diameter'), 
                requeest.args.get('matertial'),
                request.args.get('core_diameter')]
    return render_template("display_roll_length",
                            length=crud.calculate_roll_length(options))

@app.route("/new-part-type")

@app.route("/new_part_data")
def create_new_part():
    
    return render_template("newPartData.html")


if __name__ == "__main__":
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')
