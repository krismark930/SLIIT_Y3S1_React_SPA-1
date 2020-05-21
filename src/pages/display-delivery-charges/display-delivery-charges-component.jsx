import React from "react";

import "./display-delivery-charges-styles.scss";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";


const DisplayDeliveryCharges = (props) => {

  return (

    <div>
      <table className="table" style={{float: "center"}}>
        <thead className="thead-light">
        <tr>
          <th style={{textAlign: "center"}}>Province</th>
          <th style={{textAlign: "center"}}> Delivery Fee</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td >1.Western</td>
          <td>$100</td>
        </tr>
        <tr>
          <td >2.Eastern</td>
          <td>$200</td>
        </tr>
        <tr>
          <td >3.North Central</td>
          <td>$300</td>
        </tr>
        <tr>
          <td >4.Northern</td>
          <td>$400</td>
        </tr>
        <tr>
          <td >5.North Western</td>
          <td>$500</td>
        </tr>
        <tr>
          <td >6.Sabaragamuwa</td>
          <td>$600</td>
        </tr>
        <tr>
          <td >7.Southern</td>
          <td>$700</td>
        </tr>
        <tr>
          <td >8.Uva</td>
          <td>$800</td>
        </tr>
        <tr>
          <td >9.Central</td>
          <td>$900</td>
        </tr>
        </tbody>


      </table>
      <Link to="/pay-order">
        <Button style={{float: "center"}}>Cancel</Button>
      </Link>
    </div>


  );
};

export default DisplayDeliveryCharges;
