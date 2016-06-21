from flask import Flask, Blueprint, request 
from flask_restful import Resource, Api
from uuid import uuid4

from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='../../html/', static_url_path='')
app.config['SERVER_NAME'] = 'collazyer.ru'
app.jinja_env.auto_reload = True
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')

app.config['MAIL_SERVER']='smtp.yandex.ru'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'no-reply@collazyer.ru'
app.config['MAIL_PASSWORD'] = 'itcnmitcnmitcnm'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://collazyer:collazyer12345@localhost:3600/collazyer'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)
from collazyer_backend.models.user import User
mail = Mail(app)

from collazyer_backend.views.ident import views_bp
app.register_blueprint(views_bp)

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
