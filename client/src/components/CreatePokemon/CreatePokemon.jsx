import { useEffect, useState } from "react";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../redux/actions";
import {
    minLife, maxLife, minAttack, maxAttack, minDefense, maxDefense, minHeight, maxHeight, minSpeed, maxSpeed, minWeight, maxWeight
} from "../../utils/constants/constants";




export default function CreatePokemon() {
    const dispatch = useDispatch()
    let typesArray = useSelector((state) => state.types)
    typesArray.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    const history = useHistory()




    const [error, setError] = useState('')
    const [nameError, setNameError] = useState('')
    const [urlError, setUrlError] = useState('')
    const [attackError, setAttackError] = useState('')
    const [lifeError, setLifeError] = useState('')
    const [defenseError, setDefenseError] = useState('')
    const [heightError, setHeightError] = useState('')
    const [weightError, setWeightError] = useState('')
    const [speedError, setSpeedError] = useState('')
    const [typesError, setTypesError] = useState('')

    // function validateSpriteURL(value) {
    //     if (!/(https:)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(value)) {
    //         setUrlError('https protocol and .png .jpg .gif extensions are required')
    //     } else {
    //         setUrlError('')
    //     }
    //     setJsonData({
    //         ...jsonData,
    //         [name]: value
    //     })
    // }
    // function validateName(e) {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     if (!/^(?=.{5,10}$)[a-zA-Z]+(?:-[a-zA-Z]+)*$/.test(value)) {
    //         setNameError('Only letters, optional middle hyphen, length between 5 and 10 characters.');
    //     } else {
    //         setNameError('');
    //     }
    //     setJsonData({
    //         ...jsonData,
    //         [name]: value
    //     })
    // }
    // /*!/^([1-9][0-9]{0,2}|1000)$/.test(value) || value < min || value > max  */
    // function validateStat(e, min, max) {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     let errorMessage = `Must be an integer within ${min} and ${max} inclusive`
    //     if (!/^([1-9][0-9]{0,2}|1000)$/.test(value) || value < min || value > max) {
    //         switch (name) {
    //             case "life":
    //                 setLifeError(errorMessage)
    //                 break;
    //             case "speed":
    //                 setSpeedError(errorMessage)
    //                 break;
    //             case "attack":
    //                 setAttackError(errorMessage)
    //                 break;
    //             case "height":
    //                 setHeightError(errorMessage)
    //                 break;
    //             case "weight":
    //                 setWeightError(errorMessage)
    //                 break;
    //             case "defense":
    //                 setDefenseError(errorMessage)
    //                 break;
    //             default:
    //                 break;
    //         }
    //     } else {
    //         switch (name) {
    //             case "life":
    //                 setLifeError("")
    //                 break;
    //             case "speed":
    //                 setSpeedError("")
    //                 break;
    //             case "attack":
    //                 setAttackError("")
    //                 break;
    //             case "height":
    //                 setHeightError("")
    //                 break;
    //             case "weight":
    //                 setWeightError("")
    //                 break;
    //             case "defense":
    //                 setDefenseError("")
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    //     setJsonData({
    //         ...jsonData,
    //         [name]: value
    //     })
    // }
    // function validateTypes(e) {
    //     const value = e.target.value;
    //     const errorMessage = "You can only choose 2 types."
    //     if (jsonData.types.length === 2 && !jsonData.types.includes(value)) {
    //         setTypesError(errorMessage)
    //         const resetLabel = () => setTypesError("")
    //         setTimeout(resetLabel, 4000)
    //         return
    //     }
    //     if (jsonData.types.includes(value)) {
    //         setJsonData({
    //             ...jsonData,
    //             types: jsonData.types.filter(elm => elm !== value)
    //         })
    //         return
    //     }
    //     setTypesError('')
    //     setJsonData({
    //         ...jsonData,
    //         types: [...jsonData.types, value]
    //     })
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(jsonData);
    //     if (jsonData.name === '' || jsonData.name === "") {
    //         alert('You must fill the form first.')
    //     } else {
    //         dispatch(postPokemon(jsonData))
    //         setJsonData({
    //             name: "",
    //             life: 0,
    //             attack: 0,
    //             sprite: "",
    //             defense: 0,
    //             speed: 0,
    //             height: 0,
    //             weight: 0,
    //             types: []
    //         })
    //         alert("Your pokemon was posted succesfully!")
    //         history.push('/home')
    //     }
    // }


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    // }


    useEffect(() => {
        dispatch(getTypes())
    }, [])

    return (
        <div>

            <Link to="/home"><button>Back home</button></Link>
            <h1>Create a Pokemon of your own!</h1>
            <form >

                <div>

                    <label>Name:</label>
                    <input
                        className={nameError && "danger"}
                        type="text"
                        name="name"
                        // value={jsonData.name}
                        placeholder="Its name..."
                    // onChange={}
                    />
                    {nameError && <label>{nameError}</label>}
                </div>
                <div>
                    <label>Life:</label>
                    <input
                        className={lifeError && "danger"}
                        type="text"
                        // value={jsonData.life}
                        name="life"
                    // onChange={}
                    />
                    {lifeError && <label>{lifeError}</label>}
                </div>
                <div>
                    <label>Attack:</label>
                    <input
                        className={attackError && "danger"}
                        type="text"
                        // value={jsonData.attack}
                        name="attack"
                    // onChange={}

                    />
                    {attackError && <label>{attackError}</label>}
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        className={urlError && "danger"}
                        type="text"
                        // value={jsonData.sprite}
                        name="sprite"
                        placeholder="It's image... (URL)"
                    // onChange={}

                    />
                    {urlError && <label>{urlError}</label>}
                </div>
                <div>
                    <label>Defense:</label>
                    <input
                        className={defenseError && "danger"}
                        type="text"
                        // value={jsonData.defense}
                        name="defense"
                    // onChange={}

                    />
                    {defenseError && <label>{defenseError}</label>}
                </div>
                <div>
                    <label >Speed:</label>
                    <input
                        className={speedError && "danger"}
                        type="text"
                        // value={jsonData.speed}
                        name="speed"
                    // onChange={}
                    />
                    {speedError && <label>{speedError}</label>}
                </div>
                <div>
                    <label>Height:</label>
                    <input
                        className={heightError && "danger"}
                        type="text"
                        // value={jsonData.height}
                        name="height"
                    // onChange={}
                    />
                    {heightError && <label>{heightError}</label>}
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        className={weightError && "danger"}
                        type="text"
                        // value={jsonData.weight}
                        name="weight"
                        step="50"
                    // onChange={}
                    />
                    {weightError && <label>{weightError}</label>}
                </div>
                <div>
                    <label>Types:</label>
                    <select name="types">
                        <option>Choose</option>
                        {
                            typesArray && typesArray.map((elm) => {
                                return (
                                    <option value={elm.name}>{`${elm.name[0].toUpperCase()}${elm.name.substr(1)}`}</option>
                                )
                            })
                        }
                    </select>

                </div>
                <div>
                    <input type="submit" value="Submit form" />
                </div>
            </form >
        </div >
    )
}