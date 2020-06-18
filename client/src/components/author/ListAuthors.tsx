import React, { useState, useMemo } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorsQuery } from '../../queries/queries';
import Author from './Author';
import { callback, getClassNamesFor, requestSort } from '../../globalStyles';

const ListAuthors = (props: any) => {

    const authors = props.data.authors ? props.data.authors : [];

     // state & function for table sorting
     const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: 'ascending'
    });

    const sortedAuthors = useMemo(callback(sortConfig, authors), [authors, sortConfig]);

    const authorList = sortedAuthors.length ? (
        sortedAuthors.map((author: Author) => (
            <Author key={author.id} author={author}/>
        ))
    ) : <tr>
        <td colSpan={4}>Loading authors</td>
    </tr>

    return ( 
        <table className="responsive-tab">
            <thead>
                <tr>
                    <th>
                        <button type="button" className='white btn-flat pink-text text-darken-4' onClick={() => requestSort('name', sortConfig, setSortConfig)}>
                            Author Name<i className="material-icons pink-text text-darken-4">{getClassNamesFor('name', sortConfig)}</i>
                        </button>
                    </th>
                    <th>
                        <button type="button" className='white btn-flat pink-text text-darken-4' onClick={() => requestSort('age', sortConfig, setSortConfig)}>
                            Author Age<i className="material-icons pink-text text-darken-4">{getClassNamesFor('age', sortConfig)}</i>
                        </button>
                    </th>
                    <th>Books</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {authorList}
            </tbody>
        </table>
     );
}
 
export default graphql(getAuthorsQuery)(ListAuthors);
