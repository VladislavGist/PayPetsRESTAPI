const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: Array,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creatorId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
        required: true
	},
	creatorName: {
		type: String,
		ref: 'User',
		required: true
	},
    active: {
        type: Boolean,
        default: true
	},
	moderate: {
		type: String,
		default: 'pending'
	},
	animalType: {
		type: String,
		require: true
	},
	address: {
		type: String,
		require: true
	},
	postType: {
		type: String,
		require: true
	},
	city: {
		type: String,
		require: true
	},
	phoneNumber: {
		type: String,
		require: true 
	},
	price: {
		type: Number,
		default: 0
	},
	stopDate: {
		type: Date,
		require: true
	}
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)