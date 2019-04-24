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
      tamagotchiInfo: {
        age: 0,
        str: 0,
        int: 0,
        canTrain: false,
        canBreed: false,
        canFight: false,
        birthday: false,
        tamagotchiAlive: true,
        tamagotichiSkin: null
      },
      colors: {
        feed: "yellow",
        play: "yellow",
        sleep: "yellow"
      },
    }
    this.handleUpdateStat = this.handleUpdateStat.bind(this);
    this.restart = this.restart.bind(this);
    this.backgroundColors = [ 'gray', 'blue', 'pink', 'green', 'rebeccapurple', 'crimson', 'darkorange', 'gold'];
    this.borderColors = ['black', 'navy', 'deeppink', 'black', 'indigo', 'maroon', 'tomato', 'chocolate'];
    this.colorSelection = [Math.floor(Math.random() * this.backgroundColors.length)];
  }

  ageUp() {
    const newTamagotchi = {...this.state}.tamagotchiInfo;
    newTamagotchi.age += 1;
    this.setState({tamagotchiInfo: newTamagotchi});
  }

  componentDidMount() {
    this.waitDecrementStats = setInterval(() =>
      this.decrementStats(),
      10000
    );
  }

  decrementStats() {
    const newTamagotchi = {...this.state}.tamagotchiHealth;
    newTamagotchi.feed -=1;
    newTamagotchi.play -=1;
    newTamagotchi.sleep -=1;
    if (newTamagotchi.feed <= 0) { newTamagotchi.feed = 0 };
    if (newTamagotchi.play <= 0) { newTamagotchi.play = 0 };
    if (newTamagotchi.sleep <= 0) { newTamagotchi.sleep = 0 };
    this.setState({tamagotchiHealth: newTamagotchi});
    this.statusCheck();
    let isBirthday = {...this.state}.birthday;
    if (isBirthday){
      this.ageUp();
    }
    this.setState({birthday: !isBirthday});
  }

  handleUpdateStat(stat, otherStats) {
    const newTamagotchi = {...this.state}.tamagotchiHealth;
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
    const newTamagotchi = {...this.state};
    for(let stat in newTamagotchi.tamagotchiHealth){
      if (newTamagotchi.tamagotchiHealth[stat] === 0) {
        this.tamagotchiDeath();
      }
      else if (newTamagotchi.tamagotchiHealth[stat] <= 3){
        newTamagotchi.colors[stat] = "red";
      } else if (newTamagotchi.tamagotchiHealth[stat] >= 7) {
        newTamagotchi.colors[stat] = "green";
      } else {
        newTamagotchi.colors[stat] = "yellow";
      }
    }
    this.setState({colors: newTamagotchi.colors});
  }

  tamagotchiDeath() {
    clearInterval(this.waitDecrementStats);
    const newTamagotchi = {...this.state}.tamagotchiInfo;
    newTamagotchi.tamagotchiAlive = false;
    this.setState({tamagotchiInfo: newTamagotchi});
  }

  restart() {
    const newTamagotchi = {...this.state};
    newTamagotchi.tamagotchiHealth.feed = 5;
    newTamagotchi.tamagotchiHealth.play = 5;
    newTamagotchi.tamagotchiHealth.sleep = 5;
    newTamagotchi.tamagotchiInfo.tamagotchiAlive = true;
    newTamagotchi.tamagotchiInfo.age = 0;
    newTamagotchi.tamagotchiInfo.str = 0;
    newTamagotchi.tamagotchiInfo.int = 0;
    newTamagotchi.tamagotchiInfo.canBreed = false;
    newTamagotchi.tamagotchiInfo.canFight = false;
    newTamagotchi.tamagotchiInfo.canTrain = false;
    this.setState({tamagotchiHealth: newTamagotchi.tamagotchiHealth});
    this.setState({tamagotchiInfo: newTamagotchi.tamagotchiInfo});
    this.statusCheck();
    this.waitDecrementStats = setInterval(() =>
      this.decrementStats(),
      10000
    );
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
      margin-bottom: 20px;
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
    if (this.state.tamagotchiInfo.tamagotchiAlive) {
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
        <h1>{this.state.tamagotchiInfo.age} years old</h1>
        <ScreenStyle>
          {VisibleStats}
        </ScreenStyle>
        {VisibleButtons}
      </TamagotchiStyle>
    );
  }
}
export default Tamagotchi;
