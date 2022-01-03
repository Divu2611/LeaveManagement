import React from 'react';
const _ = require('lodash');

const Pagination = ({itemsCount, pageSize, currentPage, onPageChange}) => {

    const pageCount = Math.ceil(itemsCount/pageSize);
    if(pageCount===1){
        return null;
    }

    const pages = _.range(1,pageCount+1);

    return (
        <React.Fragment>
            <nav aria-label="..." className="my-3">
                <ul className="pagination">
                    {pages.map(page => (
                        <li key={page} 
                            className={page===currentPage ? "page-item active" : "page-item"}
                            style={{cursor:"pointer"}}>
                            <a className="page-link"
                               onClick={() => onPageChange(page)}>
                                {page}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </React.Fragment>
    );
}

export default Pagination;