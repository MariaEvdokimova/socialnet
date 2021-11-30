import React, {useState} from 'react';
import styles from "./Pagination.module.css";
import cn from 'classnames';

const Pagination = ({totalItems, pageSize, currentPage, portionSize, onPageChange}) => {

    let countPages = Math.ceil(totalItems / pageSize);
    let pages = [];

    for (let i = 1; i <= countPages; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(countPages / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize +1;
    let rightPotionPageNumber = portionNumber * portionSize;

    return <div>
        { portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) } }>Prev</button>
        }
        {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPotionPageNumber )
                .map((page) => {
                return <span key={page}
                    className={cn({[styles.users_page__selected]: currentPage === page})}
                    onClick={() => {
                        onPageChange(page)
                    }}>
                    {page}
                </span>
            })
        }
        { portionNumber < portionCount &&
            <button onClick={()=> { setPortionNumber(portionNumber + 1)}}>Next</button>
        }
    </div>
}

export default Pagination;