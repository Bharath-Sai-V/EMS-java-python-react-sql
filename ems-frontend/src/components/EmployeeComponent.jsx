import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createEmployee, getEmployee, updateEmployee } from '../services/Employeeservice'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')

    const {id} = useParams();
    const [errors, setErrors] = useState({
        firstName:'',
        lastName:'',
        emailId:''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmailId(response.data.emailId);
            }).catch(error => {
                console.error(error)
            })
        }
    }, [id])

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){

            const employee = {firstName, lastName, emailId}
            console.log(employee)

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.error(error)
                })
            } else{
                createEmployee(employee).then((response) => {
                    console.log(response.data)
                    navigator('/employees')
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if(emailId.trim()){
            errorsCopy.emailId = '';
        } else {
            errorsCopy.emailId = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'><br />Update Employee</h2>
        } else{
            return <h2 className='text-center'><br />Add Employee</h2>
        }
    }

  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name</label>
                            <input 
                                type='text' 
                                placeholder='Enter Employee First Name' 
                                name='firstName' 
                                value={firstName} 
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                onChange={(e) => setFirstName(e.target.value)}
                            >
                            </input>
                            { errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div> }
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name</label>
                            <input 
                                type='text' 
                                placeholder='Enter Employee Last Name' 
                                name='lastName' 
                                value={lastName} 
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} 
                                onChange={(e) => setLastName(e.target.value)}
                            >
                            </input>
                            { errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div> }
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email</label>
                            <input 
                                type='text' 
                                placeholder='Enter Employee Email' 
                                name='emailId' 
                                value={emailId}
                                className={`form-control ${errors.emailId ? 'is-invalid' : ''}`} 
                                onChange={(e) => setEmailId(e.target.value)}
                            >
                            </input>
                            { errors.emailId && <div className='invalid-feedback'> {errors.emailId} </div> }
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button> <br /><br /><br />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent