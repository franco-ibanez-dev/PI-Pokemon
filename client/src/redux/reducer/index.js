import { FYLTER_BY_ORIGIN, FYLTER_BY_TYPE, GET_POKEMONS, GET_TYPES } from "../../utils/constants/constants";
import { filterPokemonsByOrigin } from "../actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POKEMONS:

            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case FYLTER_BY_TYPE:
            const allPokemons = state.allPokemons
            const typeFiltered = action.payload === 'all' ? allPokemons : allPokemons.filter((pokemon) => {
                let iterator = pokemon.types.values()
                for (let obj of iterator) {
                    if (obj.name === action.payload) return true;
                }
                return false;
            })
            // console.log(typeFiltered);
            return {
                ...state,
                pokemons: typeFiltered
            }

        case FYLTER_BY_ORIGIN:
            const allPokemons2 = state.allPokemons
            const originFiltered = action.payload === 'all' ? allPokemons2 : allPokemons2.filter((pokemon) => {
               return  action.payload === 'ownDB' && isNaN(pokemon.id) ? true :
                    action.payload === 'externalAPI' && !isNaN(pokemon.id) ? true :
                        false;
            })
            return {
                ...state,
                pokemons: originFiltered
            }

        default:
            return state;
    }
}

export default rootReducer;