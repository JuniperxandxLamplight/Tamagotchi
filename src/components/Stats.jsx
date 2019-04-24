import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Stats(props) {
  const StatsDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
  `;

  const FeedStyle = {
    backgroundColor: props.colors.feed,
    width: '20px',
    height: props.stats.feed * 10 + 'px'
  };

  const PlayStyle = {
    backgroundColor: props.colors.play,
    width: '20px',
    height: props.stats.play * 10 + 'px'
  };

  const SleepStyle = {
    backgroundColor: props.colors.sleep,
    width: '20px',
    height: props.stats.sleep * 10 + 'px'
  };

  return(
    <StatsDiv>
      <div style={FeedStyle}></div>
      <div style={PlayStyle}></div>
      <div style={SleepStyle}></div>
    </StatsDiv>
  );
}

Stats.propTypes = {
  feed: PropTypes.number,
  play: PropTypes.number,
  sleep: PropTypes.number
}

export default Stats;
