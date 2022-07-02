import { useEffect, useState } from "react";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../redux/actions";
import {
    minLife, maxLife, minAttack, maxAttack,
    minDefense, maxDefense, minHeight, maxHeight,
    minSpeed, maxSpeed, minWeight, maxWeight
} from "../../utils/constants/constants";


export function validate(input, name, value) {
    const statValidation = (min, max) => {
        return !input[name] ? errors[name] = noStat : !validStat.test(input[name]) || input[name] < min || input[name] > max ? errors[name] = invalidStat(min, max) : delete errors[name];
    }
    const resetLabel = (name) => delete errors[name];
    const validName = /^(?=.{5,10}$)[a-zA-Z]+(?:-[a-zA-Z]+)*$/;
    const validUrl = /(https:)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    const validStat = /^([1-9][0-9]{0,2}|1000)$/;

    const noName = "A name is required.";
    const invalidName = "Only letters, optional middle hyphen, length between 5 and 10 characters.";
    const noUrl = "An URL to an image in required.";
    const invalidUrl = "https protocol and .png .jpg .gif extensions are required.";
    const noStat = `A ${name} stat is required.`;
    const invalidStat = (min, max) => `Must be an integer within ${min} and ${max} inclusive.`;
    const noType = "Select at least one type.";
    const invalidTypes = "Only two uniques types are allowed."
    let errors = {};
    switch (name) {
        case "name":
            !input[name] ? errors[name] = noName : !validName.test(input[name]) ? errors[name] = invalidName : delete errors[name];
            break;
        case "sprite":
            !input[name] ? errors[name] = noUrl : !validUrl.test(input[name]) ? errors[name] = invalidUrl : delete errors[name];
            break;
        case "life":
            statValidation(minLife, maxLife)
            break;
        case "attack":
            statValidation(minAttack, maxAttack)
            break;
        case "defense":
            statValidation(minDefense, maxDefense)
            break;
        case "speed":
            statValidation(minSpeed, maxSpeed)
            break;
        case "height":
            statValidation(minHeight, maxHeight)
            break;
        case "weight":
            statValidation(minWeight, maxWeight)
            break;
        case "types":
            console.log(input[name]);
            if (input[name].length === 2) {
                errors[name] = invalidTypes;
                break;
            } else if (input[name].includes(value)) {
                errors[name] = "Already selected"
                break;
            } else {
                delete errors[name];
                break;
            }
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
        console.log({ name, value });
        if (name === "types") {
            setErrors(validate({ ...input, [name]: [...input[name], value] }, name, value))
        } else {
            setErrors(validate({ ...input, [name]: value }, name))
        }
        // if (name === "types") {
        //     setInput({
        //         ...input,
        //         types: [...input.types, value]
        //     })
        // } else {
        //     setInput({
        //         ...input,
        //         [name]: value
        //     })
        // }
    }

    const handleResetTypes = (e) => {
        setInput({
            ...input,
            types: []
        })
    }



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
                                        <select name={elm} onChange={(e) => handleInputChange(e)}>
                                            <option>--Choose--</option>
                                            {
                                                typesArray && typesArray.map((elm) => {
                                                    return (
                                                        <option
                                                            value={elm.name}
                                                        >
                                                            {`${elm.name[0].toUpperCase()}${elm.name.substr(1)}`}</option>
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
                {<button onChange={(e) => handleResetTypes(e)}>Reset types selection</button>}
                {input.types.length !== 0 && <p>Types: {input.types.map((elm) => `${elm}, `)}</p>}
                <div>
                    {!input.disabled && <input type="submit" value="Submit form" />}
                </div>
            </form >
        </div >
    )
}