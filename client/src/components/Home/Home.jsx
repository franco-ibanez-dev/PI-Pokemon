import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterPokemonsByType, getTypes } from '../../redux/actions';
import { Link } from 'react-router-dom';
import PokemonCard from '../PokemonCard/PokemonCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import NotFound from '../NotFound/NotFound';


export default function Home() {


    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
    const allTypes = useSelector(state => state.types);

    console.log("Esto es allPokemons en Home cuando no hay un tipo:");
    console.log(allPokemons);

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    const handleFilterType = (event) => {
        dispatch(filterPokemonsByType(event.target.value))
    }

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getPokemons())
    }
    // console.log(allPokemons);

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
            <Link to="/creation">Create pokemon</Link>
            <h1>POKÉMON SERIES IS SO AWESOME</h1>
            <button onClick={(event) => handleClick(event)}>
                Refresh pokemons
            </button>
            <div>
                <select name="alphabetical-order" id="alphabetical-order-select">
                    <option value="">--Sort by Name--</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>

                <select>
                    <option value="">--Sort by Attack--</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
                <select name="types" id="type-select" onChange={(event) => handleFilterType(event)}>
                    <option value="">--Filter by Type--</option>
                    <option value="all">All of them</option>
                    {
                        allTypes.map((element) => {
                            return (
                                <option key={element.id} value={element.name}>{element.name.charAt(0).toUpperCase() + element.name.slice(1, element.name.length)}</option>
                            )
                        })
                    }
                </select>

                <select name="origin" id="origin-select">
                    <option value="">--Filter by Condition--</option>
                    <option value="all">All of them</option>
                    <option value="preexisting">Preexisting</option>
                    <option value="created">Created</option>
                </select>


                <div>
                    <Pagination
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={allPokemons.length}
                        pagination={pagination}
                    />
                    <ul id='pokemonsArea'>
                        {currentPokemons.length > 0 &&
                            currentPokemons?.map((element, index) => {
                                return (
                                    <li key={index}>
                                        <PokemonCard
                                            sprite={element.sprite}
                                            name={element.name}
                                            types={element.types}
                                        />
                                    </li>
                                )
                            }
                            )
                        }
                        {
                            currentPokemons.length === 0 &&
                            <NotFound />
                        }

                    </ul>

                </div>
            </div>
        </div>
    )
}
