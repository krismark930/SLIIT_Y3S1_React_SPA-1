import React, {useState} from 'react'
import {AppContext} from './app-context'

const GlobalState = props => {
  const [loggedin, setLoggedin] = useState(false)
  const [editPayUser, setEditPayUser] = useState(false)
  const [editPayUserId, setEditPayUserId] = useState('1')
  const [editPayCard, setEditPayCard] = useState(false)
  const [editPayCardId, setEditPayCardId] = useState('1')
  const [hidden, setHidden] = useState(true)
  const [products, setProducts] = useState([
    {id: 'p1', title: 'Gaming Mouse', price: 29.99},
    {id: 'p2', title: 'Harry Potter 3', price: 9.99},
    {id: 'p3', title: 'Used plastic bottle', price: 0.99},
    {id: 'p4', title: 'Half-dried plant', price: 2.99}
  ])
  const [cart, setCart] = useState([])
  const [currentUser, setCurrentUser] = useState([{type: "Null"}])
  const [payUserDetails, setPayUserDetails] = useState([])
  const [editPayUserDetails, setEditPayUserDetails] = useState([])
  const [editPayCardDetails, setEditPayCardDetails] = useState([])
  const [payCardDetails, setPayCardDetails] = useState([])
  const [payOrderDetails, setPayOrderDetails] = useState([])
  const [editStoreManager, setEditStoreManager] = useState(false)
  const [editStoreManagerId, setEditStoreManagerID] = useState('1')
  const [storeManagers, setStoreManagers] = useState([])
  const [editCategory, setEditCategory] = useState(false)
  const [editCategoryId, setEditCategoryID] = useState('1')
  const [categories, setCategories] = useState([])

  const addItemToCart = item => {
    console.log()
    const updatedCart = cart
    console.log(updatedCart)
    let itemId = item.id
    console.log(itemId)
    const updatedItemIndex = updatedCart.findIndex(item => item.id === itemId)
    console.log(updatedItemIndex)
    if (updatedItemIndex < 0) {
      updatedCart.push({...item, quantity: 1})
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      }
      updatedItem.quantity++
      updatedCart[updatedItemIndex] = updatedItem
    }
    setCart(updatedCart)
  }

  const removeItemFromCart = item => {
    const updatedCart = cart
    console.log(updatedCart)
    let itemId = item.id
    console.log(itemId)
    const updatedItemIndex = updatedCart.findIndex(item => item.id === itemId)
    console.log(updatedItemIndex)
    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    }
    updatedItem.quantity--
    updatedCart[updatedItemIndex] = updatedItem
    setCart(updatedCart)
  }

  const removeCompletelyItemFromCart = item => {
    const updatedCart = cart
    console.log(updatedCart)
    let itemId = item.id
    let cartUpdated = updatedCart.filter(item => {
      return item.id !== itemId
    })
    setCart(cartUpdated)
  }

  const toggleDropdownHidden = () => {
    setHidden(!hidden)
  }

  const logout = state => {
    setLoggedin(false)
    setEditPayUser(false)
    setEditPayCard(false)
    setEditStoreManager(false)
  }

  const login = state => {
    setLoggedin(true)
  }

  const addPayCardDetails = payCard => {
    const updatedPayCard = []
    updatedPayCard.push({...payCard})
    console.log(updatedPayCard)
    setPayCardDetails(updatedPayCard)
  }

  const addPayUserDetails = payUser => {
    const updatedPayUser = []
    updatedPayUser.push({...payUser})
    console.log(updatedPayUser)
    setPayUserDetails(updatedPayUser)
  }

  const addEditPayUserDetails = payUser => {
    const updatedPayUser = []
    updatedPayUser.push({...payUser})
    console.log(updatedPayUser)
    setEditPayUserDetails(updatedPayUser)
  }

  const addEditPayCardDetails = payCard => {
    const updatedPayCard = []
    updatedPayCard.push({...payCard})
    console.log(updatedPayCard)
    setEditPayCardDetails(updatedPayCard)
  }

  const addPayOrderDetails = payOrder => {
    const updatedPayOrder = []
    updatedPayOrder.push({...payOrder})
    console.log(updatedPayOrder)
    setPayOrderDetails(updatedPayOrder)
  }

  const addCurrentUser = user => {
    const updatedCurrentUser = []
    updatedCurrentUser.push({...user})
    console.log(updatedCurrentUser)
    setCurrentUser(updatedCurrentUser)
  }

  const payUserEdit = state => {
    setEditPayUser(true)
  }

  const payUserEditFalse = state => {
    setEditPayUser(false)
  }

  const setEditPayUserID = id => {
    setEditPayUserId(id)
  }

  const payCardEdit = state => {
    setEditPayCard(true)
  }

  const payCardEditFalse = state => {
    setEditPayCard(false)
  }

  const setEditPayCardID = id => {
    setEditPayCardId(id)
  }

  const storeManagerEdit = state => {
    setEditStoreManager(true)
  }

  const editStoreManagerFalse = state => {
    setEditStoreManager(false)
  }

  const setEditStoreManagerId = id => {
    setEditStoreManagerID(id)
  }

  const addStoreManagers = storeManager => {
    const updatedStoreManager = []
    updatedStoreManager.push({...storeManager})
    setStoreManagers(updatedStoreManager)
  }

  const categoryEdit = state => {
    setEditCategory(true)
  }

  const editCategoryFalse = state => {
    setEditCategory(false)
  }

  const setEditCategoryId = id => {
    setEditCategoryID(id)
  }

  const addCategories = category => {
    const updatedCategory = []
    updatedCategory.push({...category})
    setCategories(updatedCategory)
  }

  return (
    <AppContext.Provider
      value={{
        editPayUser: editPayUser,
        editPayUserId: editPayUserId,
        editPayCard: editPayCard,
        editPayCardId: editPayCardId,
        hidden: hidden,
        products: products,
        loggedin: loggedin,
        cart: cart,
        currentUser: currentUser,
        payUserDetails: payUserDetails,
        editPayUserDetails: editPayUserDetails,
        editPayCardDetails: editPayCardDetails,
        payCardDetails: payCardDetails,
        payOrderDetails: payOrderDetails,
        editStoreManager: editStoreManager,
        editStoreManagerId: editStoreManagerId,
        storeManagers: storeManagers,
        editCategory: editCategory,
        editCategoryId: editCategoryId,
        categories: categories,
        payUserEdit: payUserEdit,
        payUserEditFalse: payUserEditFalse,
        setEditPayUserID: setEditPayUserID,
        payCardEdit: payCardEdit,
        payCardEditFalse: payCardEditFalse,
        setEditPayCardID: setEditPayCardID,
        login: login,
        logout: logout,
        addEditPayUserDetails: addEditPayUserDetails,
        addEditPayCardDetails: addEditPayCardDetails,
        addCurrentUser: addCurrentUser,
        addItemToCart: addItemToCart,
        addPayUserDetails: addPayUserDetails,
        addPayCardDetails: addPayCardDetails,
        addPayOrderDetails: addPayOrderDetails,
        removeCompletelyItemFromCart: removeCompletelyItemFromCart,
        removeItemFromCart: removeItemFromCart,
        toggleDropdownHidden: toggleDropdownHidden,
        storeManagerEdit: storeManagerEdit,
        editStoreManagerFalse: editStoreManagerFalse,
        setEditStoreManagerId: setEditStoreManagerId,
        addStoreManagers: addStoreManagers,
        categoryEdit: categoryEdit,
        editCategoryFalse: editCategoryFalse,
        setEditCategoryId: setEditCategoryId,
        addCategories: addCategories
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export default GlobalState
