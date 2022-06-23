import { useEffect } from 'react';
import { connect } from 'react-redux'
import { getPokemons } from '../../redux/actions/pokemonsActions.js';

function PokemonCard({ pokemons, getPokemons }) {

    async function getPokemonsFunction() {
        getPokemons()
    }

    useEffect(() => {
        getPokemonsFunction()
    }, [])

    console.log(pokemons);

    return <div>
        {pokemons[1].map((element) => {
            return <div>
                <p>{element.name}</p>
                <img src={element.sprite} alt={element.name} />
                <p>{element.life}</p>
                <p>{element.defense}</p>
                <p>{element.speed}</p>
                <p>{element.height}</p>
                <p>{element.weight}</p>
            </div>
        })}</div>
}

const mapStateToProps = state => {
    return {
        pokemons: state.pokemons
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPokemons: pokemons => {
            dispatch(getPokemons(pokemons))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonCard)