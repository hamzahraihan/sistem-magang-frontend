import { createColumnHelper } from '@tanstack/react-table';
import PropTypes from 'prop-types';
const Table = () => {
  const columnHelper = createColumnHelper();

  const defaultColumn = [
    columnHelper.accessor('first_name', {
      cell: (props) => <span>{props.getValue()}</span>,
    }),
  ];

  return <div>Table</div>;
};

Table.propTypes = {
  getValue: PropTypes.array,
};

export default Table;
