const router = require('express').Router();
const fetch = require('node-fetch');

let features = [];
let identifier;
let address;

const isEnabled = feature => features.includes(feature);

const init = (options) => {
    identifier = options.identifier;
    address = options.address;
    getToggles();
}

getToggles = () => {
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
    console.log(`setting feature toggles: ${JSON.stringify(req.body)}`);
    features = req.body;
    res.end();
});

module.exports = {
    router,
    isEnabled,
    init,
    getToggles
}