from collazyer_backend import db


class News(db.Model):
    __tablename__ = 'news'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    text = db.Column(db.Text)
    image = db.Column(db.String(32))

    def __repr__(self):
        return '<News %r>' % self.id
