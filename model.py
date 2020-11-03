"""Models for material calculator app."""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy import Integer, ForeignKey, String, Column, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

db = SQLAlchemy()

class User(db.Model):
    """A user."""
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    email = db.Column(db.String(20), unique = True)
    password = db.Column(db.String(30))

    def __repr__(self):
        return f'<User: user = {self.user_id} email = {self.email}>'

class Material(db.Model):
    """A material"""
    __tablename__ = 'materials'

    material_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    material_no = db.Column(db.Integer, unique = True)
    material_description = db.Column(db.String)
    material_thickness = db.Column(db.Numeric(3,1))

    def __repr__(self):
        return f'<Material: material_id = {self.material_id} material_no = {self.material_no}>'

class Envelope(db.Model):
    """An envelope"""

    __tablename__ = 'envelopes'

    envelope_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    part_no = db.Column(db.Integer, unique = True)
    part_height = db.Column(db.Numeric(5,3))
    part_width = db.column(db.Numeric(6,4))
    part_flap = db.column(db.Numeric(4,3))
    part_throat = db.Column(db.Numeric(5,4))
    part_fr_mat = db.Column(db.Integer, db.ForeignKey("materials.material_no"))
    part_b_mat = db.Column(db.Integer, db.ForeignKey("materials.material_no"))
    materials = relationship("Material", primaryjoin="and_(Envelope.part_fr_mat==Material.material_no, Envelope.part_b_mat==Material.material_no)")
   

    def __repr__(self):
        return f'<Envelope: ID = {self.envelope_id}, Part number = {self.part_no} Size = {self.part_height} X {self.part_width}>'

class Pocket(db.Model):
    """A Pocket"""

    tablename = 'pockets'

    pocket_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    part_no = db.Column(db.Integer, unique = True)
    part_height = db.Column(db.Numeric(5,3))
    part_width = db.column(db.Numeric(6,4))
    part_throat = db.Column(db.Numeric(5,4))
    part_fr_mat = db.Column(db.Integer, db.ForeignKey("materials.material_no"))
    part_b_mat = db.Column(db.Integer, db.ForeignKey("materials.material_no"))
    materials = relationship("Material", primaryjoin="and_(Pocket.part_fr_mat==Material.material_no, Pocket.part_b_mat==Material.material_no)")

    def __repr__(self):
        return f'<Part: ID = {self.pocket_id}, Part number = {self.part_no} Size = {self.part_height} X {self.part_width}>'


class PageProtector(db.Model):
    """An page protector"""

    __tablename__ = 'pages'

    page_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    part_no = db.Column(db.Integer, unique = True)
    part_height = db.Column(db.Numeric(5,3))
    part_width = db.column(db.Numeric(6,4))
    part_flap = db.column(db.Numeric(4,3))
    part_throat = db.Column(db.Numeric(5,4))
    part_fr_mat = db.Column(db.Integer, db.ForeignKey("materials.material_no"))
    part_b_mat = db.Column(db.Integer, db.ForeignKey("materials.material_no"))
    materials = relationship("Material", primaryjoin="and_(PageProtector.part_fr_mat==Material.material_no, PageProtector.part_b_mat==Material.material_no)")
   

    def __repr__(self):
        return f'<Page protector: ID = {self.page_id}, Part number = {self.part_no} Size = {self.part_height} X {self.part_width}>'

class SingleWebPart(db.Model):
    """A single web part"""

    __tablename__ = 'single_web_parts'

    part_id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    part_no = db.Column(db.Integer, unique = True)
    part_height = db.Column(db.Numeric(5,3))
    part_width = db.column(db.Numeric(6,4))
    material = db.Column(db.Integer, db.ForeignKey("materials.material_no"))
    materials = relationship("Material", primaryjoin="SingleWebPart.material == Material.material_no")
   

    def __repr__(self):
        return f'<Single web part: ID = {self.part_id}, Part number = {self.part_no} Size = {self.part_height} X {self.part_width}>'


def connect_to_db(flask_app, db_uri='postgresql:///material', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')


if __name__ == '__main__':
    from server import app

    connect_to_db(app)