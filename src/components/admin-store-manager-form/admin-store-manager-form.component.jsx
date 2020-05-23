import React, {useContext, useState} from 'react'
import {Formik} from 'formik'
import {Button, Col, Form, Spinner} from 'react-bootstrap'
import * as yup from 'yup'
import {FaBrush, FaUserPlus} from 'react-icons/fa'
import {AppContext} from '../../Context/app-context'
import './admin-store-manager-form-styles.scss'

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
    .max(10, 'Please enter a valid phone number with only 10 digits.')
    .min(10, 'Please enter a valid phone number with 10 digits.')
})

let errors_ = ''

const AddStoreManagerForm = () => {
  const appContext = useContext(AppContext);
  const [loading, setLoading] = useState(false)
  const [storeManagerData, setStoreManagerData] = useState({
    firstName: '',
    lastName: '',
    teleNo: '',
    email: ''
  })
  const resetValues = {
    firstName: '',
    lastName: '',
    teleNo: '',
    email: ''
  }

  const onSubmitHandle = async (values, {resetForm}) => {
    setLoading(true)
    setStoreManagerData(values)
    try {
      const response = await fetch('http://localhost:5000/admin/storemanager', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const responseData = await response.json()
      appContext.editExistingStoreManagerFalse()
      if (responseData.exists) {
        appContext.existingStoreManagerEdit()
        errors_ = responseData.message
      } else {
        try {
          resetForm({
            values: resetValues
          })
        } catch (error) {
          console.log(error)
        }
      }
      setLoading(false)
    } catch (errors_) {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <div>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHandle}
          initialValues={storeManagerData}
        >
          {({
              handleSubmit,
              handleReset,
              isSubmitting,
              handleChange,
              handleBlur,
              values,
              touched,
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
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md='12'>
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
                <Form.Group as={Col} md='12'>
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
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md='12'>
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
              {loading && (
                <Spinner
                  animation='border'
                  style={{textAlign: 'center', marginLeft: '48%'}}
                />
              )}
              <Form.Row>
                <Form.Group as={Col} md='6'>
                  <Button
                    type='button'
                    onClick={handleReset}
                    disabled={isSubmitting}
                    style={{
                      marginTop: '10%',
                      marginLeft: '30%',
                      paddingLeft: '15px',
                      paddingRight: '15px',
                      paddingTop: '10px',
                      paddingBottom: '10px'
                    }}
                  >
                    <FaBrush
                      style={{
                        marginRight: '9px',
                        marginBottom: '6px'
                      }}
                    />
                    Reset
                  </Button>
                </Form.Group>
                <Form.Group as={Col} md='6'>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    style={{
                      marginTop: '10%',
                      marginLeft: '20%',
                      paddingLeft: '15px',
                      paddingRight: '15px',
                      paddingTop: '10px',
                      paddingBottom: '10px'
                    }}
                  >
                    <FaUserPlus
                      style={{
                        marginRight: '9px',
                        marginBottom: '6px'
                      }}
                    />
                    Add
                  </Button>
                </Form.Group>
              </Form.Row>
              {appContext.existingStoreManager && errors_ && <div id='serverErrors'>{errors_}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  )
}

export default AddStoreManagerForm
