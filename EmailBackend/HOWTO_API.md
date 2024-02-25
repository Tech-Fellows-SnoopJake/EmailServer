# SnoopJake mail API
## HOW TO USE!
Here's a summary of the API endpoints and their functionalities:

## Users

#### List Users and Create User
- **GET** `http://localhost:8000/users/`: Retrieves a list of users.
- **POST** `http://localhost:8000/users/`: Creates a new user. Expects a JSON object with `username` and `password`.

#### Get, Update, and Delete User
- **GET** `http://localhost:8000/user/<user_id>/`: Retrieves user details by ID.
- **PUT** `http://localhost:8000/user/<user_id>/`: Updates user details. Expects a JSON object with `username` and `password`.
- **DELETE** `http://localhost:8000/user/<user_id>/`: Deletes a user by ID.

# User Login
- **POST** `http://localhost:8000/login/`: Allows users to log in. Expects a JSON object with `username` and `password`.

# Emails

#### List Emails and Create Email
- **GET** `http://127.0.0.1:8000/emails/`: Retrieves a list of emails.
- **POST** `http://127.0.0.1:8000/emails/`: Creates a new email. Expects a JSON object with `user`, `receiver`, `sender`, `subject`, and `body`.

#### List User's Emails and Sent Emails
- **GET** `http://127.0.0.1:8000/mylist/<str:email>/`: Retrieves a list of emails received by a specific user (inbox). Expects the `username` (receiver) as a parameter.
- **GET** `http://127.0.0.1:8000/emails/sendlist/<str:email>/`: Retrieves a list of emails sent by a specific user. Expects the `username` (sender) as a parameter.

These endpoints allow for managing users and emails in the system, including creation, retrieval, updating, and deletion of user accounts and emails, as well as listing emails based on different criteria like inbox and sent items.