angular.module('workorders').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/workorders/signin', {
            templateUrl: 'workorders/views/signin.html'
        }).
        when('/workorders/signup', {
            templateUrl: 'workorders/views/signup.html'
        }).
        when('/workorders', {
            templateUrl: 'workorders/views/list-workorders.client.view.html'
        }).
        when('/workorders/chart', {
            templateUrl: 'workorders/views/piechart.html'
        }).
        when('/workorders/create', {
            templateUrl: 'workorders/views/create-workorder.client.view.html'
        }).
        when('/workorders/:workorderId', {
            templateUrl: 'workorders/views/view-workorders.client.view.html'
        }).
        when('/workorders/:workorderId/edit', {
            templateUrl: 'workorders/views/edit-workorder.client.view.html'
        }).
        when('/workorders/:workorderId/edit/superuser', {
            templateUrl: 'workorders/views/superuser-edit-workorder.client.view.html'
        });
    }
]);