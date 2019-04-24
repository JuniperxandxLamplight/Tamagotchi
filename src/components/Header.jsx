import React from 'react';
import styled from 'styled-components';
function Header() {
  const Heading = styled.div`
    background-color: lightblue;
    position: fixed;
    top: 0;
    height: 200px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;
  `;
  return(
    <Heading>
      <h1>Tamagotchi!</h1>
    </Heading>
  );
}
export default Header;
