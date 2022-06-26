import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemon } from '../../redux/actions';
import { GET_POKEMON_BY_NAME } from '../../utils/constants/constants';

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInputChange = (event) => {
        event.preventDefault()
        setName(event.target.value)
        console.log("Este aquí abajo es el estado local \"name\" del componente SearchBar.jsx");
        console.log(name);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getNamePokemon(name))
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
