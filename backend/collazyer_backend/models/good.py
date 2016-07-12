from collazyer_backend import db


class Good(db.Model):
    __tablename__ = 'good'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    name = db.Column(db.Text)

    def __init__(self):
        self.name = ''

    def __repr__(self):
        return '<Good %r>' % self.id
