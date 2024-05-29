import mongoose from "mongoose";
import crypto from "crypto";
import User from "./models/User";
import Cocktail from "./models/Cocktail";
import config from "./config";

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('cocktails');
    } catch (e) {
        console.error('Error ', e);
    }

    const [user1, user2] = await User.create(
        {
            email: 'Swire',
            displayName: 'Swire',
            password: '123',
            token: crypto.randomUUID(),
            role: 'user',
            avatar: 'fixtures/swire.jpg',
        },
        {
            email: 'Liliweiss',
            displayName: 'Lilith',
            password: '123',
            token: crypto.randomUUID(),
            role: 'admin',
            avatar: 'fixtures/liliweiss.jpg',
        }
    );

    const [cocktail1, cocktail2, cocktail3] = await Cocktail.create(
        {
            user: user1._id,
            title: 'Margarita',
            image: 'fixtures/margarita.jpg',
            recipe: 'Mix tequila, triple sec, and lime juice, then pour over ice. Garnish with a lime slice.',
            isPublished: true,
            ingredients: [
                { name: 'Tequila', amount: '2 oz' },
                { name: 'Triple sec', amount: '1 oz' },
                { name: 'Lime juice', amount: '1 oz' },
            ],
        },
        {
            user: user1._id,
            title: 'Piña Colada',
            image: 'fixtures/pina_colada.jpg',
            recipe: 'Blend rum, coconut cream, and pineapple juice with ice until smooth. Pour into a glass and garnish with a pineapple slice and a cherry.',
            isPublished: true,
            ingredients: [
                { name: 'Rum', amount: '2 oz' },
                { name: 'Coconut cream', amount: '2 oz' },
                { name: 'Pineapple juice', amount: '2 oz' },
            ],
        },
        {
            user: user2._id,
            title: 'Old Fashioned',
            image: 'fixtures/old_fashioned.jpg',
            recipe: 'Muddle a sugar cube with bitters, add whiskey and ice, and stir. Garnish with an orange twist.',
            isPublished: false,
            ingredients: [
                { name: 'Sugar cube', amount: '1' },
                { name: 'Bitters', amount: '3 dashes' },
                { name: 'Whiskey', amount: '2 oz' },
            ],
        }
    );

    await db.close();
};

run().catch(console.error);