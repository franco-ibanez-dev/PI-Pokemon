import React from 'react';
import { Link } from 'react-router-dom';
import style from './landingPage.module.css'

export default function LandingPage() {
    return (
        <div id={style.LandingPage}>
            <h1>Welcome to my awesome webpage!</h1>
            <Link to="/home" >
                <button>Enter</button>
            </Link>
        </div>
    )
}