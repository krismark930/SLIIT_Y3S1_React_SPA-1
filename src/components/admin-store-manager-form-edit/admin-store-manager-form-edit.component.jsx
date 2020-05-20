import React, {useContext, useEffect, useState} from 'react'
import {Formik} from 'formik'
import {Button, Col, Form, Spinner} from 'react-bootstrap'
import * as yup from 'yup'
import {FaUserEdit} from 'react-icons/fa'
import {AppContext} from '../../Context/app-context'
import './admin-store-manager-form-edit-styles.scss'
import axios from 'axios'

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters long.'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters long.'),
  email: yup
    .string()
    .email('Please enter a valid email address.'),
  teleNo: yup
    .string()
    .matches(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g,
      'Please enter a valid phone number.'
    )
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
    email: ''
  })

  let userId

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
  }, [setDetails])

  const onSubmitHand = async (values, {setSubmitting}) => {
    setLoading(true)
    setStoreManagerData(values)
    store_manager = {...values}
    try {
      if (values.isSave)
        appContext.addStoreManagers(store_manager)
      userId = appContext.editStoreManagerId
      appContext.storeManagerEdit();
      const response = await fetch('http://localhost:5000/admin/storemanager/' + userId, {
        method: 'PUT',
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
                <Form.Group as={Col} md='12'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    placeholder='First Name'
                    type='text'
                    name='firstName'
                    value={appContext.storeManagers[0].firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.firstName && errors.firstName}
                    isValid={touched.firstName && !errors.firstName}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md='12'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    placeholder='Last Name'
                    type='text'
                    name='lastName'
                    value={appContext.storeManagers[0].lastName}
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
                <Form.Group as={Col} md='12'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    name='email'
                    value={appContext.storeManagers[0].email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md='12'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    placeholder='Phone Number'
                    type='text'
                    name='teleNo'
                    value={appContext.storeManagers[0].teleNo}
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
              {loading && (
                <Spinner
                  animation='border'
                  style={{textAlign: 'center', marginLeft: '48%'}}
                />
              )}
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
