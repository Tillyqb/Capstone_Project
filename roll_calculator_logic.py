
from math import sqrt
from model import Material
PI = 3.141592654

def calculate_roll_length(args):
    """Calculate the length of a roll with a given diameter, material, and core diameter
    
    >>> calculate_roll_length([25, 491, 3.625])
    8899
    """
    print(args)
    roll_radious = float(args[0]/2)
    material_no = int(args[1])
    core_radious = float(args[2]/2)
    material_obj = Material.get_material_by_material_no(material_no)
    thickness_in_mil = float(material_obj.material_thickness)
    thickness_in_in = thickness_in_mil / 1000
    material_area = roll_radious ** 2 - core_radious **  2
    roll_length = (PI * (material_area) / thickness_in_in) / 12
    print(type(roll_length))
    return int(roll_length)


def calculate_roll_diameter(args):
    """Calculate the expected diameter of a roll of a known material at a given length
    
    >>> calculate_roll_diameter([9000, 491, 3.625])
    25.138318234529756
    """
    roll_length = int(args[0] * 12) # in inches
    material_no = int(args[1])
    core_radious = float ((args[2]/ 2))
    material_obj = Material.get_material_by_material_no(material_no)
    thickness_in_mil = float(material_obj.material_thickness)
    thickness_in_in = thickness_in_mil / 1000
    diameter = 2 * sqrt((roll_length * thickness_in_in / PI) + core_radious ** 2)
    return diameter

