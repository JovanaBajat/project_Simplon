let login = {
    bindings: {},
    templateUrl: require('./login.html'),
    styleUrls: ['login.css'],
    controller: class appCtrl {
        constructor($scope, $rootScope, $http, $state) {
            $scope.init = function () {
                $scope.alert = $rootScope.warningAlert;
                $(".alert-warning").fadeTo(2000, 500).slideUp(500, function(){
                    $(".alert-warning").slideUp(500);
                });
            }
            
            $scope.userConnection = function () { 
                $http({ method: 'POST', url: 'http://localhost:8888/usr/login', data: {email: $scope.email, password: $scope.password}, withCredentials: true})    
                .then(function (response) {
                    $state.go('home', {
                        url: '/home',
                        template: '<home></home>'
                    })
                    $rootScope.session = response.data.user;
                    })
                    .catch(function (err) {});
            };
        }
    },
    controllerAs: 'loginCtrl'
}
login.$inject = ['$scope', '$rootScope', '$http', '$state'];
export default login;
