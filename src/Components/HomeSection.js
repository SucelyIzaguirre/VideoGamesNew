import React from 'react';
import '../App.css';
import { Button } from './Buttonlogin';
import './homeSection.css';
import video from './videos/VideoGames.mp4';
import { useAuth0 } from '@auth0/auth0-react';

function HomeSection() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <div className='home-container'>
        <video src={video} autoPlay loop muted />
        <h1>EXPLORA NUEVAS HISTORIAS</h1>
        <p>¡Bienvenido al viaje más emocionante a través de nuestras historias!</p>
        <h2>¿Listo para descubrir anécdotas fascinantes y contenido exclusivo?</h2>
        <div className='home-btns'>
          <Button className='btns' buttonStyle='btn--outline'  buttonSize='btn--large' onClick={() => loginWithRedirect()}>
            BLOGUEA
          </Button>
        </div>
      </div>
      <div className='home-footer'>
      </div>
    </div>
  );
}

export default HomeSection;










/*import React from 'react';
import '../App.css';
import { Button } from './Buttonlogin';
import './homeSection.css';
import video from './videos/HS.mp4';
import Footer from './Footer';

function HomeSection() {
  return (
    <div>
      <div className='home-container'>
        <video src={video} autoPlay loop muted />
        <h1>EXPLORA NUEVAS HISTORIAS</h1>
        <p>¡Bienvenido al viaje más emocionante a través de nuestras historias!</p>
        <h2>¿Listo para descubrir anécdotas fascinantes y contenido exclusivo?</h2>
        <div className='home-btns'>
          <Button className='btns' buttonStyle='btn--outline'  buttonSize='btn--large'  >
            BLOGUEA
          </Button>
        </div>
        
      </div>
      <div className='home-footer'>
        <Footer />
      </div>
    </div>
  );
}

export default HomeSection;




/* <Button
                    className='btns'
                    buttonStyle='btn--primary'
                    buttonSize='btn--large'
                    onClick={console.log('hey')}
                >
                MIRA EL TRAILER<i className='far fa-play-circle' />
                </Button> */