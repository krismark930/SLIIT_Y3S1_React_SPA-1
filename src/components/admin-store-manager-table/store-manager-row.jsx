import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const StoreManagerRow = props => (
  <Table.Row>
    <Table.Cell>{props.storeManager.id}</Table.Cell>
    <Table.Cell>{props.storeManager.firstName}</Table.Cell>
    <Table.Cell>{props.storeManager.lastName}</Table.Cell>
    <Table.Cell>{props.storeManager.teleNo}</Table.Cell>
    <Table.Cell>{props.storeManager.email}</Table.Cell>
  </Table.Row>
);

StoreManagerRow.propTypes = {
  storeManager: PropTypes.object.isRequired
};
