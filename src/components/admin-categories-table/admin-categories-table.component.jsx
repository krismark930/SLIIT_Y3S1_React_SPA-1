import React, {useContext, useEffect, useState} from 'react'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import './admin-categories-table-styles.scss'
import {AppContext} from '../../Context/app-context'
import axios from 'axios'

const ManageCategoryTable = () => {
  const appContext = useContext(AppContext)
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/category')
      const responseData = await response.json()
      setCategories(responseData)
      appContext.addCategories(responseData)
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
  }

  return (
    <div>
      <table className='table' style={{border: 'solid darkblue 2px'}}>
        <thead>
        <th style={{borderBottom: 'solid darkblue 2px'}}>Title</th>
        <th style={{borderBottom: 'solid darkblue 2px'}}>Description</th>
        <th style={{borderBottom: 'solid darkblue 2px'}}/>
        <th style={{borderBottom: 'solid darkblue 2px'}}/>
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
                <button onClick={() => DeleteCategory(category._id)} style={{color: 'indianred'}}>
                  <FaTrashAlt size={25}/>
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

export default ManageCategoryTable
