const express = require('express');
const { places, descriptors } = require('./seedHelpers')
const cities = require('./cities')
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!');
    })
    .catch(err => {

        console.log(err);
        console.log('MONGO CONNECTION ERROR!!!')
    })

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '64a6c3e037645e5e6558770d',
            location: `${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry : { 
                type :"Point", 
                coordinates : [
                     cities[random1000].longitude,
                     cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmlagxpxc/image/upload/v1689682339/YelpCamp/klds7yehdgwrgd1y5itk.jpg',
                    filename: 'YelpCamp/klds7yehdgwrgd1y5itk.jpg',
                },
                {
                    url: 'https://res.cloudinary.com/dmlagxpxc/image/upload/v1689682339/YelpCamp/ku7cztey246i0giofdyf.jpg',
                    filename: 'YelpCamp/ku7cztey246i0giofdyf',
                },
                {
                    url: 'https://res.cloudinary.com/dmlagxpxc/image/upload/v1689682340/YelpCamp/oaappkryka920xewnqkt.jpg',
                    filename: 'YelpCamp/oaappkryka920xewnqkt',
                }
            ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit aliquid odio, temporibus reprehenderit nam consequuntur ipsum officia soluta nobis obcaecati iste voluptatem perspiciatis quidem distinctio accusantium architecto nostrum minus illum.',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
// 'https://source.unsplash.com/collection/483251'