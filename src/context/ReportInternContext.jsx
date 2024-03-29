import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const ReportInternContext = createContext(null);

export const ReportInternDispatch = createContext(null);

const ReportInternProvider = ({ children }) => {
  const [reportIntern, dispatch] = useReducer(ReportInternReducer, []);

  return (
    <ReportInternContext.Provider value={reportIntern}>
      <ReportInternDispatch value={dispatch}>{children}</ReportInternDispatch>
    </ReportInternContext.Provider>
  );
};

const ReportInternReducer = (reportIntern, action) => {
  switch (action.type) {
    case 'SET_REPORT_DATA':
      return action.type;
    case 'ADD_REPORT_DATA':
      return [...reportIntern, action.payload];
    default:
      break;
  }
};

ReportInternProvider.propTypes = {
  children: PropTypes.node,
};

export default ReportInternProvider;
