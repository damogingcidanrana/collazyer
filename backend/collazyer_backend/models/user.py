from collazyer_backend import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # User
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(32))
    secret_string = db.Column(db.String(32))
    # Company
    domain = db.Column(db.String(100))
    name = db.Column(db.String(100))
    text = db.Column(db.Text())
    slider = db.Column(db.Text())
    goods = db.relationship('Good', cascade="all, delete-orphan")
    needs = db.relationship('Need', cascade="all, delete-orphan")
    news = db.relationship('News', cascade="all, delete-orphan")
