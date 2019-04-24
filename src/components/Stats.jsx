import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Stats(props) {
  const StatsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `;

  return(
    <StatsDiv>
      <h1>{props.stats.feed}</h1>
      <h1>{props.stats.play}</h1>
      <h1>{props.stats.sleep}</h1>
    </StatsDiv>
  );
}

Stats.propTypes = {
  feed: PropTypes.number,
  play: PropTypes.number,
  sleep: PropTypes.number
}

export default Stats;
