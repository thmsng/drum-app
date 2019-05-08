import React, { Component } from 'react';

const data={
  bankOne: [{
      keyCode: 81,
      keyTrigger: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    }, {
      keyCode: 87,
      keyTrigger: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    }, {
      keyCode: 69,
      keyTrigger: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    }, {
      keyCode: 65,
      keyTrigger: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    }, {
      keyCode: 83,
      keyTrigger: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    }, {
      keyCode: 68,
      keyTrigger: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    }, {
      keyCode: 90,
      keyTrigger: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    }, {
      keyCode: 88,
      keyTrigger: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    }, {
      keyCode: 67,
      keyTrigger: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    },
  ]
  ,
  bankTwo : [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }]

}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      bank: ["bankOne","bankTwo"],
      powerOn: true,
      volume: 0.5
    }
    this.changeBank = this.changeBank.bind(this)
    this.setVolume = this.setVolume.bind(this)
    this.changePower = this.changePower.bind(this)
  }

  changeBank(){
    if (this.state.powerOn) {
      if (this.state.bank[0] === "bankTwo") {
        this.setState({
          bank: ["bankOne","bankTwo"]
        })
      }
      else {
        this.setState({
          bank: ["bankTwo","bankOne"]
        })
      }
    }
  }

  changePower() {
    this.setState({
      powerOn : !this.state.powerOn
    })
  }

  setVolume() {
    if (this.state.powerOn) {
      const vol = document.getElementById("volume-button").value
      //console.log(vol)
      this.setState({
        volume: vol
      })

    }
  }

  render() {
  let changePower = (<div></div>)
    if (this.state.powerOn) {
      changePower = (<button id="change-power" onClick={this.changePower} style={{backgroundColor: "lightgreen"}}>On</button>)
    }
    else {
      changePower = (<button id="change-power" onClick={this.changePower} style={{backgroundColor: "lightgrey"}}>Off</button>)
    }

    return (
      <div id="drum-machine">
        <div className="title">Drum App by Thomas Nguyen</div>
        <div id="display">
          <BankPads info={data[this.state.bank[0]]}
                    volume={this.state.volume}
                    power={this.state.powerOn}/>
          <div className="control-panel">
            {changePower}
            <button id="change-sound" className={this.state.bank[0]} onClick={this.changeBank}>Change Sound</button>
            <input id="volume-button" onChange={this.setVolume} type="range" step="0.01" min="0" max="0.99" value={this.state.volume}></input>
            <span className="volume-number">Volume: {("0" + Math.floor(this.state.volume*100)).slice(-2)}</span>
            <span id="display-text"></span>
          </div>
        </div>
      </div>
    )
  }
}

export default App;

class BankPads extends Component {
  constructor(props) {
    super(props)
    //console.log(this.props.info)
  }

  render() {
    const bankPds = this.props.info.map((e) => {
      return (
        <SinglePad  keyCode={e.keyCode}
                    keyTrigger={e.keyTrigger}
                    src={e.url}
                    id={e.id}
                    volume={this.props.volume}
                    powerOn={this.props.power}/>
      )
    })
    //console.log(bankPds,"bankPds")
    return(
      <div className="bank-pads">
        {bankPds}
      </div>
    )
  }
}


class SinglePad extends Component {
  constructor(props) {
    super(props)
    //console.log(this.props,"singelpad")
    this.playSound = this.playSound.bind(this)
    this.handleKeyPressed = this.handleKeyPressed.bind(this)
  }

  playSound() {
    if (this.props.powerOn) {
      let sound = document.getElementById(this.props.keyTrigger)
      sound.volume = this.props.volume
      sound.play()
      //console.log("soundplayed")
      let text = document.getElementById("display-text")
      text.innerHTML = this.props.id
      //console.log(this.props.id)
      let titleColor = document.querySelector(".title")
      titleColor.style.color = "#"+Math.floor(Math.random()*16777215).toString(16)
    }
  }

  handleKeyPressed(e) {
    //console.log("key pressed")
    if (e.keyCode === this.props.keyCode) {
      this.playSound()
    }
  }



  render() {
    document.addEventListener('keydown', this.handleKeyPressed)

    return(
      <div className="drum-pad" id={this.props.keyCode} onClick={this.playSound}>
        <audio id={this.props.keyTrigger} className="clip" src={this.props.src}>  </audio>
        {this.props.keyTrigger}
      </div>
    )
  }

}
