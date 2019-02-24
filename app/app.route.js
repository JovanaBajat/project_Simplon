routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default function routing ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
        .state('home', {
          url: '/home',
          template: '<home></home>'
        })
        .state('profile', {
          url: '/profile',
          template: '<profile></profile>',
        })
        .state('login', {
          url: '/loginPage',
          template: '<login></login>',
        })
        .state('about', {
          url: '/about',
          template: '<about></about>',
        })
  $urlRouterProvider.otherwise('/home');
  $locationProvider.html5Mode(false);
}
