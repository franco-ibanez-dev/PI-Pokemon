import { GET_POKEMONS } from "../../utils/constants/constants";

const initialState = {
    pokemons: []
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
    }
}

export default rootReducer;