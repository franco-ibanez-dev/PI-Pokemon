import { useEffect, useState } from "react";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../redux/actions";
import {
    minLife, maxLife, minAttack, maxAttack, minDefense, maxDefense, minHeight, maxHeight, minSpeed, maxSpeed, minWeight, maxWeight
} from "../../utils/constants/constants";


export default function CreatePokemon() {
    const [name, setName] = useState('')
    const [life, setLife] = useState(0)
    const [attack, setAttack] = useState(0)
    const [sprite, setSprite] = useState('')
    const [defense, setDefense] = useState(0)
    const [speed, setSpeed] = useState(0)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [types, setTypes] = useState('')

    const [error, setError] = useState('')
    function validateSpriteURL(value) {
        if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(value)) {
            setError('https protocol and .png .jpg .gif extensions are required')
        } else {
            setError('')
        }
        setSprite(value)
    }
    function validateName(value) {
        if (!/^(?=.{5,10}$)[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(value)) {
            setError('Only letters, optional middle hyphen, length(min: 3, max: 10)')
        } else {
            setError('')
        }
        setName(value)
    }
    function validateStat(value, min, max, stat) {
        if (!/^\d+$/.test(value) || value < min || value > max) {
            setError(`Must be an integer within ${min} and ${max} inclusive`)
        } else {
            setError('')
        }
        switch (stat) {
            case "life":
                setLife(value)
                break;
            case "speed":
                setSpeed(value)
                break;
            case "attack":
                setAttack(value)
                break;
            case "height":
                setHeight(value)
                break;
            case "weight":
                setWeight(value)
                break;
            case "defense":
                setDefense(value)
                break;
            default:
                break;
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const dispatch = useDispatch()
    const typesArray = useSelector((state) => state.types)

    // const [input, setInput] = useState({
    //     name: "",
    //     life: 0,
    //     attack: 0,
    //     sprite: "",
    //     defense: 0,
    //     speed: 0,
    //     height: 0,
    //     weight: 0,
    //     types: []
    // })


    useEffect(() => {
        dispatch(getTypes())

    }, [])

    return (
        <div>

            <Link to="/home"><button>Back home</button></Link>
            <h1>Create a Pokemon of your own!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        placeholder="It's name..."
                        onChange={(event) => validateName(event.target.value)}
                    />
                </div>
                <div>
                    <label>Life:</label>
                    <input
                        type="range"
                        value={life}
                        name="life"
                        min="30"
                        max="145"
                        onChange={(event) => validateStat(event.target.value, minLife, maxLife, "life")}
                    />
                </div>
                <div>
                    <label>Attack:</label>
                    <input
                        type="range"
                        value={attack}
                        name="attack"
                        min="20"
                        max="105"
                        onChange={(event) => validateStat(event.target.value, minAttack, maxAttack, "attack")}

                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="text"
                        value={sprite}
                        name="sprite"
                        placeholder="It's image... (URL)"
                        onChange={(event) => validateSpriteURL(event.target.value)}

                    />
                </div>
                <div>
                    <label>Defense:</label>
                    <input
                        type="range"
                        value={defense}
                        name="defense"
                        min="20"
                        max="110"
                        onChange={(event) => validateStat(event.target.value, minDefense, maxDefense, "defense")}

                    />
                </div>
                <div>
                    <label >Speed:</label>
                    <input
                        type="range"
                        value={speed}
                        name="speed"
                        min="20"
                        max="110"
                        onChange={(event) => validateStat(event.target.value, minSpeed, maxSpeed, "speed")}

                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input
                        type="range"
                        value={height}
                        name="height"
                        min="3"
                        max="35"
                        onChange={(event) => validateStat(event.target.value, minHeight, maxHeight, "height")}

                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type="range"
                        value={weight}
                        name="weight"
                        min="18"
                        max="1000"
                        onChange={(event) => validateStat(event.target.value, minWeight, maxWeight, "weight")}

                    />
                </div>
                <div>
                    <label>Types:</label>
                    {
                        typesArray.map((type, index) => {
                            return (
                                <label>
                                    <input
                                        type="checkbox"
                                        name={type.name}
                                        value={type.name}
                                        onChange={(event) => setTypes(event.target.value)}
                                        key={index}
                                    />{type.name}</label>
                            )
                        })
                    }
                </div>
                <div>
                    <input type='submit' value='Submit' />
                </div>
            </form >
        </div >
    )
}