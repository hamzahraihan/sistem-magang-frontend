import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SearchTableInput = ({ value: initValue, onChange, debounce = 200 }) => {
  const [value, setValue] = useState(initValue);
  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  // * 0.2 after set value in state
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value]);

  return <input className="py-2 bg-transparent outline-none border-b-2 border-gray-300 w-1/2 focus:w-full duration-150" placeholder="Search" value={value} onChange={(e) => setValue(e.target.value)} />;
};

SearchTableInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.string,
  debounce: PropTypes.number,
};

export default SearchTableInput;
