import React from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';

export default function LoginSuccessful({user}) {

    function userName() {
        if (user.fname !== undefined)
        return user.fname;
    }

    return (
        <>
            <div className="row d-flex justify-content-center" >
                <div className="col-md-6">
                    <div className="customLoginBorder p-4 my-3">
                        <h3 className="text-center">Tervetuloa {userName()}</h3>
                        <div className="text-center mt-4">
                            <Link to="/" className="">
                                Etusivulle
                            </Link>
                        </div>
                        <div className="text-center mt-3">
                            <Link to="/AccountSettings" className="">
                                Tilin asetukset
                            </Link>
                        </div>
                        <div className="text-center mt-3">
                        
                            <Link to="/UlosKirjautuminen" className="">
                                Kirjaudu ulos
                            </Link>
                        </div>

                        <div className="col-12 my-2">
                        </div>
                    </div>
                </div>
            </div>
        </>    
    )
}
