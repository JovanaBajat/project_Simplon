export default class appService {
    /* @ngInject */
    constructor () {
        this.serviceVar = "Inside Service";
    }

    changeMe() {
        this.serviceVar = "Changed my data";
    }

    httpWrapper($http, $state, $rootScope, wrappedRequest) {
        $http({ method: 'GET', url: 'http://localhost:8888/authenticate'})    
        .then(function () {
            wrappedRequest();
        })
        .catch(function (err) {
                $state.go('login', {
                    url: '/loginPage',
                    template: '<login></login>'
                })
                $rootScope.warningAlert = true;
            }); 
        return ;
    }

    getUser($rootScope, $window) {
        if ($rootScope.currentUser) {
            return $rootScope.currentUser;
        }
        var storageUser = $window.localStorage.getItem('user');
        if (storageUser) {
            try {
                $rootScope.currentUser = JSON.parse(storageUser);
            } catch (e) {
                $window.localStorage.removeItem('user');
            }
        }
        return $rootScope.currentUser;
    }
}
