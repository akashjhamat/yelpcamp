const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('database connected')
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '62831c3e8f5695a0d2b57cf9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'test description',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dbmzi5cjl/image/upload/v1653435304/YelpCamp/ts6h5k0rzmvfvaupyvnj.png',
                  filename: 'YelpCamp/ts6h5k0rzmvfvaupyvnj'
                }]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
