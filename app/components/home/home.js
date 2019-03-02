let home = {
  bindings: {
    get: "="
  },
  templateUrl: require('./home.html'),
  styleUrls: ['home.css'],
  controller: class appCtrl {
    constructor($scope, $http, $state, appService, $rootScope) {
      $scope.init = function () {
        $scope.isSelf = $rootScope.session.usr_id;
        console.log('home ----', $scope);
        appService.httpWrapper($http, $state, $rootScope, $scope.getProposition);
      }
      $scope.select = function(selected) {
        $scope.selected = selected
        $scope.date = moment($scope.selected.pro_timestamp).format('L');
        console.log('selected ----', $scope.selected);
      }

      $scope.like = function (like) {
        const requestBody = {
          vot_value: like,
          pro_id: $scope.selected.pro_id,
        }
        $http({ method: 'POST', url: 'http://localhost:8888/vot/insertLike', data: requestBody, withCredentials: false})    
          .then(function (response) {
            $scope.getProposition();
              })
          .catch(function (err) {});
      };

      $scope.dislike = function () {

      }

      // get all list of propositions
      $scope.getProposition = function () {
        $http({ method: 'GET', url: 'http://localhost:8888/pro/all'})    
          .then(function (response) {
            $scope.response = response;
            console.log('response -----', response);
          })
          .catch(function (err) {});
      }
      // edit proposition
      $scope.editProp = function () {
        const requestBody = {
          title: $scope.selected.pro_title,
          description: $scope.selected.pro_description,
          id: $scope.selected.pro_id,
          usr_id: $scope.selected.usr_id
        }
        $http({ method: 'POST', url: 'http://localhost:8888/pro/edit', data: requestBody, withCredentials: false})    
        .then(function (response) {
          $scope.getProposition();
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
home.$inject = ['$scope', '$http', '$state', 'appService', '$rootScope'];
export default home;
