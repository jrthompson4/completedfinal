// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'workorder' controller
angular.module('workorders').controller('WorkOrderController', ['$scope', '$routeParams', '$location', 'Authentication', 'WorkOrders',
    function($scope, $routeParams, $location, Authentication, WorkOrders) {
    	// Expose the Authentication service
        $scope.authentication = Authentication;

        // Create a new controller method for creating new workorder
        $scope.create = function() {
        	// Use the form fields to create a new article $resource object
            var workorder = new WorkOrders({
                Building: this.Building,
                AptNumber: this.AptNumber,
                ProblemDescription: this.ProblemDescription,
                PhoneNumber: this.PhoneNumber,
                firstname: this.firstname,
                lastname: this.lastname
                
            });

            // Use the workorder'$save' method to send an appropriate POST request
            workorder.$save(function(response) {
            	// If an workorder was created successfully, redirect the user to the workorder's page 
                $location.path('workorders/' + response._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of workorder
        $scope.find = function() {
        	// Use the workorder 'query' method to send an appropriate GET request
            $scope.workorders = WorkOrders.query();
        };

        // Create a new controller method for retrieving a single workorder
        $scope.findOne = function() {
        	// Use the workorder 'get' method to send an appropriate GET request
            $scope.workorder = WorkOrders.get({
                workorderId: $routeParams.workorderId
            });
        };

        // Create a new controller method for updating a single workorder
        $scope.update = function() {

        	// Use the workorder '$update' method to send an appropriate PUT request
            $scope.workorder.$update(function(response) {
            	// If an workorder was updated successfully, redirect the user to the workorder's page 
                $location.path('workorders/' + response._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };
    

        // Create a new controller method for deleting a single workorder
        $scope.delete = function(workorder) {
        	// If an  was sent to the method, delete it
            if (workorder) {
            	// Use the workorder '$remove' method to delete the workorder
                workorder.$remove(function() {
                	// Remove the workorder from the articles list
                    for (var i in $scope.workorders) {
                        if ($scope.workorders[i] === workorder) {
                            $scope.workorders.splice(i, 1);
                        }
                    }
                });
            } else {
            	// Otherwise, use the workorder '$remove' method to delete the workorder
                $scope.workorder.$remove(function() {
                    $location.path('workorders');
                });
            }
        };
    }
]);