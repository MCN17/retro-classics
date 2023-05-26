const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Console, Order } = require("../models");
const { signToken } = require("../utils/auth");

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY); 

const resolvers = {
  Query: {
    consoles: async () => {
      return await Console.find();
    },
    products: async (parent, { console, name }) => {
      const params = {};

      if (console) {
        params.console = console;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate("console");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("console");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "console"
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "console"
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    }, 
    checkout: async (parent, args, context) => {
      const url = "https://thawing-headland-75590.herokuapp.com/"
      const order = new Order({ products: args.products });
      const line_items = [];
      const { products } = await order.populate("products");


      for (let i = 0; i < products.length; i++) {
        // generate product id
        const product = await stripe.products.create({
          name: products[i].name, 
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        // generate price id using the product id
        const price = await stripe.prices.create({
          product: product.id, 
          unit_amount: products[i].price * 100, 
          currency: "usd", 
        });

        // add price id to the line items array
        line_items.push({
          price: price.id, 
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], 
        line_items, 
        mode: "payment", 
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });
      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;