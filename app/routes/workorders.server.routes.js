// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
    workorders = require('../../app/controllers/workorders.server.controller');

// Define the routes module' method
module.exports = function(app) {
    // Set up the 'workorders' base routes 
    app.route('/api/workorders')
       .get(workorders.list)
       .post(users.requiresLogin, workorders.create);

    // Set up the 'workorders' parameterized routes
    app.route('/api/workorders/:WorkOrderId')
       .get(workorders.read)
       .put(users.requiresLogin, workorders.hasAuthorization, workorders.update)
       .delete(users.requiresLogin, workorders.hasAuthorization, workorders.delete);

    // Set up the 'WorkOrderId' parameter middleware   
    app.param('WorkOrderId', workorders.workorderByID);
};