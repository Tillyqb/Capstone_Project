import os
import unittest
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from crud import *
from roll_calculator_logic import calculate_roll_diameter, calculate_roll_length
from model import *
from server import app

db = SQLAlchemy()


class Tests(unittest.TestCase):

  @classmethod
  def setUpClass(cls):
    connect_to_db(app, True, 'postgresql:///testdb')
    if check_user('foo@bar.com') == False:
      create_user('foo@bar.com', 'test')

  @classmethod
  def tearDownClass(cls):
    delete_user('foo@bar.com')
    delete_user('foo2@bar.com')
    delete_material(852)

  def test_create_user(self):
    email = 'foo2@bar.com'
    create_user(email, 'test')
    user = User.query.filter_by(email=email).first()
    self.assertEqual(user.email, email)

  def test_check_user(self):
    email = 'foo@bar.com'
    actual = check_user(email)
    expected = True
    self.assertEqual(actual, expected)

    actual = check_user('fool@bar.com')
    expected = False
    self.assertEqual(actual, expected)

  def test_validate_user(self):
    email = 'foo@bar.com'
    password = 'test'
    actual = validate_user(email, 'test')
    expected = email
    self.assertEqual(actual, expected)

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
    actual = Material.query.filter_by(material_no=860).first().material_thickness
    expected = 4.5
    self.assertEqual(actual, expected)

  # def test_calculate_roll_length(self):
  #   actual = calculate_roll_length([25, 491, 3.625])
  #   expected = 8899
  #   self.assertEqual(actual, expected)

  # def test_calculate_roll_diameter(self):
  #   actual = calculate_roll_diameter([9000, 491, 3.625])
  #   expected = 25.138
  #   self.assertEqual(actual, expected)

if __name__ == "__main__":
  unittest.main()