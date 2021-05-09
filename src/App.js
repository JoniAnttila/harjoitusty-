import { Route,  Switch, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Kayttaja from './Kayttaja';
import KaikkiKirjat from './KaikkiKirjat';
import LoginSuccessful from './LoginSuccessful';
import AccountSettings from './AccountSettings';
import UlosKirjautuminen from './UlosKirjautuminen';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import './App.css';
import MuokkaaKirjaa from './MuokkaaKirjaa';



function App() {
  const [user, setUser] = useState(null);
  const [kirja, setKirja] = useState(null);
  let location = useLocation();

  useEffect(() => {
    if (location.state !== undefined) {
      setKirja({ id: location.state.id, nimi: location.state.nimi, hinta: location.state.hinta, kuvaus: location.state.kuvaus });
    }
  }, [location.state]);


  function setUserStorage(e) {
    const newUser = e;
    setUser(newUser);
    sessionStorage.setItem('kayttaja', JSON.stringify(newUser));
  }
  function clearUserStorage() {
    sessionStorage.clear('kayttaja');
    setUser(null);
  }


  useEffect(() => {
    if ('kayttaja' in sessionStorage) {
      setUser(JSON.parse(sessionStorage.getItem('kayttaja')))
    }
  }, [])

  return (
    <div>
      <main className="container pb-5 bg-light">
        <Header user={user}/>
        <Switch>
          <Route exact path="/"> <Content /> </Route>
          <Route path="/KaikkiKirjat" render={() => <KaikkiKirjat
            setKirja={setKirja} />}
            exact />
          <Route path="/MuokkaaKirjaa" render={() => <MuokkaaKirjaa
            kirja={kirja} />}
            exact />

          <Route path="/Kayttaja" render={() => <Kayttaja setUser={setUser} setUserStorage={setUserStorage} />} />
          <Route path="/LoginSuccessful" render={() => <LoginSuccessful user={user} exact/>} />
          <Route path="/AccountSettings" render={() => <AccountSettings user={user} exact />} />
          <Route path="/UlosKirjautuminen" render={() => <UlosKirjautuminen setUser={setUser} clearUser={clearUserStorage} />} />
        </Switch>
      </main>
      <div className="container bottomBg">
        <Footer />
      </div>
    </div>
  );
}

export default App;
