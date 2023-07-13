const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const recipeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: true,
      trim: true,
    },
    kcalTotales: {
      type: Number,
      required: true,
    },
    ingredients: [{
         type: Schema.Types.ObjectId, 
         ref: "Ingredient"
        }],

    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;