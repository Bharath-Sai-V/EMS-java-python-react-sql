from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:06J21a05b3@localhost/emspy'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

ma = Marshmallow(app)

class Employee(db.Model):
    __tablename__ = "employee"
    id = db.Column(db.Integer,primary_key=True)
    firstName = db.Column(db.String(100))
    lastName = db.Column(db.String(100))
    emailId = db.Column(db.String(100))
 
    def __init__(self,firstName,lastName,emailId):
        self.firstName=firstName
        self.lastName=lastName
        self.emailId=emailId

class EmployeeSchema(ma.Schema):
    class Meta:
        fields = ('id','firstName','lastName','emailId')

employee_schema = EmployeeSchema()
employees_schema = EmployeeSchema(many=True)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/employees',methods=['GET'])
def getEmployees():
    all_employees = Employee.query.all()
    results = employees_schema.dump(all_employees)
    return jsonify(results)

@app.route('/employees/<id>',methods=['GET'])
def getEmployeeDetails(id):
    employee = Employee.query.get(id)
    return employee_schema.jsonify(employee)

@app.route('/employees/<id>',methods=['PUT'])
def updateEmployee(id):
    employee = Employee.query.get(id)

    firstName = request.json['firstName']
    lastName = request.json['lastName']
    emailId = request.json['emailId']

    employee.firstName = firstName
    employee.lastName = lastName
    employee.emailId = emailId

    db.session.commit()
    return employee_schema.jsonify(employee)

@app.route('/employees/<id>',methods=['DELETE'])
def deleteEmployee(id):
    employee = Employee.query.get(id)
    db.session.delete(employee)
    db.session.commit()
    return employee_schema.jsonify(employee)

@app.route('/employees',methods=['POST'])
def addEmployee():
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    emailId = request.json['emailId']

    employee = Employee(firstName,lastName,emailId)
    db.session.add(employee)
    db.session.commit()
    return employee_schema.jsonify(employee)