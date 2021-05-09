import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({user}) {

  function userName() {
        
    if (user !== null) {
        return user.fname;
      } else {
        let kirjaudu = "";
        return kirjaudu;
      } 
    }

    function listaus() {
      if (user === null) {
          return;
      } else {
          return  <li className="nav-item">
          <a className="nav-link text-white bg-success" href="/UlosKirjautuminen">{userName()}</a>
        </li>;
      }
      
  }

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Harjoitustyö</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/Kayttaja">Käyttäjät</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="KsaikkiKirjat">Kirjalista</a>
              </li>
              {listaus()}
            </ul>
          </div>
        </div>
      </nav>
    )
}
