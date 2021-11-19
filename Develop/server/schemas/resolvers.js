const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {


Mutation: {
  addUser: async (parent, { username, email, password }) => {
    const user = await User.create({ username, email, password });
    const token = signToken(user);

    return { token, user };
  },
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('No profile with this email found!');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect password!');
    }

    const token = signToken(user);
    return { token, user };
  }
//     // Add a third argument to the resolver to access data in our `context`
//     addSkill: async (parent, { profileId, skill }, context) => {
//       // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
//       if (context.user) {
//         return Profile.findOneAndUpdate(
//           { _id: profileId },
//           {
//             $addToSet: { skills: skill },
//           },
//           {
//             new: true,
//             runValidators: true,
//           }
//         );
//       }
//       // If user attempts to execute this mutation and isn't logged in, throw an error
//       throw new AuthenticationError('You need to be logged in!');
//   },
//       // Make it so a logged in user can only remove a skill from their own profile
//     removeSkill: async (parent, { skill }, context) => {
//       if (context.user) {
//         return Profile.findOneAndUpdate(
//           { _id: context.user._id },
//           { $pull: { skills: skill } },
//           { new: true }
//         );
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
  },
};

module.exports = resolvers;
