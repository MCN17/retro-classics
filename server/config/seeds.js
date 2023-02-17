const db = require('./connection');
const { User, Product, Console } = require('../models');

db.once('open', async () => {
  await Console.deleteMany();

  const consoles = await Console.insertMany([
    { name: "NES" },
    { name: "N64" },
    { name: "Playstation 2" },
    { name: "Sega" },
    { name: "SNES" }
  ]);

  console.log('consoles are seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Super Mario 3",
      description:
        "Super Mario Bros. 3 is a platform game developed and published by Nintendo for the Nintendo Entertainment System.",
      image: "superMario3.jpg",
      console: consoles[0]._id,
      price: 20.99,
      quantity: 100
    },
    {
      name: "The Legend of Zelda",
      description:
        "The Legend of Zelda, originally released in Japan as The Hyrule Fantasy: Zelda no Densetsu, is a 1986 action-adventure game developed and published by Nintendo.",
      image: "theLegendOfZelda.jpg",
      console: consoles[0]._id,
      price: 29.99,
      quantity: 100
    },
    {
        name: "Goldeneye",
        description:
          "GoldenEye 007 is a 1997 first-person shooter developed by Rare and published by Nintendo for the Nintendo 64.",
        image: "Goldeneye.jpg",
        console: consoles[1]._id,
        price: 19.99,
        quantity: 100
      },
      {
        name: "Super Smash Bros.",
        description:
          "Super Smash Bros. is a 1999 crossover fighting video game developed by HAL Laboratory and published by Nintendo for the Nintendo 64.",
        image: "SuperSmashBros.jpg",
        console: consoles[1]._id,
        price: 39.99,
        quantity: 100
      },
      {
        name: "Conker's Bad Fur Day",
        description:
          "Conker's Bad Fur Day is a 2001 platform game developed and published by Rare for the Nintendo 64.",
        image: "ConkersBadFurDay.jpg",
        console: consoles[1]._id,
        price: 99.99,
        quantity: 100
      },
      {
        name: "Perfect Dark",
        description:
          "Perfect Dark is a 2000 first-person shooter developed and published by Rare for the Nintendo 64.",
        image: "perfectDark.jpg",
        console: consoles[1]._id,
        price: 29.99,
        quantity: 100
      },
      {
        name: "Super Mario kart",
        description:
          "Super Mario Kart is a kart racing video game developed and published by Nintendo for the Super Nintendo Entertainment System. ",
        image: "superMarioKart.jpg",
        console: consoles[4]._id,
        price: 15.99,
        quantity: 100
      },
      {
        name: "Donkey Kong Country",
        description:
          "Donkey Kong Country is a 1994 platform game developed by Rare and published by Nintendo for the Super Nintendo Entertainment System. ",
        image: "donkeyKongCountry.jpg",
        console: consoles[4]._id,
        price: 15.99,
        quantity: 100
      },
      {
        name: "Aladdin",
        description:
          "Disney's Aladdin is a 1993 platform game developed and published by Capcom for the Super Nintendo Entertainment System, based on the 1992 animated Disney film of the same name. ",
        image: "Aladdin.jpg",
        console: consoles[4]._id,
        price: 10.99,
        quantity: 100
      },

      {
        name: "Sonic the Hedgehog",
        description:
          "Sonic the Hedgehog is a Japanese video game series and media franchise created by Sega. The franchise follows Sonic, an anthropomorphic blue hedgehog who battles the evil Doctor Eggman, a mad scientist. ",
        image: "SonicTheHedgeHog.jpg",
        console: consoles[3]._id,
        price: 10.99,
        quantity: 100
      },
      {
        name: "Tekken Tag Tournament",
        description:
          "Tekken Tag Tournament is a spin-off of Namco's Tekken fighting game series. It is the fourth installment in the Tekken fighting game series. ",
        image: "tekkenTagTournament.jpg",
        console: consoles[2]._id,
        price: 21.99,
        quantity: 100
      },

    
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Ian',
    lastName: 'Moores',
    email: 'ian@testmail.com',
    password: 'ian123',
    orders: [
      {
        products: [products[0]._id, products[5]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Matt',
    lastName: 'Healey',
    email: 'matt@testmail.com',
    password: 'matt123',
    orders: [
      {
        products: [products[2]._id, products[3]._id, products[6]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Richy',
    lastName: 'Tartaglia',
    email: 'richy@testmail.com',
    password: 'richy123',
    orders: [
      {
        products: [products[0]._id, products[4]._id, products[3]._id]
      }
    ]
  });

  console.log('users seeded');

  process.exit();
});
