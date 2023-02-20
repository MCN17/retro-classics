const db = require('./connection');
const { User, Product, Console } = require('../models');

db.once('open', async () => {
  await Console.deleteMany();

  const consoles = await Console.insertMany([
    { name: "NES" },
    { name: "N64" },
    { name: "Playstation" },
    { name: "Playstation 2" },
    { name: "Sega" },
    { name: "SNES" }
  ]);

  console.log('consoles are seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Metroid",
      description:
        "Metroid[a] is an action-adventure game developed and published by Nintendo. The first installment in the Metroid series, it was originally released in Japan for the Family Computer Disk System peripheral beta version in August 1986. ",
      image: "metroid.jpg",
      console: consoles[0]._id,
      price: 20.99,
      quantity: 10
    },
    {
      name: "Super Mario 3",
      description:
        "Super Mario Bros. 3 is a platform game developed and published by Nintendo for the Nintendo Entertainment System.",
      image: "superMario3.jpg",
      console: consoles[0]._id,
      price: 20.99,
      quantity: 15
    },
    {
      name: "The Legend of Zelda",
      description:
        "The Legend of Zelda, originally released in Japan as The Hyrule Fantasy: Zelda no Densetsu, is a 1986 action-adventure game developed and published by Nintendo.",
      image: "theLegendOfZelda.jpg",
      console: consoles[0]._id,
      price: 29.99,
      quantity: 10
    },
    {
      name: "Dr. Mario",
      description:
        "Dr. Mario is a 1990 puzzle video game developed and published by Nintendo for the Nintendo Entertainment System, Famicom, and Game Boy.",
      image: "drMario.jpg",
      console: consoles[0]._id,
      price: 20.99,
      quantity: 10
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
        quantity: 5
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
        quantity: 40
      },
      {
        name: "Donkey Kong Country",
        description:
          "Donkey Kong Country is a 1994 platform game developed by Rare and published by Nintendo for the Super Nintendo Entertainment System. ",
        image: "donkeyKongCountry.jpg",
        console: consoles[4]._id,
        price: 15.99,
        quantity: 30
      },
      {
        name: "Aladdin",
        description:
          "Disney's Aladdin is a 1993 platform game developed and published by Capcom for the Super Nintendo Entertainment System, based on the 1992 animated Disney film of the same name. ",
        image: "Aladdin.jpg",
        console: consoles[4]._id,
        price: 10.99,
        quantity: 15
      },

      {
        name: "Sonic the Hedgehog",
        description:
          "Sonic the Hedgehog is a Japanese video game series and media franchise created by Sega. The franchise follows Sonic, an anthropomorphic blue hedgehog who battles the evil Doctor Eggman, a mad scientist. ",
        image: "SonicTheHedgeHog.jpg",
        console: consoles[4]._id,
        price: 10.99,
        quantity: 25
      },
      {
        name: "ToeJam & Earl",
        description:
          "ToeJam & Earl is an action game developed by Johnson Voorsanger Productions and published by Sega for the Sega Mega Drive (Genesis) console. Released in 1991, it centers on ToeJam and Earl—alien rappers who have crash-landed on Earth.",
        image: "ToeJam.jpg",
        console: consoles[4]._id,
        price: 10.99,
        quantity: 20
      },
      {
        name: "Earthworm Jim",
        description:
          "Earthworm Jim is a series of platform games[1] featuring an earthworm named Jim who wears a robotic suit and battles the forces of evil.",
        image: "earthwormJim.jpg",
        console: consoles[4]._id,
        price: 10.99,
        quantity: 15
      },
      {
        name: "Crash Bandicoot: Warped",
        description:
          "Crash Bandicoot: Warped is a 1998 platform game developed by Naughty Dog and published by Sony Computer Entertainment for the PlayStation.",
        image: "crashBandicootWarped.jpg",
        console: consoles[2]._id,
        price: 18.99,
        quantity: 20
      },
      {
        name: "Final Fantasy VII",
        description:
          "Final Fantasy VII is a 1997 role-playing video game developed by Square for the PlayStation console. It is the seventh main installment in the Final Fantasy series.",
        image: "finalFantasyVII.jpg",
        console: consoles[2]._id,
        price: 18.99,
        quantity: 20
      },
         {
        name: "Metal Gear Solid",
        description:
          "Metal Gear Solid[c] is a stealth game developed by Konami and released for the PlayStation in 1998.",
        image: "metalGearSolid.jpg",
        console: consoles[2]._id,
        price: 25.99,
        quantity: 25
      },
      {
        name: "Tekken Tag Tournament",
        description:
          "Tekken Tag Tournament is a spin-off of Namco's Tekken fighting game series. It is the fourth installment in the Tekken fighting game series. ",
        image: "tekkenTagTournament.jpg",
        console: consoles[3]._id,
        price: 21.99,
        quantity: 20
      },
      {
        name: "Gran Turismo 4",
        description:
          "Gran Turismo 4 is a 2004 racing video game for the PlayStation 2, the fourth installment in the main Gran Turismo series and the sixth for the overall series",
        image: "granTurismo4.jpg",
        console: consoles[3]._id,
        price: 21.99,
        quantity: 35
      },
      {
        name: "Grand Theft Auto: San Andreas",
        description:
          "Grand Theft Auto: San Andreas is a 2004 action-adventure game developed by Rockstar North and published by Rockstar Games.",
        image: "sanAndreas.jpg",
        console: consoles[3]._id,
        price: 15.99,
        quantity: 40
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
