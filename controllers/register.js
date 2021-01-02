const handleRegister = (req, res, db, bcrypt) =>{		// registering new users on the database
	const {email, name, password} = req.body;
	if (!email || !name || !password){				// checks if all fields are not empty
		return res.status(400).json('Incorrect Form Submission')
	}
	const hash = bcrypt.hashSync(password)
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.returning('*')					//
				.insert({								//	inserting the inputs
					email: loginEmail[0],	//	email field of the database refers to the email field of the website
					name: name,						//	name field of the database refers to the name field of the website
					joined: new Date()		//	joined field of the database equal the date that the user registered
				})
				.then(user => {
					res.json(user[0]);		// returning the final shape of the user which imported in the database
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'))		// catching error (if user is already signed in)
}

module.exports = {
	handleRegister: handleRegister
}