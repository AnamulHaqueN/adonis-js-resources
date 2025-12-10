```sql
Table companies {
  id int [pk, increment]
  name varchar
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
  voter_company_id int [ref: > companies.id]
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
