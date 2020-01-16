# Chat API
## Installation
* install [docker](https://docs.docker.com/docker-for-mac/install/)
* start postgres by running `docker-compose up -d`
* install dependencies: `npm install`
* run the dev server: `npm run dev`. When the server starts, it will create and seed any tables that are empty.

## API Docs

### Users
* GET /users
  * returns a list of all users
* GET /users/:id
  * returns the requested user by ID

### Conversations
* GET /conversations
  * returns a list of all conversations
* GET /conversations/:id
  * returns the requested conversation by ID

### Messages
* GET /messages?toUser=:id&fromUser=:id
  * if no query parameters are provided, all messages from the last 30 days are returned, up to 100 messages
  * if the optional toUser parameter is provided, then only messages to that user are returned
  * if the optional fromUser parameter is provided, then only messages from that user are returned
  * if both parameters are provided, then only messages between the specified users are returned
* GET /messages/:conversationId
  * returns all messages in the specified conversation from the last 30 days, up to 100 messages
* POST /messages/:conversationId
  * creates a message in the specified conversation
  * example request body:
  ```json
  {
    "senderId" : 1,
    "content" : "This is a message"
  }
  ```
  * The entire message object is returned:
  ```json
  {
    "id" : 123,
    "senderId" : 1,
    "content" : "This is a message",
    "conversationId" : 5,
    "createdDate" : "2020-01-15",
    "modifiedDate" : "2020-01-15"
  }
  ```


