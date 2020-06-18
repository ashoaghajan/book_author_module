import * as React from 'react';
import { graphql } from 'react-apollo';
import { styles } from '../../globalStyles';
import { getBooksQuery, deleteBookMutation } from '../../queries/queries';
import EditBook from './EditBook';
import OtherBooks from '../author/OtherBooks';
// for composing queries together
const _ = require('lodash');

const Book: React.FunctionComponent = (props: any) => {

    const { deleteBookMutation } = props;

    const book: Book = props.book;

    const handleDelete = () => {
        const result = window.confirm(`Are you shure you want to delete the book?`);
        if(result){
            deleteBookMutation({
                variables: { id: book.id },
                refetchQueries: [{ query: getBooksQuery }]
            }); 
        }
    }

    return ( 
        <tr>
            <td className='h6'>{book.name}</td>
            <td className='h6'>{book.genre}</td>
            <td className='h6'>{book.authorName}</td>
            <td>
                <EditBook book={book}/>
                <button className="btn btn-floating white" style={styles.button} onClick={handleDelete}>
                    <i className="material-icons pink-text text-darken-4">delete</i>
                </button>
            </td>
            <td>
                <OtherBooks author={book.author}/>
            </td>
        </tr>
     );
}
 
export default _.flowRight(
    graphql(deleteBookMutation, {name: 'deleteBookMutation'})
)(Book);