"""logic to calculate the required output"""

from model import Envelope, PageProtector, Pocket, SingleWebPart, Material
from crud import check_part
from flask import jsonify

def calculate_material_requiremtents(args):
    part_no = args[0]
    count = int(args[1])
    two_across = args[2]
    part = check_part(part_no)
    if part == 'envelope':
        material = calculate_envelope_requirements(part_no, count, two_across)
    elif part == 'page protector':
        material = calculate_page_requirements(part_no, count, two_across)
    elif part == 'pocket':
        material = calculate_pocket_requirements(part_no, count, two_across)
    elif part == 'single web part':
        material = calculate_single_web_part_requirements(part_no, count, two_across)
    else: 
        return ('need part data')
    if part == 'single web part':
        feet_needed = material['feet needed']
        web_width = material['web width']
        material = material['material']
        result =  (f"This run will use {feet_needed} feet of \n{web_width} inch wide {material}")
    else:
        feet_needed = material['feet needed']
        small_web_width = material['small web width']
        small_web_mat = material['small web mat']
        large_web_width = material['large web width']
        large_web_mat = material['large web mat']
        result = (f"This run will use {feet_needed} feet of each of: \n{small_web_width} inch wide {int(small_web_mat)} and \n{large_web_width} inch wide {int(large_web_mat)}")
        print (result)
    return result

def calculate_envelope_requirements(part_no, count, two_across):

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

def calculate_page_requirements(part_no, count, two_across):

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
    
