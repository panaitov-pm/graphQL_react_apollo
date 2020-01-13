const graphQL = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLSchema } = graphQL;

const Movies = require('../models/movie');
const Directors = require('../models/director');

/*const movies = [
    { name: "Pulp Fiction", genre: "Crime", directorId: "5e19c8ce1c9d4400007089e7" },
    { name: "1984", genre: "Sci-Fi", directorId: "5e19c8ce1c9d4400007089e7" },
    { name: "V for Vendetta", genre: "Triller", directorId: "5e19c9d21c9d4400007089e8" },
    { name: "SpiderMan", genre: "Fantasy", directorId: "5e19c9f81c9d4400007089e9" },
];

const directors = [
    { name: "Quentin Tarantino", age: 33 },
    { name: "Mikel Redford", age: 55 },
    { name: "James", age: 43 },
    { name: "Guy Ritchie", age: 23 },
];*/

// graphQL schema
const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
              //  return directors.find(director => director.id === parent.directorId)
                return Directors.findById(parent.directorId, function (err, adventure) {
                    console.log('---err', err);
                });
            }
        },
    }),
});

const DirectorType = new GraphQLObjectType({
    name: "Director",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
            //    return movies.filter(movie => movie.directorId === parent.id);
                return Movies.find({directorId: parent.id});
            },
        },
    }),
});

// Root Query
const Query = new GraphQLObjectType({
    name: "Query",
    fields: {
        movie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                console.log('---args', args);
              //  return movies.find(movie => movie.id === args.id);
                return Movies.findOne({_id: args.id}, function (err, adventure) {
                    console.log('---err', adventure);
                });
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
              //  return movies;
                return Movies.find({});
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
            resolve(parent, args) {
              //  return directors;
                return Directors.find({});
            },
        },
    },
});


module.exports = new GraphQLSchema({
    query: Query,
});
