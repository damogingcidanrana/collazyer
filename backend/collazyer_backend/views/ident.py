from flask import Blueprint, render_template, abort, send_from_directory, make_response, request, redirect, url_for
from jinja2 import TemplateNotFound

from flask_mail import Message
from collazyer_backend import mail

views_bp = Blueprint('views_bp', __name__, template_folder='../../../src/')
@views_bp.route("/", methods=["GET", "POST"])
def index_page():
  if request.method == "POST":
    email = request.form.get("email")
    if email:
      print("Sending email to", email)
      msg = Message("Hello! It's test.",
              sender="no-reply@collazyer.ru",
              recipients=[email])
      msg.body = "Message text"
      mail.send(msg)
  return render_template('index.pug')
@views_bp.route("/", subdomain="<subdomain>")
def know_subdomain(subdomain):
  return render_template('domains.pug')
@views_bp.route("/register/<uuid>")
def register(uuid):
  return "Введите логин и пароль типа и можете оформлять страницу"
@views_bp.route("/news", subdomain="<subdomain>")
def news_block(subdomain):
  return "News "+subdomain


@views_bp.route("/e20b57fff2e5.html")
def ya():
  return "ac557c44b0e1"

# dns.fastdns24.com.
# dns2.fastdns24.org.
