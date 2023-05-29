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

  // calculateFaceLocation = (data) => {
  //   const clarifaiFaceData = data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById('inputImage');
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   return {
  //     leftCol: clarifaiFaceData.left_col * width,
  //     topRow: clarifaiFaceData.top_row * height,
  //     rightCol: width - (clarifaiFaceData.right_col * width),
  //     bottomRow: height - (clarifaiFaceData.bottom_row * height)
  //   }
  // }

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

    const PAT = '10881e14e6ec49e185af430e206583ca';
    const USER_ID = 'aiwkz';       
    const APP_ID = 'face-recognition-brain';
    const MODEL_ID = 'face-detection';  
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
        "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
        },
        "inputs": [
          {
            "data": {
              "image": {
                "url": IMAGE_URL
              }
            }
          }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => this.displayFaceBox(this.calculateFaceLocations(result)))
      .catch(error => console.log('error', error));
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
