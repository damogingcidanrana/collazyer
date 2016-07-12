from collazyer_backend import db


class Image(db.Model):
    __tablename__ = 'image'
    id = db.Column(db.Integer, primary_key=True)
    block_id = db.Column(db.Integer, db.ForeignKey('block.id'), primary_key=True)
    name = db.Column(db.String(120))
    file_path = db.Column(db.String(1200))

    def __init__(self, name, file_path):
        self.name = name
        self.file_path = file_path
        self.name = name

    def __repr__(self):
        return '<Image %r>' % self.file_path
