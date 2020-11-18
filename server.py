from flask import Flask, render_template, request, session, redirect, flash
from model import connect_to_db, db
import os
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
    # do stuff with your data then return something
    return jsonify("banana bunny muffins")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')