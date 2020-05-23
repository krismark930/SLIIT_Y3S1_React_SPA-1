import React from "react";

import "./display-delivery-charges-styles.scss";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";


const DisplayDeliveryCharges = (props) => {

  return (
    <div
      className="loginSignupMainHeads"
      style={{marginTop: "10%", marginBottom: "4%"}}
    >
    <div>
      <h1>Delivery Charges</h1>
      <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "30px",
              width: '585px',

            }}
          >
      <table className="table" style={{border: 'solid black  2px'}}>
        <thead className="thead-light">
        <tr>
          <th style={{borderBottom: 'solid black  1px', color: 'black'}}><h5>Province</h5></th>
          <th style={{borderBottom: 'solid black  1px', color: 'black'}}><h5> Delivery Fee</h5></th>
        </tr>
        </thead>
        <tbody>
        <tr >
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>1.Western</td>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>$100</td>
        </tr>
        <tr>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>2.Eastern</td>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>$200</td>
        </tr>
        <tr>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>3.North Central</td>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>$300</td>
        </tr>
        <tr>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>4.Northern</td>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>$400</td>
        </tr>
        <tr>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>5.North Western</td>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>$500</td>
        </tr>
        <tr>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>6.Sabaragamuwa</td>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>$600</td>
        </tr>
        <tr>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>7.Southern</td>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>$700</td>
        </tr>
        <tr>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>8.Uva</td>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>$800</td>
        </tr>
        <tr>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>9.Central</td>
          <td style={{borderBottom: 'solid gray   1px', color: 'black'}}>$900</td>
        </tr>
        </tbody>


      </table>
      
      <Link to="/pay-order">
        <Button style={{float: "center"}}>Cancel</Button>
      </Link>
      </div>
    </div>
    </div>

  );
};

export default DisplayDeliveryCharges;
