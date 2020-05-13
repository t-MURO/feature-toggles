const router = require('express').Router();
const fetch = require('node-fetch');

let features = [];
let identifier;
let address;

const isEnabled = feature => features.includes(feature);

const getToggles = () => {
    fetch(`${address}/api/toggles/${identifier}`)
        .then(res => res.json())
        .then(data => {
            console.log(`setting feature toggles: ${data}`)
            features = data;
        })
        .catch(err => {
            console.log(err);
        });
}

router.post('/feature-toggles', (req, res, next) => {
    console.log('lol')
    const newFeatures = req.body;
    console.log(newFeatures);
    if (!Array.isArray(newFeatures)) {
        console.log('features value ivalid, no features available')
        return res.status(422).end();
    }
    features = newFeatures;
    console.log(`setting feature toggles: ${JSON.stringify(newFeatures)}`);
    res.end();
});

const init = (options) => {
    identifier = options.identifier;
    address = options.address;
    getToggles();
}

module.exports = {
    router,
    isEnabled,
    init,
    getToggles
}