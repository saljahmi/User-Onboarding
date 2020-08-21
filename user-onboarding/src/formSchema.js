// Here goes the schema for the form
import * as yup from 'yup'

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Must be a valid email address')
    .required('Must include email address'),
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .required('Name is Required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is Required'),
  tos: yup
    .boolean()
    .oneOf([true])
    .required('You must agree to the terms of service')
})

export default formSchema