import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  render() {
    return(
      <div className='App'>
        <Navigation />
        <ImageLinkForm onInputChange={this.onInputChange} />
        {/*<FaceRecognition />*/}
        <ParticlesBg type='cobweb' bg={true} color='#0FF0FC' />
      </div>
    );
  };
}

export default App;
