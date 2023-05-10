import './App.css';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'

function App() {
  return (
    <div className='App'>
      <Navigation />
      <ImageLinkForm />
      {/*<FaceRecognition />*/}
      <ParticlesBg type='cobweb' bg={true} color='#0FF0FC' />
    </div>
  );
}

export default App;
