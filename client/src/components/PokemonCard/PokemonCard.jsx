import React from 'react';
import { Link } from 'react-router-dom';
import style from './pokemonCard.module.css';

export default function PokemonCard({ sprite, name, types, id }) {

    let key = 1;

    return (
        <div className={style.card}>
            <Link to={`/detail/${id}`}>
                <img
                    className={style.sprite}
                    src={sprite ? sprite : "../../images/pokemon.png"}
                    alt={`A CGI representation of the ${name} pokemon`}
                />
            </Link>
            <h2 id={style.name}>{name}</h2>
            <ul id={style.types}>{
                types.map((element) => {
                    key++;
                    return (
                        <li key={key}>{element.name}</li>
                    )
                })
            }
            </ul>

        </div >
    )
}

