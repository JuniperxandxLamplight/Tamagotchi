import React from 'react';
import Tamagotchi from './Tamagotchi';
import Header from './Header';
import styled from 'styled-components';

function Body() {
  const BodyDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  return (
    <BodyDiv className="Body">
      <Header/>
      <Tamagotchi/>
    </BodyDiv>
  );
}

export default Body;
