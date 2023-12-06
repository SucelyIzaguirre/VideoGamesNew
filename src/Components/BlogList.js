import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './blogList.css';

const Blog = (props) => {
  const { isAuthenticated } = useAuth0();

  const handleDetailsClick = (event) => {
    if (!isAuthenticated) {
      event.preventDefault();
      window.alert('Inicia sesión para seguir navegando y contar anecdotas');
    }
  }

  return (
    <div className="blog-card">
      <h3>{props.blog.titulo}</h3>
      <p>{props.blog.contenido.substring(0, 100) + "..."}</p>
      <Link className="btn btn-link" to={`/detalleblog/${props.blog._id}`} onClick={handleDetailsClick}>
        Detalles del Blog
      </Link>
      <div className="blog-footer">
        {props.blog.fechaCreacion}
      </div>
    </div>
  );
};

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("titulo");

  async function getBlogs(skip = 0) {
    const response = await fetch(`http://localhost:3000/Blog?skip=${skip}`);

    if (!response.ok) {
      const message = `SE HA PRODUCIDO UN ERROR: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const newBlogs = await response.json();
    newBlogs.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
    setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
  }

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      getBlogs(blogs.length);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blogs.length]);

  function blogList() {
    const filteredBlogs = blogs.filter((blog) => {
      if (searchText==null || blog.titulo==null) {
        return false;
      }
      const regex = new RegExp(`\\b${searchText.toLowerCase()}\\b`);
      return regex.test(blog.titulo.toLowerCase());
    });

    if (filteredBlogs.length === 0) {
      return <p>No se encontraron blogs que coincidan con su búsqueda</p>;
    }

    return filteredBlogs.map((blog) => {
      return (
        <Blog
          blog={blog}
          key={blog._id}
        />
      );
    });
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchFieldChange = (e) => {
    setSearchField(e.target.value);
    setSearchText("");
  };

  return (
    <div className="BlogList">
      <div className="container">
      <input type="textt" placeholder="Busca por categoría o frase..." onChange={handleSearchChange}></input>
        <div className="btnn">
          <i className="fa fa-search"></i>
        </div>
      </div>

      <h3>Listado de Blogs</h3>

      <div className="blog-grid">
        {blogList()}
      </div>
    </div>
  );
}