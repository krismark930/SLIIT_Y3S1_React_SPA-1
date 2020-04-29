import React, {useState} from "react";
import {AppContext} from "./app-context";

const GlobalState = props => {
  const [loggedin, setLoggedin] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [products, setProducts] = useState([
    {id: "p1", title: "Gaming Mouse", price: 29.99},
    {id: "p2", title: "Harry Potter 3", price: 9.99},
    {id: "p3", title: "Used plastic bottle", price: 0.99},
    {id: "p4", title: "Half-dried plant", price: 2.99}
  ]);

  var count = -1;

  const [cart, setCart] = useState([]);

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
  };
  const login = state => {
    setLoggedin(true);
  };

  return (
    <AppContext.Provider
      value={{
        hidden: hidden,
        products: products,
        loggedin: loggedin,
        hidden: hidden,
        cart: cart,
        login: login,
        logout: logout,
        addItemToCart: addItemToCart,
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
