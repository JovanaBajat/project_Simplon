let redact = {
    bindings: {},
    templateUrl: require('./redact.html'),
    styleUrls: ['redact.css'],
    controller: class appCtrl {
        constructor($scope, $state, $http) {
            $scope.init = function () {
                console.log('redact -', $scope);
            }
            $scope.submitProp = function () {
                console.log("HERE-",$scope);
                $http({ method: 'POST', url: 'http://localhost:8888/pro/add', data: {title: $scope.title, description: $scope.description} })
                    .then(function (response) {
                        console.log(response);
                    }, function (response) {
                });
            };
        }
    },
    controllerAs: 'redactCtrl'
}
redact.$inject = ['$scope', '$state', '$http'];
export default redact;
