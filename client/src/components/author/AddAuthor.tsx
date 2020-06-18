import React, { useState, Fragment } from 'react';
import { graphql } from 'react-apollo';
import Modal from '@material-ui/core/Modal';
import { getAuthorsQuery, addAuthorMutation } from '../../queries/queries';
import { useSmallStyles, getModalStyle, styles } from '../../globalStyles';
 
const AddAuthor: React.FunctionComponent = (props: any) => {

    const { addAuthorMutation } = props;

    const [author, setAuthor] = useState({
        name: '',
        age: 0
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
        if(e.target.id === 'age'){
            setAuthor({
                ...author,
                [e.target.id]: Number(e.target.value)
            })
        } else {
            setAuthor({
                ...author,
                [e.target.id]: e.target.value
            })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addAuthorMutation({
            variables: author,
            refetchQueries: [{ query: getAuthorsQuery }]
        });
        setSuccess(true);
        setAuthor({
            name: '',
            age: 0
        })
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h5>Add a new author</h5>
            <form onSubmit={handleSubmit} id='book-form'>
                <div className="input-field col s12">
                    <label htmlFor="name">Author Name</label>
                    <input type="text" id='name' value={author.name} onChange={handleChange} required />
                </div>
                <div className="input-field col s12">
                    <label htmlFor="age">Age</label>
                    <input type="number" id='age' value={(author.age === 0) ? '' : author.age} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn pink darken-4">Add</button>
                {success && <p className='green-text'>Author has been added</p>}
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
 
export default graphql(addAuthorMutation, {name: 'addAuthorMutation'})(AddAuthor);