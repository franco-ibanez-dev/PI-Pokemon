import axios from 'axios'
import {
    POKEMON_URL,
    GET_POKEMONS,
    TYPES_URL,
    GET_TYPES,
    FYLTER_BY_TYPE,
    FYLTER_BY_ORIGIN,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    GET_POKEMON_BY_NAME
} from '../../utils/constants/constants'



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
            console.log(error.response.data);

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
            console.log(error.response.data);
        }
    }
}

export function filterPokemonsByType(payload) {
    return {
        type: FYLTER_BY_TYPE,
        payload,
    }
}

export function filterPokemonsByOrigin(payload) {
    return {
        type: FYLTER_BY_ORIGIN,
        payload,
    }
}

export function orderPokemonsByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload,
    }
}

export function orderPokemonsByAttack(payload) {
    return {
        type: ORDER_BY_ATTACK,
        payload,
    }
}

export function getPokemonByName(payload) {
    return async function (dispatch) {
        try {
            const json = await axios.get(GET_POKEMON_BY_NAME + payload)
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: json.data
            })

        } catch (error) {
            console.log(error.response.data);
        }
    }
}