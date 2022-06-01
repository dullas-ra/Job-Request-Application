const mongoose = require('mongoose')
const crypto = require('crypto')
const { timeStamp } = require('console')

//User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        //will save as hash after encrypt it we will build function to encrypt
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: String,
        default: 'Normal'
        //We have more type (normal, admin ...)
    },
    resetPasswordLink: {
        data: String,
        default:''
    }   
}, {
    timeStamp: true
})



//Virtual Password
userSchema.virtual('password')
    .set(function(password){
        //set password note you must use normal function not arrow function
        this.password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })


//methods
userSchema.methods = {
    //Generate Salt
    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.random()) + ''
    },
    //Encrypt Password
    encryptPassword: function (password) {
        if (!password) return ''
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ''
        }
    },
    //Compare password between plain get from user ad hashed
    authenticate: function (plainPassword) {
        return this.encryptPassword(plainPassword) === this.hashed_password
    }
}


module.exports = mongoose.model('User', userSchema)