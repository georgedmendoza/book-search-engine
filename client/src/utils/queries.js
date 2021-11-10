import { gql } from '@apollo/client';

// displays the user alond with the desired data for the books in the saved array
export const GET_ME = gql `
    query me($username: String!) {
        me(username: $username) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;