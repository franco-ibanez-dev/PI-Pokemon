import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../redux/actions';
import { Link } from 'react-router-dom';
import PokemonCard from '../PokemonCard/PokemonCard.jsx'

export default function Home() {

    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    console.log(allPokemons)
    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])


    function handleClick(event) {
        event.preventDefault();
        dispatch(getPokemons())
    }

    return (
        <div>
            <Link to="/pokemon">Create pokemon</Link>
            <h1>POKÉMON SERIES IS SO AWESOME</h1>
            <button onClick={event => { handleClick(event) }}>
                Refresh pokemons
            </button>
            <div>
                {/* <label for="type-select">Choose a type:</label> */}
                <select name="types" id="type-select">
                    <option value="">--Please choose an option--</option>
                    <option value="normal">Normal</option>
                    <option value="fighting">Fighting</option>
                    <option value="flying">Flying</option>
                    <option value="poison">Poison</option>
                    <option value="ground">Ground</option>
                    <option value="rock">Rock</option>
                    <option value="bug">Bug</option>
                    <option value="ghost">Ghost</option>
                    <option value="steel">Steel</option>
                    <option value="fire">Fire</option>
                    <option value="water">Water</option>
                    <option value="grass">Grass</option>
                    <option value="electric">Electric</option>
                    <option value="psychic">Psychic</option>
                    <option value="ice">Ice</option>
                    <option value="dragon">Dragon</option>
                    <option value="dark">Dark</option>
                    <option value="fairy">Fairy</option>
                    <option value="unknown">Unknown</option>
                    <option value="shadow">Shadow</option>
                </select>

                {/* <label for="origin-select">Choose an origin:</label> */}
                <select name="origin" id="origin-select">
                    <option value="">--Please choose an origin--</option>
                    <option value="all">All of them</option>
                    <option value="preexisting">Preexisting</option>
                    <option value="created">Created</option>
                </select>

                {/* <label for="alphabetical-order-select">Choose an alphabetical order:</label> */}
                <select name="alphabetical-order" id="alphabetical-order-select">
                    <option value="">--Please choose an alphabetical order--</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>

                {/* <label>Choose an attack order:</label> */}
                <select>
                    <option value="">--Please choose an attack order--</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>

                {
                    allPokemons?.map((array) => {
                        return (array.map((element) => {
                            return (
                                <PokemonCard sprite={element.sprite} name={element.name} types={element.types} />
                            )
                        })
                        )
                    })

                }

            </div>
        </div>
    )
}
