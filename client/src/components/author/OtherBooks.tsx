import React, { Fragment, useState, useMemo } from 'react'
import {
    useSmallStyles,
    getModalStyle,
    styles,
    callback,
    requestSort,
    getClassNamesFor
} from '../../globalStyles';
import Modal from '@material-ui/core/Modal';

export interface OtherBooksProps {
    author: Author
}
 
const OtherBooks: React.FunctionComponent<OtherBooksProps> = ({ author }) => {

      //modal styleing
      const classes = useSmallStyles();
      const [modalStyle] = React.useState(getModalStyle);
      const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
  
      const handleClose = () => {
          setOpen(false);
        };

    // state & function for table sorting
    const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: 'ascending'
    });

    const { books } = author;

    const sortedBooks = useMemo(callback(sortConfig, books), [books, sortConfig]);

        const bookList = sortedBooks.length ? (
            sortedBooks.map(book => (
                <tr key={book.id}>
                    <td>{book.name}</td>
                    <td>{book.genre}</td>
                </tr>
            ))
        ) : null;

        const body = (
            <div style={modalStyle} className={classes.paper}>
                <h5 id="simple-modal-title">Book History for {author.name}</h5>
                <p>Author's Age: {author.age}</p>
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
                        </tr>
                    </thead>
                    <tbody>
                        {bookList}
                    </tbody>
                </table>
            </div>
        );

    return ( 
        <Fragment>
            <button type="button" className='btn btn-floating white indigo-text' style={styles.button} onClick={handleOpen}>
                <i className="material-icons pink-text text-darken-4">archive</i>
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
 
export default OtherBooks;