import os
import unittest
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from crud import *
from roll_calculator_logic import calculate_roll_diameter, calculate_roll_length
from model import *
from material_calculator_logic import *
from server import app
from jinja2 import StrictUndefined

db = SQLAlchemy()
app.jinja_env.undefined = StrictUndefined

class Tests(unittest.TestCase):

  @classmethod
  def setUpClass(cls):
    connect_to_db(app, True, 'postgresql:///testdb')
    cls.client = app.test_client()
    app.config['TESTING'] = True
    if check_user('foo@bar.com') == False:
      create_user('foo@bar.com', 'test')

  @classmethod
  def tearDownClass(cls):
    delete_user('foo@bar.com')
    delete_user('foo2@bar.com')
    delete_material(852)
    delete_part(13044)
    delete_part(13838)
    delete_part(13101)
    delete_part(12345)

  def test_create_user(self):
    email = 'foo2@bar.com'
    create_user(email, 'test')
    user = User.query.filter_by(email=email).first()
    self.assertEqual(user.email, email)

  def test_check_user_with_good_user(self):
    email = 'foo@bar.com'
    actual = check_user(email)
    expected = True
    self.assertEqual(actual, expected)

  def test_check_user_with_bad_user(self):
    actual = check_user('fool@bar.com')
    expected = False
    self.assertEqual(actual, expected)

  def test_validate_user_with_good_login(self):
    email = 'foo@bar.com'
    actual = validate_user(email, 'test')
    expected = email
    self.assertEqual(actual, expected)

  def test_validate_user_with_bad_login(self):
    email = 'foo@bar.com'
    actual = validate_user(email, 'nope')
    expected = False
    self.assertEqual(actual, expected)

  def test_check_part(self):
    self.assertEqual(check_part(12855), 'envelope')
    self.assertEqual(check_part(12858), 'pocket')
    self.assertEqual(check_part(12909), 'page protector')
    self.assertEqual(check_part(11111), 'single web part')
    self.assertEqual(check_part(100000), 'need part data')

  def test_create_material(self):
    material = create_material(852, 'poly', 2.75)
    actual = float(Material.query.filter_by(material_no=852).first().material_thickness)
    expected = 2.8
    self.assertEqual(actual, expected)

  def test_create_envelope(self):
    create_envelope(13044, 9, 12, 1.25, .25, 831, 831)
    envelope = Envelope.query.filter_by(part_no=13044).first()
    actual = envelope.part_width
    expected = 12
    self.assertEqual(actual, expected)
  
  def test_create_pocket(self):
    create_pocket(13838, 12, 9, .125, 490, 987)
    pocket = Pocket.query.filter_by(part_no=13838).first()
    actual = pocket.part_throat
    expected = .125
    self.assertEqual(actual, expected)

  def test_create_page_protector(self):
    create_page(13101, 11.375, 9.375, 0, .03125, 490, 490)
    page_protector = PageProtector.query.filter_by(part_no=13101).first()
    actual = page_protector.part_height
    expected = 11.375
    self.assertEqual(actual, expected)

  def test_swp_creation(self):
    create_single_web_part(12345, 8.5, 11, 661)
    single_web_part = SingleWebPart.query.filter_by(part_no=12345).first()
    actual = single_web_part.part_height
    expected = 8.5
    self.assertEqual(actual, expected)

  def test_get_materials_list(self):
    materials = get_materials_list()
    expected = 490
    actual = materials[0][0]
    self.assertEqual(actual, expected)

  def test_calculate_material_requirements_envelope_one_across(self):
    actual = calculate_material_requiremtents([12855, 10000, False])
    expected = "This run will use 11000 feet of each of: \n9.25 inch wide 491 and \n10.75 inch wide 491"
    self.assertEqual(actual, expected)

  def test_calculate_material_requirements_page_one_across(self):
    actual = calculate_material_requiremtents([12909, 10000, False])
    expected = "This run will use 8593 feet of each of: \n11.75 inch wide 490 and \n11.875 inch wide 490"
    self.assertEqual(actual, expected)

  def test_calculate_material_requirements_pocket_one_across(self):
    actual = calculate_material_requiremtents([12858, 10000, False])
    expected = "This run will use 8708 feet of each of: \n12.375 inch wide 490 and \n12.5 inch wide 987"
    self.assertEqual(actual, expected)

  def test_calculate_material_requirements_swp_one_across(self):
    actual = calculate_material_requiremtents([11111, 10000, False])
    expected = "This run will use 4812 feet of \n9.0 inch wide 661"
    self.assertEqual(actual, expected)

  def test_calculate_material_requirements_envelope_two_across(self):
    actual = calculate_material_requiremtents([12855, 20000, True])
    expected = "This run will use 11000 feet of each of: \n17.5 inch wide 491 and \n20.5 inch wide 491"
    self.assertEqual(actual, expected)

  def test_calculate_material_requirements_pocket_two_across(self):
    actual = calculate_material_requiremtents([12909, 20000, True])
    expected = "This run will use 8593 feet of each of: \n22.5 inch wide 490 and \n22.75 inch wide 490"
    self.assertEqual(actual, expected)

  def test_calculate_material_requirements_page_two_across(self):
    actual = calculate_material_requiremtents([12858, 20000, True])
    expected = "This run will use 8708 feet of each of: \n23.75 inch wide 490 and \n24.0 inch wide 987"
    self.assertEqual(actual, expected)

  def test_calculate_material_requirements_swp_two_across(self):
    actual = calculate_material_requiremtents([11111, 20000, True])
    expected = "This run will use 4812 feet of \n18.0 inch wide 661"
    self.assertEqual(actual, expected)

  def test_routes(self):
    with app.test_client() as c:
      response = c.get('/')
      self.assertEqual(response.status_code, 200)

    with app.test_client() as c:
      response = c.get('/login')
      self.assertEqual(response.status_code, 200)

    with app.test_client() as c:
      response = c.get('/new-user')
      self.assertEqual(response.status_code, 200)

    with app.test_client() as c:
      response = c.get('/calculate-roll-length')
      self.assertEqual(response.status_code, 200)

    with app.test_client() as c:
      response = c.get('/calculate-roll-diameter')
      self.assertEqual(response.status_code, 404)
      
    with app.test_client() as c:
      response = c.get('/calculate-material-requirements')
      self.assertEqual(response.status_code, 200)
      
    with app.test_client() as c:
      response = c.get('/material-calculator')
      self.assertEqual(response.status_code, 200)

  def test_for_error_when_accessing_an_api_page_directly(self):
    with app.test_client() as c:
      response = c.get('/api/material-requirements-calculator')
      self.assertEqual(response.status_code, 405)

  def test_length_calculator(self):
    with app.test_client() as c:
      data={'rollDia': '25', 'material': '491', 'coreDia': '3.625'}
      response = self.client.post('/api/calculate-roll-length', jsonify(data))
    print (response)
    self.assertIn(b'8899', response.data)

  # def test_calculate_roll_length(self):
  #   actual = calculate_roll_length([25, 491, 3.625])
  #   expected = 8899
  #   self.assertEqual(actual, expected)

  # def test_calculate_roll_diameter(self):
  #   actual = calculate_roll_diameter([9000, 491, 3.625])
  #   expected = 25.138
  #   self.assertEqual(actual, expected)

unittest.main()
# app.run(debug=False, host='0.0.0.0')
