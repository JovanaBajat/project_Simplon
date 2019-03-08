let redact = {
    bindings: {
        get: "="
    },
    templateUrl: require('./redact.html'),
    styleUrls: ['redact.css'],
    controller: class appCtrl {
        constructor($scope, $rootScope, $http, $state, appService) {

            $scope.init = function () {
            }
            // post one proposition 

            $scope.submitProp = () => {
                const requestBody = {
                    title: $scope.title,
                    description: $scope.description,
                }
                appService.httpWrapper($http, $state, $rootScope, function () {
                    $http({ method: 'POST', url: 'http://localhost:8888/pro/add', data: requestBody })
                        .then(function (response) {
                            $scope.reset();
                            $scope.redactCtrl.get();
                        }) 
                        .catch(function (err) {});
                    });
                }

            // reset input and textarea fields
            
            $scope.reset = () => {
                $scope.title = null;
                $scope.description = null;
            };
        }
    },
    controllerAs: 'redactCtrl'
}
redact.$inject = ['$scope', '$rootScope', '$http', '$state', 'appService'];
export default redact;
