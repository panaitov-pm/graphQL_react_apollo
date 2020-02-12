import { gql } from 'apollo-boost';

export const removeMovieMutation = gql`
    mutation removeMovie($Id: ID) {
        removeMovie(id: $Id) {
            id
        }
    }
`;
