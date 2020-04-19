const db = require('./db_connect');

// 'use strict';

module.exports.getAllItems = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getAll('items')
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res)
      });
    })
    .catch((e) => {
      console.log(e);
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Error: Could not find Items: ' + e
      });
    });
};

module.exports.getItem = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getById('items', event.pathParameters.id)
    .then(res => {
      callback(null,{
        statusCode: 200,
        body: JSON.stringify(res)
      })
    })
    .catch((e) => {
      console.log(e);
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not find Item: ' + e
      });
    });
};

module.exports.createItem = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.insert('items', data)
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: 'Item Created!' + res,
      });
    })
    .catch((e) => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not create Item ' + e
      });
    });
};

module.exports.updateItem = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.updateById('items', event.pathParameters.id, data)
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: 'Item Updated!' + res,
      });
    })
    .catch((e) => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not update Item' + e,
      });
    });
};

module.exports.deleteItem = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.deleteById('items', event.pathParameters.id)
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: 'Item Deleted!',
      });
    })
    .catch((e) => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not delete Item' + e,
      });
    });
};
