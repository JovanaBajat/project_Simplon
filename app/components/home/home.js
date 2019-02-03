let home = {
  bindings: {},
  templateUrl: require('./home.html'),
  styleUrls: ['home.css'],
  controller: class appCtrl {
    constructor($scope, $http, appService) {
      $scope.init = function () {
      $scope.getProposition();

      }

      $scope.getProposition = function () {
            
        $http({ method: 'GET', url: 'http://localhost:8888/pro/all'})    
        .then(function (response) {
          $scope.response = response;
            })
            .catch(function (err) {});
      }
    }
  },
  controllerAs: 'homeCtrl'
}
home.$inject = ['$scope', '$http', 'appService'];
export default home;
