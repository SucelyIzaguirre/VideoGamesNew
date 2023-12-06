import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Navbar from './Components/Navbar';
import Categoria from './Components/Pages/Categoria';
import Nosotros from './Components/Pages/Nosotros';
import Edit from "./Components/edit";
import Create from "./Components/CrearBlog"; 
import DetalleBlog from './Components/DetalleBlog';
import BlogList from './Components/BlogList'; // Importa el componente BlogList
import PerfilUser from './Components/PerfilUser'; // Importa el componente UserProfile

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home} />
          <Route path='/categoria' Component={Categoria} />
          <Route path='/nosotros' Component={Nosotros} />
          <Route path='/blogs' element={<BlogList />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/detalleblog/:id" element={<DetalleBlog />} />
          <Route path="/perfiluser" element={<PerfilUser />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;


/*1.BrowserRouter es un componente de React Router DOM que envuelve toda la aplicación y permite que los componentes de la 
    aplicación se comuniquen con la barra de direcciones del navegador.
  2.Router es un componente de React Router DOM que se utiliza para definir las rutas de la aplicación.
  3.Routes es un componente de React Router DOM que se utiliza para definir las rutas y los componentes que se renderizarán
   cuando se visite una ruta específica. En este caso, el componente Navbar se renderiza cuando se visita la ruta principal del sitio web.
  4. Renderizar es el proceso de mostrar el contenido de un componente en la pantalla. En React, esto se hace utilizando 
  ReactDOM.render(). El método renderiza un componente en un elemento HTML específico en la página web. */

  /*Cada ruta se define utilizando el componente “Route”. La propiedad “path” se utiliza para definir 
  la URL de la ruta. La propiedad “Component” se utiliza para definir el componente que se renderizará 
  cuando se visite la ruta. */ 
  