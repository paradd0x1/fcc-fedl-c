// React
class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.playAudio = this.playAudio.bind(this);
    this.state = {
      qButtonRef: React.createRef(),
      qButtonAud: React.createRef(),
      wButtonRef: React.createRef(),
      wButtonAud: React.createRef(),
      eButtonRef: React.createRef(),
      eButtonAud: React.createRef(),
      aButtonRef: React.createRef(),
      aButtonAud: React.createRef(),
      sButtonRef: React.createRef(),
      sButtonAud: React.createRef(),
      dButtonRef: React.createRef(),
      dButtonAud: React.createRef(),
      zButtonRef: React.createRef(),
      zButtonAud: React.createRef(),
      xButtonRef: React.createRef(),
      xButtonAud: React.createRef(),
      cButtonRef: React.createRef(),
      cButtonAud: React.createRef(),
      display: 'ROCK AND ROLL!'
    }
  }
  playAudio(audioRef, keyId) {
    const audio = audioRef.current;
    audio.play();
    this.setState({
      display: keyId.toUpperCase()
    });
  }
  render() {
    return(
      <div className="container min-vh-100 d-flex justify-content-center align-items-center"
           id="drum-machine">
        <div className="container shadow p-5 rounded-3">
          <div className="row px-5">
            <div className="col-sm-12 col-lg-6 d-flex flex-column py-3">
              <div className="d-flex justify-content-center gap-1 py-1">
                <DrumPadKey
                  buttonRef={this.state.qButtonRef}
                  audioPlay={this.playAudio}
                  audioRef={this.state.qButtonAud}
                  drumPadKeyLetter={"Q"} 
                  drumPadKeyId={"heater-1"} 
                  drumPadKeyAudioSource={"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"}/>
                <DrumPadKey 
                  buttonRef={this.state.wButtonRef}
                  audioPlay={this.playAudio}
                  audioRef={this.state.wButtonAud}
                  drumPadKeyLetter={"W"} 
                  drumPadKeyId={"heater-2"} 
                  drumPadKeyAudioSource={"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"}/>
                <DrumPadKey 
                  buttonRef={this.state.eButtonRef}
                  audioPlay={this.playAudio}
                  audioRef={this.state.eButtonAud}
                  drumPadKeyLetter={"E"} 
                  drumPadKeyId={"heater-3"} 
                  drumPadKeyAudioSource={"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"}/>
              </div>
              <div className="d-flex justify-content-center gap-1 py-1">
                <DrumPadKey 
                  buttonRef={this.state.aButtonRef}
                  audioPlay={this.playAudio}
                  audioRef={this.state.aButtonAud}
                  drumPadKeyLetter={"A"} 
                  drumPadKeyId={"heater-4"} 
                  drumPadKeyAudioSource={"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"}/>
                <DrumPadKey 
                  buttonRef={this.state.sButtonRef}
                  audioPlay={this.playAudio}
                  audioRef={this.state.sButtonAud}
                  drumPadKeyLetter={"S"} 
                  drumPadKeyId={"clap"} 
                  drumPadKeyAudioSource={"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"}/>
                <DrumPadKey 
                  buttonRef={this.state.dButtonRef}
                  audioPlay={this.playAudio}
                  audioRef={this.state.dButtonAud}
                  drumPadKeyLetter={"D"} 
                  drumPadKeyId={"open-hh"} 
                  drumPadKeyAudioSource={"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"}/>
              </div>
              <div className="d-flex justify-content-center gap-1 py-1">
                <DrumPadKey 
                  buttonRef={this.state.zButtonRef}
                  audioPlay={this.playAudio}
                  audioRef={this.state.zButtonAud}
                  drumPadKeyLetter={"Z"} 
                  drumPadKeyId={"kick-n-hat"} 
                  drumPadKeyAudioSource={"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"}/>
                <DrumPadKey 
                  buttonRef={this.state.xButtonRef}
                  audioPlay={this.playAudio}
                  audioRef={this.state.xButtonAud}
                  drumPadKeyLetter={"X"} 
                  drumPadKeyId={"kick"} 
                  drumPadKeyAudioSource={"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"}/>
                <DrumPadKey 
                  buttonRef={this.state.cButtonRef}
                  audioPlay={this.playAudio}
                  audioRef={this.state.cButtonAud}
                  drumPadKeyLetter={"C"} 
                  drumPadKeyId={"closed-hh"} 
                  drumPadKeyAudioSource={"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"}/>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6 py-5 d-flex align-items-center" 
                 id="display">
              <DrumPadDisplay display={this.state.display}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class DrumPadKey extends React.Component {
  constructor(props) {
    super(props);
    this.handleTrigger = this.handleTrigger.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSoundEnded = this.handleSoundEnded.bind(this);
    this.button = this.props.buttonRef;
  }
  
  handleTrigger() {
    const audio = this.props.audioRef;
    const keyId = this.props.drumPadKeyId;
    this.props.audioPlay(audio, keyId);
  }
  
  handleKeyDown(e) {
    const pressed = e.key.toUpperCase();
    if( pressed == this.props.drumPadKeyLetter ) {
      this.handleTrigger();
      this.button.current.classList.add('active');
    }
  }
  
  handleSoundEnded() {
    const button = this.props.buttonRef.current;
    this.button.current.classList.remove('active');
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    this.props.audioRef.current.addEventListener('ended', this.handleSoundEnded);
  }
  
  render() {
    return (
        <button 
          ref={this.props.buttonRef}
          type="button" 
          className="drum-pad btn btn-outline-dark" 
          style={{width: 100, height: 100}}
          id={this.props.drumPadKeyId}
          onClick={this.handleTrigger}>
        
          {this.props.drumPadKeyLetter}
          <audio 
            ref={this.props.audioRef} 
            src={this.props.drumPadKeyAudioSource} 
            className="clip" 
            id={this.props.drumPadKeyLetter}/>
        
        </button>
    );
  }
}

class DrumPadDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container-fluid d-flex align-items-center justify-content-center rounded-2 bg-dark text-light h-100">
        <div className="container py-5 d-flex justify-content-center fs-3 fw-bold">{this.props.display}</div>
      </div>
    );
  }
}

const root = document.getElementById('root');
ReactDOM.render(<DrumMachine />, root);
