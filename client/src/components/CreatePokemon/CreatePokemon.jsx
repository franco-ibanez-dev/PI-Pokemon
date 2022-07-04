import style from './createPokemon.module.css'
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
    // const resetLabel = (name) => delete errors[name];
    const validName = /^(?=.{5,10}$)[a-zA-Z]+(?:-[a-zA-Z]+)*$/;
    const validUrl = /(https:)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    const validStat = /^([1-9][0-9]{0,2}|1000)$/;

    const noName = "A name is required.";
    const invalidName = "Only letters, optional middle hyphen, length between 5 and 10 characters.";
    const noUrl = "An URL to an image in required.";
    const invalidUrl = "https protocol and .png .jpg .gif extensions are required.";
    const noStat = ` ${name} stat is required.`;
    const invalidStat = (min, max) => `Must be an integer within ${min} and ${max} inclusive.`;
    // const noType = "Select at least one type.";
    const invalidTypes = "Only one or two uniques types are allowed, to delete a selection click on it again."
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
            if (input[name].length === 3) {
                errors[name] = invalidTypes;
                break;
            } else if (input[name].includes(value)) {
                delete errors[name];
                break;
            }
            delete errors[name];
            break;
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
    })
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // console.log({ name, value });
        if (name === "types") {
            setErrors(validate({ ...input, [name]: [...input[name], value] }, name, value))
        } else {
            setErrors(validate({ ...input, [name]: value }, name))
        }
        if (name === "types") {
            if (input.types.includes(value)) {
                setInput({
                    ...input,
                    types: input.types.filter(elm => elm !== value),
                })
            } else {
                if (input.types.length < 2) {
                    setInput({
                        ...input,
                        types: [...input.types, value],
                    })
                }
            }
        } else {
            setInput({
                ...input,
                [name]: value,
            })
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(jsonData);
        dispatch(postPokemon(input))
        setInput({
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
        // alert("Your pokemon was posted succesfully!")
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    return (
        <div id={style.generalContainer}>
            <Link to="/home"><button id={style.button}>Back home</button></Link>
            <h1 id={style.title}>Create a Pokemon of your own!</h1>
            <form
                id={style.form}
                onSubmit={(e) => { handleSubmit(e) }}>
                {
                    stat && stat.map((elm, index) => {
                        return (
                            <div className={style[elm]}>
                                <label id={style[`${elm}_label`]}>{elm === "sprite" ? "Image: " : `${elm[0].toUpperCase()}${elm.substr(1)}: `}</label>
                                {elm !== "types" ?
                                    (<input
                                        className={errors[elm] && "danger"}
                                        id={style[`${elm}_input`]}
                                        type={elm === "name" || elm === "sprite" ? "text" : "number"}
                                        value={input[elm]}
                                        name={elm}
                                        placeholder={elm === "name" ? "Its name..." : elm === "sprite" ? "Its image URL..." : ""}
                                        onChange={(e) => handleInputChange(e)}
                                    />)
                                    :
                                    (
                                        <select name={elm} onChange={(e, errors) => handleInputChange(e, errors)}>
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
                                {errors[elm] && <label className={style.warning} id={style[`${elm}_warning`]}>{errors[elm]}</label>}
                            </div>
                        )
                    })
                }
                {input.types.length !== 0 && <p id={style[`type_list`]}>Types: {input.types.map((elm) => `${elm}, `)}</p>}
                <div>
                    <input
                        id={style.submitButton}
                        disabled={input.name === "" || input.sprite === "" || input.attack === 0
                            || input.defense === 0 || input.speed === 0 || input.life === 0
                            || input.height === 0 || input.weight === 0 || input.types.length === 0 ? true : false}
                        type="submit"
                        value="Submit" />
                </div>
            </form >
        </div >
    )
}