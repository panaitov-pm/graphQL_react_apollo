import { graphql } from 'react-apollo';
import { compose } from 'recompose';

import { removeDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

const withGraphQLRemove = graphql(removeDirectorMutation, {
    props: ({ mutate }) => ({
        removeDirector: id => mutate({
            variables: id,
            refetchQueries: [{
                query: directorsQuery,
                variables: { name: '' },
            }],
        }),
    }),
});

export default compose(withGraphQLRemove);
