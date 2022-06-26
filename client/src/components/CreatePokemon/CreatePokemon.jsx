import { useEffect, useState } from "react";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../redux/actions";

export default function CreatePokemon() {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)

    const [input, setInput] = useState({
        name: "",
        life: 0,
        attack: 0,
        sprite: "",
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    })

    useEffect(() => {
        dispatch(getTypes())

    }, [])

    return (
        <div>
            <Link to="/home"><button>Back home</button></Link>
            <h1>Create a Pokemon of your own!</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                    />
                </div>
                <div>
                    <label>Life:</label>
                    <input
                        type="range"
                        value={input.life}
                        name="life"
                    />
                </div>
                <div>
                    <label>Attack:</label>
                    <input
                        type="range"
                        value={input.attack}
                        name="attack"
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="text"
                        value={input.sprite}
                        name="sprite"
                    />
                </div>
                <div>
                    <label>Defense:</label>
                    <input
                        type="range"
                        value={input.defense}
                        name="defense"
                    />
                </div>
                <div>
                    <label >Speed:</label>
                    <input
                        type="range"
                        value={input.speed}
                        name="speed"
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input
                        type="range"
                        value={input.height}
                        name="height"
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type="range"
                        value={input.weight}
                        name="weight"
                    />
                </div>
                <div>
                    <label>Types:</label>
                    {
                        types.map((type) => {
                            return (
                                <label>
                                    <input
                                        type="checkbox"
                                        name={type.name}
                                        value={type.name}

                                    />{type.name}</label>
                            )
                        })
                    }
                </div>
            </form >
        </div >
    )
}