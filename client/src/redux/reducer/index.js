import { FYLTER_BY_TYPE, GET_POKEMONS, GET_TYPES } from "../../utils/constants/constants";

const initialState = {
    pokemons: [],
    types: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POKEMONS:

            return {
                ...state,
                pokemons: action.payload
            }

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case FYLTER_BY_TYPE:
            const allPokemons = state.pokemons
            const statusFiltered = allPokemons.filter((pokemon) => {
                let iterator = pokemon.types.values()
                for (let obj of iterator) {
                    if (obj.name === action.payload) return true;
                }
                return false;
            })
            // console.log(statusFiltered);
            return {
                ...state,
                pokemons: statusFiltered
            }
        default:
            return state;
    }
}

export default rootReducer;