const handleProfile = (req, res, db) => {			// for getting hte profile of the user
  const { id } = req.params;								// defining the id to the parameter in the end of the url
  db.select('*').from('users').where({id})	// selecting the row which contain the id
  	.then(user => {
	  	if (user.length) {
	  		res.json(user[0])										//  returning the user if found
	  	} else{
	  		res.status(400).json('Not Found')		// returning 'not found' if the id give not found in the database
	  	}
  })
  .catch(err => res.status(400).json('Error Getting User'))	// 
}

module.exports = {
	handleProfile: handleProfile
}