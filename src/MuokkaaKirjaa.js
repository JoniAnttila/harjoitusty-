import { useState, useEffect, React } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';

export default function MuokkaaKirjaa({kirja}) {
    const [id, setId] = useState("");
    const [nimi, setNimi] = useState("");
    const [hinta, setHinta] = useState("");
    const [kuvaus, setKuvaus] = useState("");

    const URL2 = 'http://localhost/harjoitustyo/updateKirja.php/';

    let history = useHistory();

    useEffect(() => {
        setId(kirja?.id);
        setNimi(kirja?.nimi);
        setHinta(kirja?.hinta);
        setKuvaus(kirja?.kuvaus);
    }, [kirja])

    function update(e) {
        e.preventDefault();
        let status = 0;
        
        fetch(URL2, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            id: kirja?.id,
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
              alert("Muutokset tallennettu.");
              history.push('/KaikkiKirjat');
            } else {
              alert(results.error);
            }
          }, (error) => {
            alert(error);
          }
          )
      }

    return (
        <div>
            <h4 className="pt-2">Muokkaa kirjaa</h4>
            <form onSubmit={update} className="">
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

                <button className="btn btn-primary mt-3">Tallenna muutokset</button>
                <Link to="/KaikkiKirjat" className="btn btn-primary ms-3 mt-3">Peruuta muutokset</Link>
            </form>
        </div>
    )
}
