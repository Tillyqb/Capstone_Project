"""Script to seed database."""

import os
import json
from random import choice, randint
from flask import Flask

import crud
import model
import server

os.system('dropdb material')
os.system('createdb material')

model.connect_to_db(Flask(__name__))
model.db.create_all()

"""seed users"""
user_list = []
for n in range(10):
    email = f'user{n + 1}@foo.bar'
    password = 'test'
    user_list.append(crud.create_user(email, password))

"""seed materials"""
materials = []
materials.append(crud.create_material(490, 'Poly', 3.5))
materials.append(crud.create_material(491, 'Poly', 4.5))
materials.append(crud.create_material(831, 'Bio Poly', 4.5))
materials.append(crud.create_material(750, 'AR Poly', 4.5))
materials.append(crud.create_material(850, 'OP Poly', 4.5))
materials.append(crud.create_material(860, 'AR Bio Poly', 4.5))
materials.append(crud.create_material(987, '3.5m adhbPoly', 10.5))
materials.append(crud.create_material(661, '120 # paper', 7.5))
materials.append(crud.create_material(986, 'Poly', 6))

"""seed envelopes"""
envelopes = []
for n in range(100):
    part_no = n
    part_height = float(randint(30, 160) / 16)
    part_width = float(randint(60, 270) / 16)
    part_flap = float(randint(4, 25) / 8)
    part_throat = float(randint(1, 8) / 16)
    part_fr_mat = choice(materials).material_no
    part_b_mat = choice(materials).material_no
    crud.create_envelope(part_no, part_height, part_width, part_flap,   part_throat, part_fr_mat, part_b_mat)

"""seed pockets"""
pockets = []
for n in range(100):
    part_no = n + 100
    part_height = float(randint(1, 160) / 16)
    part_width = float(randint(1, 270) / 16)
    part_throat = float(randint(0, 4) / 16)
    part_fr_mat = choice(materials).material_no
    part_b_mat = choice(materials).material_no

    crud.create_pocket(part_no, part_height, part_width, part_throat,   part_fr_mat, part_b_mat)
    

pages = []
"""seed pages"""
heights = [9, 11.375, 12]
widths = [5.875, 9.375, 18]
flaps = [0, .75, 1, 1.25]
for n in range(100):
    part_no = n + 200
    part_height = float(choice(heights))
    part_width = float(choice(widths))
    part_flap = float(choice(flaps))
    part_throat = float(randint(0, 4) / 16)
    part_fr_mat = choice(materials).material_no
    part_b_mat = choice(materials).material_no

    crud.create_page(part_no, part_height, part_width, part_flap,  part_throat, part_fr_mat, part_b_mat)


"""seed single web parts"""
parts = []
for n in range(100):
    part_no = n + 300
    part_height = float(randint(1, 160) / 16)
    part_width = float(randint(1, 270) / 16)
    material = choice(materials).material_no

    crud.create_single_web_part(part_no, part_height, part_width, material)
