let profile = {
  bindings: {},
  templateUrl: require('./profile.html'),
  styleUrls: ['profile.css'],
  controller: class appCtrl {
      constructor($scope, $rootScope, $http) {
          $scope.init = function () {
          $scope.getUser();

          }
          $scope.getUser = function () {
            $http({ method: 'GET', url: 'http://localhost:8888/usr/user', params: {id: $rootScope.session.usr_id}})    
            .then(function (response) {
              $scope.response = response;
                })
                .catch(function (err) {});
          }
          $scope.submitForm = function () {
            console.log('test');
            const requestBody = {
              firstname: $scope.firstname,
              lastname: $scope.lastname,
              job: $scope.job,
              email: $scope.email,
             // photo: $scope.photo,
              infos: $scope.infos,
              id: $rootScope.session.usr_id
            }
            $http({ method: 'POST', url: 'http://localhost:8888/usr/edit', data: requestBody, withCredentials: false})    
            .then(function (response) {
                })
                .catch(function (err) {});
          }
      }
  },
  controllerAs: 'profileCtrl'
}
profile.$inject = ['$scope', '$rootScope', '$http'];
export default profile;
