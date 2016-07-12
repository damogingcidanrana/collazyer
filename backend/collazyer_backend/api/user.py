from flask import request
from flask_restful import Resource
from collazyer_backend.models.user import User
from hashlib import md5
from uuid import uuid4
import json
import os


class UserApi(Resource):
    def patch(self):
        data = request.get_json()
        return {}
