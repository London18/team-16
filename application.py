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

    registerEmail = str(request.form['registerEmail'])
    registerPassword = str(request.form['registerPassword'])
    registerConfirmPassword = str(request.form['registerConfirmPassword'])

    if len(emailLogin) or len(emailPassword):
        return render_template('index.html', userEmail=str(text), userPassword=str(emailPassword))
    return render_template('index.html')

@application.route('/tmp')
def tmpPage():
    return render_template('tmp.html')

if __name__ == "__main__":
    application.run()
