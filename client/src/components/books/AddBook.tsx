import React, { useState, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { Select } from 'react-materialize';
import Modal from '@material-ui/core/Modal';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../../queries/queries';
import { useSmallStyles, getModalStyle, styles } from '../../globalStyles';
// for composing queries together
const _ = require('lodash');
 
const AddBook: React.FunctionComponent = (props: any) => {

    const { getAuthorsQuery, addBookMutation } = props;

    const [book, setBook] = useState({
        name: '',
        genre: '',
        authorId: '5ee8acf5fe4e4760ac2472f8'
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
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setBook({
            ...book,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addBookMutation({
            variables: book,
            refetchQueries: [{ query: getBooksQuery }]
        });
        setSuccess(true);
        setBook({
            name: '',
            genre: '',
            authorId: '5ee8acf5fe4e4760ac2472f8'
        })
    }

    const authors = getAuthorsQuery.authors ? (
        getAuthorsQuery.authors.map((author: Author) => (
          <option key={author.id} value={author.id}>{author.name}</option>
        ))
    ) : null;

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h5>Add a new book</h5>
            <form onSubmit={handleSubmit} id='book-form'>
                <div className="input-field col s12">
                    <label htmlFor="name">Book Name</label>
                    <input type="text" id='name' value={book.name} onChange={handleChange} required />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="genre">Genre</label>
                    <input type="text" id='genre' value={book.genre} onChange={handleChange} required />
                </div>
                <div className="col s12">
                    <label htmlFor="authorId">Select Author</label>
                    <Select id='authorId' value={book.authorId} onChange={handleChange}>
                        {authors}
                    </Select>
                </div>
                <button type="submit" className="btn pink darken-4">Add</button>
                {success && <p className='green-text'>Book has been added</p>}
            </form>
        </div>
    )

    return ( 
        <Fragment>
            <button className="btn btn-floating white" style={styles.button} onClick={handleOpen}>
                <i className="material-icons pink-text text-darken-4">add</i>
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
    graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);