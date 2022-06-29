import React from 'react';
import { Link } from 'react-router-dom';

export default function PokemonCard({ sprite, name, types, id }) {

    let key = 1;

    return (
        <div>
            <Link to={`/detail/${id}`}>
                <img
                    className="pokeSprite"
                    src={sprite ? sprite : "../../images/pokemon.png"}
                    alt={`A CGI representation of the ${name} pokemon`}
                    height="200px" width="200px"
                />
            </Link>
            <h2>{name}</h2>
            <ul>{
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

