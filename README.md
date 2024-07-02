# NodeAPIProject-Shop

## Project Overview

NodeAPIProject-Shop is a comprehensive backend system for managing an online children's clothing . The project features a user management system, product inventory management, order processing, and robust analytics for sales tracking. The system supports different user roles, including guests, registered users, and admins, each with specific permissions and capabilities.

## Features

### User Management

- *User roles*: Guest, Registered User, Admin.
- *JWT-based authentication*.
- *Secure password storage* with bcrypt.
- *User profiles and cart management*.

### Product Management

- *Product catalog* with detailed attributes: productName, subtitle, productDescription, price, color, size (2,4,6,8,10,12), model, web, images, and categories.
- *Stock management* with options to update quantities.
- *Integration with order processing* to adjust stock levels dynamically.

### Order Processing

- *Create, cancel, and retrieve orders*.
- *Automatic stock adjustment* based on order status.
- *Detailed order information* including product details and total amount.


### Analytics

- *Sales tracking* by date, product, category, status and active users.
- *Products priced above or below a specified amount*.
- *Best selling products* with revenue details.
- *Management dashboard* for comprehensive sales and inventory insights.


## Technologies and Libraries Used

- *Node.js*: Runtime environment for executing JavaScript code server-side.
- *Express*: Web framework for building the API.
- *MongoDB*: NoSQL database for storing data.
- *Mongoose*: ODM library for MongoDB.
- *bcrypt*: Hashing user passwords for secure storage.
- *jsonwebtoken*: Generating and verifying JSON Web Tokens (JWT) for authentication.
- *Joi*: Validating user input.
- *morgan*: HTTP request logger.
- *dotenv*: Loading environment variables.
- *underscore*: Utility library for JavaScript.
- *TypeScript*: Typed superset of JavaScript.
- *tsx*: Running TypeScript in Node.js.
- *uuid*: Generating unique identifiers.
- *chalk*: Terminal string styling done right.
- *cors*: Middleware for enabling Cross-Origin Resource Sharing (CORS).

## API Documentation

For detailed API documentation, including all endpoints, request methods, and parameters, please refer to the following Postman Documentation links:

1. [Analyze](https://documenter.getpostman.com/view/34978047/2sA3dxCArr)
2. [Orders](https://documenter.getpostman.com/view/34978047/2sA3dxCAwE)
3. [Products](https://documenter.getpostman.com/view/34978047/2sA3dxCAwJ)
4. [Users](https://documenter.getpostman.com/view/34978047/2sA3QmCu1H)

## Future Enhancements

- Further development of the analytics system for more comprehensive sales tracking.
- Adding more user roles and permissions.
- Enhancing the product and order management features.
