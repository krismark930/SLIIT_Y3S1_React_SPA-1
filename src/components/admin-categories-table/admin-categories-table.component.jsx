import React, {useContext, useEffect, useState} from 'react'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import './admin-categories-table-styles.scss'
import {AppContext} from '../../Context/app-context'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'

const ManageCategoryTable = () => {
  const appContext = useContext(AppContext)
  const [categories, setCategories] = useState([])
  const [toastShow, setToastShow] = useState(false)
  const [show, setShow] = useState(false)
  const [deleteId, setDeleteId] = useState('1')

  const handleClose = () => setShow(false)

  const handleDelete = () => {
    DeleteCategory(deleteId).then(() => setShow(false))
  }

  const handleShow = (id) => {
    setShow(true)
    setDeleteId(id)
  }

  const getCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/category')
      const responseData = await response.json()
      setCategories(responseData)
      appContext.addCategories(responseData)
      appContext.editStoreManagerFalse()
      appContext.editExistingStoreManagerFalse()
    } catch (errors) {
      console.log(errors)
    }
  }

  useEffect(() => {
    getCategories().then(() => {
    })
  }, [categories])

  const EditCategory = (id) => {
    appContext.categoryEdit()
    appContext.setEditCategoryId(id)
    axios.get('http://localhost:5000/admin/category/' + id)
      .then(response => {
        appContext.editingCategory(response.data)
        appContext.addCategories(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const DeleteCategory = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/admin/category/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
    } catch (errors) {
      console.log(errors)
    }
    setToastShow(true)
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} deleteId={deleteId}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
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
        <th style={{borderBottom: 'solid darkblue 1px'}}>Title</th>
        <th style={{borderBottom: 'solid darkblue 1px'}}>Description</th>
        <th style={{borderBottom: 'solid darkblue 1px'}}/>
        <th style={{borderBottom: 'solid darkblue 1px'}}/>
        </thead>
        <tbody>
        {categories.map((category) => {
          return (
            <tr key={category._id}>
              <td>{category.categoryTitle}</td>
              <td>{category.categoryDescription}</td>
              <td>
                <button onClick={() => EditCategory(category._id)} style={{color: 'darkgreen'}}>
                  <FaEdit size={25}/>
                </button>
              </td>
              <td>
                <button onClick={() => handleShow(category._id)} style={{color: 'indianred'}}>
                  <FaTrashAlt size={25}/>
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
            <strong>Product Category Deleted!</strong>
            <small style={{marginLeft: '10px'}}>Few seconds ago</small>
          </Toast.Header>
          <Toast.Body>Product category deleted successfully.</Toast.Body>
        </Toast>
      </div>
    </div>
  )
}

export default ManageCategoryTable
