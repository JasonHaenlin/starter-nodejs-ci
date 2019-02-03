const Model = require('./config');

/**
 * *tableName* return the name of the table
 * and relationMappings describe the relationship.
 * In this case, the key of the outside object author is how
 * we will refer to the parent class. The relation key
 * within the child object has the value *Model.BelongsToOneRelation*
 * which says that each ticket is going to have one parent author.
 */
class Ticket extends Model {
  static get tableName() {
    return 'ticket';
  }

  static get relationMappings() {
    // we need this to avoid circular dependency
    const Author = require('./author');

    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: Author,
        join: {
          from: 'ticket.author_id',
          to: 'author.id'
        }
      }
    };
  }
}

module.exports = Ticket;
