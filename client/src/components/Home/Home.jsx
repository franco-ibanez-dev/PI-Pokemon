import style from './home.module.css'
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPokemons,
    getTypes,
    filterPokemonsByType,
    filterPokemonsByOrigin,
    orderPokemonsByAttack,
    orderPokemonsByName
} from '../../redux/actions';
import { Link } from 'react-router-dom';
import PokemonCard from '../PokemonCard/PokemonCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import NotFound from '../NotFound/NotFound';
import SearchBar from '../SearchBar/SearchBar';


export default function Home() {


    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
    const allTypes = useSelector(state => state.types);
    allTypes.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    // console.log("Esto es allPokemons en Home cuando no hay un tipo:");
    // console.log(allPokemons);

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    const handleTypeFilter = (event) => {
        dispatch(filterPokemonsByType(event.target.value))
    }

    const handleOriginFilter = (event) => {
        dispatch(filterPokemonsByOrigin(event.target.value))
    }

    const handleAttackSort = (event) => {
        event.preventDefault();
        dispatch(orderPokemonsByAttack(event.target.value));
        setCurrentPage(1);
        setSort(`${event.target.value} sorted`);
    }

    const handleNameSort = (event) => {
        event.preventDefault();
        dispatch(orderPokemonsByName(event.target.value));
        setCurrentPage(1);
        setSort(`${event.target.value} sorted`);
    }

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(getPokemons());
    }
    // console.log(allPokemons);

    const [sort, setSort] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);

    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    return (
        <div id={style.generalContainer}>
            <div id={style.sideBar}>
                <h1 id={style.heading}>This is my individual project!</h1>

                <SearchBar />

                <Link id={style.createButton} className={style.button} to="/pokemon">Create pokemon</Link>

                <button className={style.button} id={style.refreshButton} onClick={(event) => handleClick(event)}>
                    Refresh pokemons
                </button>

            </div>
            <div>
                <div id={style.filters_container}>
                    <select
                        className={style.button}
                        name="alphabetical-order"
                        id="alphabetical-order-select"
                        onClick={(event) => handleNameSort(event)}
                    >
                        <option value="">--Sort by Name--</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>

                    <select
                        className={style.button}
                        name="attack-order"
                        id="attack-order-select"
                        onClick={(event) => handleAttackSort(event)}
                    >
                        <option value="">--Sort by Attack--</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <select
                        className={style.button}
                        name="types"
                        id="type-select"
                        onChange={(event) => handleTypeFilter(event)}
                    >
                        <option value="">--Filter by Type--</option>
                        <option value="all">All of them</option>
                        {
                            allTypes.map((element) => {
                                return (
                                    <option
                                        key={element.id}
                                        value={element.name}
                                    >
                                        {element.name.charAt(0).toUpperCase() + element.name.slice(1, element.name.length)}</option>
                                )
                            })
                        }
                    </select>

                    <select
                        className={style.button}
                        name="origin"
                        id="origin-select"
                        onChange={(event) => handleOriginFilter(event)}
                    >
                        <option value="">--Filter by Condition--</option>
                        <option value="all">All of them</option>
                        <option value="externalAPI">Preexisting</option>
                        <option value="ownDB">Created</option>
                    </select>
                </div>
                <div>
                    <Pagination
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={allPokemons.length}
                        pagination={pagination}
                    />
                    <ul id={style.pokemonsList}>
                        {currentPokemons.length > 0 &&
                            currentPokemons?.map((element, index) => {
                                return (
                                    <li key={index}>
                                        <PokemonCard
                                            id={element.id}
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
