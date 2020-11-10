from flask import Flask, render_template, request, session, redirect, flash
from model import Envelope, Material, Pocket, PageProtector, SingleWebPart, User, connect_to_db
import os
import crud
from jinja2 import StrictUndefined
from material_calculator_logic import calculate_envelope_requirements, calculate_page_requirements, calculate_pocket_requirements, calculate_single_web_part_requirements

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
            return render_template("menu.html")

        else:
            flash("Email and password do not match, please check your login and try again or create an account.")
            return render_template("homepage.html")
    else:
        flash("Email is not in our system, Please create a new account.")
        return render_template("homepage.html")

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

@app.route("/roll_calculator")
def select_roll_calculator_type():
    option = request.args.get("roll_option")
    if option == 1:
        return render_template("get_roll_length_data.html",
                            materials=crud.get_materials_list())
    else:
        return render_template("calculate_roll_diameter.html")


@app.route("/get_roll_length_data")
def get_length_data():
    options = [requeest.args.get('roll_diameter'), 
                requeest.args.get('material')[0],
                request.args.get('core_diameter')]
    return render_template("get_roll_length_data.html",
                            materials=crud.get_materials_list())

@app.route("/calculate_roll_length")
def calculate_and_display_roll_length():
    
    return render_template("display_roll_length.html",
                            length=crud.calculate_roll_length(options))
    
# @app.route("/display_roll_length")
# def display_roll_length()


@app.route("/calculate_roll_diameter")
def calclate_and_display_roll_diameter():
    
    return 0



@app.route("/material_calculator")
def material_calculator():
    part_no = request.args.get('part_no')
    if Envelope.varify_prt_exixts(part_no) == True:
        return render_template("calculate_envelope.html")
    elif PageProtector.varify_prt_exixts(part_no) == True:
        return render_template("calculate_page_protector.html")
    elif Pocket.varify_prt_exixts(part_no) == True:
        return render_template("calculate_pocket_material.html")
    elif SingleWebPart.varify_prt_exixts(part_no) == True:
        return render_template("calculate_single_web_part.html")
    else:
        flash("Part is not in the system, please enter data to store.")
        return render_template("create_part.html")

@app.route("/new-part-type")
def get_new_part_type():
    part_type = request_args.get("part_type")
    if part_type == "envelope":
        return render_template("new_envelope.html")
    elif part_type == "page_protector":
        return render_template("new_page_protector.html")
    elif part_type == "pocket":
        return render_template("new_pocket.html")
    else:
        return render_template("new_single_web_part.html")


@app.route("/create_envelope", methods=["POST"])
def create_envelope():
    part_no = request.form.get("part_no")
    height = request.form.get("height")
    width = request.form.get("width")
    flap = request.form.get("flap")
    throat = request.form.get("throat")
    front_web_material = request.form.get("front_web_material")
    back_web_material = request.form.get("back_web_material")

    crud.create_envelope(part_no, height, 
                        width, flap, 
                        throat, front_web_material, 
                        back_web_material)

    calculate_envelope_requirements(part_no, two_across)
    
    return render_template("display_envelope_requirements.html")


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
