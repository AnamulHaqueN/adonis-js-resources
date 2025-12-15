```sql
Table companies {
  id int [pk, increment]
  name varchar
  created_at datetime
  updated_at datetime
}

Table users {
  id int [pk, increment]
  company_id int [ref: > companies.id]
  name varchar
  email varchar [unique]
  password varchar
  role enum('owner', 'member') // owner can manage private workspace UI
  created_at datetime
  updated_at datetime
}

Table workspaces {
  id int [pk, increment]
  company_id int [ref: > companies.id]
  name varchar
  created_at datetime
  updated_at datetime
}

Table notes {
  id int [pk, increment]
  workspace_id int [ref: > workspaces.id]
  user_id int [ref: > users.id] // add this
  title varchar
  content text
  note_type enum('public', 'private')
  is_draft boolean
  created_at datetime
  updated_at datetime
}

Table tags {
  id int [pk, increment]
  name varchar
  created_at datetime
  updated_at datetime
}

Table note_tags {
  note_id int [ref: > notes.id]
  tag_id int [ref: > tags.id]
  primary key (note_id, tag_id)
}

Table note_votes {
  id int [pk, increment]
  note_id int [ref: > notes.id]
  voter_user_id int [ref: > users.id] // change
  vote enum('up', 'down')
  created_at datetime
}

Table note_history {
  id int [pk, increment]
  note_id int [ref: > notes.id]
  previous_content text
  changed_by int [ref: > companies.id]
  created_at datetime
}
```

**Create database**

### add timeStamp for the migration to specify which one run first

```
anamul@anamul-MS-7C52:~/adonis-js-resources/saas-note-system/saas-workspace$
mv database/migrations/1765360962997_create_companies_table.ts database/migrations/1765359862890_create_companies_table.ts
mv database/migrations/1765431861711_create_users_table.ts database/migrations/1765359862891_create_users_table.ts
mv database/migrations/1765359862895_create_access_tokens_table.ts database/migrations/1765359862892_create_access_tokens_table.ts
```

### Create seeders

```
node ace make:seeder Company
node ace make:seeder User
node ace make:seeder Workspace
node ace make:seeder Note
node ace make:seeder Tag
node ace make:seeder NoteTag
node ace make:seeder NoteVote
node ace make:seeder NoteHistory
```

**To generate fake data for seeders**

```
 npm install @faker-js/faker
```

```
$scrypt$n=16384,r=8,p=1$LO0wAT6zv/syp/b52yn5Gg$jJMw7lKBJVjJW9nI61g99vTrCnSXrDp/Dihc67BZcMg/cVKYOYKJsN+lroTc/XAid/uPZKkULC/MobcaTpGMzA

$scrypt$n=16384,r=8,p=1$1sZvly41IaHnywRBhBW6pw$8E0N+KRcFlIJCbpLN12oYj6togKYWVDZF0u+jyUu7Ya3YIODez8PCkJECbAjsuoeL9pg6prscoiuh5CtW+wSOQ
```
