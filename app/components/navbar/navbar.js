let navbar = {
    bindings: {},
    templateUrl: require('./navbar.html'),
    styleUrls: ['navbar.css'],
    controller: class appCtrl {
        constructor($scope, $state) {
            $scope.init = function () {
                console.log('navbar -', $scope);

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
            }
        }
    },
    controllerAs: 'navbarCtrl'
}
navbar.$inject = ['$scope', '$state', '$location'];
export default navbar;
