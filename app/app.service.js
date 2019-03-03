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
            console.log('auth works');
            wrappedRequest();
        })
        .catch(function (err) {
            console.log('auth didnt work');
                $state.go('login', {
                    url: '/loginPage',
                    template: '<login></login>'
                })
                $rootScope.warningAlert = true;
            }); 
        console.log('httpwrapp')
        return ;
    }
}
