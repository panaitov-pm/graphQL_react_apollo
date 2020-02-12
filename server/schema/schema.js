const graphQL = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLBoolean } = graphQL;

const Movies = require('../models/movie');
const Directors = require('../models/director');

// graphQL schema
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        rate: { type: GraphQLInt },
        watched: { type: new GraphQLNonNull(GraphQLBoolean) },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                //  return directors.find(director => director.id === parent.directorId)
                return Directors.findById(parent.directorId);
            },
        },
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                //    return movies.filter(movie => movie.directorId === parent.id);
                return Movies.find({ directorId: parent.id });
            },
        },
    }),
});

// Root Query
const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                //  return movies.find(movie => movie.id === args.id);
                return Movies.findById(args.id);
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            args: {
                name: { type: GraphQLString },
            },
            resolve(parent, { name }) {

                return Movies.find({
                    name: {
                        $regex: name,
                        $options: 'i',
                    },
                });
            },
        },
        director: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                //  return directors.find(director => director.id === args.id);
                return Directors.findById(args.id);
            },
        },
        directors: {
            type: new GraphQLList(DirectorType),
            args: {
                name: {
                    type: GraphQLString,
                },
            },
            resolve(parent, { name }) {
                return Directors.find({
                    name: {
                        $regex: name,
                        $options: 'i',
                    },
                });
            },
        },
    },
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                const { name, age, rate, watched } = args;

                const director = new Directors({
                    name,
                    age,
                });

                return director.save();
            },
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: GraphQLID },
                rate: { type: GraphQLInt },
                watched: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            resolve(parent, args) {
                const { name, genre, directorId, rate, watched } = args;

                const movie = new Movies({
                    name,
                    genre,
                    directorId,
                    rate,
                    watched,
                });

                return movie.save();
            },
        },
        removeDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Directors.findByIdAndRemove(args.id);
            },
        },
        removeMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Movies.findByIdAndRemove(args.id);
            },
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                const { id, name, age } = args;
                return Directors.findByIdAndUpdate(id,
                    {
                        $set: {
                            name,
                            age,
                        },
                    },
                    { new: true },
                );
            },
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: GraphQLID },
                rate: { type: GraphQLInt },
                watched: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            resolve(parent, args) {
                const { id, name, genre, directorId, rate, watched } = args;

                return Movies.findByIdAndUpdate(id,
                    {
                        $set: {
                            name,
                            genre,
                            directorId,
                            rate,
                            watched,
                        },
                    },
                    { new: true },
                );
            },
        },
    },
});


module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
});
