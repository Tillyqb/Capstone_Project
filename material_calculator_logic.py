"""logic to calculate the required output"""

from model import Envelope, PageProtector, Pocket, SingleWebPart, Material, connect_to_db, db
from crud import check_part
from flask import jsonify

if __name__ == "__main__":
    from server import app
    connect_to_db(app)

def calculate_material_requiremtents(part_no, count):
    part = check_part(part_no)
    if part['part_type'] == 'envelope':
        material = calculate_envelope_requirements(part_no, count)
    elif part['part_type'] == 'page protector':
        material = calculate_page_requirements(part_no, count)
    elif part['part_type'] == 'pocket':
        material = calculate_pocket_requirements(part_no, count)
    elif part['part_type'] == 'single web part':
        material = calculate_single_web_part_requirements(part_no, count)
    else: 
        return None
    if part['part_type'] == 'single web part':
        result =  ("This run will use " + str(part['feet_needed']) + " feet of " + str(material['web width']) + " inch wide " + str(material[material]))
    else:
        result = ("This run will use " + str(material['feet needed']) +" feet of " + str(material['small web width']) + " inch wide " + str(material['small web mat']) + " and " + str(material['feet needed']) + " feet of " + str(material['large web width']) + " inch wide " + str(material['large web mat']))
    return result

def calculate_envelope_requirements(part_no, count, two_across = False):
    """
    Calculate the material required for a given number of a given envelope:
    
    >>> calculate_envelope_requirements(12855, 10000, False)
    {'small web width': 9.25, 'large web width': 10.75, 'feet needed': 11000}
    """

    part = Envelope.get_envelope_by_part_no(part_no)
    status = 'two web calculation'
    height = float(part.part_height)
    width = float(part.part_width)
    flap = float(part.part_flap)
    throat = float(part.part_throat)
    f_mat = part.part_fr_mat
    b_mat = part.part_b_mat
    count = int(count)
    
    if two_across == True:
        small_web_width = (height - throat) * 2
        large_web_width = (height + flap) * 2
        feet_needed = (width / 12) * count / 2
    else:
        small_web_width = (height - throat) + .5
        large_web_width = (height + flap) + .5
        feet_needed = (width / 12) * count

    material = {'status': status,
                'small web width': small_web_width, 
                'large web width': large_web_width,
                'feet needed': int((feet_needed) * 1.1),
                'small web mat': f_mat,
                'large web mat': b_mat}
    
    return material

def calculate_page_requirements(part_no, count, two_across = False):
    """
    Calculate the material required for a given number of a given page protector:

    >>> calculate_page_requirements(12909, 10000, False)
    {'small web width': 11.75, 'large web width': 11.875, 'feet needed': 8593}
    """

    part = PageProtector.get_page_by_part_no(part_no)
    status = 'two web calculation'
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

    material = {'status': status,
                'small web width': small_web_width, 
                'large web width': large_web_width,
                'feet needed': int((feet_needed) * 1.1),
                'small web mat': f_mat,
                'large web mat': b_mat}
    
    return material
    

def calculate_pocket_requirements(part_no, count, two_across):
    """
    calculate the material required for a given number of a given pocket:

    >>> calculate_pocket_requirements(12858, 10000, False)
    {'small web width': 12.375, 'large web width': 12.5, 'feet needed': 8708}
    
    """
    part = Pocket.get_pocket_by_part_no(part_no)
    status = 'two web calculation'
    height = float(part.part_height)
    width = float(part.part_width)
    throat = float(part.part_throat)
    f_mat = part.part_fr_mat
    b_mat = part.part_b_mat

    if two_across == True:
        small_web_width = (height - throat) * 2
        large_web_width = (height) * 2
        feet_needed = (width / 12) * count / 2
    else:
        small_web_width = (height - throat) + .5
        large_web_width = (height) + .5
        feet_needed = (width / 12) * count

    material = {'status': status,
                'small web width': small_web_width, 
                'large web width': large_web_width,
                'feet needed': int((feet_needed) * 1.1),
                'small web mat': f_mat,
                'large web mat': b_mat}
    
    return material

def calculate_single_web_part_requirements(part_no, count, two_across):
    """
    calculate the material required for a given number of a given part:

    >>> calculate_single_web_part_requirements(11111, 5000, False)
    {'web width': 9.0, 'feet needed': 2406}
    """
    part = SingleWebPart.get_part_by_part_no(part_no)
    status = 'single web calculation'
    height = float(part.part_height)
    width = float(part.part_width)
    material = part.material

    if two_across == True:
        web_width = height * 2
        feet_needed = (width / 12) * count / 2
    else:
        web_width = height
        feet_needed = (width / 12) * count

    material = {'status': status,
                'web width': web_width,
                'feet needed': int((feet_needed) * 1.1),
                'material': material}
    
    return material
    
