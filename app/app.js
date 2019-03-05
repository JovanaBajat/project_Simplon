let mainApp = {
  bindings: {},
  templateUrl: require('./app.html'),
  controller: class appCtrl {
    constructor($scope, $state, appService, $rootScope, $window) {
      this.$state = $state;
      this.appService = appService;
      appService.getUser($rootScope, $window);
    }
  }
}

mainApp.$inject = ['$scope', '$state' ,'appService', '$rootScope', '$window'];
export default mainApp;
