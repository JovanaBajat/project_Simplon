let navbar = {
    bindings: {},
    templateUrl: require('./navbar.html'),
    styleUrls: ['navbar.css'],
    controller: class appCtrl {
        constructor($scope, $state, $http, $rootScope) {
            $scope.init = function () {
                console.log('navbar -', $scope);
                $scope.isAdmin = $rootScope.session.usr_is_admin;
                console.log('is admin ---', $scope.isAdmin);

                $(document).ready(function () {
                    $('.navbar .dropdown').hover(function () {
                        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
                    }, function () {
                        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(105)
                    });
                });
                $scope.goProfile = function () {
                    console.log('goprofile');
                    $state.go('profile', {
                        url: '/profile',
                        template: '<profile></profile>'
                    })
                }
                $scope.inviteUser = function () {
                    console.log('inviteUser');
                    const requestBody = {
                      firstname: $scope.firstname,
                      lastname: $scope.lastname,
                      job: $scope.job,
                      email: $scope.email,
                      //id: $rootScope.session.usr_id
                    }
                    $http({ method: 'POST', url: 'http://localhost:8888/usr/addUser', data: requestBody, withCredentials: false})    
                    .then(function (response) {
                        console.log('response ---', response);
                        })
                        .catch(function (err) {
                            console.log('error');
                        });
                  }
                $scope.logout = function () {
                    console.log('logout');
                    $http({ method: 'GET', url: 'http://localhost:8888/usr/logout'})    
                    .then(function (response) {
                        $scope.response = response;
                        $state.go('login', {
                            url: '/login',
                            template: '<login></login>'
                        })
                    })
                    .catch(function (err) {});
                }
            }
        }
    },
    controllerAs: 'navbarCtrl'
}
navbar.$inject = ['$scope', '$state', '$http', '$rootScope'];
export default navbar;
