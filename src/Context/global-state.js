import React, {useState} from "react";
import {AppContext} from "./app-context";

const GlobalState = (props) => {
  const [loggedin, setLoggedin] = useState(false);
  const [payUserConfirmed, setPayUserConfirmed] = useState(false);
  const [payCardConfirmed, setPayCardConfirmed] = useState(false);
  const [editPayUser, setEditPayUser] = useState(false);
  const [editPayUserId, setEditPayUserId] = useState("1");
  const [editPayCard, setEditPayCard] = useState(false);
  const [editPayCardId, setEditPayCardId] = useState("1");
  const [hidden, setHidden] = useState(true);
  const [wishList, setWishList] = useState();
  const [checkAdmin, setCheckAdmin] = useState(false);
  const [checkCustomer, setCheckCustomer] = useState(false);
  const [checkStoreManager, setCheckStoreManager] = useState(false);
  const [products, setProducts] = useState([
    {
      title: "Women1",
      id: 1,
      price: 123.0,
      category: "Women",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Women",
      id: 2,
      price: 123.0,
      category: "Women",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Men1",
      id: 3,
      price: 123.0,
      category: "Men",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Men",
      id: 4,
      price: 123.0,
      category: "Men",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Shoes1",
      id: 5,
      price: 123.0,
      category: "Shoes",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Women2",
      id: 6,
      price: 123.0,
      category: "Women",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Product11",
      id: 7,
      price: 123.0,
      category: "Women",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Product12",
      id: 8,
      price: 123.0,
      category: "Women",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
    {
      title: "Product1",
      id: 9,
      price: 123.0,
      category: "Hats",
      productImage: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
    },
  ]);
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState([{type: "Null"}]);
  const [currentUserFirstName, setCurrentUserFirstName] = useState([]);
  const [currentUserLastName, setCurrentUserLastName] = useState([]);
  const [payUserDetails, setPayUserDetails] = useState([]);
  const [editPayUserDetails, setEditPayUserDetails] = useState([]);
  const [editPayCardDetails, setEditPayCardDetails] = useState([]);
  const [payCardDetails, setPayCardDetails] = useState([]);
  const [payOrderDetails, setPayOrderDetails] = useState([]);
  const [editStoreManager, setEditStoreManager] = useState(false);
  const [editStoreManagerId, setEditStoreManagerID] = useState("1");
  const [storeManagers, setStoreManagers] = useState([]);
  const [editCategory, setEditCategory] = useState(false);
  const [editCategoryId, setEditCategoryID] = useState("1");
  const [tempProducts, setTempProducts] = useState(products);
  const [categories, setCategories] = useState([
    {
      categoryTitle: "Hats",
    },
    {
      categoryTitle: "Men",
    },
    {
      categoryTitle: "Women",
    },
    {
      categoryTitle: "Shoes",
    },
  ]);

  const setCheckAdminMethod = () => {
    setCheckAdmin(true);
  };

  const setCheckCustomerMethod = () => {
    setCheckCustomer(true);
  };

  const setChecksetCheckStoreManagerMethod = () => {
    setCheckStoreManager(true);
  };

  const addItemToCart = (item) => {
    const updatedCart = cart;
    let itemId = item.id;
    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.id === itemId
    );
    if (updatedItemIndex < 0) {
      updatedCart.push({...item, quantity: 1});
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex],
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setCart(updatedCart);
  };

  const addToWishList = async (productTitle) => {
    let responseData = 0;
    const mail = currentUser[0].email;
    var responseError = "";
    var objs = {
      userID: mail,
      productID: productTitle,
    };
    try {
      const response = await fetch(
        `http://localhost:5000/users/addToWishList`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(objs),
        }
      );
      responseData = await response.json();
      setWishListmethod(currentUser[0].email);
      responseError = responseData.message;
      console.log(responseData);
    } catch (err) {
      console.log(err.message);
    }
  };

  // const setWishListMethod = async (wishlist) => {
  //   console.log('setWishListMethod')
  //   const wishLis = wishList
  //   let wishL = []
  //   wishL.push(...wishLis)
  //   console.log(wishL)
  //   setWishList(wishL)
  //   console.log(wishList)
  // }

  // const getWishList = () => {
  //   console.log('getWishList')
  //   return wishList
  // }

  const setChangeWishListProduct = (product) => {
    // let tempProduct = products;
    // var filtered = products.filter((pitem) => pitem.title != product.title);
    // filtered.push(product);
    // setProducts(filtered);
    // console.log("//////////////////");
    // console.log(filtered);
  };

  const products1 = tempProducts;

  const setWishListmethod = async (mail) => {
    console.log("setWishListmethod");
    let filteredAll = [];
    let responseData = 0;
    // const mail = currentUser[0].email
    var responseError = "";
    try {
      const response = await fetch(
        `http://localhost:5000/users/getWishList/${mail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );
      responseData = await response.json();
      // console.log(responseData.wishList)
      responseError = responseData.message;
      console.log(responseData);
    } catch (err) {
      console.log(err.message);
    }
    var filtering = products1;
    responseData.wishList.forEach((item) => {
      console.log(item);
      var filtered = products.filter((pitem) => pitem.title == item.productID);
      var fill = filtered.concat(filteredAll);
      console.log(filtered);
      filteredAll = fill;
      products.forEach((pitem) => {
        if (pitem.title == item.productID) {
          let temp = {...pitem, wishList: 1};
          filtering = filtering.filter(
            (pitem) => pitem.title != item.productID
          );
          // let temp2 = filtering
          filtering.push(temp);
          console.log("++++++++++++++++++++++");
          console.log(filtering);
        }
      });
    });
    // console.log("fileredAll");
    // console.log(filteredAll);
    // if (filteredAll.length) {
    //   filteredAll.splice(-1, 1);
    // }
    // console.log(filteredAll);
    setWishList(filteredAll);
    setProducts(filtering);
  };

  // const deleteWishListItem = async (productID) => {
  //   console.log('deleteWishListItem')
  //   let responseData = 0
  //   const mail = currentUser[0].email
  //   var responseError = ''
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/users/getWishList/${mail}/${productID}`,
  //       {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify()
  //       }
  //     )
  //     responseData = await response.json()
  //     console.log(responseData.wishList)
  //     responseError = responseData.message
  //     console.log(responseData)
  //   } catch (err) {
  //     console.log(err.message)
  //   }
  //   const wishLis = responseData.wishList
  //   let wishL = []
  //   wishL.push({ ...wishLis })
  //   console.log(wishL)
  //   setWishList(wishL)
  //   console.log(wishList)
  // }

  const addProducts = (products) => {
    const products_ = [];
    products_.push({...products});
    setProducts(products_);
  };

  const removeItemFromCart = (item) => {
    const updatedCart = cart;
    let itemId = item.id;
    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.id === itemId
    );
    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };
    updatedItem.quantity--;
    updatedCart[updatedItemIndex] = updatedItem;
    setCart(updatedCart);
  };

  const removeCompletelyItemFromCart = (item) => {
    const updatedCart = cart;
    let itemId = item.id;
    let cartUpdated = updatedCart.filter((item) => {
      return item.id !== itemId;
    });
    setCart(cartUpdated);
  };

  const toggleDropdownHidden = () => {
    setHidden(!hidden);
  };

  const logout = (state) => {
    setLoggedin(false);
    setCheckAdmin(false);
    setCheckCustomer(false);
    setCheckStoreManager(false);
    setCart([]);
    setEditPayUser(false);
    setEditPayCard(false);
    setEditStoreManager(false);
  };

  const login = (state) => {
    setLoggedin(true);
  };

  const addPayCardDetails = (payCard) => {
    const updatedPayCard = [];
    updatedPayCard.push({...payCard});
    setPayCardDetails(updatedPayCard);
  };

  const addPayUserDetails = (payUser) => {
    const updatedPayUser = [];
    updatedPayUser.push({...payUser});
    setPayUserDetails(updatedPayUser);
  };

  const addEditPayUserDetails = (payUser) => {
    const updatedPayUser = [];
    updatedPayUser.push({...payUser});
    setEditPayUserDetails(updatedPayUser);
  };

  const addEditPayCardDetails = (payCard) => {
    const updatedPayCard = [];
    updatedPayCard.push({...payCard});
    setEditPayCardDetails(updatedPayCard);
  };

  const addPayOrderDetails = (payOrder) => {
    const updatedPayOrder = [];
    updatedPayOrder.push({...payOrder});
    setPayOrderDetails(updatedPayOrder);
  };

  const addCurrentUser = (user) => {
    const updatedCurrentUser = [];
    updatedCurrentUser.push({...user});
    setCurrentUser(updatedCurrentUser);
  };

  const addCurrentUserFirstName = (name) => {
    const updatedFirstName = [];
    updatedFirstName.push({...name});
    console.log(updatedFirstName);
    setCurrentUserFirstName(updatedFirstName);
  };

  const addCurrentUserLastName = (name) => {
    const updatedLastName = [];
    updatedLastName.push({...name});
    console.log(updatedLastName);
    setCurrentUserLastName(updatedLastName);
  };

  const payUserEdit = (state) => {
    setEditPayUser(true);
  };

  const payUserEditFalse = (state) => {
    setEditPayUser(false);
  };

  const setEditPayUserID = (id) => {
    setEditPayUserId(id);
  };

  const payCardEdit = (state) => {
    setEditPayCard(true);
  };

  const payCardEditFalse = (state) => {
    setEditPayCard(false);
  };

  const setEditPayCardID = (id) => {
    setEditPayCardId(id);
  };

  const setTruePayUserConfirmed = (state) => {
    setPayUserConfirmed(true);
  };

  const setTruePayCardConfirmed = (state) => {
    setPayCardConfirmed(true);
  };

  const setFalsePayUserConfirmed = (state) => {
    setPayUserConfirmed(false);
  };

  const setFalsePayCardConfirmed = (state) => {
    setPayCardConfirmed(false);
  };

  const storeManagerEdit = (state) => {
    setEditStoreManager(true);
  };

  const editStoreManagerFalse = (state) => {
    setEditStoreManager(false);
  };

  const setEditStoreManagerId = (id) => {
    setEditStoreManagerID(id);
  };

  const addStoreManagers = (storeManager) => {
    const updatedStoreManager = [];
    updatedStoreManager.push({...storeManager});
    setStoreManagers(updatedStoreManager);
  };

  const categoryEdit = (state) => {
    setEditCategory(true);
  };

  const editCategoryFalse = (state) => {
    setEditCategory(false);
  };

  const setEditCategoryId = (id) => {
    setEditCategoryID(id);
  };

  const addCategories = (category) => {
    const updatedCategory = [];
    updatedCategory.push({...category});
    setCategories(updatedCategory);
  };

  return (
    <AppContext.Provider
      value={{
        editPayUser: editPayUser,
        wishList: wishList,
        editPayUserId: editPayUserId,
        editPayCard: editPayCard,
        editPayCardId: editPayCardId,
        hidden: hidden,
        products: products,
        loggedin: loggedin,
        payUserConfirmed: payUserConfirmed,
        payCardConfirmed: payCardConfirmed,
        cart: cart,
        currentUser: currentUser,
        currentUserFirstName: currentUserFirstName,
        currentUserLastName: currentUserLastName,
        payUserDetails: payUserDetails,
        editPayUserDetails: editPayUserDetails,
        editPayCardDetails: editPayCardDetails,
        payCardDetails: payCardDetails,
        payOrderDetails: payOrderDetails,
        checkAdmin: checkAdmin,
        checkCustomer: checkCustomer,
        tempProducts: tempProducts,
        checkStoreManager: checkStoreManager,
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
        setTruePayUserConfirmed: setTruePayUserConfirmed,
        setTruePayCardConfirmed: setTruePayCardConfirmed,
        setFalsePayUserConfirmed: setFalsePayUserConfirmed,
        setFalsePayCardConfirmed: setFalsePayCardConfirmed,
        addEditPayUserDetails: addEditPayUserDetails,
        addEditPayCardDetails: addEditPayCardDetails,
        addCurrentUser: addCurrentUser,
        addCurrentUserFirstName: addCurrentUserFirstName,
        addCurrentUserLastName: addCurrentUserLastName,
        addItemToCart: addItemToCart,
        addPayUserDetails: addPayUserDetails,
        addPayCardDetails: addPayCardDetails,
        addPayOrderDetails: addPayOrderDetails,
        removeCompletelyItemFromCart: removeCompletelyItemFromCart,
        removeItemFromCart: removeItemFromCart,
        toggleDropdownHidden: toggleDropdownHidden,
        setChangeWishListProduct: setChangeWishListProduct,
        setWishListmethod: setWishListmethod,
        addToWishList: addToWishList,
        setCheckAdminMethod: setCheckAdminMethod,
        setCheckCustomerMethod: setCheckCustomerMethod,
        setChecksetCheckStoreManagerMethod: setChecksetCheckStoreManagerMethod,
        storeManagerEdit: storeManagerEdit,
        editStoreManagerFalse: editStoreManagerFalse,
        setEditStoreManagerId: setEditStoreManagerId,
        addStoreManagers: addStoreManagers,
        categoryEdit: categoryEdit,
        editCategoryFalse: editCategoryFalse,
        setEditCategoryId: setEditCategoryId,
        addCategories: addCategories,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default GlobalState;
