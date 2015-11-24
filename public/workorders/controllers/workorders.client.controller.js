// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'articles' controller
angular.module('workorders').controller('WorkOrderController', ['$scope', '$routeParams', '$location', 'Authentication', 'WorkOrders',
    function($scope, $routeParams, $location, Authentication, WorkOrders) {
    	// Expose the Authentication service
        $scope.authentication = Authentication;

        // Create a new controller method for creating new articles
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

            // Use the article '$save' method to send an appropriate POST request
            workorder.$save(function(response) {
            	// If an article was created successfully, redirect the user to the article's page 
                $location.path('workorders/' + response._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of articles
        $scope.find = function() {
        	// Use the article 'query' method to send an appropriate GET request
            $scope.workorders = WorkOrders.query();
        };

        // Create a new controller method for retrieving a single article
        $scope.findOne = function() {
        	// Use the article 'get' method to send an appropriate GET request
            $scope.workorder = WorkOrders.get({
                workorderId: $routeParams.workorderId
            });
        };

        // Create a new controller method for updating a single article
        $scope.update = function() {

        	// Use the article '$update' method to send an appropriate PUT request
            $scope.workorder.$update(function() {
            	// If an article was updated successfully, redirect the user to the article's page 
                $location.path('workorders/' + $scope.workorder._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for deleting a single article
        $scope.delete = function(workorder) {
        	// If an article was sent to the method, delete it
            if (workorder) {
            	// Use the article '$remove' method to delete the article
                workorder.$remove(function() {
                	// Remove the article from the articles list
                    for (var i in $scope.workorders) {
                        if ($scope.workorders[i] === workorder) {
                            $scope.workorders.splice(i, 1);
                        }
                    }
                });
            } else {
            	// Otherwise, use the article '$remove' method to delete the article
                $scope.workorder.$remove(function() {
                    $location.path('workorders');
                });
            }
        };
    }
]);