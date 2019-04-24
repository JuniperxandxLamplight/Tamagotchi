import React from 'react';
import Stats from './Stats';
import Button from './Button';
import styled from 'styled-components';

class Tamagotchi extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tamagotchiHealth: {
        feed: 5,
        play: 5,
        sleep: 5
      }
    }
    this.handleUpdateStat = this.handleUpdateStat.bind(this);
  }

  componentDidMount() {
    this.waitDecrementStats = setInterval(() =>
      this.decrementStats(),
      10000
    );
  }

  decrementStats() {
    const newTamagotchi = this.state.tamagotchiHealth;
    newTamagotchi.feed -=1;
    newTamagotchi.play -=1;
    newTamagotchi.sleep -=1;
    this.setState({tamagotchiHealth: newTamagotchi});
  }

  handleUpdateStat(stat, otherStats) {
    const newTamagotchi = this.state.tamagotchiHealth;
    newTamagotchi[stat] += 3;
    if (newTamagotchi[stat] >= 10) { newTamagotchi[stat] = 10 };
    for(let i=0; i<otherStats.length; i++){
      const currentStat = otherStats[i];
      newTamagotchi[currentStat] -= 1;
      if (newTamagotchi[currentStat] <= 0) { newTamagotchi[currentStat] = 0 };
    }
    this.setState({tamagotchiHealth: newTamagotchi});
    console.log(this.state.tamagotchiHealth);
  }


  render(){
    const ButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    `;
    const TamagotchiStyle = styled.div`
      width: 300px;
      height: 600px;
      border: 2px solid gold;
      border-radius: 75% 75% 150px 150px;
      background-color: rgba(0,0,0,0.75);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `;
    const ScreenStyle = styled.div`
      width: 200px;
      height: 300px;
      border: 2px solid gold;
      background-color: lightgrey;

    `;
    return(
      <TamagotchiStyle>
        <ScreenStyle>
          <Stats stats={this.state.tamagotchiHealth}/>
        </ScreenStyle>
        <ButtonDiv>
          <Button stat="feed" otherStats={["play", "sleep"]} onUpdateStat={this.handleUpdateStat}/>
          <Button stat="play" otherStats={["feed", "sleep"]} onUpdateStat={this.handleUpdateStat}/>
          <Button stat="sleep" otherStats={["feed", "play"]} onUpdateStat={this.handleUpdateStat}/>
        </ButtonDiv>
      </TamagotchiStyle>
    );
  }
}
export default Tamagotchi;
