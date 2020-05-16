import React, {useContext, useEffect, useState} from 'react'
import './admin-store-managers-table-styles.scss'
import {AppContext} from '../../Context/app-context'
import axios from 'axios'

const ManageStoreManagerTable = () => {
  const appContext = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [storeManagers, setStoreManagers] = useState([])

  const getStoreManagers = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/storemanager')
      const responseData = await response.json()
      setStoreManagers(responseData)
      appContext.addStoreManagers(responseData)
    } catch (errors) {
      console.log(errors)
    }
  }

  useEffect(() => {
    getStoreManagers()
  }, [getStoreManagers, storeManagers])

  const EditStoreManager = (id) => {
    appContext.storeManagerEdit()
    appContext.setEditStoreManagerId(id)
    axios.get('http://localhost:5000/admin/storemanager/' + id)
      .then(response => {
        appContext.addStoreManagers(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const DeleteStoreManager = async (id) => {
    try {
      const response = await fetch('http://localhost:5000/admin/storemanager/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const responseData = await response.json()
      if (responseData)
        setIsDelete(true)
      setLoading(false)
    } catch (errors) {
      setLoading(false)
      console.log(errors)
    }
  }

  return (
    <div>
      <table className='table'>
        <thead className='thead-dark'>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone no</th>
          <th>Password</th>
          <th>Reset Quest</th>
          <th>Answer</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {storeManagers.map((storeManager) => {
          return (
            <tr key={storeManager._id}>
              <td>{storeManager.firstName}</td>
              <td>{storeManager.lastName}</td>
              <td>{storeManager.email}</td>
              <td>{storeManager.teleNo}</td>
              <td>{storeManager.password}</td>
              <td>{storeManager.passwordResetQuestion}</td>
              <td>{storeManager.answer}</td>
              <td>{storeManager.type}</td>
              <td>
                <button onClick={() => DeleteStoreManager(storeManager._id)}>Delete</button>
                <button onClick={() => EditStoreManager(storeManager._id)}>Edit</button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default ManageStoreManagerTable
