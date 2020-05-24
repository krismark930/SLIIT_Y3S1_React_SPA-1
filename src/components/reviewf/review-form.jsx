// import React, { Component } from "react";
// import ReactStars from "react-rating-stars-component";
// import { toast, ToastContainer } from "react-toastify";

// class SelectedItem extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       selectedProduct: [],
//       isLoaded: false,
//       reviewList: [],
//       itemID: "",
//       clientName: "",
//       review: "",
//       rating: 0,
//     };
//   }

//   componentDidMount() {
//     let id = this.props.id;
//     fetch("http://localhost:3000/product/" + id)
//       .then((res) => res.json())
//       .then((json) => {
//         console.log("json", json);
//         this.setState({
//           selectedProduct: json,
//           isLoaded: true,
//         });
//       });
//   }

//   handleChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleRatingChange = (newRating) => {
//     let itemID = sessionStorage.getItem("productID:");
//     this.setState({
//       itemID: itemID,
//       rating: newRating,
//     });
//   };

//   async postData() {
//     try {
//       let result = await fetch("http://localhost:3000/review/addItemReview/", {
//         method: "post",
//         headers: {
//           Accept: "application/json",
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           itemID: this.state.itemID,
//           clientName: this.state.clientName,
//           review: this.state.review,
//           rating: this.state.rating,
//         }),
//       });
//       toast.success("Rating And Review Added Successfully !", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       console.log("Result: " + result);
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   onSubmitReview = (event) => {
//     event.preventDefault();
//     this.postData();
//   };

//   handleReviews = (id) => {
//     fetch("http://localhost:3000/review/getItemReview/" + id)
//       .then((res) => res.json())
//       .then((json) => {
//         this.setState({
//           reviewList: json,
//         });
//       });
//   };

//   render() {
//     let { isLoaded, selectedProduct } = this.state;
//     if (!isLoaded) {
//       return (
//         <div id="preloader">
//           <div className="loader" />
//         </div>
//       );
//     } else {
//       return (
//         <section className="product-section">
//           <ToastContainer />
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-4">
//                 {/* <div className="product-pic-zoom">
//                                     <img className="product-big-img" src={Product} alt=""/>
//                                 </div> */}
//               </div>
//               <div
//                 className="col-lg-8 product-details"
//                 key={selectedProduct._id}
//               >
//                 <h2 className="p-title">{selectedProduct.productName}</h2>
//                 <h3 className="p-price">LKR.{selectedProduct.discountPrice}</h3>
//                 <h4 className="p-stock">
//                   Available: <span>In Stock</span>
//                 </h4>
//                 <div className="p-rating">
//                   <ReactStars
//                     size={20}
//                     half={false}
//                     onChange={(newRating) => {}}
//                     emptyIcon={<i className="ti-star" />}
//                     filledIcon={<i className="fa fa-star" />}
//                   />
//                 </div>
//                 <div className="p-review">
//                   <a href>3 reviews</a>|
//                   <a>
//                     <span
//                       className="status-p"
//                       data-toggle="modal"
//                       data-target="#exampleModal"
//                     >
//                       {" "}
//                       Add your review{" "}
//                     </span>
//                   </a>
//                 </div>

//                 <div
//                   class="modal fade"
//                   id="exampleModal"
//                   tabindex="-1"
//                   role="dialog"
//                   aria-labelledby="exampleModalLabel"
//                   aria-hidden="true"
//                 >
//                   <div class="modal-dialog" role="document">
//                     <div class="modal-content">
//                       <form onSubmit={this.onSubmitReview} autoComplete="off">
//                         <div class="modal-header">
//                           <h5 class="modal-title" id="exampleModalLabel">
//                             Your Review & Rating
//                           </h5>
//                           <button
//                             type="button"
//                             class="close"
//                             data-dismiss="modal"
//                             aria-label="Close"
//                           >
//                             <span aria-hidden="true">&times;</span>
//                           </button>
//                         </div>
//                         <div class="modal-body">
//                           <div className="form-group">
//                             <label htmlFor="exampleInputEmail1">Name</label>
//                             <input
//                               type="text"
//                               className="form-control style-input"
//                               placeholder="Your Name"
//                               name="clientName"
//                               value={this.state.productName}
//                               onChange={this.handleChange}
//                             />
//                           </div>
//                           <div className="form-group">
//                             <label htmlFor="exampleFormControlTextarea1">
//                               Review
//                             </label>
//                             <textarea
//                               className="form-control style-input"
//                               id="exampleFormControlTextarea1"
//                               rows="2"
//                               name="review"
//                               value={this.state.description}
//                               onChange={this.handleChange}
//                             />
//                             <br />
//                             <div
//                               className="p-rating"
//                               style={{ marginLeft: "22%", marginRight: "22%" }}
//                             >
//                               <label htmlFor="exampleFormControlTextarea1">
//                                 Your Rating
//                               </label>
//                               <ReactStars
//                                 size={50}
//                                 half={false}
//                                 onChange={this.handleRatingChange}
//                                 emptyIcon={<i className="ti-star" />}
//                                 filledIcon={<i className="fa fa-star" />}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div class="modal-footer fashion-buttons">
//                           <button
//                             type="button"
//                             class="btn btn-secondary"
//                             data-dismiss="modal"
//                           >
//                             Close
//                           </button>
//                           <button type="submit" class="btn fashion-btn">
//                             Save Changes
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="quantity">
//                   <p>Quantity</p>
//                   <div className="pro-qty">
//                     <input type="text" defaultValue={1} />
//                   </div>
//                 </div>
//                 <a href="#" className="site-btn">
//                   SHOP NOW
//                 </a>
//                 <div id="accordion" className="accordion-area">
//                   <div className="panel">
//                     <div className="panel-header" id="headingOne">
//                       <button
//                         className="panel-link active"
//                         data-toggle="collapse"
//                         data-target="#collapse1"
//                         aria-expanded="true"
//                         aria-controls="collapse1"
//                       >
//                         Description
//                       </button>
//                     </div>
//                     <div
//                       id="collapse1"
//                       className="collapse show"
//                       aria-labelledby="headingOne"
//                       data-parent="#accordion"
//                     >
//                       <div className="panel-body">
//                         <p>{selectedProduct.description}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="panel">
//                     <div className="panel-header" id="headingThree">
//                       <button
//                         className="panel-link"
//                         data-toggle="collapse"
//                         data-target="#collapse3"
//                         aria-expanded="false"
//                         aria-controls="collapse3"
//                       >
//                         Shipping &amp; Returns
//                       </button>
//                     </div>
//                     <div
//                       id="collapse3"
//                       className="collapse"
//                       aria-labelledby="headingThree"
//                       data-parent="#accordion"
//                     >
//                       <div className="panel-body">
//                         <h4>7 Days Returns</h4>
//                         <p>
//                           Cash on Delivery Available
//                           <br />
//                           Home Delivery <span>3 - 4 days</span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     className="panel"
//                     onClick={this.handleReviews.bind(this, selectedProduct._id)}
//                   >
//                     <div className="panel-header" id="headingTwo">
//                       <button
//                         className="panel-link"
//                         data-toggle="collapse"
//                         data-target="#collapse2"
//                         aria-expanded="false"
//                         aria-controls="collapse2"
//                       >
//                         Ratings & Reviews
//                       </button>
//                     </div>
//                     <div
//                       id="collapse2"
//                       className="collapse"
//                       aria-labelledby="headingTwo"
//                       data-parent="#accordion"
//                     >
//                       <div className="panel-body">
//                         <table className="table">
//                           <tbody>
//                             {this.state.reviewList.map((review) => (
//                               <tr key={review.itemID}>
//                                 <th scope="row">{review.clientName}</th>
//                                 <td>{review.review}</td>
//                                 <td>
//                                   <ReactStars
//                                     size={20}
//                                     half={false}
//                                     value={review.rating}
//                                     filledIcon={<i className="fa fa-star" />}
//                                   />
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       );
//     }
//   }
// }

// export default SelectedItem;
