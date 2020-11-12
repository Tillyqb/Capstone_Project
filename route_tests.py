from unittest import TestCase
from server import app
from model import connect_to_db, db
from flask import session
from crud import create_user, create_material, create_pocket, create_page, create_single_web_part

class FlaskTests(TestCase):

  def setup(self):

    self.client = app.test_client()
    app.config['TESTING'] = True
    app.config['SECRET_KEY'] = 'kelp'

    connect_to_db(app, "postgresql:///testdb")
    db.create_all()
    # with self.client as c:
    #   with c.session_transaction() as sess:
    #     sess['user_id'] = 1


    create_user('foo@bar.com', 'password')
    create_user('user@fake.isp', 'someMadeUpPassword')
    create_material('00491', 'Poly', '4.5')
    create_material('00490', 'Poly', '3.5')
    create_material('00490', 'AdhB Poly', '10.5')
    create_envelope('12855', '9', '12', '1.25', '.25', '00491', '00491')
    create_pocket('12858', '12', '9', '.125', '00490', '00986')
    create_page('12909', '11.375', '9.375', '0', '.0625', '00490', '00490')
    create_single_web_part('12345', '8.5', '11')

    
  def tearDown(self):
    db.session.remove()
    db.drop_all()
    db.engine.dispose()

  def test_homepage(self):
    result = self.client.get("/")
    self.assertIn(b"<h1>Welcome!</h1>")

  def test_create_user(self):
    result = self.client.get("/new_user")
    self.assertIn(b"<h2>Create a new user.</h2>")

if __name__ == "__main__":
    import unittest

    unittest.main()