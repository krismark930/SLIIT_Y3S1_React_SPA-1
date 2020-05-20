import React, {useContext, useEffect, useState} from 'react'
import {Formik} from 'formik'
import {Button, Col, Form, Spinner} from 'react-bootstrap'
import * as yup from 'yup'
import {FaEdit} from 'react-icons/fa'
import {AppContext} from '../../Context/app-context'
import './admin-category-form-edit-styles.scss'
import axios from 'axios'

const schema = yup.object().shape({
  categoryTitle: yup
    .string()
    .min(2, 'Category title must be at least 2 characters long.'),
  categoryDescription: yup
    .string()
    .min(5, 'Category description must be at least 5 characters long.'),
  categoryImage: yup
    .string()
})

let errors_ = ''
let category

const EditCategoryForm = props => {
  const appContext = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [categoryData, setCategoryData] = useState({
    categoryTitle: '',
    categoryDescription: '',
    categoryImage: ''
  })

  let categoryId

  const setDetails = (data) => {
    category = data
  }

  useEffect(() => {
    axios.get('http://localhost:5000/admin/category/' + categoryId)
      .then(response => {
        setCategoryData(response.data)
        setDetails(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [setDetails])

  const onSubmitHand = async (values, {setSubmitting}) => {
    setLoading(true)
    setCategoryData(values)
    category = {...values}
    try {
      if (values.isSave)
        appContext.addCategories(category)
      categoryId = appContext.editCategoryId
      appContext.categoryEdit()
      const response = await fetch('http://localhost:5000/admin/category/' + categoryId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
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
          initialValues={appContext.categories[0]}
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
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    placeholder='Title'
                    type='text'
                    name='categoryTitle'
                    value={appContext.categories[0].categoryTitle}
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
                    value={appContext.categories[0].categoryDescription}
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
              <Form.Row>
                <Form.Group as={Col} md='12'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Image'
                    name='categoryImage'
                    value={appContext.categories[0].categoryImage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.categoryImage && errors.categoryImage}
                    isValid={touched.categoryImage && !errors.categoryImage}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.categoryImage}
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
                <FaEdit
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

export default EditCategoryForm
