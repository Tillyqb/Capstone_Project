"""CRUD operations."""
from model import db, User, Material, Envelope, Pocket, PageProtector, SingleWebPart, connect_to_db
from datetime import datetime
from py_session import py_session
from flask import Flask


def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user

def create_material(material_no, 
                    material_description,
                    material_thickness):

    material = Material(material_no = material_no,
                        material_description = material_description,
                        material_thickness = material_thickness)

    db.session.add(material)
    db.session.commit()

    return material

def create_envelope(part_no, part_height, part_width, part_flap, part_throat, part_fr_mat, part_b_mat):

    envelope = Envelope(part_no = part_no,
                        part_height = part_height,
                        part_width = part_width,
                        part_flap = part_flap,
                        part_throat = part_throat,
                        part_fr_mat = part_fr_mat,
                        part_b_mat = part_b_mat)

    db.session.add(envelope)
    db.session.commit()

    return envelope


def create_pocket(part_no, part_height, part_width, part_throat, part_fr_mat, part_b_mat):

    pocket = Pocket(part_no = part_no,
                        part_height = part_height,
                        part_width = part_width,
                        part_throat = part_throat,
                        part_fr_mat = part_fr_mat,
                        part_b_mat = part_b_mat)

    db.session.add(pocket)
    db.session.commit()

    return pocket 


def create_page(part_no, part_height, part_width, part_flap, part_throat, part_fr_mat, part_b_mat):

    page = PageProtector(part_no = part_no,
                        part_height = part_height,
                        part_width = part_width,
                        part_flap = part_flap,
                        part_throat = part_throat,
                        part_fr_mat = part_fr_mat,
                        part_b_mat = part_b_mat)

    db.session.add(page)
    db.session.commit()

    return page


def create_single_web_part(part_no, part_height, part_width, material):

    part = SingleWebPart(part_no = part_no,
                        part_height = part_height,
                        part_width = part_width,
                        material = material)

    db.session.add(part)
    db.session.commit()

    return part

