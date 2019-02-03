const Model = require('./config');

/**
 * *tableName* return the name of the table
 * and relationMappings describe the relationship.
 * In this case, the key of the outside object ticket is how
 * we will refer to the parent class. The relation key
 * within the child object has the value *Model.HasManyRelation*
 * which says that each author can have multiple tickets.
 */
class Author extends Model {
  static get tableName() {
    return 'author';
  }
  static get relationMappings() {
    // we need this to avoid circular dependency
    const Ticket = require('./ticket');

    return {
      ticket: {
        relation: Model.HasManyRelation,
        modelClass: Ticket,
        join: {
          from: 'author.id',
          to: 'ticket.author_id'
        }
      }
    };
  }
}

module.exports = Author;
