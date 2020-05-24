import React, {useContext, useState} from 'react'
import {Formik} from 'formik'
import {Button, Col, Form, Spinner} from 'react-bootstrap'
import * as yup from 'yup'
import {FaArrowAltCircleLeft, FaUserEdit} from 'react-icons/fa'
import {AppContext} from '../../Context/app-context'
import './admin-store-manager-form-edit-styles.scss'
import {proxy} from '../../conf'

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
    .max(10, 'Please enter a valid phone number with only 10 digits.')
    .min(10, 'Please enter a valid phone number with 10 digits.')
})

let errors_ = ''

const EditStoreManagerForm = () => {
  const appContext = useContext(AppContext)
  const [loading, setLoading] = useState(false)

  let userId

  const onSubmitHandle = async (values) => {
    setLoading(true)

    let new_store_manager

    if (values.firstName === undefined)
      new_store_manager = {firstName: appContext.editingStoreManagerObject.firstName}
    else
      new_store_manager = {firstName: values.firstName}

    if (values.lastName === undefined)
      new_store_manager = {...new_store_manager, lastName: appContext.editingStoreManagerObject.lastName}
    else
      new_store_manager = {...new_store_manager, lastName: values.lastName}

    if (values.email === undefined)
      new_store_manager = {...new_store_manager, email: appContext.editingStoreManagerObject.email}
    else
      new_store_manager = {...new_store_manager, email: values.email}

    if (values.teleNo === undefined)
      new_store_manager = {...new_store_manager, teleNo: appContext.editingStoreManagerObject.teleNo}
    else
      new_store_manager = {...new_store_manager, teleNo: values.teleNo}

    try {
      userId = appContext.editStoreManagerId
      appContext.storeManagerEdit()
      const response = await fetch(`${proxy}/admin/storemanager/` + userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_store_manager)
      })
      const responseData = await response.json()
      appContext.editExistingStoreManagerFalse()
      if (responseData.exists) {
        appContext.existingStoreManagerEdit()
        errors_ = responseData.message
        appContext.editStoreManagerFalse()
        appContext.storeManagerEdit()
      } else {
        appContext.editStoreManagerFalse()
      }
      setLoading(false)
    } catch (errors_) {
      setLoading(false)
    }
  }

  const goBack = async () => {
    appContext.editStoreManagerFalse()
  }

  return (
    <React.Fragment>
      <div>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHandle}
          initialValues={appContext.storeManagers[0]}
        >
          {({
              handleSubmit,
              isSubmitting,
              handleChange,
              handleBlur,
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
              <Form.Row>
                <Form.Group as={Col} md='6'>
                  <Button
                    type='button'
                    onClick={goBack}
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
                    <FaArrowAltCircleLeft
                      style={{
                        marginRight: '9px',
                        marginBottom: '6px'
                      }}
                    />
                    Back
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
                    <FaUserEdit
                      style={{
                        marginRight: '9px',
                        marginBottom: '6px'
                      }}
                    />
                    Edit
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

export default EditStoreManagerForm
