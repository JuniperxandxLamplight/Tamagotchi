import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {

  function onButtonClick() {
    props.onUpdateStat(props.stat, props.otherStats);
  }

  return(
    <div>
      <button onClick={onButtonClick}>{props.stat}</button>
    </div>
  );
}

Button.propTypes = {
  stat: PropTypes.string.isRequired
}

export default Button;
