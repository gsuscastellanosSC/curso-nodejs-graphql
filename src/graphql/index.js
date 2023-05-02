const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('@apollo/server-plugin-landing-page-graphql-playground');
const { expressMiddleware } = require('@apollo/server/express4');

const typeDefs = `
  type Query {
    hello: String
    getPeople(name: String, age: Int): String
  }
`;


const resolvers = {
    Query: {
        hello: () => 'Hello World',
        getPeople: (_, args) => `Hello, my name is ${args.name}, I´m ${args.age} years old!`
    }
}

const useGraphql = async(app) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground
        ]
    });

    await server.start();

    app.use(expressMiddleware(server, {
        context: async({ req }) => ({ token: req.headers.token }),
    }));

}

module.exports = useGraphql