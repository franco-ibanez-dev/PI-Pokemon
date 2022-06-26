import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInputChange = (event) => {
        event.preventDefault()
        setName(event.target.value)
        // console.log("Este aquí abajo es el estado local \"name\" del componente SearchBar.jsx");
        console.log(name);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getPokemonByName(name))
    }

    return (
        <div>
            <input
                type="text"
                placeholder='Search...'
                onChange={(event) => handleInputChange(event)}
            />
            <button type="submit" onClick={(event) => handleSubmit(event)}>Search</button>
        </div>
    )
}
