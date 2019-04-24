import React from 'react';
import PropTypes from 'prop-types';


function Button(props) {

  const styles = {
    fontSize: '1.5rem',
    color: props.color,
    border: `1px solid ${props.color}`,
    borderRadius: '5px',
    backgroundColor: 'transparent'
  }

  function onButtonClick() {
    props.onUpdateStat(props.stat, props.otherStats);
  }

  return(
    <div>
      <button style={styles} onClick={onButtonClick}>{props.stat}</button>
    </div>
  );
}

Button.propTypes = {
  stat: PropTypes.string.isRequired
}

export default Button;
