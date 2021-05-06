import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Logout({clearUser}) {
  useEffect(() => {
    async function logout() {
      
      const config = {
        method: 'GET',
        credentials: 'include'
      }
  
      const URL = 'http://localhost/harjoitustyo/logout.php/';
      try {
        await fetch(URL,config);
        clearUser();
      } catch (error) {
        alert(error);
      }
    }
    logout();
  }, [])


  return (
    <>
      <div className="row d-flex justify-content-center" >
          <div className="col-md-8 col-lg-6">
              <div className="customLoginBorder  p-4 my-3">
                  <h3 className="text-center">Olet kirjautunut ulos</h3>
                  <div className="text-center mt-4">
                    <Link className="" to="/Kayttaja">
                      <i className="fa fa-genderless" aria-hidden="true"></i>
                      Kirjaudu sisään
                    </Link>
                  </div>
                  <div className="text-center mt-3">
                    <Link className="" to="/">
                      <i className="fa fa-genderless" aria-hidden="true"></i>
                      Takaisin etusivulle
                    </Link>
                  </div>
                  <div className="col-12 my-2"></div>
              </div>
          </div>
      </div>
    </>
    
  )
}