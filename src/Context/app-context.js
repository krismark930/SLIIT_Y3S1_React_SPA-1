import {createContext} from "react";

export const AppContext = createContext({
  loggedin: false,
  editPayUser: false,
  editPayCard: false,
  hidden: false,
  editPayUserId: "1",
  editPayCardId: "1",
  editStoreManager: false,
  editStoreManagerId: "1",
  products: [
    {id: "p1", title: "Gaming Mouse", price: 29.99},
    {id: "p2", title: "Harry Potter 3", price: 9.99},
    {id: "p3", title: "Used plastic bottle", price: 0.99},
    {id: "p4", title: "Half-dried plant", price: 2.99}
  ],
  cart: [],
  currentUser: [],
  payUserDetails: [],
  editPayUserDetails: [],
  payCardDetails: [],
  payOrderDetails: [],
  editPayCardDetails: [],
 storeManagers: [],

  addItemToCart: item => {
  },
  removeItemFromCart: (productId, state) => {
  },
  removeCompletelyItemFromCart: item => {
  },
  toggleDropdownHidden: state => {
  },
  logout: state => {
  },
  login: state => {
  },
  addCurrentUser: user => {
  },
  addPayUserDetails: payUser => {
  },
  addPayCardDetails: payUser => {
  },
  addPayOrderDetails: payUser => {
  },
  addEditPayUserDetails: payUser => {
  },
  addEditPayCardDetails: payCard => {
  },
  payUserEdit: state => {
  },
  payUserEditFalse: state => {
  },
  setEditPayUserID: id => {
  },
  payCardEdit: state => {
  },
  payCardEditFalse: state => {
  },
  setEditPayCardID: id => {
  },
  storeManagerEdit: state => {
  },
  editStoreManagerFalse: state => {
  },
  setEditStoreManagerId: id => {
  },
  addStoreManagers: storeManager => {
  }
});
