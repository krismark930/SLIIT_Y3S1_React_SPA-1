import React, {useContext, useEffect, useState} from 'react'
import {FaUserEdit, FaUserMinus} from 'react-icons/fa'
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
      <table className='table' style={{border: 'solid darkblue 2px'}}>
        <thead>
        <th style={{borderBottom: 'solid darkblue 2px'}}>First Name</th>
        <th style={{borderBottom: 'solid darkblue 2px'}}>Last Name</th>
        <th style={{borderBottom: 'solid darkblue 2px'}}>Email</th>
        <th style={{borderBottom: 'solid darkblue 2px'}}>Phone Number</th>
        <th style={{borderBottom: 'solid darkblue 2px'}}/>
        <th style={{borderBottom: 'solid darkblue 2px'}}/>
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
                <button onClick={() => DeleteStoreManager(storeManager._id)} style={{color: 'indianred'}}>
                  <FaUserMinus size={25}/>
                </button>
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
