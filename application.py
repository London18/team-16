from flask import Flask, render_template, request

import pymongo

from pymongo import MongoClient
application = Flask(__name__)
ids = ""
@application.route('/')
@application.route('/index')
def firstPage():
    return render_template('index.html', userEmail="NOTHING")
@application.route('/', methods=['POST'])
@application.route('/index', methods=['POST'])
def my_form_post():
    client = MongoClient()
    db = client.passworddb
    emailLogin = str(request.form['loginEmail'])
    emailPassword = str(request.form['loginPassword'])

    registerEmail = request.form['registerEmail']
    registerPassword = request.form['registerPassword']
    registerConfirmPassword = request.form['registerConfirmPassword']
    print(registerPassword)
    print(registerConfirmPassword)

    if len(registerEmail) and len(registerPassword) and len(registerConfirmPassword) and registerPassword == registerConfirmPassword:
        print("hello")
        posts = db.passwords
        post_id = posts.insert_one({"email":registerEmail,"pword":registerPassword})
        return render_template('index.html')


    if len(emailLogin) and len(emailPassword):

        document = db.passwords.find_one({ "email": emailLogin })

        if (document):
            if document['pword'] == emailPassword:
                print(document['_id'])
                ids = document['_id']
                return render_template('demographics.html')

        return render_template('index.html')

    if len(emailLogin) or len(emailPassword):
        return render_template('index.html', userEmail=str(emailLogin))

    return render_template('index.html')

@application.route('/demographics')
def demographics():
    return render_template('demographics.html')
@application.route('/demographics', methods=['POST'])
def demographics_post():
    print("HERE")
    client = MongoClient()
    db = client.passworddb

    demAge = str(request.form['demographicsAge'])





    demGen = str(request.form.get('sel1'))

    posts = db.answers
    post_id = posts.insert_one({"demAge":demAge,"demGender":demGen})

    return render_template('demographics.html')



@application.route('/game')
def game():
    return render_template('game.html')

@application.route('/dashboard')
def dashboardPage():
    return render_template('dashboard.html')

@application.route('/Employment_status')
def employment_status():
    return render_template('employment_status.html')

@application.route('/organisational_culture')
def organisational_culture():
    return render_template('organisational_culture.html')

@application.route('/customisation')
def customisation():
    return render_template('customisation.html')

if __name__ == "__main__":
    application.run()
