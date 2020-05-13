import React, {useState} from "react";
import {AppContext} from "./app-context";

const GlobalState = props => {
  const [loggedin, setLoggedin] = useState(false);
  const [editPayUser, setEditPayUser] = useState(false);
  const [editPayUserId, setEditPayUserId] = useState("1");
  const [hidden, setHidden] = useState(true);
  const [products, setProducts] = useState([
    {id: "p1", title: "Gaming Mouse", price: 29.99},
    {id: "p2", title: "Harry Potter 3", price: 9.99},
    {id: "p3", title: "Used plastic bottle", price: 0.99},
    {id: "p4", title: "Half-dried plant", price: 2.99}
  ]);

  var count = -1;

  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [payUserDetails, setPayUserDetails] = useState([]);
  const [editPayUserDetails, setEditPayUserDetails] = useState([]);
  const [payCardDetails, setPayCardDetails] = useState([]);
  const [payOrderDetails, setPayOrderDetails] = useState([]);

  const addPayCardDetails = payCard => {
    const updatedPayCard = [];
    updatedPayCard.push({...payCard});
    console.log(updatedPayCard);

    setPayCardDetails(updatedPayCard);
  };

  const addPayUserDetails = payUser => {
    const updatedPayUser = [];
    updatedPayUser.push({...payUser});
    console.log(updatedPayUser);

    setPayUserDetails(updatedPayUser);
  };


  const addEditPayUserDetails = payUser => {
    const updatedPayUser = [];
    updatedPayUser.push({...payUser});
    console.log(updatedPayUser);

    setEditPayUserDetails(updatedPayUser);
  };

  const addPayOrderDetails = payOrder => {
    const updatedPayOrder = [];
    updatedPayOrder.push({...payOrder});
    console.log(updatedPayOrder);

    setPayOrderDetails(updatedPayOrder);
  };

  const addCurrentUser = user => {
    const updatedCurrentUser = [];
    updatedCurrentUser.push({...user});
    console.log(updatedCurrentUser);

    setCurrentUser(updatedCurrentUser);
  };

  const addItemToCart = item => {
    const updatedCart = cart;
    console.log(updatedCart);

    var itemId = item.id;
    console.log(itemId);

    const updatedItemIndex = updatedCart.findIndex(item => item.id == itemId);

    console.log(updatedItemIndex);

    if (updatedItemIndex < 0) {
      updatedCart.push({...item, quantity: 1});
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }

    setCart(updatedCart);
  };

  const removeItemFromCart = item => {
    const updatedCart = cart;
    console.log(updatedCart);

    var itemId = item.id;
    console.log(itemId);

    const updatedItemIndex = updatedCart.findIndex(item => item.id == itemId);

    console.log(updatedItemIndex);

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    updatedCart[updatedItemIndex] = updatedItem;

    setCart(updatedCart);
  };

  const removeCompletelyItemFromCart = item => {
    const updatedCart = cart;
    console.log(updatedCart);

    var itemId = item.id;

    var cartUpdated = updatedCart.filter(item => {
      return item.id != itemId;
    });

    setCart(cartUpdated);
  };

  const toggleDropdownHidden = () => {
    setHidden(!hidden);
  };

  const logout = state => {
    setLoggedin(false);
    setEditPayUser(false);
  };
  const login = state => {
    setLoggedin(true);
  };

  const payUserEdit = state => {
    setEditPayUser(true);
  };

  const payUserEditFalse = state => {
    setEditPayUser(false);
  };
  const setEditPayUserID = id => {
    setEditPayUserId(id);
  };

  return (
    <AppContext.Provider
      value={{
        editPayUser: editPayUser,
        editPayUserId: editPayUserId,
        hidden: hidden,
        products: products,
        loggedin: loggedin,
        cart: cart,
        currentUser: currentUser,
        payUserDetails: payUserDetails,
        editPayUserDetails: editPayUserDetails,
        payCardDetails: payCardDetails,
        payOrderDetails: payOrderDetails,
        payUserEdit: payUserEdit,
        payUserEditFalse: payUserEditFalse,
        setEditPayUserID: setEditPayUserID,
        login: login,
        logout: logout,
        addEditPayUserDetails: addEditPayUserDetails,
        addCurrentUser: addCurrentUser,
        addItemToCart: addItemToCart,
        addPayUserDetails: addPayUserDetails,
        addPayCardDetails: addPayCardDetails,
        addPayOrderDetails: addPayOrderDetails,
        removeCompletelyItemFromCart: removeCompletelyItemFromCart,
        removeItemFromCart: removeItemFromCart,
        toggleDropdownHidden: toggleDropdownHidden
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default GlobalState;
