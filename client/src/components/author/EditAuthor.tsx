import React, { useState, Fragment } from 'react';
import { graphql } from 'react-apollo';
import Modal from '@material-ui/core/Modal';
import { getAuthorsQuery, updateAuthorMutation } from '../../queries/queries';
import { useSmallStyles, getModalStyle, styles } from '../../globalStyles';
// for composing queries together
const _ = require('lodash');
 
const EditAuthor: React.FunctionComponent = (props: any) => {

    const { updateAuthorMutation } = props;

    const author: Author = props.author;

    const [authorToUpdate, setAuthorToUpdate] = useState({
        name: author.name,
        age: author.age
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
        if(e.target.id === 'age'){
            setAuthorToUpdate({
                ...author,
                [e.target.id]: Number(e.target.value)
            })
        } else {
            setAuthorToUpdate({
                ...author,
                [e.target.id]: e.target.value
            })
        }
    }

    const restoreDetails = () => {
        setAuthorToUpdate({
            name: author.name,
            age: author.age
        }); 
        setSuccess(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateAuthorMutation({
            variables: {
                id: author.id,
                ...authorToUpdate
            },
            refetchQueries: [{ query: getAuthorsQuery }]
        });
        setSuccess(true);
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h5>Edit the book</h5>
            <form onSubmit={handleSubmit} id='book-form'>
                <div className="col s12">
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' value={authorToUpdate.name} onChange={handleChange} required />
                </div>
                <div className="col s12">
                    <label htmlFor="age">Age</label>
                    <input type="number" id='age' value={authorToUpdate.age} onChange={handleChange} required />
                </div>
                <button type="button" className="btn grey left" style={styles.button} onClick={restoreDetails}>Reset</button>
                <button type="submit" className="btn pink darken-4" style={styles.button}>update</button>
                {success && <p className='green-text'>Author has been updated</p>}
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
    graphql(updateAuthorMutation, {name: 'updateAuthorMutation'})
)(EditAuthor);