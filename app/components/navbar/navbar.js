let navbar = {
    bindings: {},
    templateUrl: require('./navbar.html'),
    styleUrls: ['navbar.css'],
    controller: class appCtrl {
        constructor($scope, $state, appService) {
            $scope.init = function () {
                console.log('navbar -', $scope);

                $(document).ready(function () {
                    $('.navbar .dropdown').hover(function () {
                        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(150);
                    }, function () {
                        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(105)
                    });
                });
            }
        }
    },
    controllerAs: 'navbarCtrl'
}
navbar.$inject = ['$scope', '$state', 'appService'];
export default navbar;
