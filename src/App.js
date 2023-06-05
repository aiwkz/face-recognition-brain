import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg'
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: '',
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (userData) => {
    this.setState({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        joined: userData.joined,
      }
    })
  }

  calculateFaceLocations = (data) => {
    const clarifaiFaceData = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceLocations = clarifaiFaceData.map((region) => {
        const faceData = region.region_info.bounding_box;
        return {
          leftCol: faceData.left_col * width,
          topRow: faceData.top_row * height,
          rightCol: width - (faceData.right_col * width),
          bottomRow: height - (faceData.bottom_row * height)
        };
      });
    return faceLocations;
  }

  displayFaceBox = (boxes) => {
    console.log(boxes)
    this.setState({ boxes: boxes })
  }

  onInputChange = (event) => {
    if(!event) this.setState({ input: '' });
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })

    fetch('https://face-recognition-brain-api-gu0q.onrender.com/imageUrl', {
        method: 'post',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json'
        },
        body: this.state.input,
    })
      .then(response => response.json())
      .then(result => this.displayFaceBox(this.calculateFaceLocations(result)))
      .catch(console.log)
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className='App'>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} route={route} />
        { route === 'home' 
          ? <div>
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />
              <FaceRecognition 
                imageUrl={imageUrl} 
                boxes={boxes}
              />
            </div>
          : (
            route === 'signin' || route === 'signout'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
        <ParticlesBg type='cobweb' bg={true} color='#0FF0FC' />
      </div>
    );
  };
};

export default App;
