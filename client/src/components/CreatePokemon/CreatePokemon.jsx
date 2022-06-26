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
        life: "",
        attack: 0,
        sprite: "",
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    })

    return (
        <form></form>
    )
}