from flask import Blueprint, render_template, redirect, request, session, url_for
from flask_mail import Message
from collazyer_backend import db, mail
from collazyer_backend.models.user import User
from uuid import uuid4
views_bp = Blueprint('views_bp', __name__, template_folder='../../../src/')


@views_bp.route("/", methods=["GET", "POST"])
def index_page():
    if request.method == "POST":
        email = request.form.get("email")
        if email:
            user = User.query.filter_by(email=email).first()
            if user:
                return "Пользователь с таким email уже существует"
            else:
                user = User()
            user.email = email
            user.secret_string = uuid4().hex
            db.session.add(user)
            db.session.commit()
            print("Sending email to", email)
            msg = Message("Collazyer: Регистрация",
                          sender="no-reply@collazyer.ru",
                          recipients=[email])
            msg.html = "Ваш адрес кем-то был зарегестрирован на collazyer.ru\n Если это были вы используйте <a href='http://collazyer.ru/activate/"+user.secret_string+"'>ссылку</a> для активации аккаунта."
            mail.send(msg)
    return render_template('index.pug')


@views_bp.route("/", subdomain="<subdomain>")
def know_subdomain(subdomain):
    return render_template('domains.pug')


@views_bp.route("/activate/<secret_string>")
def register(secret_string):
    user = User.query.filter_by(secret_string=secret_string).first()
    if user:
        session['user_id'] = user.id
        return redirect(url_for('views_bp.profile'))
    else:
        return "Ссылка устарела"


@views_bp.route("/profile")
def profile():
    user_id = session.get("user_id")
    if user_id:
        user = User.query.get(user_id)
        if user:
            return "Вход выполнен"
    else:
        return redirect(url_for('views_bp.index_page'))


@views_bp.route("/news", subdomain="<subdomain>")
def news_block(subdomain):
    return "News "+subdomain


@views_bp.route("/e20b57fff2e5.html")
def ya():
    return "ac557c44b0e1"

# dns.fastdns24.com.
# dns2.fastdns24.org.
