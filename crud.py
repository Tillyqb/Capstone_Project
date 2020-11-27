"""CRUD operations."""
from model import db, User, Material, Envelope, Pocket, PageProtector, SingleWebPart, connect_to_db
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

PI = 3.141592654


def check_part(part_no):
    if Envelope.varify_part_exixts(part_no):
        part = Envelope.get_envelope_by_part_no(part_no)
        return 'envelope'
    elif Pocket.varify_part_exixts(part_no):
        part = Pocket.get_pocket_by_part_no(part_no)
        return 'pocket'
    elif PageProtector.varify_part_exixts(part_no):
        part = PageProtector.get_page_by_part_no(part_no) 
        return 'page protector'
    elif SingleWebPart.varify_part_exixts(part_no):
        part = SingleWebPart.get_part_by_part_no(part_no)
        return 'single web part'
    else:
        return 'need part data'



def create_user(email, password):
    """Create and return a new user."""

    user = User(email=email, password=password)

    db.session.add(user)
    db.session.commit()


def check_user(email):
    check =  User.query.filter(User.email == email).first()
    return (type(check) == User)

def validate_user(email, password):
    
    user = User.query.filter(User.email == email).first()
    if user.password == password:
        return email

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

def get_materials_list():
    materials_obj = Material.get_materials_list()
    materials_list = []
    for material in materials_obj:
        materials_list.append([material.material_no, 
                            material.material_thickness, 
                            material.material_description])
    return sorted(materials_list)

if __name__ ==  '__main__':
    #app.run(debug=True, host='0.0.0.0')
    from server import app
    connect_to_db(app)


# def calculate_roll_length(args):
#     """Calculate the length of a roll with a given diameter, material, and core diameter
    
#     >>> calculate_roll_length([25, 491, 3.625])
#     8899
#     """
#     roll_radious = float(args[0]/2)
#     material_no = int(args[1])
#     core_radious = float(args[2]/2)
#     material_obj = Material.get_material_by_material_no(material_no)
#     thickness_in_mil = float(material_obj.material_thickness)
#     thickness_in_in = thickness_in_mil / 1000
#     material_area = roll_radious ** 2 - core_radious **  2
#     roll_length = (PI * (material_area) / thickness_in_in) / 12
#     return int(roll_length)


# def calculate_roll_diameter(args):
#     """Calculate the expected diameter of a roll of a known material at a given length
    
#     >>> calculate_roll_diameter([9000, 491, 3.625])
#     25.138318234529756
#     """
#     roll_length = int(args[0] * 12) # in inches
#     material_no = int(args[1])
#     core_radious = float ((args[2]/ 2))
#     material_obj = Material.get_material_by_material_no(material_no)
#     thickness_in_mil = float(material_obj.material_thickness)
#     thickness_in_in = thickness_in_mil / 1000
#     diameter = 2 * sqrt((roll_length * thickness_in_in / PI) + core_radious ** 2)
#     return diameter




