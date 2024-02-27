**SnoopJake Mail API**
---

**HOW TO USE!**

Here's a summary of the API endpoints and their functionalities:

**Users**

*List Users and Create User*
- **GET** `http://localhost:8000/users/`: Retrieves a list of users.
- **POST** `http://localhost:8000/users/`: Creates a new user. Expects a JSON object with username and password.

*Get, Update, and Delete User*
- **GET** `http://localhost:8000/user/<user_id>/`: Retrieves user details by ID.
- **PUT** `http://localhost:8000/user/<user_id>/`: Updates user details. Expects a JSON object with username and password.
- **DELETE** `http://localhost:8000/user/<user_id>/`: Deletes a user by ID.

*User Login*
- **POST** `http://localhost:8000/login/`: Allows users to log in. Expects a JSON object with username and password. The server returns a JWT token, which can be used to authorize subsequent requests. The token should be included in the Authorization header of subsequent requests as a Bearer token.

**Emails**

*List Emails and Create Email*
- **GET** `http://127.0.0.1:8000/emails/`: Retrieves a list of emails.
- **POST** `http://127.0.0.1:8000/emails/`: Creates a new email. Expects a JSON object with user, receiver, sender, subject, and body.

*Get, Update, and Delete Email*
- **GET** `http://127.0.0.1:8000/email/<email_id>/`: Retrieves email details by ID.
- **PUT** `http://127.0.0.1:8000/email/<email_id>/`: Updates email details. Expects a JSON object with user, receiver, sender, subject, and body.
- **DELETE** `http://127.0.0.1:8000/email/<email_id>/`: Deletes an email by ID.

*List User's Emails and Sent Emails*
- **GET** `http://127.0.0.1:8000/mylist/<str:email>/`: Retrieves a list of emails received by a specific user (inbox). Expects the username (receiver) as a parameter.
- **GET** `http://127.0.0.1:8000/sendlist/<str:email>/`: Retrieves a list of emails sent by a specific user. Expects the username (sender) as a parameter.

**Folders**

*List Folders, Create Folder, and Manage Folder*
- **GET** `http://localhost:8000/folders/`: Retrieves a list of folders.
- **POST** `http://localhost:8000/folders/`: Creates a new folder. Expects a JSON object with folder name and other details.
- **GET** `http://localhost:8000/folders/<folder_id>/`: Retrieves folder details by ID.
- **PUT** `http://localhost:8000/folders/<folder_id>/`: Updates folder details. Expects a JSON object with folder name and other details.
- **DELETE** `http://localhost:8000/folders/<folder_id>/`: Deletes a folder by ID.

These endpoints allow for managing users, emails, and folders in the system, including creation, retrieval, updating, and deletion of user accounts, emails, and folders, as well as listing emails based on different criteria like inbox and sent items.