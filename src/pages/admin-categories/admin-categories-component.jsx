import AddCategoryForm from '../../components/admin-category-form/admin-category-form.component'
import EditCategoryForm from '../../components/admin-category-form-edit/admin-category-form-edit.component'
import CategoryTable from '../../components/admin-categories-table/admin-categories-table.component'
import './admin-categories-styles.scss'
import React, {useContext} from 'react'
import {Col, Row} from 'react-bootstrap'
import {AppContext} from '../../Context/app-context'

const ManageCategory = props => {
  let route
  const app = useContext(AppContext)

  if (app.editCategory)
    route = (<EditCategoryForm/>)
  else
    route = (<AddCategoryForm/>)

  return (
    <div className='categoryMain container' style={{maxWidth: '1300px'}}>
      <h1>Manage Product Categories</h1>
      <Row style={{maxWidth: '1300px'}}>
        <Col sm='4'>
          <div className='categoryForm'>
            {route}
          </div>
        </Col>
        <Col sm='8'>
          <div className='categoryTable'>
            <CategoryTable/>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ManageCategory
