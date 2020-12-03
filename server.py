from flask import Flask, render_template, request, session, redirect, flash, jsonify
from model import connect_to_db, db, User
import os
from crud import check_user, validate_user, check_part, delete_part, create_user, create_envelope, create_page, create_pocket, create_single_web_part
from material_calculator_logic import calculate_material_requiremtents
from roll_calculator_logic import calculate_roll_length, calculate_roll_diameter
from jinja2 import StrictUndefined

SECRET_KEY = os.environ['SECRET_KEY']

app = Flask(__name__)


app.secret_key = SECRET_KEY
app.jinja_env.undefined = StrictUndefined
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

@app.route("/edit-part")
@app.route("/new-user")
@app.route("/calculate-roll-length")
@app.route("/calculate-material-requirements")
@app.route("/material-calculator")
@app.route("/login")
@app.route("/")
def root():
    return render_template("root.html")



@app.route("/api/calculate-roll-length", methods=['POST'])
def length_calculator():
    print(request)
    data = request.get_json()
    roll_diameter = data['rollDia']
    material = data['material']
    core_dia = data['coreDia']
    args = [roll_diameter, material, core_dia]

    length = calculate_roll_length(args)
    return length


@app.route("/api/calculate-roll-diameter", methods=["POST"])
def calculate_diameter():
    data = request.get_json()
    print (data)
    roll_length = data['length']
    material = data["material"]
    core_dia = data["coreDia"]
    args = [roll_length, material, core_dia]
    
    diameter = calculate_roll_diameter(args)
    print (diameter)
    return diameter

@app.route("/api/material-requirements-calculator", methods=["POST"])
def get_material_requirements():
    data = request.get_json()
    print (data)
    part_no = data['partNo']
    count = data['count']
    two_across = data['twoAcross']
    args = [part_no, count, two_across]
    response = calculate_material_requiremtents(args)
    print(jsonify(response))
    return (jsonify(response))

@app.route("/api/new-envelope", methods=["POST"])
def new_envelope():
    data = request.get_json()
    part_no = data['partNo']
    height = data['height']
    width = data['width']
    flap = data['flap']
    throat = data['throat']
    large_web_mat = data['largeWebMat']
    small_web_mat = data['smallWebMat']

    create_envelope(part_no, height, width, flap, throat, small_web_mat, large_web_mat)

    return jsonify('Envelope created')

@app.route("/api/new-page-protector", methods=["POST"])
def new_page_protector():
    data = request.get_json()
    part_no = data['partNo']
    height = data['height']
    width = data['width']
    flap = data['flap']
    throat = data['throat']
    large_web_mat = data['largeWebMat']
    small_web_mat = data['smallWebMat']

    create_page(part_no, height, width, flap, throat, small_web_mat, large_web_mat)

    return jsonify('Page protector created')

@app.route("/api/new-pocket", methods=["POST"])
def new_pocket():
    data = request.get_json()
    part_no = data['partNo']
    height = data['height']
    width = data['width']
    throat = data['throat']
    large_web_mat = data['largeWebMat']
    small_web_mat = data['smallWebMat']

    create_pocket(part_no, height, width, throat, small_web_mat, large_web_mat)

    return jsonify('Pocket created')

@app.route("/api/new-single-web-part", methods=["POST"])
def new_single_web_part():
    data = request.get_json()
    part_no = data['partNo']
    height = data['height']
    width = data['width']
    material = data['material']

    create_single_web_part(part_no, height, width, material)

    return jsonify('Single web part created')

@app.route("/api/delete-part", methods=["POST"])
def remove_part_from_database():
    data = request.get_json()
    part_no = data['part_no']

    response = delete_part(part_no)
    return jsonify(response)

@app.route("/api/check-part", methods=["POST"])
def get_part():
    data = request.get_json()
    part_no = data['part_no']

    response = check_part(part_no, True)
    part = {}
    if str(type(response)) == "<class 'model.Envelope'>":
        part['pType'] = 'envelope'
    elif str(type(response)) == "<class 'model.Pocket'>":
        part['pType'] = 'pocket'
    elif str(type(response)) == "<class 'model.PageProtector'>":
        part['pType'] = 'page'
    elif str(type(response)) == "<class 'model.SingleWebPart'>":
        part['pType'] = 'swp'
    else:
        return jsonify('part not in system')
    part['partNo'] = response.part_no
    part['height'] = str(response.part_height)
    part['width'] = str(response.part_width)
    if part['pType'] == 'envelope' or part['pType'] == 'page':
        part['flap'] = str(response.part_flap)
    if part['pType'] == 'envelope' or part['pType'] == 'page' or part['pType'] == 'pocket':
        part['throat'] = str(response.part_throat)
    if part['pType'] == 'swp':
        part['material'] = response.material
    if part['pType'] == 'envelope' or part['pType'] == 'page' or part['pType'] == 'pocket':
        part['smallWebMat'] = response.part_fr_mat
    if part['pType'] == 'envelope' or part['pType'] == 'page' or part['pType'] == 'pocket':
        part['largeWebMat'] = response.part_b_mat
    print (part)
    return jsonify(part)

@app.route("/api/edit-envelope", methods=["POST"])
def edit_envelope():
    data = request.get_json()
    part_no = data['partNo']
    height = data['height']
    width = data['width']
    flap = data['flap']
    throat = data['throat']
    large_web_mat = data['largeWebMat']
    small_web_mat = data['smallWebMat']

    part = check_part(part_no, True)

    db.session.delete(part)
    db.session.commit()

    create_envelope(part_no, height, width, flap, throat, small_web_mat, large_web_mat)

    return jsonify('Envelope edited')

@app.route("/api/edit-page-protector", methods=["POST"])
def edit_page_protector():
    data = request.get_json()
    part_no = data['partNo']
    height = data['height']
    width = data['width']
    flap = data['flap']
    throat = data['throat']
    large_web_mat = data['largeWebMat']
    small_web_mat = data['smallWebMat']

    part = check_part(part_no, True)

    db.session.delete(part)
    db.session.commit()

    create_page(part_no, height, width, flap, throat, small_web_mat, large_web_mat)

    return jsonify('Page protector edited')

@app.route("/api/edit-pocket", methods=["POST"])
def edit_pocket():
    data = request.get_json()
    part_no = data['partNo']
    height = data['height']
    width = data['width']
    throat = data['throat']
    large_web_mat = data['largeWebMat']
    small_web_mat = data['smallWebMat']

    part = check_part(part_no, True)

    db.session.delete(part)
    db.session.commit()

    create_pocket(part_no, height, width, throat, small_web_mat, large_web_mat)

    return jsonify('Pocket edited')

@app.route("/api/edit-single-web-part", methods=["POST"])
def edit_single_web_part():
    data = request.get_json()
    part_no = data['partNo']
    height = data['height']
    width = data['width']
    material = data['material']

    part = check_part(part_no, True)

    db.session.delete(part)
    db.session.commit()

    create_single_web_part(part_no, height, width, material)

    return jsonify('Single web part edited')

@app.route("/api/login", methods=["POST"])
def login(): 
    data = request.get_json()
    email = data['email']
    password = data['password']

    if check_user(email) == False:
        return jsonify('bad email')
    else:
        if validate_user(email, password):
            return jsonify("Good login")
        else:
            return jsonify("bad password")


@app.route("/api/new-user", methods=["POST"])
def regiter():
    data = request.get_json()
    email = data['email']
    email2 = data['email2']
    password = data['password']
    password2 = data['password2']

    if check_user(email) == False:
        print('good email')
        if email == email2:
            print('emails match')
            if password == password2:
                print('passwords match')
                create_user(email, password)
                return jsonify('good registaration')
            else:
                return jsonify('password mismatch')
        else:
            return jsonify('email mismatch')
    else:
        return jsonify('email in system')


            
if __name__ == "__main__":
    connect_to_db(app, False)
    app.run(debug=False, host='0.0.0.0')