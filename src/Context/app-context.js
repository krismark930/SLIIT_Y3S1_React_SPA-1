import {createContext} from 'react'

export const AppContext = createContext({
  checkCustomer: false,
  checkStoreManager: false,
  checkAdmin: false,
  loggedin: false,
  payUserConfirmed: false,
  payCardConfirmed: false,
  editPayUser: false,
  editPayCard: false,
  tempProducts: [],
  hidden: false,
  wishList: null,
  editPayUserId: '1',
  editPayCardId: '1',
  products: [
    {id: 'p1', title: 'Gaming Mouse', price: 29.99},
    {id: 'p2', title: 'Harry Potter 3', price: 9.99},
    {id: 'p3', title: 'Used plastic bottle', price: 0.99},
    {id: 'p4', title: 'Half-dried plant', price: 2.99}
  ],
  cart: [],
  currentUser: [],
  currentUserFirstName: [],
  currentUserLastName: [],
  payUserDetails: [],
  editPayUserDetails: [],
  payCardDetails: [],
  payOrderDetails: [],
  editPayCardDetails: [],
  editStoreManager: false,
  editStoreManagerId: '1',
  storeManagers: [],
  editCategory: false,
  editCategoryId: '1',
  categories: [],

  addItemToCart: (item) => {
  },
  removeItemFromCart: (productId, state) => {
  },
  removeCompletelyItemFromCart: (item) => {
  },
  toggleDropdownHidden: (state) => {
  },
  logout: (state) => {
  },
  login: (state) => {
  },
  setTruePayUserConfirmed: (state) => {
  },
  setFalsePayUserConfirmed: (state) => {
  },
  setTruePayCardConfirmed: (state) => {
  },
  setFalsePayCardConfirmed: (state) => {
  },
  addCurrentUser: (user) => {
  },
  addCurrentUserFirstName: (name) => {
  },
  addCurrentUserLastName: (name) => {
  },
  addPayUserDetails: (payUser) => {
  },
  addPayCardDetails: (payUser) => {
  },
  addPayOrderDetails: (payUser) => {
  },
  addEditPayUserDetails: (payUser) => {
  },
  addEditPayCardDetails: (payCard) => {
  },
  payUserEdit: (state) => {
  },
  payUserEditFalse: (state) => {
  },
  setEditPayUserID: (id) => {
  },
  payCardEdit: (state) => {
  },
  payCardEditFalse: (state) => {
  },
  setEditPayCardID: (id) => {
  },
  setWishListmethod: (mail) => {
  },
  addToWishList: (product) => {
  },
  setWishListMethod: () => {
  },
  getWishList: () => {
  },
  setChangeWishListProduct: (p) => {
  },
  setCheckAdminMethod: () => {
  },
  setCheckCustomerMethod: () => {
  },
  setChecksetCheckStoreManagerMethod: () => {
  },
  storeManagerEdit: () => {
  },
  editStoreManagerFalse: () => {
  },
  setEditStoreManagerId: () => {
  },
  addStoreManagers: () => {
  },
  categoryEdit: () => {
  },
  editCategoryFalse: () => {
  },
  setEditCategoryId: () => {
  },
  addCategories: () => {
  }
})
