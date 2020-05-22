import React, {useContext, useState} from 'react'
import {Formik} from 'formik'
import {Button, Col, Form, Spinner} from 'react-bootstrap'
import * as yup from 'yup'
import {FaArrowAltCircleLeft, FaBrush, FaEdit} from 'react-icons/fa'
import {AppContext} from '../../Context/app-context'
import './admin-category-form-edit-styles.scss'

const schema = yup.object().shape({
  categoryTitle: yup
    .string()
    .min(2, 'Category title must be at least 2 characters long.'),
  categoryDescription: yup
    .string()
    .min(2, 'Category description must be at least 2 characters long.')
})

let errors_ = ''
let category

const EditCategoryForm = () => {
  const appContext = useContext(AppContext)
  const [loading, setLoading] = useState(false)

  let categoryId

  const onSubmitHandle = async (values) => {
    setLoading(true)
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
      await response.json();
      setLoading(false)
      appContext.editCategoryFalse()
    } catch (errors_) {
      setLoading(false)
    }
  }

  const goBack = async () => {
    appContext.editCategoryFalse()
  }

  return (
    <React.Fragment>
      <div>
        <Formik
          validationSchema={schema}
          onSubmit={onSubmitHandle}
          initialValues={appContext.categories[0]}
        >
          {({
              handleSubmit,
              handleReset,
              isSubmitting,
              handleChange,
              handleBlur,
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
              {loading && (
                <Spinner
                  animation='border'
                  style={{textAlign: 'center', marginLeft: '48%'}}
                />
              )}
              <Form.Row>
                <Form.Group as={Col} md='4'>
                  <Button
                    type='button'
                    onClick={goBack}
                    disabled={isSubmitting}
                    style={{
                      marginTop: '15%',
                      marginLeft: '10%',
                      marginRight: 'auto',
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
                <Form.Group as={Col} md='4'>
                  <Button
                    type='button'
                    onClick={handleReset}
                    disabled={isSubmitting}
                    style={{
                      marginTop: '15%',
                      marginLeft: '13%',
                      marginRight: 'auto',
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
                <Form.Group as={Col} md='4'>
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    style={{
                      marginTop: '15%',
                      marginLeft: '17%',
                      marginRight: 'auto',
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
                </Form.Group>
              </Form.Row>
              {errors_ && <div id='serverErrors'>{errors_}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  )
}

export default EditCategoryForm
