from flask import Flask, render_template, request
application = Flask(__name__)

@application.route('/')
@application.route('/index')
def firstPage():
    return render_template('index.html', userEmail="NOTHING")

@application.route('/', methods=['POST'])
@application.route('/index', methods=['POST'])
def my_form_post():
    text = request.form['emailLogin']
    return render_template('index.html', userEmail=str(text))

if __name__ == "__main__":
    application.run()
