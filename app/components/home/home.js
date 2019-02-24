let home = {
  bindings: {
    get: "="
  },
  templateUrl: require('./home.html'),
  styleUrls: ['home.css'],
  controller: class appCtrl {
    constructor($scope, $http, $state, appService) {
      $scope.init = function () {
        console.log('home ----', $scope);
      appService.httpWrapper($http, $state, $scope.getProposition);
      }
      $scope.select = function(selected) {
        $scope.selected = selected
      }

      $scope.like = function () {

      };

      $scope.dislike = function () {

      }

      // get all list of propositions
      $scope.getProposition = function () {
        $http({ method: 'GET', url: 'http://localhost:8888/pro/all'})    
          .then(function (response) {
            $scope.response = response;
          })
          .catch(function (err) {});
      }
      // delete one proposition
      $scope.deleteProposition = function () {
        appService.httpWrapper($http, $state, function () {
          $http({ method: 'DELETE', url: 'http://localhost:8888/pro/delete/' + $scope.selected.pro_id })
            .then(function (response) {
              $scope.response = response;
              $scope.getProposition();
            })
            .catch(function (err) {});
        })
      }
    }
  },
  controllerAs: 'homeCtrl'
}
home.$inject = ['$scope', '$http', '$state', 'appService'];
export default home;
