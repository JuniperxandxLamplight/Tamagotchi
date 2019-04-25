import React from 'react';
import Stats from './Stats';
import Button from './Button';
import styled from 'styled-components';
import TrainButtons from './TrainButtons';
import Breed from './Breed';

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
        str: 1,
        int: 1,
        canTrain: false,
        canBreed: false,
        canFight: false,
        birthday: 1,
        tamagotchiAlive: true,
        tamagotichiSkin: null
      },
      colors: {
        feed: "yellow",
        play: "yellow",
        sleep: "yellow"
      }
    }
    this.handleUpdateStat = this.handleUpdateStat.bind(this);
    this.handleTraining = this.handleTraining.bind(this);
    this.restart = this.restart.bind(this);
    this.backgroundColors = [ 'gray', 'blue', 'pink', 'green', 'rebeccapurple', 'crimson', 'darkorange', 'gold'];
    this.borderColors = ['black', 'navy', 'deeppink', 'black', 'indigo', 'maroon', 'tomato', 'chocolate'];
    this.colorSelection = [Math.floor(Math.random() * this.backgroundColors.length)];
  }

  ageUp() {
    const newState = {...this.state}.tamagotchiInfo;
    newState.age += 1;
    this.setState({tamagotchiInfo: newState});
  }

  componentDidMount() {
    this.waitDecrementStats = setInterval(() =>
      this.decrementStats(),
      (9 + this.state.tamagotchiInfo.int) * 100
    );
  }

  decrementStats() {
    const newState = {...this.state};
    newState.tamagotchiHealth.feed -=0.1;
    newState.tamagotchiHealth.play -=0.1;
    newState.tamagotchiHealth.sleep -=0.1;
    if (newState.tamagotchiHealth.feed <= 0) { newState.tamagotchiHealth.feed = 0 };
    if (newState.tamagotchiHealth.play <= 0) { newState.tamagotchiHealth.play = 0 };
    if (newState.tamagotchiHealth.sleep <= 0) { newState.tamagotchiHealth.sleep = 0 };
    this.setState({tamagotchiHealth: newState.tamagotchiHealth});
    this.statusCheck();
    let isBirthday = newState.tamagotchiInfo.birthday;
    if (isBirthday % 20 === 0){
      this.ageUp();
    }
    newState.tamagotchiInfo.birthday += 1;
    this.setState({tamagotchiInfo: newState.tamagotchiInfo});
  }

  handleTraining(stat){
    const newState = {...this.state};
    newState.tamagotchiInfo[stat] += 1;
    for (stat in newState.tamagotchiHealth) {
      newState.tamagotchiHealth[stat] -= 1;
      if (newState[stat] <= 0) {
        newState[stat] = 0
      };
    }
    this.setState({newState});
    this.statusCheck();
  }

  handleUpdateStat(stat, otherStats) {
    const newState = {...this.state}.tamagotchiHealth;
    newState[stat] += 1;
    if (newState[stat] >= 10) { newState[stat] = 10 };
    for (let i = 0; i < otherStats.length; i++) {
      const currentStat = otherStats[i];
      newState[currentStat] -= 0.1;
      if (newState[currentStat] <= 0) {
        newState[currentStat] = 0
      };
    }
    this.setState({tamagotchiHealth: newState});
    this.statusCheck();
  }


  statusCheck(){
    const newState = {...this.state};
    for(let stat in newState.tamagotchiHealth){
      if (newState.tamagotchiHealth[stat] === 0) {
        this.tamagotchiDeath();
      }
      else if (newState.tamagotchiHealth[stat] <= 3){
        newState.colors[stat] = "red";
      } else if (newState.tamagotchiHealth[stat] >= 7) {
        newState.colors[stat] = "green";
      } else {
        newState.colors[stat] = "yellow";
      }
    }
    if (this.state.tamagotchiInfo.age >= 1 && (this.state.tamagotchiHealth.feed > 3 && this.state.tamagotchiHealth.play > 3 && this.state.tamagotchiHealth.sleep > 3)) {
      newState.tamagotchiInfo.canTrain = true;
    } else {
      newState.tamagotchiInfo.canTrain = false;
    }
    this.setState({colors: newState.colors});


  }

  tamagotchiDeath() {
    clearInterval(this.waitDecrementStats);
    const newState = {...this.state}.tamagotchiInfo;
    newState.tamagotchiAlive = false;
    this.setState({tamagotchiInfo: newState});
  }

  restart() {
    const newState = {...this.state};
    newState.tamagotchiHealth.feed = 5;
    newState.tamagotchiHealth.play = 5;
    newState.tamagotchiHealth.sleep = 5;
    newState.tamagotchiInfo.tamagotchiAlive = true;
    newState.tamagotchiInfo.age = 0;
    newState.tamagotchiInfo.str = 0;
    newState.tamagotchiInfo.int = 0;
    newState.tamagotchiInfo.canBreed = false;
    newState.tamagotchiInfo.canFight = false;
    newState.tamagotchiInfo.canTrain = false;
    this.setState({tamagotchiHealth: newState.tamagotchiHealth});
    this.setState({tamagotchiInfo: newState.tamagotchiInfo});
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
    let Training = {};
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
    if (this.state.tamagotchiInfo.canTrain) {
      Training = <TrainButtons color={this.borderColors[this.colorSelection]} onTrain={this.handleTraining} />

    } else {
      Training = <div />;
    }

    return(
      <TamagotchiStyle>
        <h1>{this.state.tamagotchiInfo.age} years old</h1>
        <ScreenStyle>
          {VisibleStats}
        </ScreenStyle>
        {VisibleButtons}
        {Training}
      </TamagotchiStyle>
    );
  }
}
export default Tamagotchi;
