## ORM(Object-Relational Mapping)

It's a programming technique that helps us to interact with Relational database using object instead of writing raw SQL query

- AdonisJS use model to interact with database through lucide ORM

> Bridge between your code and the database

- ORM maps **databse tables** -> **classes** and **rows** -> **object**

**Benefits of ORM**

1. Write less SQL

2. Easier to read & maintain

3. Database-agnostic

4. Prevents SQL injection – Most ORMs handle query escaping automatically.

Example(Node.js + AdonisJS Lucid ORM)

```ts
// Define a model
class User extends BaseModel {}

// Fetch all users
const users = await User.all()

// Find one user
const user = await User.find(1)

// Create a new user
await User.create({ username: 'sakib', email: 'sakib@example.com' })

// Update a user
user.username = 'tamim'
await user.save()

// Delete a user
await user.delete()
```

## Migration

_`Migrations` are used to `create` and `update` database tables using code._

two method `up()` and `down()`

**Up() method:**
Define what should happen when we run migration. like Create table, add column, indexes

`Example`

```ts
export default class CreateUsers {
  async up(schema) {
    await schema.createTable('users', (table) => {
      table.increments('id')
      table.string('username').notNullable()
      table.timestamps()
    })
  }
}
```

**Down() method:**
Define how revert migration. It's use to rollback what we does in up() method. like Drop table, remove columns, delete indexes.

`Example`

```ts
export default class CreateUsers {
  async down(schema) {
    await schema.dropTable('users')
  }
}
```

**Migration vs Lucid ORM**

Migration = Database structure (tables, columns)
Lucid ORM = Database data (CRUD operations)

## How to connect with database using migration ?

In your `.env` add this field

```ts
DB_USER = your_mysql_connection
DB_PASSWORD = connection_password
DB_DATABASE = databse_name // make sure this database exists
```

`After that use this command: `

```ts
node ace migration:run // create connection to database
node ace migration:status // check connection status
node ace migration:rollback // remove connection from database
```

## How to create singleton controller

Recommended to use http controllers

```ts
node ace make:controller register -s
it create this folder:
create app/controllers/register_controller.ts
```

Controller has two methods:

1. One is `create()` use for displaying the page that contain user registration form
2. Other is `store()` use for process the registration form

**{{csrfField()}}**
when we submit a html form, AdonisJS needs a CSRF token to validate the submission.

**VineJS**
is Adonis JS official validator library - used to validate form input, API request and any other user submitted data

> Vine JS check whether the user input is correct before submitting into databases.

`Create validator:`

```js
node ace make:validator register
```

`this command create: app/validators/register.ts`

### What is Cookie, Session and Session Cookie

http is `stateless` .Every request it `forget` who you are. So we need a method to `remeber` the user after they `log in`. This works is done by them.

**Cookie = browser storage**

```js
response.cookie('theme', 'dark')
```

**Session = server storage**

```js
{
  "sessionId": "abcd1234",
  "userId": 10,
  "isLoggedIn": true
}
```

**Session cookie = cookie that stores only session ID, not the actual data**

```js
Set-Cookie: sessionId=abcd1234; HttpOnly; Path=/;
```
