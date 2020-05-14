import AddStoreManagerForm from "../../components/admin-store-manager-form/admin-store-manager-form.component";
import EditStoreManagerForm from "../../components/admin-store-manager-form-edit/admin-store-manager-form-edit.component";
import StoreManagerTable from "../../components/admin-store-managers-table/admin-store-managers-table.component";

import React, {useContext} from "react";
import {Col, Row} from "react-bootstrap";

import "./admin-store-managers-styles.scss";

import {AppContext} from "../../Context/app-context";


const ManageStoreManager = props => {
  let route;
  const app = useContext(AppContext);

  if (app.editStoreManager) {
    route = (<EditStoreManagerForm/>);
  } else {
    route = (<AddStoreManagerForm/>);
  }

  return (
    <div className="loginSignupMainHead">
      <div className="container">
        <Row>
          <Col md="6">
            <div className="loginSignupPageLginForm">
              {route}
            </div>
          </Col>
          <Col md="6" className="clll">
            <div className="loginSignupPageSignupForm">
              <StoreManagerTable/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default React.memo(ManageStoreManager);
