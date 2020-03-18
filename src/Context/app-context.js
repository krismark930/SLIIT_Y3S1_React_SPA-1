import { createContext } from "react";

export const AppContext = createContext({
  loggedin: true,
  hidden: false,
  products: [
    { id: "p1", title: "Gaming Mouse", price: 29.99 },
    { id: "p2", title: "Harry Potter 3", price: 9.99 },
    { id: "p3", title: "Used plastic bottle", price: 0.99 },
    { id: "p4", title: "Half-dried plant", price: 2.99 }
  ],
  cart: [],
  addItemToCart: item => {},
  removeItemFromCart: (productId, state) => {},
  toggleDropdownHidden: state => {},
  logout: state => {}
});
