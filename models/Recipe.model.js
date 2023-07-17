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
    ingredients: [{
      type: Schema.Types.ObjectId, 
      ref: "Ingredient",
     }],
    
     duration: {
      type: Number,
      min: 0,
    },
    instructions: {
      type: [String],
      required: true,
    },  
    totalCalories: {
      type: Number,
      required: true,
    },
    totalMacros: {
      protein: {
        type: Number,
        required: true,
      },
      carbs: {
        type: Number,
        required: true,
      },
      fat: {
        type: Number,
        required: true,
      },
    }, 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;