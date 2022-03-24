import mongoose from 'mongoose';

const metaSchema = new mongoose.Schema(
	{
		data: String,
	},
	{
		toJSON: {
			transform(doc, ret) {
				delete ret._id;
			},
		},
	}
);

const errorLogsSchema = new mongoose.Schema({
	timestamp: String,
	level: String,
	message: String,
	meta: metaSchema,
});

const ErrorLogs = mongoose.model('orcs-error-log', errorLogsSchema);

export { ErrorLogs };
