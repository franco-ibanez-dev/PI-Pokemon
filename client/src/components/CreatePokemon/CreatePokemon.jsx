import { useEffect, useState } from "react";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../redux/actions";
import {
    minLife, maxLife, minAttack, maxAttack, minDefense, maxDefense, minHeight, maxHeight, minSpeed, maxSpeed, minWeight, maxWeight
} from "../../utils/constants/constants";


export function validate(input, name) {
    const validName = /^(?=.{5,10}$)[a-zA-Z]+(?:-[a-zA-Z]+)*$/;
    const noName = "A name is required.";
    const invalidName = "Only letters, optional middle hyphen, length between 5 and 10 characters.";
    const validUrl = /(https:)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    const noUrl = "An URL to an image in required.";
    const invalidUrl = "https protocol and .png .jpg .gif extensions are required.";
    const validStat = /^([1-9][0-9]{0,2}|1000)$/;
    const noStat = `A ${name} is required`;
    const invalidStat = (min, max) => `Must be an integer within ${min} and ${max} inclusive`;
    let errors = {};
    switch (name) {
        case "name":
            !input[name] ? errors[name] = noName : !validName.test(input[name]) ? errors[name] = invalidName : delete errors[name];
            break;
        case "sprite":
            !input[name] ? errors[name] = noUrl : !validUrl.test(input[name]) ? errors[name] = invalidUrl : delete errors[name];
            break;
        case "life":
            !input[name] ? errors[name] = noStat : !validStat.test(input[name]) || input[name] < minLife || input[name] > maxLife ? errors[name] = invalidStat(minLife, maxLife) : delete errors[name];
            break;
        case "attack":
        case "defense":
        case "speed":
        case "height":
        case "weight":
        default:
            break;
    }


    return errors;
}

export default function CreatePokemon() {
    const dispatch = useDispatch()
    let typesArray = useSelector((state) => state.types)
    typesArray.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    const history = useHistory()
    const stat = ["name", "sprite", "life", "attack", "defense", "speed", "height", "weight", "types"]
    const [input, setInput] = useState({
        name: "",
        sprite: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: [],
        disabled: true,
    })
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setErrors(validate({
            ...input,
            [name]: value
        }, name))

        setInput({
            ...input,
            [name]: value
        })
    }


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
                {
                    stat && stat.map((elm) => {
                        return (
                            <div>
                                <label>{elm === "sprite" ? "Image: " : `${elm[0].toUpperCase()}${elm.substr(1)}: `}</label>
                                {elm !== "types" ?
                                    (<input
                                        className={errors[elm] && "danger"}
                                        type={elm === "name" || elm === "sprite" ? "text" : "number"}
                                        value={input[elm]}
                                        name={elm}
                                        placeholder={elm === "name" ? "Its name..." : elm === "sprite" ? "Its image URL..." : ""}
                                        onChange={(e) => handleInputChange(e)}
                                    />)
                                    :
                                    (
                                        <select name={elm}>
                                            <option>Choose</option>
                                            {
                                                typesArray && typesArray.map((elm) => {
                                                    return (
                                                        <option value={elm.name}>{`${elm.name[0].toUpperCase()}${elm.name.substr(1)}`}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    )
                                }
                                {errors[elm] && <label>{errors[elm]}</label>}
                            </div>
                        )
                    })
                }
                <div>
                    {!input.disabled && <input type="submit" value="Submit form" />}
                </div>
            </form >
        </div >
    )
}