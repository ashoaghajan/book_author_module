import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`
    {
        authors{
            name
            age
            id
            books{
                name
                genre
                id
            }
        }
    }
`;

export const addAuthorMutation = gql`
    mutation($name: String!, $age: Int!){
        addAuthor(name: $name, age: $age){
            name
            age
        }
    }
`;

export const updateAuthorMutation = gql`
    mutation($id: ID!, $name: String!, $age: Int!){
        updateAuthor(id: $id, name: $name, age: $age){
            name
            age
            id
        }
    }
`;

export const getBooksQuery = gql`
{
    books{
        name
        genre
        id
        authorId
        author{
          name
          id
          age
          books{
              name
              genre
              id
          }
        }
    }
}
`;

export const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

// not used at the moment
export const getBookQuery = gql`
    query($id: ID){
        book(id: $id){
            name, 
            genre
            id,
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`;

export const deleteBookMutation = gql`
    mutation($id: ID!){
        deleteBook(id: $id){
            name
        }
    } 
`;

export const updateBookMutation = gql`
    mutation($id: ID!, $name: String!, $genre: String!, $authorId: ID!){
        updateBook(id: $id, name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;