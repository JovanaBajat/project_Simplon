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
              firstname: $scope.response.data.usr_firstname,
              lastname: $scope.response.data.usr_lastname,
              job: $scope.response.data.usr_job,
              email: $scope.response.data.usr_email,
             // photo: $scope.response.data.usr_photo,
              infos: $scope.response.data.usr_infos,
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
