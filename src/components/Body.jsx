import React from 'react';
import Tamagotchi from './Tamagotchi';
import Header from './Header';
import styled from 'styled-components';

class Body extends React.Component {

  constructor() {
    super();
    this.state = {
      tamagotchiList: {

      }
    }
  }

  render() {
    const BodyDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `;
    const TamagotchiHolder = styled.div`
      margin-top: 200px;
      width: 100%;
      display: flex;
      flex-flow: wrap row;
    `;
    return (
      <BodyDiv className="Body">
        <Header/>
        <TamagotchiHolder>
          <Tamagotchi/>
        </TamagotchiHolder>
      </BodyDiv>
    );
  }
}

export default Body;
