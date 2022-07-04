import React from 'react';
import style from './pagination.module.css'

function Pagination({ pokemonsPerPage, allPokemons, pagination }) {

    const numberOfPages = [];
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        numberOfPages.push(i)
    }

    return (

        <nav>
            <div className={style.pagination}>
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