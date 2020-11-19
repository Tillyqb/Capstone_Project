from flask import Flask, render_template, request, session, redirect, flash, jsonify
from model import connect_to_db, db
import os
from crud import check_user, validate_user
from jinja2 import StrictUndefined

app = Flask(__name__)
connect_to_db(app)
app.secret_key = "1AmAM3atP0pc1cl3"
app.jinja_env.undefined = StrictUndefined
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

@app.route("/")
def root():
    return render_template("root.html")




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

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')