const kladrApi = require('kladrapi-for-node')
const {error} = require('../utils')

exports.getAllCitysList = (req, res, next) => {
    const Kladr = new kladrApi();
    const {searchQuery} = req.query

    Kladr
        .getData({
            contentType: 'city',
            limit: 5,
            query: searchQuery
        }, (err, citysList) => {
            if (err) error({err, next})
            res.status(200).json({citysList})
        })
}