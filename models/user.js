const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: 'user'
	},
	resetToken: String,
	resetTokenExpiration: Date,
	active: {
		type: Boolean,
		default: true
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post'
		}
	]
})

module.exports = mongoose.model('User', userSchema)