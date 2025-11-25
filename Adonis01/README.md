# Let's Start with Adonis JS

## Creating a new application
```
npm init adonisjs@latest project-name
```
## Start the server
```
npm run dev 
```

## 1. What is ACE in AdonisJS?

**Ace** is AdonisJS’s **command-line interface (CLI).**
**ACE is not an abbreviation. It’s simply the name of AdonisJS’s command-line tool used to run, build, and manage the framework.**

You use it to run commands like:

```js
node ace serve
node ace make:controller UsersController
node ace migration:run
node ace make:model User
```
ACE helps you with:

- Starting the server
- Creating files automatically (controllers, models, validators)
- Running migrations
- Running tests
- Managing the app structure


## 2.What is YAPA in AdonisJS?

**Yapa = Automatic tool kit → builds parts for you quickly**
Backend-only small projects → Yapa is optional

***Large projects / full-stack → Yapa helps speed up development***

### Why use Yapa?

**1. Automatic scaffolding / boilerplate**

Yapa can generate files for you:

- Controllers
- Models
- Services
- Modules

- Saves time instead of manually creating folders & boilerplate code.

**2. Keeps code structure consistent**

 - Yapa follows AdonisJS conventions automatically.**
 - Helps maintain clean and organized project structure.

**3. Speeds up repetitive tasks**
- If you frequently create modules, controllers, or services, Yapa automates that.
- Reduces typos and errors in file setup.

**4. Optional developer helper**

- You can do everything manually with ACE + Node.

- Yapa just makes life easier, especially in large projects.

### --Watch
**Restart the server automatically**

- When you change any backend file (routes, controllers, validators, etc.)
- The server restarts
- But no browser auto-refresh
- Works only for backend logic

### --hmr (Hot Module Reloading)
**Restart server + auto-refresh front-end**

It does everything --watch does PLUS:

- Automatically refresh the browser
- Recompile views (Edge templates) and frontend assets
- Much faster reload
- No page reload needed sometimes, only reloading changed modules

**Without HMR (using --watch)**
You use it when developing the app:
```css
node ace serve --watch
/* or */
node ace serve --hmr
```
You update index.edge
→ You must manually refresh browser.

**With HMR**

You update index.edge
→ Browser refreshes automatically.

## Which one should you use?
If backend only (API development)

- Use --watch

If full-stack with Edge, CSS, scripts

- Use --hmr