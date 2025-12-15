# Let's Start with Adonis JS

## Creating a new application

```js
npm init adonisjs@latest project-name
```

## Start the server

```js
npm run dev
```

## To see list of routes

```js
node ace list:routes
```

## Invalid or expired CSRF token for Post request

> To solve this issues we need to change in our sheild.ts make csrf: { enabled: false}

```js
 csrf: {
    enabled: false,
    exceptRoutes: [],
    enableXsrfCookie: false,
    methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  },
```

## Request URL Helpers in AdonisJS

1. request.url()

✔ Returns ONLY the path
❌ Does NOT include hostname
❌ Does NOT include query string

2. request.url(true)

✔ Returns path
✔ Includes query string (?page=1&limit=20)
❌ Does NOT include hostname

3. request.completeUrl()

✔ Includes hostname + protocol
✔ Includes path
❌ Does NOT include query string

4. request.completeUrl(true)

✔ Includes hostname
✔ Includes path
✔ Includes query string
✔ This is the full URL

```ts
router.get("/users", async ({ request }) => {
  console.log(request.url()); // "/users"
  console.log(request.url(true)); // "/users?page=1&limit=20"

  console.log(request.completeUrl()); // "http://localhost:3333/users"
  console.log(request.completeUrl(true)); // "http://localhost:3333/users?page=1&limit=20"
});
```

### Request IP

return the ip of the request object

```ts
router.get("/anam", async ({ request }) => {
  return {
    ip: request.types(),
  };
});
```

## What is Form Method Spoofing?

HTML forms only support GET and POST. To send PUT, PATCH, or DELETE requests
from a form, AdonisJS allows "method spoofing". You send a POST request and
include a hidden `_method` field. AdonisJS rewrites the request method based
on the `_method` value.

Example:

<form method="POST" action="/posts/1">
  <input type="hidden" name="_method" value="DELETE">
  <button>Delete</button>
</form>

request.method() // DELETE (spoofed method)
request.intended() // POST (actual method sent by browser)

## Response

> retrun - return the first value

> response.send() - override the previous response and keep only the latest one if multiple response are send.

**Custom status Code:**

```ts
response.status(200).send({ page: "home" });

// Send empty 201 response
response.status(201).send("");
```
