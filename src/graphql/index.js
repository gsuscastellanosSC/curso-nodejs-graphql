const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('@apollo/server-plugin-landing-page-graphql-playground');
const { expressMiddleware } = require('@apollo/server/express4');

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
        hello: () => 'hola mundo',
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