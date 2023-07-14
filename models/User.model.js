const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    img: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      trim: true
    },
    gender: {
        type: Number,
        trim: true
      },
    weight: {
        type: Number,
        trim: true
      },
    height: {
        type: Number,
        trim: true
      },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;