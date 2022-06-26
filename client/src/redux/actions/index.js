import axios from 'axios'
import { POKEMON_URL, GET_POKEMONS, FYLTER_BY_TYPE, TYPES_URL, GET_TYPES } from '../../utils/constants/constants'



export function getPokemons() {
    const makeItOneArray = (array) => {
        let arr = [];
        array.forEach((subArray) => subArray.forEach((obj) => arr.push(obj)))
        return arr;
    }
    return async function (dispatch) {
        try {
            const json = await axios.get(POKEMON_URL);
            const pokemonsArray = makeItOneArray(json.data)
            // console.log('Este es el pokemonsArray de la acción getPokemons()');
            // console.log(pokemonsArray)
            return dispatch({
                type: GET_POKEMONS,
                payload: pokemonsArray
            })

        } catch (error) {
            console.log(error);

        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        try {
            const json = await axios.get(TYPES_URL);
            return dispatch({
                type: GET_TYPES,
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterPokemonsByType(payload) {


    return {
        type: FYLTER_BY_TYPE,
        payload,
    }

}