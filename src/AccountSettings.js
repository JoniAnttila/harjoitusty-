import React from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router';

export default function AccountSettings({user}) {

    let history = useHistory();
    
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
    

    return (
        <>
            <div className="row d-flex justify-content-center" >
                <div className="col-md-8 col-lg-6">
                    <div className="customLoginBorder p-4 my-3">
                        <h3 className="text-center">{userName()}</h3>
                        <div className="text-center mt-4">
                            <Link className="" to="/">
                                Takaisin Kirjakauppaan
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
        </>    
    )
}
