import AddStoreManagerForm from '../../components/admin-store-manager-form/admin-store-manager-form.component'
import EditManagerForm from '../../components/admin-store-manager-form-edit/admin-store-manager-form-edit.component'
import StoreManagerTable from '../../components/admin-store-managers-table/admin-store-managers-table.component'
import './admin-store-managers-styles.scss'
import React, {useContext} from 'react'
import {Col, Row} from 'react-bootstrap'
import {AppContext} from '../../Context/app-context'

const ManageStoreManager = () => {
  let route
  const app = useContext(AppContext)

  if (app.editStoreManager)
    route = (<EditManagerForm/>)
  else
    route = (<AddStoreManagerForm/>)

  return (
    <div className='storeManagerMain container' style={{maxWidth: '1300px'}}>
      <h1>Manage Store Managers</h1>
      <Row style={{maxWidth: '1300px'}}>
        <Col sm='4'>
          <div className='storeManagerForm'>
            {route}
          </div>
        </Col>
        <Col sm='8'>
          <div className='storeManagerTable'>
            <StoreManagerTable/>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ManageStoreManager