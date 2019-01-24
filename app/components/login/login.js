let login = {
    bindings: {},
    templateUrl: require('./login.html'),
    styleUrls: ['login.css'],
    controller: class appCtrl {
        constructor($scope, $http, $state) {
            $scope.init = function () {
               // console.log('login -', $scope);

            }

            $scope.userConnection = function () { 
                //console.log("HERE", $scope);
                $http({ method: 'POST', url: 'http://localhost:8888/usr/login', data: {email: $scope.email, password: $scope.password}, withCredentials: false})    
                .then(function (response) {
                    $state.go('home', {
                        url: '/home',
                        template: '<home></home>'
                    })
                    document.cookie = `token=${response.data.cookie}`;
                    console.log('document.cookie', document.cookie);
                    console.log(response);
                    })
                    .catch(function (err) {});
            };
        }
    },
    controllerAs: 'loginCtrl'
}
login.$inject = ['$scope', '$http', '$state'];
export default login;
