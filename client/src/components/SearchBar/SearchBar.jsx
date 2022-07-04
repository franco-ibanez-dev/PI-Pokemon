import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions';
import style from './searchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const handleInputChange = (event) => {
        event.preventDefault()
        setName(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getPokemonByName(name))
        setName("")
    }

    return (
        <div>
            <input
                id={style.searchBox}
                type="text"
                placeholder='Search...'
                value={name}
                onChange={(event) => handleInputChange(event)}
            />
            <button className={style.button} type="submit" onClick={(event) => handleSubmit(event)}>Search</button>
        </div>
    )
}
