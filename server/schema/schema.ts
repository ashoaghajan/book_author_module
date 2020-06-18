const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, 
    GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;



const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
        author: {
            type: AuthorType,
            resolve(parent: any, args: any){
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent: any, args: any){
                return Book.find({ authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID} },
            resolve(parent: any, args: any){
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID} },
            resolve(parent: any, args: any){
                return Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent: any, args: any){
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent: any, args: any){
                return Author.find({})
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent: any, args: any){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        updateAuthor: {
            type: AuthorType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent: any, args: any){
                return Author.updateOne(
                    { _id: args.id },
                    {
                      $set: { 
                        name: args.name,
                        age: args.age,
                       },
                      $currentDate: { lastModified: true }
                    }
                 )
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent: any, args: any){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        },
        deleteBook: {
            type: BookType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent: any, args: any){
                return Book.deleteOne({_id: args.id})
            }
        },
        updateBook: {
            type: BookType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent: any, args: any){
                return Book.updateOne(
                    { _id: args.id },
                    {
                      $set: { 
                        name: args.name,
                        genre: args.genre,
                        authorId: args.authorId
                       },
                      $currentDate: { lastModified: true }
                    }
                 )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})