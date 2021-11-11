import { gql } from '@apollo/client';

// displays the user alond with the desired data for the books in the saved array
export const GET_ME = gql `
{
    me {
      _id
      username
      email
      savedBooks {
        authors
        title
        link
        description
        image
        bookId
      }
    }
}
`;