import React from 'react';
import PropTypes from 'prop-types';
import {Pagination, Table} from 'semantic-ui-react';

import {StoreManagerTableSize} from './store-manager-table-size.jsx';
import {StoreManagerRow} from './store-manager-row.jsx';
import {StoreManagerTableHeader} from './store-manager-table-header.jsx';

export const StoreManagerTable = props => {
  if (!props.storeManagers) {
    return <React.Fragment/>;
  }
  const storeManagerRows = props.storeManagers.map((storeManager, index) => (
    <StoreManagerRow key={index} storeManager={storeManager} />
  ));
  return (
    <React.Fragment>
      <StoreManagerTableSize
        limit={props.limit}
        onChangeLimit={props.onChangeLimit}
      />
      Total count: {props.totalCount}.
      <Table celled selectable sortable>
        <StoreManagerTableHeader
          column={props.column}
          direction={props.direction}
          handleSort={props.handleSort}
        />

        <Table.Body>{storeManagerRows}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="8">
              <Pagination
                totalPages={props.totalPages}
                activePage={props.currentPage}
                onPageChange={props.onChangePage}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </React.Fragment>
  );
};

StoreManagerTable.propTypes = {
  totalCount: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeLimit: PropTypes.func.isRequired,
  limit: PropTypes.string.isRequired,
};
