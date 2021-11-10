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
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(useraname: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// need help with this one
export const SAVE_BOOK = gql `
    mutation saveBook($)
`;

// need help with this one
export const REMOVE_BOOK = gql `

`;
