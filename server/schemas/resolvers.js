const { AuthenticationError } = require('apollo-server-express');
const { User, Project, Developer, Service } = require('../models');
const { signToken } = require('../utils/auth');
// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');




const resolvers = {
    Query: {
        allUsers: async (parent, args, context) => {
            return await User.find().populate('projects');
        },
        allDevelopers: async (parent, args, context) => {
            return await Developer.find().populate('services');
        },
        allProjects: async (parent, args, context) => {
            return await Project.find();
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    populate: 'projects'
                });
      
                user.projects.sort((a, b) => b.dateCreated - a.dateCreated);
      
                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
        allUsers: async (parent, args, context) => {
            return await User.find().populate('projects');
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect email or password');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect email or password');
            }
            const token = signToken(user);
            return { token, user };
        },
    }
}

module.exports = resolvers;