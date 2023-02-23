const awesomeFunction = (req, res, next) => {
    res.json('Melanie Schwirckslis');
};

const returnAnotherPerson = (req, res, next) => {
    res.json('A super awesome person');
};

module.exports = { awesomeFunction, returnAnotherPerson};