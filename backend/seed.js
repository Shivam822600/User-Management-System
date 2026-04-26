require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (!adminExists) {
            await User.create({
                name: 'System Admin',
                email: 'admin@example.com',
                password: 'Admin123!',
                role: 'Admin'
            });
            console.log('Default admin user created: admin@example.com / Admin123!');
        } else {
            console.log('Admin user already exists.');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
