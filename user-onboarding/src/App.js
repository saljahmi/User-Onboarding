import React, { useState, useEffect } from 'react'
import User from './User'
import Form from './Form'
// 🔥 STEP 1- CHECK THE ENDPOINTS USING POSTMAN OR HTTPIE
// 🔥 STEP 2- FLESH OUT UsersForm.js
// 🔥 STEP 3- FLESH THE SCHEMA IN ITS OWN FILE
// 🔥 STEP 4- IMPORT THE SCHEMA, AXIOS AND YUP
import formSchema from './formSchema'
import axios from 'axios'
import * as yup from 'yup'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  // ///// DROPDOWN /////
  // role: '',
  // ///// RADIO BUTTONS /////
  // civil: '',
  ///// CHECKBOXES /////
  // hobbies: {
  //   hiking: false,
  //   reading: false,
  //   coding: false,
  // },
  tos: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  tos: '',
}
const initialUsers = []
const initialDisabled = true


export default function App() {
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  const [users, setUsers] = useState(initialUsers)          // array of Users objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  //////////////// NETWORKING HELPERS ////////////////
  //////////////// NETWORKING HELPERS ////////////////
  //////////////// NETWORKING HELPERS ////////////////
  const getUsers = () => {
    // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT users IN STATE
    //    helper to [GET] all users from `https://reqres.in/api/users`
    axios.get('https://reqres.in/api/users')
      .then(res => {
        console.log(res)
        setUsers(res.data.data)
      })
      .catch(err => {
        debugger
      })
  }

  const postNewUser = newUser => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED Users TO STATE
    //    helper to [POST] `newUsers` to `https://reqres.in/api/users`
    //    and regardless of success or failure, the form should reset
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        // setUsers(users.concat(res.data))
        setUsers([...users, res.data])
        // console.log( res.data)
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  //////////////// FORM ACTIONS ////////////////
  //////////////// FORM ACTIONS ////////////////
  //////////////// FORM ACTIONS ////////////////
  const inputChange = (name, value) => {
    // 🔥 STEP 11- RUN VALIDATION WITH YUP
    yup
      .reach(formSchema, name)
      //we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const checkboxChange = (name, isChecked) => {
    // 🔥 STEP 7- IMPLEMENT!
    //  set a new state for the whole form
    setFormValues({
      ...formValues,
      [name]: isChecked,
    })
  }

  const submit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      tos: formValues.tos,
    }
    // 🔥 STEP 9- POST NEW Users USING HELPER
    postNewUser(newUser)
  }

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    // 🔥 STEP 10- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      })
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>User Onboarding</h1></header>

      <Form
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}