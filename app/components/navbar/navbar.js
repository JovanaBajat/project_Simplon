let navbar = {
    bindings: {
        get: "="
    },
    templateUrl: require('./navbar.html'),
    styleUrls: ['navbar.css'],
    controller: class appCtrl {
        constructor($scope, $state, $http, $rootScope, appService, $window) {

            $scope.init = () => {
                console.log('navbar -', $scope);
                $scope.isAdmin = $rootScope.currentUser.usr_is_admin;
                $scope.clicked = false;

                $(document).ready(function () {
                    $('.navbar .dropdown').hover(function () {
                        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
                    }, function () {
                        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(105)
                    });
                });
            }

            // chec if checkbox is checked or not

            $scope.toggleClick = () => {
                $scope.clicked = !$scope.clicked;
            }

            // invite user by email

            $scope.inviteUser = () => {

                const requestBody = {
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
                    email: $scope.email,
                    job: $scope.job,
                    isAdmin: $scope.clicked,
                    photo: 'https://cdn0.iconfinder.com/data/icons/flat-design-business-set-3/24/people-customer-unknown-512.png',
                    infos: 'Tell us something about yourself!'

                }
                appService.httpWrapper($http, $state, $rootScope, function () {
                    $http({ method: 'POST', url: 'http://localhost:8888/usr/addUser', data: requestBody, withCredentials: false})    
                    .then(function (response) {
                        console.log('response ---', response);
                    })
                    .catch(function (err) {
                        console.log('error');
                    });
                });
            }

            // get list of all members 

            $scope.getMembers = () => {
                console.log('see members');
                appService.httpWrapper($http, $state, $rootScope, function () {
                    $http({ method: 'GET', url: 'http://localhost:8888/usr/all'})    
                    .then(function (response) {
                        $scope.members = response.data;
                        console.log($scope.members);
                    })
                    .catch(function (err) {});
                });
            }

            // select one member
            
            $scope.select = (selected) => {
                $scope.selected = selected
                console.log('selected ----', $scope.selected);
            }

            // delete one member

            $scope.deleteMember = () => {
                appService.httpWrapper($http, $state, $rootScope, function () {
                    $http({ method: 'DELETE', url: 'http://localhost:8888/usr/delete/' + $scope.selected.usr_id })
                    .then(function (response) {
                    $scope.response = response;
                    $scope.navbarCtrl.get();
                    })
                    .catch(function (err) {});
                })
            }

            // logout member

            $scope.logout = () => {
                console.log('logout');
                $http({ method: 'GET', url: 'http://localhost:8888/usr/logout'})    
                .then(function (response) {
                    $state.go('login', {
                        url: '/login',
                        template: '<login></login>'
                    })
                    $window.localStorage.removeItem('user');
                    $rootScope.currentUser = null;
                })
                .catch(function (err) {});
            }
            
        }
    },
    controllerAs: 'navbarCtrl'
}

navbar.$inject = ['$scope', '$state', '$http', '$rootScope', 'appService', '$window'];
export default navbar;
