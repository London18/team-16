from flask import Flask, render_template, request

import pymongo

from pymongo import MongoClient
application = Flask(__name__)

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

    if len(registerEmail) and len(registerPassword) and len(registerConfirmPassword) and registerPassword == registerConfirmPassword:
        posts = db.passwords
        post_id = posts.insert_one({"email":registerEmail,"pword":registerPassword})
        return render_template('index.html')


    if len(emailLogin) and len(emailPassword):

        document = db.passwords.find_one({ "email": emailLogin })
        print(document)


        if (document):

            if document['pword'] == emailPassword:
                print("arg")
                return render_template('index.html')

        return render_template('index.html')




    if len(emailLogin) or len(emailPassword):
        return render_template('index.html', userEmail=str(emailLogin))
    return render_template('index.html')

@application.route('/demographics')
def demographics():
    return render_template('demographics.html')

@application.route('/game')
def game():
    return render_template('game.html')

@application.route('/dashboard')
def dashboardPage():
    return render_template('dashboard.html')

if __name__ == "__main__":
    application.run()
