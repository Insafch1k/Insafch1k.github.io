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

        const email = 'test@example.com';
        const password = 'password123';
        const hashPassword = await bcrypt.hash(password, 5);
        
        const [user, created] = await User.findOrCreate({
            where: { email },
            defaults: {
                username: 'TestUser',
                password: hashPassword,
                userType: 'pro',
                avatar: '/static/avatar-max.jpg'
            }
        });

        console.log(`User ${created ? 'created' : 'found'}: ID = ${user.id}`);

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seed();
