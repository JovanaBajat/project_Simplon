let home = {
  bindings: {},
  templateUrl: require('./home.html'),
  styleUrls: ['home.css'],
  controller: class appCtrl {
    constructor($scope, $state, appService) {
      console.log($scope);
      this.homeVar = "This text is from home controller";
      appService.serviceVar = "Changed from Home";
    }
  },
  controllerAs: 'homeCtrl'
}
home.$inject = ['$scope', '$state', 'appService'];
export default home;
