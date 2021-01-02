const handleSignin = (req, res, db, bcrypt) => {
	const {email, password} = req.body;
	if (!email || !password){				// checks if all fields are not empty
		return res.status(400).json('Incorrect Form Submission')
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash)
			if (isValid) {
				return db.select('*').from('users')
					.where('email', '=', email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('Unable to Get User'))
			} else {
				res.status(400).json('Wrong Credentials, Please check your Password and Email again')
			}
		})
		.catch(err => res.status(400).json('Wrong Credentials'))
}

module.exports = {
	handleSignin: handleSignin
}