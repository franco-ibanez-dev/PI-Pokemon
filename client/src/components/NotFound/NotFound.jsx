import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div id="NotFound">
            <p>There is no pokemon that matches.</p>
            <p>Do you want to create one?</p>
            <Link to="/creation">
                <button>Go to creation form</button>
            </Link>
        </div>
    )
}