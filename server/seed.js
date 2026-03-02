import sequelize from './config/database.js';
import { User } from './models/user.js';
import { Offer } from './models/offer.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        // 1. Create User
        const email = 'test@example.com';
        const password = 'password123';
        const hashPassword = await bcrypt.hash(password, 5);
        
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                username: 'TestUser',
                password: hashPassword,
                userType: 'pro',
                avatar: '/static/avatar-max.jpg' // Assuming this exists or just a placeholder
            }
        });

        console.log(`User ${created ? 'created' : 'found'}: ID = ${user.id}`);

        // 2. Generate Token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        console.log('\n--- TOKEN FOR POSTMAN ---');
        console.log(token);
        console.log('-------------------------\n');

        // 3. Create Offer
        const offer = await Offer.create({
            title: 'Beautiful Apartment in Paris',
            description: 'A quiet and cozy place in the heart of Paris.',
            city: 'Paris',
            previewImage: '/static/apartment-01.jpg',
            photos: ['/static/apartment-01.jpg', '/static/apartment-02.jpg'],
            isPremium: true,
            isFavorite: false,
            rating: 4.8,
            type: 'apartment',
            rooms: 3,
            guests: 4,
            price: 120,
            features: ['Breakfast', 'Towels', 'Fridge'],
            commentsCount: 0,
            latitude: 48.8566,
            longitude: 2.3522,
            authorId: user.id
        });

        console.log(`Offer created: ID = ${offer.id}`);

        console.log('\nDone! Press Ctrl+C to exit if it implies.');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seed();
