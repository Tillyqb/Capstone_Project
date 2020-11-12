"""Testing functionality"""
import unittest
from flask import Flask, session
from flask_sqlalchemy import SQLAlchemy
from model import db, connect_to_db, User
import crud
from sqlalchemy import create_engine
import testing.postgresql
import psycopg2

# app = Flask(__name__)
# connect_to_db(app)
# db = psycopg2.connect(app.dsn())

with testing.postgresql.Postgresql() as postgresql:
    engine = create_engine(postgresql.url())

import psycopg2

class CalculateLengthTest(unittest.TestCase):

    def test_calculate_length(self):
        args = [25, 491, 3.625]

        actual = crud.calculate_roll_length(args)
        expected = 8899.133878615887

        self.assertEqaual(actual, expected)
        

if __name__ == '__main__':
    unittest.main()