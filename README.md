# Ironhack-Project2-Nutrition

## [See the App!](https://ironhack-project2.adaptable.app/)

## Description

This project is a web application that allows users to manage recipes and ingredients. Users can sign up, log in, and create their own recipes using various ingredients. Each ingredient is associated with its nutritional information, such as calories, protein, carbs, and fat. Users can view a list of all ingredients, create new ingredients, and explore existing recipes created by themselves. Additionally, users can update and delete their recipes as needed.
 
## User Stories

- `Homepage` - As a user, I want to be able to access the homepage so that I can see what the app is about and log in or sign up.
- `Sign Up` - As a user, I want to sign up on the webpage so that I can create and manage my own recipes.
- `Log In` - As a user, I want to be able to log in on the webpage so that I can access my account and recipes.
- `Log Out` - As a user, I want to be able to log out from the webpage so that I can ensure the security of my account.
- `View Ingredients` - As a user, I want to see a list of all available ingredients along with their nutritional information (calories, protein, carbs, fat) so that I can choose the ingredients for my recipes.
- `Create Recipe` - As a user, I want to create a new recipe by selecting ingredients and providing instructions so that I can share my recipes with others.
- `View Recipe Details` - As a user, I want to view the details of a specific recipe, including the list of ingredients and nutritional information, so that I can decide if I want to try the recipe.
- `Update Recipe` - As a user, I want to be able to update my existing recipes, including changing ingredients and instructions, so that I can keep my recipes up-to-date.
- `Delete Recipe` - As a user, I want to be able to delete recipes that I no longer need or want to share with others.
- `User Profiles` - As a user, I want to be able to add additional information to my profile such as  bio, profile picture, and a list of recipes created.
- `404` - As a user, I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- `500` - As a user, I want to see a nice error page when the application encounters an internal server error so that I know that it's not my fault.

## Backlog Functionalities

- `Favorite Recipes` - Allow users to mark recipes as favorites and have a dedicated page to view their favorite recipes.
- `Recipe Categories` - Implement a feature to categorize recipes into different types, such as breakfast, lunch, dinner, etc.
- `Search and Filters` - Add search and filtering options for recipes based on various criteria, such as ingredients, duration, or nutritional values.
- `Recipe Ratings and Reviews` - Allow users to rate and leave reviews for recipes, helping others to discover popular and well-liked recipes
- `Public and Private Recipes` - Implement an option for users to mark their recipes as public (shareable with others) or private (only visible to the creator).
- `Recipe Sharing` - Integrate social media sharing options for users to easily share their recipes on various platforms.
- `Recipe Image Gallery` - Create a gallery view to showcase recipe images for each recipe.

## Technologies used

- `HTML`,
- `CSS`,
- `Javascript`,
- `Node`,
- `Express`,
- `MongoDB`,
- `Sessions & Cookies`,
- `Middlewares`.

## Routes

### Auth Routes

#### GET /auth

- Renders the sign-up form to users.
- Request Method: GET
- Response: Rendered HTML view with the sign-up form.
- Middleware: None

#### GET /auth/log-in

- Renders the log-in form to users.
- Request Method: GET
- Response: Rendered HTML view with the log-in form.
- Middleware: None

#### POST /auth

- Handles user registration.
- Request Method: POST
- Body Parameters: `name`, `lastname`, `email`, `password`
- Response: Redirects to log-in page on successful registration, renders sign-up form with error messages on failure.
- Middleware: None

#### POST /auth/log-in

- Handles user log-in.
- Request Method: POST
- Body Parameters: `email`, `password`
- Response: Redirects to `/ingredients` on successful log-in, renders log-in form with error messages on failure.
- Middleware: `isLoggedOut` (Custom middleware that checks if the user is not logged in)

#### GET /auth/log-out

- Handles user log-out.
- Request Method: GET
- Response: Destroys the session and redirects to the log-in page.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged in)

### Profile Routes

#### GET /profile

- Renders the user's profile page.
- Request Method: GET
- Response: Rendered HTML view with the user's profile information.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged in)

#### GET /profile/settings

- Renders the user's settings page.
- Request Method: GET
- Response: Rendered HTML view with the user's settings.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged in)

#### POST /profile

- Updates the user's profile information.
- Request Method: POST
- Body Parameters: `name`, `lastname`, `age`, `img`, `gender`, `weight`, `height`, `description`
- Response: Redirects to the profile page on successful update.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged in)

#### POST /profile/settings

- Updates the user's settings, including changing the password if `current_password` is provided and matches the current password.
- Request Method: POST
- Body Parameters: `email`, `current_password`, `new_password`
- Response: Redirects to the settings page on successful update with a success message, renders the settings page with error messages on failure.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged in)

### Ingredients Routes

#### GET /ingredients

- Renders the ingredients page displaying all ingredients.
- Request Method: GET
- Response: Rendered HTML view with the list of all ingredients.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged in)

#### POST /ingredients

- Handles the creation of a new ingredient.
- Request Method: POST
- Body Parameters: `name`, `kcal100g`, `protein`, `fat`, `carbs`
- File Upload: `photo` (ingredient photo)
- Response: Redirects to the ingredients page on successful creation of a new ingredient.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged in)

#### GET /ingredients/:ingredientId

- Renders the page displaying a single ingredient's details.
- Request Method: GET
- URL Parameters: `ingredientId` (ID of the ingredient to be displayed)
- Response: Rendered HTML view with the details of the selected ingredient.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged in)

#### POST /ingredients/:ingredientId/delete

- Handles the deletion of an ingredient.
- Request Method: POST
- URL Parameters: `ingredientId` (ID of the ingredient to be deleted)
- Response: Redirects to the ingredients page on successful deletion of an ingredient.
- Middleware: None

### Recipes Routes

#### GET /recipes

- Renders the recipes page displaying all recipes.
- Request Method: GET
- Response: Rendered HTML view with the list of all recipes.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged in)

#### GET /recipes/new

- Renders the new recipe creation page.
- Request Method: GET
- Response: Rendered HTML view with the form to create a new recipe.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged in)

#### POST /recipes/new

- Handles the creation of a new recipe.
- Request Method: POST
- Body Parameters: `name`, `duration`, `instructions`, `totalCalories`, `protein`, `carbs`, `fat`, `ingredients`
- File Upload: `photo` (recipe photo)
- Response: Redirects to the newly created recipe page on success.
- Middleware: `isLoggedIn` (Custom middleware that checks if the user is logged inYou're welcome!

## Models

### User model

- `name`: String (required)
- `lastname`: String (required)
- `email`: String (required, unique, lowercase)
- `password`: String (required)
- `description`: String
- `img`: String (default: "https://img.freepik.com/free-icon/user_318-563642.jpg?w=360")
- `age`: Number
- `gender`: String
- `weight`: Number
- `height`: Number

### Ingredients Model

- `name`: String (required, unique)
- `photo`: String (optional)
- `kcal100g`: Number (required)
- `macros100g`: Array of objects
  - `protein`: Number (required)
  - `carbs`: Number (required)
  - `fat`: Number (required) 

### Recipe model

- `name`: String (required, unique)
- `photo`: String (required)
- `ingredients`: Array of `Ingredient` ObjectIds
- `duration`: Number (minimum value: 0)
- `instructions`: Array of Strings (required)
- `totalCalories`: Number (required)
- `totalMacros`: Object
  - `protein`: Number (required)
  - `carbs`: Number (required)
  - `fat`: Number (required)

## Links

## Collaborators

[Joaquín Maroto](https://github.com/Yackens)

[Jaime Alcaraz](https://github.com/Alcarja)

[Ángel Guirao](https://github.com/Angelguirao)


### Project

[Repository Link](https://github.com/Yackens/Ironhack-Project2-Nutrition)

[Deploy Link](https://ironhack-project2.adaptable.app/)

### Trello

[Trello board](https://trello.com/b/9mx4HkRl/project-2)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1WROuPV9tZHCl3sKavgIWuiTjQEMguDcLm7aqsfqH8ro/edit#slide=id.p)
