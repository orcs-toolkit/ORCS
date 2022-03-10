import mongoose from 'mongoose';

const policy = new mongoose.Schema(
	{
		role: {
			type: String,
			required: true,
			max: 255,
		},
		banList: {
			type: [String],
			required: true,
		},
		createdAt: {
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

const Policy = mongoose.model('Policy', policy);

export { Policy };
