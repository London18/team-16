from flask import Flask, render_template, request
application = Flask(__name__)

@application.route('/')
@application.route('/index')
def firstPage():
    return render_template('index.html', userEmail="NOTHING")

@application.route('/', methods=['POST'])
@application.route('/index', methods=['POST'])
def my_form_post():
    emailLogin = str(request.form['loginEmail'])
    emailPassword = str(request.form['loginPassword'])

    registerEmail = request.form['registerEmail']
    registerPassword = request.form['registerPassword']
    registerConfirmPassword = request.form['registerConfirmPassword']

    if len(emailLogin) or len(emailPassword):
        return render_template('index.html', userEmail=str(emailLogin))
    return render_template('index.html')

@application.route('/tmp')
def tmpPage():
    return render_template('tmp.html')

@application.route('/game')
def game():
    return render_template('game.html')

@application.route('/dashboard')
def dashboardPage():
    return render_template('dashboard.html')

if __name__ == "__main__":
    application.run()
