import {
    ORDER_BY_NAME,
    ORDER_BY_ATTACK,
    FYLTER_BY_ORIGIN,
    FYLTER_BY_TYPE,
    GET_POKEMONS,
    GET_TYPES,
    GET_POKEMON_BY_NAME,
    POST_POKEMON,
    GET_POKEMON_BY_ID,
    RESET_DETAIL,
    REFRESH_POKEMONS
} from "../../utils/constants/constants";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: {},
}


function rootReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POKEMON_BY_ID:
            return {
                ...state,
                detail: action.payload
            }

        case REFRESH_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case GET_POKEMONS:
            if (state.pokemons.length === 0) {
                return {
                    ...state,
                    pokemons: action.payload,
                    allPokemons: action.payload
                }
            } else {
                return {
                    ...state,
                }
            }

        case GET_POKEMON_BY_NAME: {
            return {
                ...state,
                pokemons: action.payload
            }
        }

        case POST_POKEMON: {
            return {
                ...state
            }
        }
        case RESET_DETAIL: {
            return {
                ...state,
                detail: action.payload
            }
        }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
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
                return action.payload === 'ownDB' && isNaN(pokemon.id) ? true :
                    action.payload === 'externalAPI' && !isNaN(pokemon.id) ? true :
                        false;
            })
            return {
                ...state,
                pokemons: originFiltered
            }

        case ORDER_BY_ATTACK:
            const allPokemons3 = state.allPokemons
            const attackFiltered = action.payload === "asc" ? allPokemons3.sort((a, b) => a.attack - b.attack) : action.payload === "desc" ? state.pokemons.sort((a, b) => b.attack - a.attack) : allPokemons3;

            return {
                ...state,
                pokemons: attackFiltered
            }

        case ORDER_BY_NAME:
            const allPokemons4 = state.allPokemons
            const nameFiltered = action.payload === "asc" ?
                allPokemons4.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0) : action.payload === "desc" ? state.pokemons.sort((a, b) => a.name < b.name ? 1 : a.name > b.name ? -1 : 0) : allPokemons4

            return {
                ...state,
                pokemons: nameFiltered
            }

        default:
            return state;
    }
}

export default rootReducer;
