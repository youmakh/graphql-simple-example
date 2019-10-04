const { GraphQLServer } = require('graphql-yoga')

let posts = [
    { id: 'post-0', title: 'All Cats Are Beautiful', content: 'They really are!' },
]
let idCounter = posts.length

const typeDefs = `
    type Query {
        feed: [Post!]!
        post(id: String!): Post!
    }

    type Mutation {
        post(title: String!, content: String!): Post!
    }

    type Post {
        id: ID!,
        title: String!,
        content: String!
    }
`

const resolvers = {
    Query: {
        feed: () => posts,
        post: (_, args) => posts.find((post) => post.id === args.id)
    },
    Mutation: {
        post: (_, args) => {
            const post = {
                id: `post-${idCounter++}`,
                title: args.title,
                content: args.content,
            }
            posts.push(post)
            return post
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})
const port = process.env.PORT || 4000
server.start({
    port: port
})
console.log(`Server is running on http://localhost:${port}`)