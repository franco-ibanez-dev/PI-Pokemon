import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../../redux/actions';
import { Link } from 'react-router-dom';
import PokemonCard from '../PokemonCard/PokemonCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';

export default function Home() {

    const makeItOneArray = (array) => {
        let arr = [];
        array.forEach((subArray) => subArray.forEach((obj) => arr.push(obj)))
        return arr;
    }

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getPokemons())
    }
    const dispatch = useDispatch();
    const response = useSelector(state => state.pokemons);
    const allPokemons = makeItOneArray(response);
    // console.log(allPokemons);

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    return (
        <div>
            <Link to="/pokemon">Create pokemon</Link>
            <h1>POKÉMON SERIES IS SO AWESOME</h1>
            <button onClick={event => { handleClick(event) }}>
                Refresh pokemons
            </button>
            <div>
                <select name="types" id="type-select">
                    <option value="">Filter By TYPE</option>
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

                <select name="origin" id="origin-select">
                    <option value="">Filter By Condition</option>
                    <option value="all">All of them</option>
                    <option value="preexisting">Preexisting</option>
                    <option value="created">Created</option>
                </select>

                <select name="alphabetical-order" id="alphabetical-order-select">
                    <option value="">Order By Name </option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>

                <select>
                    <option value="">Order By ATTACK</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
                <div>
                    <Pagination
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={allPokemons.length}
                        pagination={pagination}
                    />
                    <ul id='pokemonsArea'>
                        {currentPokemons?.map((element) => {
                            return (
                                <li>
                                    <PokemonCard
                                        sprite={element.sprite}
                                        name={element.name}
                                        types={element.types}
                                    />
                                </li>
                            )
                        })}
                    </ul>

                </div>
            </div>
        </div>
    )
}
