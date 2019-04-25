import React from 'react';
import PropTypes from 'prop-types';


function Breed(props) {

  const styles = {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: props.color,
    border: `1px solid ${props.color}`,
    borderRadius: '5px',
    backgroundColor: 'transparent'
  }

  const DivStyle = {
    display: 'flex',
    flexDirection: 'row'
  }

  // function onButtonClick(stat) {
  //   props.onTrain(stat);
  // }


  return(
    <div style={DivStyle}>
      <button style={styles} onClick={() => {props.onBreed()}}>Breed</button>
    </div>
  );
}

export default Breed;
