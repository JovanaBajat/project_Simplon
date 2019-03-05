let profile = {
  bindings: {},
  templateUrl: require('./profile.html'),
  styleUrls: ['profile.css'],
  controller: class appCtrl {
      constructor($scope, $rootScope, $http, $state, appService) {

          $scope.init = () => {
            appService.httpWrapper($http, $state, $rootScope, $scope.getUser);
          }

          // get mermber's profile

          $scope.getUser = () => {
            $http({ method: 'GET', url: 'http://localhost:8888/usr/user', params: {id: $rootScope.currentUser.usr_id}})    
            .then(function (response) {
              $scope.response = response;
              })
            .catch(function (err) {});
          }

          // edit member's profile

          $scope.submitForm = () => {
            const requestBody = {
              firstname: $scope.response.data.usr_firstname,
              lastname: $scope.response.data.usr_lastname,
              job: $scope.response.data.usr_job,
              email: $scope.response.data.usr_email,
              // photo: $scope.response.data.usr_photo,
              infos: $scope.response.data.usr_infos,
              id: $rootScope.currentUser.usr_id
            }
            appService.httpWrapper($http, $state, $rootScope, function () {
              $http({ method: 'POST', url: 'http://localhost:8888/usr/edit', data: requestBody, withCredentials: false})    
              .then(function (response) {
                console.log('request body -----', requestBody);
              })
              .catch(function (err) {});
            });
          }
      }
  },
  controllerAs: 'profileCtrl'
}
profile.$inject = ['$scope', '$rootScope', '$http', '$state', 'appService'];
export default profile;
