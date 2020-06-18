import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery, deleteBookMutation, getBooksQuery } from '../../queries/queries';
import EditBook from './EditBook';
// for composing queries together
import { styles } from '../../globalStyles';
const _ = require('lodash');
 
const BookDetails: React.FunctionComponent = (props: any) => {

    const { getBookQuery, deleteBookMutation  } = props;

    const book: Book  = getBookQuery.book;

    console.log(props)

    const handleDelete = () => {
        deleteBookMutation({
            variables: { id: book.id },
            refetchQueries: [{ query: getBooksQuery }]
        }) 
    }

    const bookInfo = book ? (
        <div>
            <h4>{book.name}</h4>
            <h6>Genre: {book.genre}</h6>
            <h6>Author: {book.author.name}</h6>
            <br />
            <h5>All books by this author</h5>
            <ul>
                {book.author.books.map((item: Book) => (
                   <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <button className="btn btn-floating white" style={styles.button} onClick={handleDelete}>
                <i className="material-icons pink-text text-darken-4">delete</i>
            </button>
            <EditBook book={book}/>
        </div>
    ) : <div>No book is selected</div>;

    return (  
        <div className='container' id='book-details'>
            {bookInfo}
        </div> 
    );
}
 
export default 
_.flowRight(
    graphql(getBookQuery,{
        name: 'getBookQuery',
        options: (props: any) => {
            return {
                variables: {
                   id: props.bookId 
                }
            }
        }
    }),
    graphql(deleteBookMutation, {name: 'deleteBookMutation'})
)(BookDetails);
