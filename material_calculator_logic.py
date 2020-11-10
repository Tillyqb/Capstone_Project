"""logic to calculate the required output"""

from model import Envelope, PageProtector, Pocket, SingleWebPart, connect_to_db
from flask import Flask

if __name__ == "__main__":
    connect_to_db(Flask(__name__))

# Calculate the material widths for the given part

def calculate_material_requiremtents(part_type, part_no, two_across, count):
    if part_type == 'envelope':
        material = calculate_envelope_requirements(part_no, two_across, count)
    elif part_type == 'page':
        material = calculate_page_requirements(part_no, two_across, count)
    elif part_type == 'pocket':
        material = calculate_pocket_requirements(part_no, two_across, count)
    else:
        material = calculate_single_web_part_requirements(part_no, two_across, count)

    return material

def calculate_envelope_requirements(part_no, count, two_across = False):
    part = Envelope.get_envelope_by_part_no(part_no)
    height = float(part.part_height)
    width = float(part.part_width)
    flap = float(part.part_flap)
    throat = float(part.part_throat)
    f_mat = float(part.part_fr_mat)
    b_mat = float(part.part_b_mat)

    if two_across == True:
        small_web_width = (height - throat) * 2
        large_web_width = (height + flap) * 2
        feet_needed = (width / 12) * count / 2
    else:
        small_web_width = (height - throat) + .5
        large_web_width = (height + flap) + .5
        feet_needed = (width / 12) * count

    material = {'small web width': small_web_width, 
                'large web width': large_web_width,
                'feet needed': feet_needed}
    
    return material

def calculate_page_requirements(part_no, count, two_across):
    part = PageProtector.get_page_by_part_no(part_no)
    height = float(part.part_height)
    width = float(part.part_width)
    flap = float(part.part_flap)
    throat = float(part.part_throat)
    f_mat = float(part.part_fr_mat)
    b_mat = float(part.part_b_mat)

    if two_across == True:
        small_web_width = (height - throat) * 2
        large_web_width = (height + flap) * 2
        feet_needed = (width / 12) * count / 2
    else:
        small_web_width = (height - throat) + .5
        large_web_width = (height + flap) + .5
        feet_needed = (width / 12) * count

    material = {'small web width': small_web_width, 
                'large web width': large_web_width,
                'feet needed': feet_needed}
    
    return material
    

def calculate_pocket_requirements(part_no, count, two_across):
    part = Pocket.get_pocket_by_part_no(part_no)
    height = float(part.part_height)
    width = float(part.part_width)
    throat = float(part.part_throat)
    f_mat = float(part.part_fr_mat)
    b_mat = float(part.part_b_mat)

    if two_across == True:
        small_web_width = (height - throat) * 2
        large_web_width = (height) * 2
        feet_needed = (width / 12) * count / 2
    else:
        small_web_width = (height - throat) + .5
        large_web_width = (height) + .5
        feet_needed = (width / 12) * count

    material = {'small web width': small_web_width, 
                'large web width': large_web_width,
                'feet needed': feet_needed}
    
    return material

def calculate_single_web_part_requirements(part_no, count, two_across):
    part = SingleWebPart.get_part_by_part_no(part_no)
    height = float(part.part_height)
    width = float(part.part_width)
    material = float(part.material)

    if two_across == True:
        web_width = height * 2
        feet_needed = (width / 12) * count / 2
    else:
        web_width = height
        feet_needed = (width / 12) * count

    material = {'web width': web_width,
                'feet needed': feet_needed}
    
    return material
