# backend directory

## Directory organisation

  - app
    - **config** (datebase, app and logger configuration)
    - **controller** (control flows from the app and the database)
    - **middlewares**
      - **orm** (object-relational mapping)
        - **models** (models and relation of our tables)
    - **routes** (all the routes are created here and will eventualy call the controller)
    - **utils** (what you found utils... to avoid repetition)
    - **index.js** (express router is build here)
  - **log**
  - **migrations** (migration for knex to be able to update our database)
  - **models** (models use for knex migrations)
  - **seeds** (values for our tables)
  - **tests**
  - .**env**(.example)
  - .**eslintrc**
  - **app.js** **(main app)**
  - **gulpfile.js** (for sonar publish)
  - **Jenkinsfile** (continious integration)
  - **knexfile.js** (config file for knex)

## Requirements to run
install those depencies first
* node.js
* postgresql server

## Before everything !
`npm install`

## Run the application
```
npm start
```

## Run with nodemon (restarting when a js file change)
```
npm run nodemon
```

## Create a new table
You can create a table by adding a new file in *./models/*.
after that, you need to add the table in the *./migrations/* folder
like the other one. Be careful when you change the order because the migration might fail.
In this case, you can try to rollback the database before migrating again.

## migrate the database

To migrate the new tables from the *migrations* directory you need to specify the env variables
first. Dont forget to add an *.env* file in the root directory like the *.env.example* and file the corresponding variables
**Be careful and don't add any http or https for PSQL_HOST_URL**
The default port is *5432* so you don't have to mention it.
```
npm run knex migrate:latest
```

## update an already migrate database
if a table is added, it's fine and you can use the above command line otherwise if a table has been modified you need to rollback before migrating again.
```
npm run knex migrate:rollback
npm run knex migrate:latest
```
**rollback will delete the table from the database**

## insert seed in current tables
when the table has been created and pushed into the database you might want to add default value in it, to do so you need to use the below command line.
```
npm run knex seed:make value<TableName>
```
You can also create a file manually
## commit the seed into the tables
To be used when the seed are ready
```
npm run knex seed:run
```

## CheatSheet
*this one is nice*
https://devhints.io/knex#schema

## Knex basic query using objection module
### A simple SELECT query
```js
 const task = await Tasks.query();
```
```sql
select * from tasks
```
### A more typical SELECT query
```js
 const task = await Tasks.query()
      .where({is_done: false})
      orderby('due_by');
```
```sql
select * from task  where is_done = false order by due_by asc;
```
### Insert query
```js
 await Tasks.query().insert({name: 'Setup Code Coverage'});
```
```sql
insert into tasks (name) values ('Setup Code Coverage');
```
### Update query
```js
 await Tasks.query()
      .patch({is_done: true})
      .where({id: 1});
```
```sql
update tasks set id_done = true where id = 1;
```
### Delete query
```js
 await Tasks.query()
      .delete()
      .where({id: 1});
```
```sql
delete from tasks where id = 1;
```
### Multiple query
to make another query you can use the *$relatedQuery* property
```js
  const tasks = await Tasks.query().findById(2);

  await tasks.$relatedQuery('type')
            .allowInsert('[normal, impediment, issue]')
            .insert(type);
```
### fetch a table to another
```js
 const tickets = Ticket.query().eager('author');
```
*simple example*
  - id
  - description
  - author_id
  - author
    - id
    - author
    - name
The author is link to author_id like described in the relation mapping in the model.

### more complex examples
```js
getAllTickets() {
    // select * from ticket = Ticket.query();
    return Ticket.query()
      .alias('t')
      .select('t.id', 't.title', 't.description', 'author.name')
      .joinRelation('author');
    // .where({ 'a.id': 1 }); //the same
    // .where('a.id', 1);
  },

  getTicketsById(id) {
    return Ticket.query()
      .where({ 'ticket.id': id });
  },

  createTicket(ticket) {
    return Ticket.query()
      .allowInsert('[title, description, author_id]')
      .insert(ticket);
  },

  updateTicket(ticket, id) {
    return Ticket.query()
      .patchAndFetchById(id, ticket);
    // .where('id', id);
    // .returning('*');
  },

  deleteTicket(id) {
    return Ticket.query()
      .delete()
      .where({ id: id })
      .returning('*');
    // .deleteById(id);
  }
```

## Inspiration
well, alot of documention about nodejs, javscript, express and npm but also from:
- https://github.com/saiumesh535/express-zero-config
- https://bitbucket.org/dg92/task_mangement_final_quadrant/src/master/
- https://github.com/Kannaj/node-knex-sample
- https://github.com/i0natan/nodebestpractices
- https://github.com/aspittel/app-ideas
