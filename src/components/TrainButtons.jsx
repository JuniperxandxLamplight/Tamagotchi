import React from 'react';
import PropTypes from 'prop-types';


function TrainButtons(props) {

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

  // function onTrainButtonsClick(stat) {
  //   props.onTrain(stat);
  // }


  return(
    <div style={DivStyle}>
      <button style={styles} onClick={() => {props.onTrain('str')}}>run</button>
      <button style={styles} onClick={() => {props.onTrain('int')}}>study</button>
    </div>
  );
}

export default TrainButtons;
