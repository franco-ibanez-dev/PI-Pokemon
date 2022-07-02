import React from 'react';
import { Link } from 'react-router-dom';
import style from './landingPage.module.css'

export default function LandingPage() {
    return (
        <div id={style.landingPage}>
            <h1 id={style.title}>Welcome to my awesome webpage!</h1>
            <Link to="/home" >
                <button id={style.button}>Enter</button>
            </Link>
        </div>
    )
}