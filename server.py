from flask import Flask, render_template, request, session, redirect, flash, jsonify
from model import connect_to_db, db
import os
from crud import check_user, validate_user, check_part, create_user
from jinja2 import StrictUndefined

os.system('source secrets.sh')
SECRET_KEY = os.environ['SECRET_KEY']

app = Flask(__name__)
connect_to_db(app)
app.secret_key = SECRET_KEY
app.jinja_env.undefined = StrictUndefined
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True



@app.route("/login")
@app.route("/")
def root():
    return render_template("root.html")



@app.route("/api/calculate-roll-length")
def calculate_roll_length():
    data = request.get_json()
    roll_diameter = data['roll_diameter']
    material = data['material']





@app.route("/api/login", methods=["POST"])
def login(): 
    data = request.get_json()
    email = data['email']
    password = data['password']

    if check_user(email) == False:
        return jsonify('bad email')
    else:
        if validate_user(email, password):
            return jsonify('good login')
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
    app.run(debug=True, host='0.0.0.0')