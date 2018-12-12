var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true },
    name: String,
    email: String,
    color: String,
    hashed_password: String,
    high_score: {type: Number, default:0}
});
mongoose.model('User', UserSchema);
