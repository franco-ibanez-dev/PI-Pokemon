import axios from 'axios'
import { POKEMON_URL, GET_POKEMONS } from '../../utils/constants/constants'

export function getPokemons() {
    return async function (dispatch) {
        try {
            const json = await axios.get(POKEMON_URL);
            return dispatch({
                type: GET_POKEMONS,
                payload: json.data
            })

        } catch (error) {
            console.log(error);

        }
        // console.log(json.data)
    }
}