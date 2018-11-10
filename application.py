from flask import Flask, render_template, request, redirect

import pymongo

from pymongo import MongoClient
application = Flask(__name__)

ids = ""

@application.route('/')
@application.route('/index')
def firstPage():
    return render_template('index.html', userEmail="")
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


    if len(registerEmail) and registerPassword == registerConfirmPassword:

        posts = db.passwords
        post_id = posts.insert_one({"email":registerEmail,"pword":registerPassword})
        return render_template('index.html')


    if len(emailLogin) and len(emailPassword):

        document = db.passwords.find_one({ "email": emailLogin })

        if (document):
            if document['pword'] == emailPassword:
                ids = document['_id']

                return redirect('/demographics')

        return render_template('index.html')

    if len(emailLogin) or len(emailPassword):
        return render_template('index.html', userEmail=str(emailLogin))

    return render_template('index.html')

@application.route('/demographics')
def demographics():
    return render_template('demographics.html')
@application.route('/demographics', methods=['POST', 'GET'])
def demographics_post():


    client = MongoClient()
    db = client.passworddb

    demAge = str(request.form['demographicsAge'])
    demGen = str(request.form['sel1'])
    demDiag = str(request.form['sel2'])
    typeOfOrg = str(request.form['typeOfOrg'])
    sizeOfOrg = str(request.form['sizeOfOrg'])
    NoP = str(request.form['NoP'])
    monthinorg = str(request.form['monthinorg'])
    annsal = str(request.form['annsal'])
    levelofEd = str(request.form['levelofEd'])
    NumPj = str(request.form['NumPj'])
    numPep = str(request.form['numPep'])
    Promo = str(request.form['Promo'])
    curJob = str(request.form['curJob'])




    print(demGen,"hello")

    posts = db.answers
    post_id = posts.insert_one({"id":ids,"demAge":demAge,"demGender":demGen, "Diagnosis":demDiag, "typeOfOrg":typeOfOrg,"sizeOfOrg": sizeOfOrg, "NumberOfPeople":NoP, "MonthInOrg":monthinorg,"annualSal":annsal, "level of education":levelofEd, "NumPastJobs":NumPj, "NumPersonPeople":numPep, "Promoted?":Promo, "current job?": curJob})

    return render_template('demographics.html')



@application.route('/game')
def game():

    client = MongoClient()
    db = client.passworddb
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
