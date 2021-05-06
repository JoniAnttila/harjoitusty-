import { Route,  Switch } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Kayttaja from './Kayttaja';
import LoginSuccessful from './LoginSuccessful';
import AccountSettings from './AccountSettings';
import UlosKirjautuminen from './UlosKirjautuminen';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import './App.css';



function App() {
  const [user, setUser] = useState(null);

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
          <Route path="/Kayttaja" render={() => <Kayttaja setUser={setUser} setUserStorage={setUserStorage} />} />
          <Route path="/LoginSuccessful" render={() => <LoginSuccessful user={user} />} />
          <Route path="/AccountSettings" render={() => <AccountSettings user={user} />} />
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
