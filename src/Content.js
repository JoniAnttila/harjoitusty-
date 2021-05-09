import React from 'react'
import { Link } from 'react-router-dom'

export default function Content() {
    return (
        
        <div className="row d-flex align-items-center">
            <h3 className="text-center pt-4 mt-3">Etusivu</h3>
            <div className="pt-4 col-12 text-center">
                <Link className="" to="/Kayttaja">
                    Käyttäjä kirjautuminen
                </Link>
            </div>
            <div className="pt-2 col-12 text-center">
                <Link className="" to="/KaikkiKirjat">
                    Kirjalista
                </Link>
            </div>
        </div>
    )
}
