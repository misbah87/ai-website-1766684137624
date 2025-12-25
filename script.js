const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

let properties = [
    { id: 1, title: 'Property 1', price: 100000, image: 'https://picsum.photos/200/300' },
    { id: 2, title: 'Property 2', price: 200000, image: 'https://picsum.photos/200/301' },
    { id: 3, title: 'Property 3', price: 300000, image: 'https://picsum.photos/200/302' },
];

// API route to get all properties
app.get('/api/properties', (req, res) => {
    res.json(properties);
});

// API route to get a single property by ID
app.get('/api/properties/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const property = properties.find(p => p.id === id);
    if (!property) {
        res.status(404).json({ message: 'Property not found' });
    } else {
        res.json(property);
    }
});

// API route to create a new property
app.post('/api/properties', (req, res) => {
    const { title, price, image } = req.body;
    const newProperty = { id: properties.length + 1, title, price, image };
    properties.push(newProperty);
    res.json(newProperty);
});

// API route to update an existing property
app.put('/api/properties/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const property = properties.find(p => p.id === id);
    if (!property) {
        res.status(404).json({ message: 'Property not found' });
    } else {
        const { title, price, image } = req.body;
        property.title = title;
        property.price = price;
        property.image = image;
        res.json(property);
    }
});

// API route to delete a property
app.delete('/api/properties/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Property not found' });
    } else {
        properties.splice(index, 1);
        res.json({ message: 'Property deleted' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});