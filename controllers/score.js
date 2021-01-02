const Clarifai = require('clarifai')

const app = new Clarifai.App({
	apiKey: "your api key"
})

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => err.status(400).json('unable to work with api'))
}

const handleScore = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('enteries', 1)			// adding the column by one when adding url
	.returning('enteries')				// returning the enteries
	.then(enteries => {
		res.json(enteries)
	})
	.catch(err => res.status(400).json('Unable to Get Enteries'))
}

module.exports = {
	handleScore,
	handleApiCall
}
