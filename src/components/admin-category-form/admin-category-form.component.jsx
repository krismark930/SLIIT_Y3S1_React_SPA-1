import React, {useContext, useState} from 'react'
import {Formik} from 'formik'
import {Button, Col, Form, Spinner} from 'react-bootstrap'
import * as yup from 'yup'
import {FaBrush, FaPlusCircle} from 'react-icons/fa'
import {AppContext} from '../../Context/app-context'
import './admin-category-form-styles.scss'
import {proxy} from '../../conf'

const schema = yup.object().shape({
  categoryTitle: yup
    .string()
    .min(2, 'Category title must be at least 2 characters long.')
    .required('Please enter the category title.'),
  categoryDescription: yup
    .string()
    .min(2, 'Category description must be at least 2 characters long.')
    .required('Please enter the category description.')
})

let errors_ = ''

const AddCategoryForm = () => {
  const appContext = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState({
    categoryTitle: '',
    categoryDescription: ''
  })
  const resetValues = {
    categoryTitle: '',
    categoryDescription: ''
  }

  const onSubmitHandle = async (values, {resetForm}) => {
    setLoading(true)
    setCategoryData(values)
    try {
      const response = await fetch(`${proxy}category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      const responseData = await response.json()
      appContext.editExistingCategoryFalse()
      if (responseData.exists) {
        appContext.existingCategoryEdit()
        errors_ = responseData.message
      }
      try {
        resetForm({
          values: resetValues
        })
      } catch (error) {
        console.log(error)
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
          initialValues={categoryData}
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
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    placeholder='Title'
                    type='text'
                    name='categoryTitle'
                    value={values.categoryTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.categoryTitle && errors.categoryTitle}
                    isValid={touched.categoryTitle && !errors.categoryTitle}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.categoryTitle}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md='12'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    placeholder='Description'
                    type='text'
                    name='categoryDescription'
                    value={values.categoryDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.categoryDescription && errors.categoryDescription}
                    isValid={touched.categoryDescription && !errors.categoryDescription}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.categoryDescription}
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
                    <FaPlusCircle
                      style={{
                        marginRight: '9px',
                        marginBottom: '6px'
                      }}
                    />
                    Add
                  </Button>
                </Form.Group>
              </Form.Row>
              {appContext.existingCategory && errors_ && <div id='serverErrors'>{errors_}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  )
}

export default AddCategoryForm
