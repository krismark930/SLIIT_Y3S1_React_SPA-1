import {Table} from 'semantic-ui-react';
import React from 'react';

export function StoreManagerTableHeader(props) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'id' ? props.direction : null}
          onClick={() => props.handleSort('id')}
        >
          #
        </Table.HeaderCell>
        <Table.HeaderCell
          width={3}
          sorted={props.column === 'firstName' ? props.direction : null}
          onClick={() => props.handleSort('firstName')}
        >
          First Name
        </Table.HeaderCell>
        <Table.HeaderCell
          width={3}
          sorted={props.column === 'lastName' ? props.direction : null}
          onClick={() => props.handleSort('lastName')}
        >
          Last Name
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'teleNo' ? props.direction : null}
          onClick={() => props.handleSort('teleNo')}
        >
          Telephone Number
        </Table.HeaderCell>
        <Table.HeaderCell
          width={1}
          sorted={props.column === 'email' ? props.direction : null}
          onClick={() => props.handleSort('email')}
        >
          Email
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}
