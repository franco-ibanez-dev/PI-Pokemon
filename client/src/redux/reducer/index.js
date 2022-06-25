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

        // case FYLTER_BY_TYPE:
            
        //     // console.log("This one is allPokemons");
        //     // console.log(allPokemons);
        //     // console.log("This one is statusFiltered");
        //     // console.log(statusFiltered);
        //     return {
        //         ...state,
        //         pokemons: statusFiltered
        //     }
        default:
            return state;
    }
}

export default rootReducer;