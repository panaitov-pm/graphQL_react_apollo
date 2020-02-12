import { gql } from 'apollo-boost';

export const removeDirectorMutation = gql`
    mutation removeDirector($Id: ID) {
        removeDirector(id: $Id) {
            id
        }
    }
`;
