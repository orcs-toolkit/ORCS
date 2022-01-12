const mongoose = require('mongoose');

const googleSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			max: 255,
		},
		email: {
			type: String,
			required: true,
			max: 255,
		},
		date: {
			type: Date,
			default: Date.now(),
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
			},
		},
	}
);

const User = mongoose.model('GoogleUser', googleSchema);

module.exports = { User };
