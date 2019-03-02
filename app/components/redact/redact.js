let redact = {
    bindings: {
        get: "="
    },
    templateUrl: require('./redact.html'),
    styleUrls: ['redact.css'],
    controller: class appCtrl {
        constructor($scope, $rootScope, $http) {
            $scope.init = function () {
                console.log('redact -', $scope);
            }
            $scope.submitProp = function () {
                console.log("HERE-",$scope);
                const requestBody = {
                    title: $scope.title,
                    description: $scope.description,
                }
                $http({ method: 'POST', url: 'http://localhost:8888/pro/add', data: requestBody })
                    .then(function (response) {
                        console.log(response);
                        $scope.reset();
                    }, function (response) {
                    });
                    $scope.redactCtrl.get();
                }
                $scope.reset = function () {
                console.log('reset');
                $scope.title = null;
                $scope.description = null;
            };
        }
    },
    controllerAs: 'redactCtrl'
}
redact.$inject = ['$scope', '$rootScope', '$http'];
export default redact;
