import React, {useContext, useEffect, useState} from 'react'
import {FaUserEdit, FaUserMinus} from 'react-icons/fa'
import './admin-store-managers-table-styles.scss'
import {AppContext} from '../../Context/app-context'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'
import {proxy} from '../../conf'

const ManageStoreManagerTable = () => {
  const appContext = useContext(AppContext)
  const [storeManagers, setStoreManagers] = useState([])
  const [toastShow, setToastShow] = useState(false)
  const [show, setShow] = useState(false)
  const [deleteId, setDeleteId] = useState('1')

  const handleClose = () => setShow(false)

  const handleDelete = () => {
    DeleteStoreManager(deleteId).then(() => setShow(false))
  }

  const handleShow = (id) => {
    setShow(true)
    setDeleteId(id)
  }

  const getStoreManagers = async () => {
    try {
      const response = await fetch(`${proxy}/admin/storemanager`)
      const responseData = await response.json()
      setStoreManagers(responseData)
      appContext.addStoreManagers(responseData)
      appContext.editCategoryFalse()
      appContext.editExistingCategoryFalse()
    } catch (errors) {
      console.log(errors)
    }
  }

  useEffect(() => {
    getStoreManagers().then(() => {
    })
  }, [storeManagers])

  const EditStoreManager = (id) => {
    appContext.editExistingStoreManagerFalse()
    appContext.storeManagerEdit()
    appContext.setEditStoreManagerId(id)
    axios.get(`${proxy}/admin/storemanager/` + id)
      .then(response => {
        appContext.editingStoreManager(response.data)
        appContext.addStoreManagers(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const DeleteStoreManager = async (id) => {
    try {
      const response = await fetch(`${proxy}/admin/storemanager/` + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
    } catch (errors) {
      console.log(errors)
    }
    appContext.editExistingStoreManagerFalse()
    appContext.editStoreManagerFalse()
    setToastShow(true)
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} deleteId={deleteId}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Store Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this store manager?</Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <table className='table' style={{border: 'solid darkblue 1px'}}>
        <thead style={{backgroundColor: '#0350a2'}}>
        <th style={{borderBottom: 'solid darkblue 1px'}}>First Name</th>
        <th style={{borderBottom: 'solid darkblue 1px'}}>Last Name</th>
        <th style={{borderBottom: 'solid darkblue 1px'}}>Email</th>
        <th style={{borderBottom: 'solid darkblue 1px'}}>Phone Number</th>
        <th style={{borderBottom: 'solid darkblue 1px'}}/>
        <th style={{borderBottom: 'solid darkblue 1px'}}/>
        </thead>
        <tbody>
        {storeManagers.map((storeManager) => {
          return (
            <tr key={storeManager._id}>
              <td>{storeManager.firstName}</td>
              <td>{storeManager.lastName}</td>
              <td>{storeManager.email}</td>
              <td>{storeManager.teleNo}</td>
              <td>
                <button onClick={() => EditStoreManager(storeManager._id)} style={{color: 'darkgreen'}}>
                  <FaUserEdit size={25}/>
                </button>
              </td>
              <td>
                <button onClick={() => handleShow(storeManager._id)} style={{color: 'indianred'}}>
                  <FaUserMinus size={25}/>
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
      <div style={{
        position: 'fixed',
        bottom: '180px',
        right: '10px'
      }}>
        <Toast
          onClose={() => setToastShow(false)}
          show={toastShow}
          delay={3000}
          autohide={true}
        >
          <Toast.Header>
            <strong>Store Manager Deleted!</strong>
            <small style={{marginLeft: '10px'}}>Few seconds ago</small>
          </Toast.Header>
          <Toast.Body>Store manager deleted successfully.</Toast.Body>
        </Toast>
      </div>
    </div>
  )
}

export default ManageStoreManagerTable
