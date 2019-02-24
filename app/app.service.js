export default class appService {
    /* @ngInject */
  constructor () {
      this.serviceVar = "Inside Service";
  }

  changeMe() {
      this.serviceVar = "Changed my data";
  }

  httpWrapper($http, $state, wrappedRequest) {
    $http({ method: 'GET', url: 'http://localhost:8888/authenticate'})    
    .then(function () {
        console.log('works');
        wrappedRequest();
    })
    .catch(function (err) {
        console.log('caca');
            $state.go('login', {
                url: '/loginPage',
                template: '<login></login>'
            })
            // alert - vous aves etes deconnecté
        }); 
    console.log('httpwrapp')
    return ;
  }

}
