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
    const [nameError, setNameError] = useState('')
    const [urlError, setUrlError] = useState('')
    const [attackError, setAttackError] = useState('')
    const [lifeError, setLifeError] = useState('')
    const [defenseError, setDefenseError] = useState('')
    const [heightError, setHeightError] = useState('')
    const [weightError, setWeightError] = useState('')
    const [speedError, setSpeedError] = useState('')

    function validateSpriteURL(value) {
        if (!/(https:)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(value)) {
            setUrlError('https protocol and .png .jpg .gif extensions are required')
        } else {
            setUrlError('')
        }
        setSprite(value)
    }
    function validateName(value) {
        if (!/^(?=.{5,10}$)[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(value)) {
            setNameError('Only letters, optional middle hyphen, length between 5 and 10 characters.');
        } else {
            setNameError('');
        }
        setName(value)
    }
    function validateStat(value, min, max, stat) {
        let errorMessage = `Must be an integer within ${min} and ${max} inclusive`
        if (!/^\d+$/.test(value) || value < min || value > max) {
            switch (stat) {
                case "life":
                    setLifeError(errorMessage)
                    break;
                case "speed":
                    setSpeedError(errorMessage)
                    break;
                case "attack":
                    setAttackError(errorMessage)
                    break;
                case "height":
                    setHeightError(errorMessage)
                    break;
                case "weight":
                    setWeightError(errorMessage)
                    break;
                case "defense":
                    setDefenseError(errorMessage)
                    break;
                default:
                    break;
            }
        } else {
            switch (stat) {
                case "life":
                    setLifeError("")
                    break;
                case "speed":
                    setSpeedError("")
                    break;
                case "attack":
                    setAttackError("")
                    break;
                case "height":
                    setHeightError("")
                    break;
                case "weight":
                    setWeightError("")
                    break;
                case "defense":
                    setDefenseError("")
                    break;
                default:
                    break;
            }
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
                        className={nameError && "danger"}
                        type="text"
                        name="name"
                        value={name}
                        placeholder="It's name..."
                        onChange={(event) => validateName(event.target.value)}
                    />
                    {nameError && <label>{nameError}</label>}
                </div>
                <div>
                    <label>Life:</label>
                    <input
                        className={lifeError && "danger"}
                        type="number"
                        value={life}
                        name="life"
                        min="30"
                        max="145"
                        onChange={(event) => validateStat(event.target.value, minLife, maxLife, "life")}
                    />
                    {lifeError && <label>{lifeError}</label>}
                </div>
                <div>
                    <label>Attack:</label>
                    <input
                        className={attackError && "danger"}
                        type="number"
                        value={attack}
                        name="attack"
                        min="20"
                        max="105"
                        onChange={(event) => validateStat(event.target.value, minAttack, maxAttack, "attack")}

                    />
                    {attackError && <label>{attackError}</label>}
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        className={urlError && "danger"}
                        type="text"
                        value={sprite}
                        name="sprite"
                        placeholder="It's image... (URL)"
                        onChange={(event) => validateSpriteURL(event.target.value)}

                    />
                    {urlError && <label>{urlError}</label>}
                </div>
                <div>
                    <label>Defense:</label>
                    <input
                        className={defenseError && "danger"}
                        type="number"
                        value={defense}
                        name="defense"
                        min="20"
                        max="110"
                        onChange={(event) => validateStat(event.target.value, minDefense, maxDefense, "defense")}

                    />
                    {defenseError && <label>{defenseError}</label>}
                </div>
                <div>
                    <label >Speed:</label>
                    <input
                        className={speedError && "danger"}
                        type="number"
                        value={speed}
                        name="speed"
                        min="20"
                        max="110"
                        onChange={(event) => validateStat(event.target.value, minSpeed, maxSpeed, "speed")}
                    />
                    {speedError && <label>{speedError}</label>}
                </div>
                <div>
                    <label>Height:</label>
                    <input
                        className={heightError && "danger"}
                        type="number"
                        value={height}
                        name="height"
                        min="3"
                        max="35"
                        onChange={(event) => validateStat(event.target.value, minHeight, maxHeight, "height")}
                    />
                    {heightError && <label>{heightError}</label>}
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        className={weightError && "danger"}
                        type="number"
                        value={weight}
                        name="weight"
                        min="18"
                        max="1000"
                        step="50"
                        onChange={(event) => validateStat(event.target.value, minWeight, maxWeight, "weight")}
                    />
                    {weightError && <label>{weightError}</label>}
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