from flask import Flask, render_template, request, session, redirect, flash
from model import Envelope, Material, Pocket, PageProtector, SingleWebPart, User, connect_to_db, db
import os
import crud
from jinja2 import StrictUndefined
from material_calculator_logic import calculate_envelope_requirements, calculate_page_requirements, calculate_pocket_requirements, calculate_single_web_part_requirements

app = Flask(__name__)
connect_to_db(app)
app.secret_key = "1AmAM3atP0pc1cl3"
app.jinja_env.undefined = StrictUndefined
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

@app.route("/", methods=['POST', 'GET'])
def show_homepage():
    """Show the application's homepage."""

    return render_template("homepage.html")

@app.route("/login", methods=['POST'])
def login_user():
    """Log a user into the site"""

    email = request.form.get('email')
    password = request.form.get('password')

    if crud.check_user(email):
        is_valid = crud.validate_user(email, password)
        if is_valid:
            flash ("Logged in successfully!")
            return redirect("/menu")

        else:
            flash("Email and password do not match, please check your login and try again or create an account.")
            return render_template("homepage.html")
    else:
        flash("Email is not in our system, Please create a new account.")
        return render_template("homepage.html")

@app.route("/menu")
def menu():
    """render menu"""
    return render_template("base.html")

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
    print('In the roll_calculator route')
    option = request.args.get("roll_option")
    print(f'option={option} of {type(option)} materials={crud.get_materials_list()}')
    print('12')
    if option == "roll_length":
        print('This exhibits vacuum like properties')
        return render_template("length_data.html",
                            materials=crud.get_materials_list())
    else:
        return render_template("diameter_data.html",
                            materials=crud.get_materials_list())


@app.route("/get_roll_length_data")
def get_length_data():
    options = [request.args.get('roll_diameter'), 
                request.args.get('material'),
                request.args.get('core_diameter')]
    return render_template("display_roll_length.html",
                            materials=crud.get_materials_list())

@app.route("/calculate-roll-length")
def calculate_and_display_roll_length():
    o_d = request.args.get('roll_diameter')
    material_no = request.args.get('material')
    i_d = request.args.get('core_diameter')
    options = [float(o_d), float(material_no), float(i_d)]
    
    return render_template("display_roll_length.html",
                            length=crud.calculate_roll_length(options))
    

@app.route("/calculate-roll-diameter")
def calclate_and_display_roll_diameter():
    length = request.args.get('roll_length')
    material_no = request.args.get('material')
    i_d = request.args.get('core_diameter')
    options = [int(length), float(material_no), float(i_d)]
    
    return render_template("display_roll_diameter.html",
                            diameter=crud.calculate_roll_diameter(options))


@app.route("/material-calculator")
def material_calculator():
    part_no = request.args.get('part_no')
    count = request.args.get('count')
    two_across = False
    two_across = request.args.get('two_across')
    if Envelope.varify_prt_exixts(part_no) == True:
        requirements = calculate_envelope_requirements(part_no, 
                                                    count, 
                                                    two_across)
        small_web = requirements['small web width']
        large_web = requirements['large web width']
        feet_needed = requirements['feet needed']
        return render_template("display_envelope_requirements.html",
                                part_no=part_no,
                                count=count,
                                small_web=small_web,
                                large_web=large_web,
                                feet_needed=feet_needed)
    elif PageProtector.varify_prt_exixts(part_no) == True:
        requirements = calculate_page_requirements(part_no, 
                                                    count, 
                                                    two_across)
        small_web = requirements['small web width']
        large_web = requirements['large web width']
        feet_needed = requirements['feet needed']
        return render_template("display_page_requirements.html",
                                part_no=part_no,
                                count=count,
                                small_web=small_web,
                                large_web=large_web,
                                feet_needed=feet_needed)
    elif Pocket.varify_prt_exixts(part_no) == True:
        requirements = calculate_pocket_requirements(part_no, 
                                                    count, 
                                                    two_across)
        small_web = requirements['small web width']
        large_web = requirements['large web width']
        feet_needed = requirements['feet needed']
        return render_template("display_pocket_requirements.html",
                                part_no=part_no,
                                count=count,
                                small_web=small_web,
                                large_web=large_web,
                                feet_needed=feet_needed)
    elif SingleWebPart.varify_prt_exixts(part_no) == True:
        rrequirements = calculate_single_web_part_requirements(part_no, 
                                                    count, 
                                                    two_across)
        web_width = requirements['web width']
        feet_needed = requirements['feet needed']
        return render_template("display_part_requirements.html",
                                part_no=part_no,
                                count=count,
                                web_width=web_width,
                                feet_needed=feet_needed)
    else:
        flash("Part is not in the system, please enter data to store.")
        return render_template("create_part.html",
                                part_no=part_no,
                                count=count,
                                two_across=two_across)
    

@app.route("/new-part-type")
def get_new_part_type():
    part_type = request.args.get("part_type")
    materials = crud.get_materials_list()
    if part_type == "envelope":
        return render_template("new_envelope.html",
                                materials=materials)
    elif part_type == "page_protector":
        return render_template("new_page.html",
                                materials=materials)
    elif part_type == "pocket":
        return render_template("new_pocket.html",
                                materials=materials)
    else:
        return render_template("new_swp.html",
                                materials=materials)

@app.route("/envelope-calculator")
def calculate_envelope_material(part_no, count, two_across):
    requirements = calculate_envelope_requirements(part_no, count, two_across)
    small_web = requirements['small web width']
    large_web = requirements['large web width']
    feet_needed = requirements['feet needed']
    return render_template("display_envelope_requirements.html",
                                part_no=part_no,
                                count=count,
                                small_web=small_web,
                                large_web=large_web,
                                feet_needed=feet_needed)


@app.route("/create-envelope", methods=["POST"])
def create_envelope():
    part_no = int(request.form.get("part_no"))
    count = int(request.form.get("count"))
    height = float(request.form.get("height"))
    width = float(request.form.get("width"))
    flap = float(request.form.get("flap"))
    throat = float(request.form.get("throat"))
    front_web_material = int(request.form.get("front_web_material"))
    back_web_material = int(request.form.get("back_web_material"))
    two_across = (request.form.get('two_across') == "True")

    crud.create_envelope(part_no, height, 
                        width, flap, 
                        throat, front_web_material, 
                        back_web_material)

    requirements = calculate_envelope_requirements(part_no, count, two_across)
    small_web = requirements['small web width']
    large_web = requirements['large web width']
    feet_needed = requirements['feet needed']
    return render_template("display_envelope_requirements.html",
                                part_no=part_no,
                                count=count,
                                small_web=small_web,
                                large_web=large_web,
                                feet_needed=feet_needed)

@app.route("/page-calculator")
def calculate_page_material(part_no, count, two_across):
    requirements = calculate_page_requirements(part_no, count, two_across)
    small_web = requirements['small web width']
    large_web = requirements['large web width']
    feet_needed = requirements['feet needed']
    return render_template("display_page_requirements.html",
                                part_no=part_no,
                                count=count,
                                small_web=small_web,
                                large_web=large_web,
                                feet_needed=feet_needed)


@app.route("/create-page", methods=["POST"])
def create_page():
    part_no = int(request.form.get("part_no"))
    count = int(request.form.get("count"))
    height = float(request.form.get("height"))
    width = float(request.form.get("width"))
    flap = float(request.form.get("flap"))
    throat = float(request.form.get("throat"))
    front_web_material = int(request.form.get("front_web_material"))
    back_web_material = int(request.form.get("back_web_material"))
    two_across = (request.form.get('two_across') == "True")

    crud.create_page(part_no, height, 
                        width, flap, 
                        throat, front_web_material, 
                        back_web_material)

    requirements = calculate_page_requirements(part_no, count, two_across)
    small_web = requirements['small web width']
    large_web = requirements['large web width']
    feet_needed = requirements['feet needed']
    return render_template("display_page_requirements.html",
                                part_no=part_no,
                                count=count,
                                small_web=small_web,
                                large_web=large_web,
                                feet_needed=feet_needed)

@app.route("/pocket-calculator")
def calculate_pocket_material(part_no, count, two_across):
    requirements = calculate_page_requirements(part_no, count, two_across)
    small_web = requirements['small web width']
    large_web = requirements['large web width']
    feet_needed = requirements['feet needed']
    return render_template("display_pocket_requirements.html",
                                part_no=part_no,
                                count=count,
                                small_web=small_web,
                                large_web=large_web,
                                feet_needed=feet_needed)


@app.route("/create-pocket", methods=["POST"])
def create_pocket():
    part_no = int(request.form.get("part_no"))
    count = int(request.form.get("count"))
    height = float(request.form.get("height"))
    width = float(request.form.get("width"))
    throat = float(request.form.get("throat"))
    front_web_material = int(request.form.get("front_web_material"))
    back_web_material = int(request.form.get("back_web_material"))
    two_across = (request.form.get('two_across') == "True")

    crud.create_pocket(part_no, height, 
                        width, throat, 
                        front_web_material, 
                        back_web_material)

    requirements = calculate_pocket_requirements(part_no, count, two_across)
    small_web = requirements['small web width']
    large_web = requirements['large web width']
    feet_needed = requirements['feet needed']
    return render_template("display_pocket_requirements.html",
                                part_no=part_no,
                                count=count,
                                small_web=small_web,
                                large_web=large_web,
                                feet_needed=feet_needed)

@app.route("/create-swp", methods=["POST"])
def create_swp():
    part_no = int(request.form.get("part_no"))
    count = int(request.form.get("count"))
    height = float(request.form.get("height"))
    width = float(request.form.get("width"))
    material = int(request.form.get("material"))
    two_across = (request.form.get('two_across') == "True")

    crud.create_single_web_part(part_no, height, 
                        width, material)

    requirements = calculate_single_web_part_requirements(part_no, count, two_across)
    web_width = requirements['web width']
    feet_needed = requirements['feet needed']
    return render_template("display_swp_requirements.html",
                                part_no=part_no,
                                count=count,
                                web_width=web_width,
                                feet_needed=feet_needed)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
