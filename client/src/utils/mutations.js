import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token 
            user {
                _id
                username
            }
        }
    }
`;

// needs to be revised 
export const ADD_USER = gql `
mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
        email
      }
    }
}
`; 

// should book ID be generated by itself?
// currently I input a digit 
export const SAVE_BOOK = gql `
    mutation saveBook($inputBook: SaveBookRequest!) {
        saveBook(inputBook: $inputBook) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            image
            description
            title
            link
        }
    }
}
`;

// currently doesn't delete a book
// double check bookID info
export const REMOVE_BOOK = gql `
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;