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
      },
      colors: {
        feed: "yellow",
        play: "yellow",
        sleep: "yellow"
      },
      tamagotchiAlive: true,
      tamagotichiSkin: null
    }
    this.handleUpdateStat = this.handleUpdateStat.bind(this);
    this.restart = this.restart.bind(this);
    this.backgroundColors = [ 'gray', 'blue', 'pink', 'green', 'rebeccapurple', 'crimson', 'darkorange', 'gold'];
    this.borderColors = ['black', 'navy', 'deeppink', 'black', 'indigo', 'maroon', 'tomato', 'chocolate'];
    this.colorSelection = [Math.floor(Math.random() * this.backgroundColors.length)];
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
    if (newTamagotchi.feed <= 0) { newTamagotchi.feed = 0 };
    if (newTamagotchi.play <= 0) { newTamagotchi.play = 0 };
    if (newTamagotchi.sleep <= 0) { newTamagotchi.sleep = 0 };
    this.setState({tamagotchiHealth: newTamagotchi});
    this.statusCheck();
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
    this.statusCheck();
  }

  statusCheck(){
    const newTamagotchi = this.state.colors;
    for(let stat in this.state.tamagotchiHealth){
      if (this.state.tamagotchiHealth[stat] === 0) {
        this.tamagotchiDeath();
      }
      else if (this.state.tamagotchiHealth[stat] <= 3){
        newTamagotchi[stat] = "red";
      } else if (this.state.tamagotchiHealth[stat] >= 7) {
        newTamagotchi[stat] = "green";
      } else {
        newTamagotchi[stat] = "yellow";
      }
    }
    this.setState({colors: newTamagotchi});
  }

  tamagotchiDeath() {
    clearInterval(this.waitDecrementStats);
    this.setState({tamagotchiAlive: false})
  }

  restart() {
    const newTamagotchi = this.state.tamagotchiHealth;
    newTamagotchi.feed = 5;
    newTamagotchi.play = 5;
    newTamagotchi.sleep = 5;
    this.setState({tamagotchiHealth: newTamagotchi});
    this.setState({tamagotchiAlive: true});
    this.statusCheck();
  }

  render(){


    const ButtonDiv = styled.div`
      display: flex;
      width: 200px;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      height: 100px;
    `;
    const TamagotchiStyle = styled.div`
      width: 300px;
      height: 500px;
      border: 2px solid ${this.borderColors[this.colorSelection]};
      border-radius: 100px;
      background-color: ${this.backgroundColors[this.colorSelection]};
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      margin: 0;
    `;
    const ScreenStyle = styled.div`
      width: 200px;
      height: 300px;
      border: 2px solid ${this.borderColors[this.colorSelection]};
      border-radius: 50px;
      overflow: hidden;
      background-color: lightgray;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-around;
      margin-bottom: 25px;
    `;
    const RestartDiv = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100px;
    `;
    const RestartButton = {
      fontSize: '1.5rem',
      color: this.borderColors[this.colorSelection],
      border: `1px solid ${this.borderColors[this.colorSelection]}`,
      borderRadius: '5px',
      backgroundColor: 'transparent'
    };

    let VisibleButtons = {};
    let VisibleStats = {};
    if (this.state.tamagotchiAlive) {
      VisibleButtons =
      <ButtonDiv>
        <Button color={this.borderColors[this.colorSelection]} stat="feed" otherStats={["play", "sleep"]} onUpdateStat={this.handleUpdateStat}/>
        <Button color={this.borderColors[this.colorSelection]} stat="play" otherStats={["feed", "sleep"]} onUpdateStat={this.handleUpdateStat}/>
        <Button color={this.borderColors[this.colorSelection]} stat="sleep" otherStats={["feed", "play"]} onUpdateStat={this.handleUpdateStat}/>
      </ButtonDiv>;
      VisibleStats = <Stats colors={this.state.colors} stats={this.state.tamagotchiHealth}/>;

    } else {
      VisibleButtons = <RestartDiv><button style={RestartButton} onClick={this.restart}>Buy a new pet</button></RestartDiv>;
      VisibleStats = <h1>Dead</h1>;
    }

    return(
      <TamagotchiStyle>
        <ScreenStyle>
          {VisibleStats}
        </ScreenStyle>
        {VisibleButtons}
      </TamagotchiStyle>
    );
  }
}
export default Tamagotchi;
