from flask import Blueprint
from flask_restful import Api
from collazyer_backend import csrf_protect

mod = Blueprint('api', __name__)
api = Api(mod)

from collazyer_backend.api import user
api.add_resource(user.UserApi, '/user')
