import React, {useContext, useEffect, useState} from 'react'
import {Formik} from 'formik'
import {Button, Col, Form} from 'react-bootstrap'
import * as yup from 'yup'
import {FaUserEdit} from 'react-icons/fa'
import {AppContext} from '../../Context/app-context'
import './admin-store-manager-form-edit-styles.scss'
import axios from 'axios'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters long.')
    .required('Please enter the first name.'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters long.')
    .required('Please enter the last name.'),
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Please enter the email.'),
  teleNo: yup
    .string()
    .matches(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g,
      'Please enter a valid phone number.'
    )
    .required('Please enter the phone number.')
})

let errors_ = ''
let store_manager

const EditStoreManagerForm = props => {
  const appContext = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [storeManagerData, setStoreManagerData] = useState({
    firstName: '',
    lastName: '',
    teleNo: '',
    passwordConfirm: '',
    email: '',
    password: '',
    passwordResetQuestion: '',
    answer: ''
  })

  let userId
  console.log(appContext.storeManagers[0])

  const setDetails = (data) => {
    store_manager = data
  }

  useEffect(() => {
    axios.get('http://localhost:5000/admin/storemanager/' + userId)
      .then(response => {
        setStoreManagerData(response.data)
        setDetails(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [setDetails, userId])

  const onSubmitHand = async (values, {setSubmitting}) => {
    setLoading(true)
    setStoreManagerData(values)
    store_manager = {...values}
    try {
      if (values.isSave) {
        appContext.addStoreManagers(store_manager)
      }
      userId = appContext.editStoreManagerId
      const response = await fetch('http://localhost:5000/admin/storemanager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(store_manager)
      })
      const responseData = await response.json()
      setLoading(false)
    } catch (errors_) {
      setLoading(false)
      setError(errors_.message || 'Something went wrong, try again later.')
    }
  }

  return (
    <React.Fragment>
      <div>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHand}
          initialValues={appContext.storeManagers[0]}
        >
          {({
              handleSubmit,
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} md='12' controlId='validationFormik01'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    placeholder='First Name'
                    type='text'
                    name='firstName'
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.firstName && errors.firstName}
                    isValid={touched.firstName && !errors.firstName}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='12' controlId='validationFormik02'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    placeholder='Last Name'
                    type='text'
                    name='lastName'
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.lastName && errors.lastName}
                    isValid={touched.lastName && !errors.lastName}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md='12' controlId='validationFormik04'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md='12' controlId='validationFormik03'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    placeholder='Phone Number'
                    type='text'
                    name='teleNo'
                    value={values.teleNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.teleNo && errors.teleNo}
                    isValid={touched.teleNo && !errors.teleNo}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.teleNo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button
                type='submit'
                disabled={isSubmitting}
                style={{
                  marginTop: '3%',
                  marginLeft: '40%',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  paddingTop: '10px',
                  paddingBottom: '10px'
                }}
              >
                <FaUserEdit
                  style={{
                    marginRight: '9px',
                    marginBottom: '6px'
                  }}
                />
                Edit
              </Button>
              {errors_ && <div id='serverErrors'>{errors_}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  )
}

export default EditStoreManagerForm
