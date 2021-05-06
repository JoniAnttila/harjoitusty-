import { useState, useEffect, React } from 'react'
import { useHistory } from 'react-router';

export default function Kayttaja({setUserStorage}) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const URL1 = 'http://localhost/harjoitustyo/readUsers.php/';
    const URL = 'http://localhost/harjoitustyo/login.php/';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const [saved, setSaved] = useState('');

    const [etunimi, setEtunimi] = useState('');
    const [sukunimi, setSukunimi] = useState('');
    const [sposti, setSposti] = useState('');
    const [salasana, setSalasana] = useState('');

    let history = useHistory();

    useEffect(() => {
        let address = URL1;
        fetch(address)
            .then(response => response.json())
            .then(
                (result) => {
                    setUsers(result);
                }, (error) => {
                    setError(error);
                }
            )
    }, [])

  async function login(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    const config = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    }

    const response = await fetch(URL, config);
    const json = await response.json();

    if (response.ok) {
      setUserStorage(json);
      history.push('/LoginSuccessful');
        
    } else {
      alert("Kirjautuminen epäonnistui. Tarkista käyttäjänimi ja salasana.");
    }
  }

  function save(e) {
    if (etunimi === "" || etunimi === null || etunimi === undefined) {
      return;
    }
    e.preventDefault();
    let status = 0;
    
    fetch('http://localhost/harjoitustyo/saveUser.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        fname: etunimi,
        lname: sukunimi,
        email: sposti,
        password: salasana
      })
    })
    .then(res => {
      status = parseInt(res.status);
      return res.json();
    })
    .then(
      (res) => {
        if (status === 200) {
          setSaved("Tili tallennettu.")
          setEtunimi('');
          setSukunimi('');
          setSposti('');
          setSalasana('');
          
          fetch(URL1)
            .then(response => response.json())
            .then(
                (result) => {
                    setUsers(result);
                }, (error) => {
                    setError(error);
                }
            )
          
        } else {
          alert(res.error);
        }
      }, (error) => {
        alert(error);
      }
      )
  }

    return (
        <div className="row d-flex align-items-center">
            
            <div className="row d-flex justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="p-4 my-3">
                    <div className="row d-flex justify-content-center">
                    <form onSubmit={login} className="col-10 col-lg-8">

                        <h3 className="text-center">Kirjaudu sisään</h3>
                        <div className="mt-4">
                        <label className="visually-hidden">Käyttäjänimi</label>
                        <input id="email" className="form-control mt-2" type="text" placeholder="sähköposti"
                            value={email} onChange={e => setEmail(e.target.value)} required></input>
                        </div>
                        <div>
                        <label className="visually-hidden">Salasana</label>
                        <input id="password" className="form-control mt-2" type="password" placeholder="salasana"
                            value={password} onChange={e => setPassword(e.target.value)} required></input>
                        </div>
                        <button className="loginButton mt-3 mb-2 px-5">Login</button>

                    </form>
                    </div>
                </div>
                </div>
            </div>
            
            <div className="row d-flex justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="customLoginBorder p-4 my-3">
                    <div className="row d-flex justify-content-center">
                    <form onSubmit={save}>
                        <h3 className="text-center">Luo käyttäjä</h3>

                        <h4 className="my-3 text-center text-muted">{saved}</h4>

                        <div className="mb-3">
                        <label  className="form-label">Etunimi</label>
                        <input type="text" className="form-control" id="etunimi"
                        value={etunimi} onChange={e => setEtunimi(e.target.value)} maxLength="50" required/>
                        </div>

                        <div className="mb-3">
                        <label  className="form-label">Sukunimi</label>
                        <input type="text" className="form-control" id="sukunimi"
                        value={sukunimi} onChange={e => setSukunimi(e.target.value)} maxLength="100" required/>
                        </div>

                        <div className="mb-3">
                        <label  className="form-label">Sähköposti</label>
                        <input type="email" className="form-control" id="sposti"
                        value={sposti} onChange={e => setSposti(e.target.value)} maxLength="100" required/>
                        </div>

                        <div className="mb-3">
                        <label className="form-label">Salasana</label>
                        <input type="password" className="form-control" id="salasana"
                        value={salasana} onChange={e => setSalasana(e.target.value)} minLength="8" required/>
                        </div>

                        <button type="submit" className="loginButton mt-2 mb-2 px-4 py-1">Submit</button>
                    </form>
                    </div>
                </div>
                </div>
            </div>

            <h5 className="text-center">Käyttäjälista</h5>
            {users.map(user => (
                <div className="row justify-content-center text-center">
                        <ul key={user.id} class="list-group col-10 col-md-8 col-lg-7">
                            <li class="list-group-item mx-lg-5">{user.fname} {user.lname}, {user.email}</li>
                        </ul>
                </div>
            ))}

        
        </div>
    )
}
