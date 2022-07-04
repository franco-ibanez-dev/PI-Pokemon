import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetail } from '../../redux/actions/index.js';
import style from './pokemonDetail.module.css'

export function PokemonDetails(props) {
    // console.log(props);
    // const [pokemon, setPokemon] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    }, [dispatch])

    const myPokemon = useSelector((state) => {
        return state.detail
    })

    return (
        <div>
            {
                myPokemon ?
                    <div className={style.container}>
                        <img
                            id={style.sprite}
                            src={myPokemon.sprite} alt="" width="250px" height="250px" />
                        <h1 id={style.name}>{myPokemon.name}</h1>
                        <h3 id={style.types}>Types: {myPokemon.types && myPokemon.types.map(elm => elm.name + ", ")}</h3>
                        <h3 id={style.id}>ID: {myPokemon.id}</h3>
                        <ul id={style.stats}> Stats:
                            <li>Life: {myPokemon.life}</li>
                            <li>Attack: {myPokemon.attack}</li>
                            <li>Defense: {myPokemon.defense}</li>
                            <li>Speed: {myPokemon.speed}</li>
                        </ul>
                        <h3 id={style.height}>Height:  {myPokemon.height}</h3>
                        <h3 id={style.weight}>Weight:    {myPokemon.weight}</h3>
                    </div> :
                    <p>Loading...</p>
            }
            <Link to="/home">
                <button
                    id={style.back}
                    className={style.button}
                >Back home
                </button>
            </Link>
        </div>
    )
}
