import React from 'react';

export default function PokemonCard({ sprite, name, types }) {

    return (
        <div>
            <img src={sprite} alt="" height="auto" width="200px"  />
            <h2>{name}</h2>
            <ul>{
                types.map((element) => {
                    return (
                        <li>{element.name}</li>
                    )
                })
            }
            </ul>

        </div>
    )
}