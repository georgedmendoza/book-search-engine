const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
      
              return userData;
            }
      
            throw new AuthenticationError('Not logged in');
        },
        // all users
        allUsers: async () => {
            return User.find()
              .select('-__v -password')
        },
    },

    Mutation: {
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const correctPW = await user.isCorrectPassword(password);

            if(!correctPW) {
                throw new AuthenticationError('Incorrect credentias')
            }

            const token = signToken(user)
            return { token, user};
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            // sign a token
            const token = signToken(user);
            // return obj combing token w/ user data
            return{ token, user};
            // return user;
        },
        saveBook: async (parent, args, context) => {
            // only logedin users can save books
            if (context.user) {
                const book = await Book.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { saveBooks: args }},
                    // returns new updated info
                    { new: true }
                );

                return book;
            }

            throw new AuthenticationError('You need to be logged in!')
        }
    }
};

module.exports = resolvers;