import React, { useState, useMemo } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../../queries/queries';
import Book from './Book';
import { callback, requestSort, getClassNamesFor } from '../../globalStyles';

const ListBooks = (props: any) => {

    const books = props.data.books ? props.data.books : [];

    // state & function for table sorting
    const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: 'ascending'
    });

    const sortedBooks = useMemo(callback(sortConfig, books), [books, sortConfig]);

    const bookList = sortedBooks.length ? (
        sortedBooks.map((book: Book) => {
            book.authorName = book.author.name;
            return <Book key={book.id} book={book}/>
        })
    ) : <tr>
        <td colSpan={5}>Loading books</td>
    </tr>

    return ( 
        <table className="responsive-tab">
            <thead>
                <tr>
                    <th>
                        <button type="button" className='white btn-flat pink-text text-darken-4' onClick={() => requestSort('name', sortConfig, setSortConfig)}>
                            Book Name<i className="material-icons pink-text text-darken-4">{getClassNamesFor('name', sortConfig)}</i>
                        </button>
                    </th>
                    <th>
                        <button type="button" className='white btn-flat pink-text text-darken-4' onClick={() => requestSort('genre', sortConfig, setSortConfig)}>
                            Genre<i className="material-icons pink-text text-darken-4">{getClassNamesFor('genre', sortConfig)}</i>
                        </button>
                    </th>
                    <th>
                        <button type="button" className='white btn-flat pink-text text-darken-4' onClick={() => requestSort('authorName', sortConfig, setSortConfig)}>
                            Author<i className="material-icons pink-text text-darken-4">{getClassNamesFor('authorName', sortConfig)}</i>
                        </button>
                    </th>
                    <th>Edit__/__Delete</th>
                    <th>Other books by same author</th>
                </tr>
            </thead>
            <tbody>
                {bookList}
            </tbody>
        </table>
     );
}
 
export default graphql(getBooksQuery)(ListBooks);
