import { useState, useEffect, React } from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router';

export default function AccountSettings({user}) {
    const [error, setError] = useState('');
    const URL1 = 'http://localhost/harjoitustyo/getUser.php/';
    const URL2 = 'http://localhost/harjoitustyo/updateUser.php/';
    const [info, setInfo] = useState([]);
    console.log("info",info)
    const [etunimi, setEtunimi] = useState(user.fname);
    const [sukunimi, setSukunimi] = useState(user.lname);
    const [sposti, setSposti] = useState(user.email);
    const [salasana, setSalasana] = useState('');

    let history = useHistory();

    useEffect(() => {
        let address = URL1 + user.id;
        fetch(address)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    setInfo(result)
                }, (error) => {
                    setError(error);
                }
            )
    }, [user])

    if (user===null) {
        return <Redirect to="/Kayttaja" />
    }

    function userName() {
        if (user.fname !== undefined)
        return user.fname + " " + user.lname;
    }

    function remove(id) {
        let status = 0;
        fetch('http://localhost/harjoitustyo/deleteUser.php/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
        })
        .then(res => {
        status = parseInt(res.status);
        return res.json();
        })
        .then(
        (res) => {
            if (status === 200) {
                alert('Tilisi on poistettu.');
                history.push('/UlosKirjautuminen');
            } else {
            alert(res.error);
            }
        }, (error) => {
            alert(error);
        }
        )
    }

    function update(e) {
        if (etunimi === "" || etunimi === null || etunimi === undefined) {
          return;
        }
        e.preventDefault();
        let status = 0;
        console.log(user.id, etunimi, sukunimi, sposti, salasana)
        fetch(URL2, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
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
              alert("Tiedot tallennettu")
            } else {
              alert(res.error);
            }
          }, (error) => {
            alert(error);
          }
          )
      }
    

    return (
        <>
            <div className="row d-flex justify-content-center" >
                <div className="col-md-8 col-lg-6">
                    <div className="customLoginBorder p-4 my-3">
                        <h3 className="text-center">{userName()}</h3>
                        <div className="text-center mt-4">
                            <Link className="" to="/">
                                Takaisin etusivulle
                            </Link>
                        </div>
                        <div className="text-center mt-3">
                        
                            <Link to="/UlosKirjautuminen" className="">
                                Kirjaudu ulos
                            </Link>
                        </div>
                        <div className="text-center mt-3">
                            <button onClick={() => remove(user.id)} className="loginButton mt-2 px-5 py-1">Poista tili</button>
                        </div>
                        <div className="col-12 my-2">
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="customLoginBorder p-4 my-3">
                    <div className="row d-flex justify-content-center">
                    <form onSubmit={update}>
                        <h3 className="text-center">Muokkaa tietoja</h3>

                        <div className="mb-3">
                        <label  className="form-label">Etunimi</label>
                        <input type="text" className="form-control" id="etunimi"
                        value={info.fname} onChange={e => setEtunimi(e.target.value)} maxLength="50" required/>
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
                        <label className="form-label">Uusi salasana</label>
                        <input type="password" className="form-control" id="salasana"
                        value={salasana} onChange={e => setSalasana(e.target.value)} minLength="8" required/>
                        </div>

                        <button type="submit" className="loginButton mt-2 mb-2 px-4 py-1">Submit</button>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </>    
    )
}
