"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system('dropdb material')
os.system('createdb material')

model.connect_to_db(server.app)
model.db.create_all()

"""seed users"""
for n in range(10):
    email = f'user{n}@foo.bar'
    password = 'test'

    user = crud.create_user(email, password)


"""seed materials"""
#                    mat_no, ar,  adhb,  op,    type,  thicknes
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
for n in range(100):
    part_no = randint(1, 99999)
    part_height = float(randint(1, 160) / 16)
    part_width = float(randint(1, 270) / 16)
    part_flap = float(randint(1, 25) / 8)
    part_throat = float(randint(1, 8) / 16)
    part_fr_mat = choice(materials).material_no
    part_b_mat = choice(materials).material_no

    crud.create_envelope(part_no, part_height, part_width, part_flap,  part_throat, part_fr_mat, part_b_mat)