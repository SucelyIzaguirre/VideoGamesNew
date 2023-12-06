import React from "react";
import './footer.css';
import { Button } from './Buttonlogin';
import { Link } from 'react-router-dom';

function Footer() {
    return (

        <div className='footer-container'>
            <section className='footer-subcription'>
                <p className='footer-subcription-heading'>
                    Unete a esta aventura donde podras conocer diferentes historias y nuevas personas
                </p>
                <p className='footer-subscription-text'>
                    Puedes buscarnos en redes sociales y subscribirte
                </p>
                <div className='input-areas'>
                    <form>
                        <input
                            className ='footer-input'
                            name = 'email'
                            type = 'email'
                            placeholder="Your Email">
                        </input>
                        <Button buttonStyle='btn--outline'>Subscribete</Button>
                    </form>
                </div>
            </section>
            <div class='footer-links'>
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                        <h2>Sobre Nosotros</h2>
                        <Link to='/sign-up'>Contactanos</Link>
                        <Link to='/'>Testimonios</Link>
                        <Link to='/'>Carrera Profesional</Link>
                        <Link to='/'>Condiciones de Uso</Link>
                        <Link to='/'>Terminos de Uso</Link>
                    </div>
                    <div class='footer-link-items'>
                        <h2>Contactanos</h2>
                        <Link to='/'>Contacto</Link>
                        <Link to='/'>Soporte</Link>
                        <Link to='/'>Destinos</Link>
                        <Link to='/'>Patrocinadores</Link>
                    </div>
                    <div class='footer-link-items'>
                        <h2>Videos</h2>
                        <Link to='/'>Comparte un video</Link>
                        <Link to='/'>Embajadores</Link>
                        <Link to='/'>Agencia</Link>
                        <Link to='/'>Influencers</Link>
                    </div>
                    <div class='footer-link-items'>
                        <h2>Redes Sociales</h2>
                        <Link to='/'>Instagram</Link>
                        <Link 
                        to='https://www.facebook.com/'
                        target="_blank">
                            Facebook
                        </Link>
                        <Link to='/'>Youtube</Link>
                        <Link to='/'>Twitter</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div class = 'social-media-wrap'>
                    <div class = 'footer-logo'>
                        <Link to='/' className='social-logo'>
                            VideoGames News
                            <i class='fa-solid fa-pen-fancy'/>
                        </Link>
                    </div>
                    <small class='websight-rights'>
                        VideoGames News©2023
                    </small>
                    <div class='social-icons'>
                        <Link
                            class='social-icon-link facebook'
                            to='https://www.facebook.com/'
                            target="_blank"
                            aria-label='Facebook'
                        >
                            <i class='fa-brands fa-facebook'/>    
                        </Link>
                        <Link
                            class='social-icon-link instagram'
                            to='https://www.instagram.com/'
                            target="_blank"
                            aria-label='Instagram'
                        >
                            <i class='fa-brands fa-instagram'/>    
                        </Link>
                        <Link
                            class='social-icon-link youtube'
                            to='https://www.youtube.com/'
                            target="_blank"
                            aria-label='Facebook'
                        >
                            <i class='fab fa-youtube'/>    
                        </Link>
                        <Link
                            class='social-icon-link twitter'
                            to='https://www.twitter.com/'
                            target="_blank"
                            aria-label='Twitter'
                        >
                            <i class='fab fa-twitter'/>    
                        </Link>
                        <Link
                            class='social-icon-link linkedin'
                            to='https://www.linkedin.com/'
                            target="_blank"
                            aria-label='Linkedin'
                        >
                            <i class='fab fa-linkedin'/>    
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer;