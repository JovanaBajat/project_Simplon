let profile = {
  bindings: {},
  templateUrl: require('./profile.html'),
  styleUrls: ['profile.css'],
  controller: class appCtrl {
      constructor($scope, $http, $state) {
          $scope.init = function () {
            console.log('profile -', $scope);

          }
      }
  },
  controllerAs: 'profileCtrl'
}
profile.$inject = ['$scope', '$http', '$state'];
export default profile;
