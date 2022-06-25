import React from 'react';

function Pagination({ pokemonsPerPage, allPokemons, pagination }) {

    const numberOfPages = [];
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        numberOfPages.push(i)
    }

    return (

        <nav>
            <div className='pagination-container'>
                {numberOfPages?.map((number, index) => {
                    return (
                        <a key={index} onClick={() => pagination(number)} href="#!">{number}</a>

                    )
                })}
            </div>
        </nav>
    )
}

export default Pagination;