angular.module('workorders').factory('WorkOrders', ['$resource', function($resource) {
    return $resource('api/workorders/:workorderId', {
        workorderId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);