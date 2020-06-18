import * as React from 'react';
import OtherBooks from '../author/OtherBooks';
import EditAuthor from './EditAuthor';

export interface AuthorProps {
    author: Author
}

const Author: React.FunctionComponent<AuthorProps> = ({ author }) => {

    return ( 
        <tr key={author.id}>
        <td>{author.name}</td>
        <td>{author.age}</td>
        <td>
            <OtherBooks author={author} />
        </td>
        <td>
            <EditAuthor author={author} />
        </td>
    </tr>
     );
}
 
export default Author;