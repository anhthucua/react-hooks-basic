import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
  onSubmit: null
}

function PostFiltersForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutRef = useRef(null); // tao ra 1 object, ko thay doi giua nhung lan render

  function handleSearchTermChange(e) {
    const value = e.target.value;
    setSearchTerm(value);

    if (!onSubmit) return;

    // SET -- 100 -- CLEAR, SET --- 300  -> SUBMIT
    // SET -- 300 --> SUBMIT 
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = {
        searchTerm: value,
      };
      onSubmit(formValues);
    }, 300)
  }

  return (
    <form action="">
      <label>Search</label>
      <input 
        type="text" 
        onChange={handleSearchTermChange}
        value={searchTerm}
      />
    </form>
  );
}

export default PostFiltersForm;