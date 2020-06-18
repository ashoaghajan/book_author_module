import React, { useState, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { Select } from 'react-materialize';
import Modal from '@material-ui/core/Modal';
import { getAuthorsQuery, updateBookMutation, getBooksQuery } from '../../queries/queries';
import { useSmallStyles, getModalStyle, styles } from '../../globalStyles';
// for composing queries together
const _ = require('lodash');
 
const EditBook: React.FunctionComponent = (props: any) => {

    const { getAuthorsQuery, updateBookMutation } = props;

    const book: Book = props.book;

    const [bookToUpdate, setBookToUpdate] = useState({
        name: book.name,
        genre: book.genre,
        authorId: book.authorId
    });

    const [success, setSuccess] = useState(false);

    //modal styleing
    const classes = useSmallStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setSuccess(false);
        restoreDetails();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setBookToUpdate({
            ...bookToUpdate,
            [e.target.id]: e.target.value
        })
    }

    const restoreDetails = () => {
        setBookToUpdate({
            name: book.name,
            genre: book.genre,
            authorId: book.authorId
        }); 
        setSuccess(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateBookMutation({
            variables: {
                id: book.id,
                ...bookToUpdate
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
        setSuccess(true);
    }

    const filteredAuthors = getAuthorsQuery.authors ? (
        getAuthorsQuery.authors.filter((author: Author) => author.id !== book.author.id)
    ) : null;

    const authors = filteredAuthors ? (
        filteredAuthors.map((author: Author) => (
          <option key={author.id} value={author.id}>{author.name}</option>
        ))
    ) : null;

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h5>Edit the book</h5>
            <form onSubmit={handleSubmit} id='book-form'>
                <div className="col s12">
                    <label htmlFor="name">Book Name</label>
                    <input type="text" id='name' value={bookToUpdate.name} onChange={handleChange} required />
                </div>
                <div className="col s12">
                    <label htmlFor="genre">Genre</label>
                    <input type="text" id='genre' value={bookToUpdate.genre} onChange={handleChange} required />
                </div>
                <div className="col s12">
                    <label htmlFor="authorId">Select Author</label>
                    <Select id='authorId' value={bookToUpdate.authorId} onChange={handleChange}>
                        <option value={book.authorId}>{book.author.name}</option>
                        {authors}
                    </Select>
                </div>
                <button type="button" className="btn grey left" style={styles.button} onClick={restoreDetails}>Reset</button>
                <button type="submit" className="btn pink darken-4" style={styles.button}>update</button>
                {success && <p className='green-text'>Book has been updated</p>}
            </form>
        </div>
    )

    return ( 
        <Fragment>
            <button className="btn btn-floating white" style={styles.button} onClick={handleOpen}>
                <i className="material-icons pink-text text-darken-4">edit</i>
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </Fragment>
     );
}
 
export default _.flowRight(
    graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
    graphql(updateBookMutation, {name: 'updateBookMutation'})
)(EditBook);