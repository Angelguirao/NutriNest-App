const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const ingredientSchema = new Schema(
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
    kcal100g: {
      type: Number,
      required: true,
    },
    macros100g: [
        {
            protein: {
                type: Number,
                trim: true,
                required: true,
            },

            carbs: {
                type: Number,
                trim: true,
                required: true,
            },
            fat: {
                type: Number,
                trim: true,
                required: true,
            },
        }
    ]

    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;