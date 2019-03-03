let home = {
  bindings: {
    get: "="
  },
  templateUrl: require('./home.html'),
  styleUrls: ['home.css'],
  controller: class appCtrl {
    constructor($scope, $http, $state, appService, $rootScope) {

      $scope.init = () => {
        console.log('home ----', $scope);
        // get a connected user ID
        $scope.isSelf = $rootScope.session.usr_id;
        // authentication wrapper
        appService.httpWrapper($http, $state, $rootScope, $scope.getPropositions);
      }

      // select one proposition

      $scope.select = (selected) => {
        $scope.selected = selected
        $scope.date = moment($scope.selected.pro_timestamp).format('L');
        console.log('selected ----', $scope.selected);
      }

      // insert likes/dislikes 

      $scope.like = (like)=> {
        const requestBody = {
          vot_value: like,
          pro_id: $scope.selected.pro_id,
        }
        appService.httpWrapper($http, $state, $rootScope, function () {
          $http({ method: 'POST', url: 'http://localhost:8888/vot/insertLike', data: requestBody})    
          .then(function (response) {
            appService.httpWrapper($http, $state, $rootScope, $scope.getPropositions);
          })
          .catch(function (err) {});
        });
      };

      // get list of all propositions

      $scope.getPropositions = () => {
        $http({ method: 'GET', url: 'http://localhost:8888/pro/all'})    
        .then(function (response) {
          $scope.response = response;
        })
        .catch(function (err) {});
      }

      // edit one proposition

      $scope.editProp = () => {
        const requestBody = {
          title: $scope.selected.pro_title,
          description: $scope.selected.pro_description,
          id: $scope.selected.pro_id,
          usr_id: $scope.selected.usr_id
        }
        appService.httpWrapper($http, $state, $rootScope, function () {
          $http({ method: 'POST', url: 'http://localhost:8888/pro/edit', data: requestBody})    
          .then(function (response) {
            appService.httpWrapper($http, $state, $rootScope, $scope.getPropositions);
          })
          .catch(function (err) {});
        })
      }

      // delete one proposition

      $scope.deleteProposition = () => {
        appService.httpWrapper($http, $state, $rootScope, function () {
          $http({ method: 'DELETE', url: 'http://localhost:8888/pro/delete/' + $scope.selected.pro_id })
          .then(function (response) {
            appService.httpWrapper($http, $state, $rootScope, $scope.getPropositions);
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
