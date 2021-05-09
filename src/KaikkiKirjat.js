import { useState, useEffect, React } from 'react'
import { Link } from 'react-router-dom'

export default function KaikkiKirjat() {
    const [kirja, setKirja] = useState([]);
    const [error, setError] = useState('');
    const URL = 'http://localhost/harjoitustyo/haeKirjat.php/';
    const URL2 = 'http://localhost/harjoitustyo/tallennaKirja.php/';

    const [nimi, setNimi] = useState('');
    const [hinta, setHinta] = useState('');
    const [kuvaus, setKuvaus] = useState('');

    useEffect(() => {
        fetchaus();
    }, [])

    function fetchaus() {
      fetch(URL)
            .then(response => response.json())
            .then(
                (result) => {
                    setKirja(result);
                }, (error) => {
                    setError(error);
                }
            )
    }

    function save(e) {
      if (nimi === "" || nimi === null || nimi === undefined) {
        return;
      }
      e.preventDefault();
      let status = 0;
      
      fetch(URL2, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          nimi: nimi,
          hinta: hinta,
          kuvaus: kuvaus
        })
      })
      .then(results => {
        status = parseInt(results.status);
        return results.json();
      })
      .then(
        (results) => {
          if (status === 200) {
            setNimi('');
            setHinta('');
            setKuvaus('');

            fetchaus();
          } else {
            alert(results.error);
          }
        }, (error) => {
          alert(error);
        }
        )
    }

    function remove(id) {
      let status = 0;
      fetch('http://localhost/harjoitustyo/poistaKirja.php/', {
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
              fetchaus();
          } else {
          alert(res.error);
          }
      }, (error) => {
          alert(error);
      }
      )
    }

  return (
        <div>
            <h4 className="pt-2">Lisää kirja</h4>
            <form onSubmit={save} className="">
                <div class="form-group">
                    <label for="kirjanimi">Kirjan nimi</label>
                    <input class="form-control" type="text" id="nimi" value={nimi} onChange={e => setNimi(e.target.value)} placeholder="Kirjan nimi" maxLength="30" required/>
                </div>
                <div class="form-group">
                <label for="hinta">Hinta</label>
                    <input class="form-control" type="number" value={hinta} step=".01" presicion={2} id="hinta" onChange={e => setHinta(e.target.value)} placeholder="Hinta" maxLength="9" required/>
                </div>
                <div class="form-group">
                <label for="kuvaus">Kuvaus</label>
                    <textarea className="form-control" type="text" id="kuvaus" value={kuvaus} onChange={e => setKuvaus(e.target.value)} placeholder="Kirjan kuvaus" required/>
                </div>

                    

                <button className="btn btn-primary mt-3">Lisää</button>
            </form>

            <h5 className="ps-1 pt-5 pb-2">Kirjalista</h5>
            {kirja.map(kirja => (
                <div className="px-3">
                        <div key={kirja.kirjaNro} className="list-group list-group-horizontal row">
                            <div className="list-group-item col-6 col-lg-8 ">{kirja.kirjaNimi}, {kirja.hinta} €, {kirja.kuvaus}</div>
                            <div className="list-group-item col-3 col-sm-3 col-lg-2">
                            <Link 
                                className="text-primary list-group-item list-group-item-action" 
                                to={{
                                    pathname: '/MuokkaaKirjaa',
                                    state: {
                                        id: kirja.kirjaNro,
                                        nimi: kirja.kirjaNimi,
                                        hinta: kirja.hinta,
                                        kuvaus: kirja.kuvaus
                                    }
                                }}>
                                Muokkaa
                            </Link>
                            </div>
                            <div className="list-group-item col-3 col-sm-3 col-lg-2">
                              <a href="#" class="text-primary list-group-item list-group-item-action" onClick={() => remove(kirja.kirjaNro)}>Poista</a>
                            </div>
                            
                        </div>
                </div>
            ))}
        </div>
    )
}
