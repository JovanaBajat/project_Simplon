let about = {
    bindings: {},
    templateUrl: require('./about.html'),
    styleUrls: ['about.css'],
    controller: class appCtrl {
        constructor($scope, $http, $state) {
            $scope.init = function () {
                console.log('about -', $scope);

            }
        }
    },
    controllerAs: 'aboutCtrl'
}
about.$inject = ['$scope', '$http', '$state'];
export default about;
