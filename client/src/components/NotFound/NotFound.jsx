import React from 'react';
import { Link } from 'react-router-dom';
import style from './notFound.module.css'

export default function NotFound() {
    return (
        <div id={style.NotFound}>
            <p>There is no pokemon that matches.</p>
            <p>Do you want to create one?</p>
            <Link to="/pokemon">
                <button id={style.button}>Go to creation form</button>
            </Link>
        </div>
    )
}