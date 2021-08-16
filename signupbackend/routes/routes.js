const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/SignUpModels')
const bcrypt = require('bcrypt');

router.post('/signup', async (request, response) => {

  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(request.body.password, saltPassword);

	const signUpUser = new signUpTemplateCopy({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    userName: request.body.userName,
    email: request.body.email,
    password: securePassword
	})
  signUpUser.save().then(r => {
    response.json(r);
  })
    .catch(e => {
      response.json(e);
    })
})

module.exports = router
