import { useState, useEffect, React } from 'react'

export default function KaikkiKirjat() {
    const [kirja, setKirja] = useState([]);
    const [error, setError] = useState('');
    const URL = 'http://localhost/harjoitustyo/haeKirjat.php/';

    const [nimi,setNimi] = useState('');
    const [hinta,setHinta] = useState('');
    const [kuvaus,setKuvaus] = useState('');


    


    useEffect(() => {
        let address = URL;
        fetch(address)
            .then(response => response.json())
            .then(
                (result) => {
                    setKirja(result);
                }, (error) => {
                    setError(error);
                }
            )
    }, [])

    function save(e) {
        e.preventDefault();
        let status = 0;
        fetch(URL + 'index.php', {
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
        .then(res => {
          status = parseInt(res.status);
          return res.json();
        })
        .then(
          (res) => {
            if (status === 200) {
              setNimi(nimi => [...nimi, res]);
              setHinta(hinta => [...hinta, res]);
              setKuvaus(kuvaus => [...kuvaus, res]);
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
                <input value={nimi} onChange={e => setNimi(e.target.value)} placeholder="Kirjan nimi"/>
                <input value={hinta} onChange={e => setHinta(e.target.value)} placeholder="Hinta"/>
                <input value={kuvaus} onChange={e => setKuvaus(e.target.value)} placeholder="Kirjan kuvaus"/>
                <button>Lisää</button>
            </form>

            <h5 className="text-center pt-5 pb-2">Kirjalista</h5>
            {kirja.map(kirja => (
                <div className="row justify-content-center text-center">
                        <ul key={kirja.kirjaNro} class="list-group col-10 col-md-8 col-lg-7">
                            <li class="list-group-item mx-lg-5">{kirja.kirjaNimi}, {kirja.hinta} €, {kirja.kuvaus}</li>
                        </ul>
                </div>
            ))}
        </div>
    )
}
