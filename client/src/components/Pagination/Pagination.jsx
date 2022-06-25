import React, { useState, useEffect } from 'react';

function Pagination({ pokemonsPerPage, allPokemons, pagination }) {

    const numberOfPages = [];
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        numberOfPages.push(i)
    }

    return (

        <nav>
            <div className='pagination-container'>
                {numberOfPages?.map(number => {
                    return (
                            <a onClick={() => pagination(number)}>{number}</a>
                    
                    )
                })}
            </div>
        </nav>
    )
}

export default Pagination;