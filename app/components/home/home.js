let home = {
  bindings: {
    get: "="
  },
  templateUrl: require('./home.html'),
  styleUrls: ['home.css'],
  controller: class appCtrl {
    constructor($scope, $http, $state, appService, $rootScope, $window) {

      $scope.init = () => {
        console.log('home ----', $scope);
        appService.getUser($rootScope, $window);
        // get a connected user ID
        $scope.isSelf = $rootScope.currentUser.usr_id;
        // check if connected user is admin
        $scope.isAdmin = $rootScope.currentUser.usr_is_admin;

        // authentication wrapper
        appService.httpWrapper($http, $state, $rootScope, $scope.getPropositions);
        
      }

      Object.defineProperty($scope, "searchFilter", {
        get: function () {
          var out = {};
          var search = $scope.search;
          if(!search) {
            return {'$': ''};
          }
          out[$scope.searchBy || "$"] = search;
          return out;
        }
      });
        // Set value to the model order by 

        $scope.orderItems = function (filter) {

          $scope.filtered = $scope.orderItemsDropdown[filter];
          $scope.ordered = $scope.orderItemsDropdown[filter].order;

        };
        // Set value to the model filter by

        $scope.filterItems = function (filter) {

          $scope.filteredItems = $scope.orderItemsDropdownFilter[filter];
          $scope.ordered = $scope.orderItemsDropdownFilter[filter].filter;
          console.log($scope.filteredItems);

        };

      // select one proposition

      $scope.select = (selected) => {
        $scope.selected = selected
        $scope.date = moment($scope.selected.pro_timestamp).format('L');
        console.log('selected ----', $scope.selected);
      }

      // insert likes/dislikes 

      $scope.like = (like)=> {
        const requestBody = {
          vot_value: like,
          pro_id: $scope.selected.pro_id,
        }
        appService.httpWrapper($http, $state, $rootScope, function () {
          $http({ method: 'POST', url: 'http://localhost:8888/vot/insertLike', data: requestBody})    
          .then(function (response) {
            appService.httpWrapper($http, $state, $rootScope, $scope.getPropositions);
          })
          .catch(function (err) {});
        });
      };

      // get list of all propositions

      $scope.getPropositions = () => {
        $http({ method: 'GET', url: 'http://localhost:8888/pro/all'})    
        .then(function (response) {
          $scope.response = response.data;
          response.data.forEach(function (data) {
            data.favorite = data.vote !== [] ? data.likes - data.dislikes : null;
            console.log(data)
          })

          // order by

          $scope.orderItemsDropdown = {
            'date': {
              text: 'Date',
              order: _.orderBy($scope.response, ['pro_timestamp'], ['desc'])
            },
            'status': {
              text: 'Status',
              order: _.orderBy($scope.response, ['pro_status'], ['asc'])
            },
            'vote': {
              text: 'Favorite',
              order: _.orderBy($scope.response, ['favorite'], ['desc'])
            }
          };
          $scope.filtered = $scope.orderItemsDropdown['date'];
          $scope.ordered = $scope.orderItemsDropdown['date'].order;

          // filter by
          $scope.orderItemsDropdownFilter = {
            'all': {
              text: 'All',
              filter: $scope.response
            },
            'validated': {
              text: 'Validated',
              filter: _.filter($scope.response, function(item) { return item.pro_status == 1})
            },
            'refused': {
              text: 'Refused',
              filter: _.filter($scope.response, function(item) { return item.pro_status == 2})
            },
            'pending': {
              text: 'Pending',
              filter: _.filter($scope.response, function(item) { return item.pro_status == 3})
            }
          };
          $scope.filteredItems = $scope.orderItemsDropdownFilter['all'];
          $scope.ordered = $scope.orderItemsDropdownFilter['all'].filter;
    
        })
        .catch(function (err) {});
      }

      // edit one proposition

      $scope.editProp = () => {
        const requestBody = {
          title: $scope.selected.pro_title,
          description: $scope.selected.pro_description,
          id: $scope.selected.pro_id,
          usr_id: $scope.selected.usr_id
        }
        appService.httpWrapper($http, $state, $rootScope, function () {
          $http({ method: 'POST', url: 'http://localhost:8888/pro/edit', data: requestBody})    
          .then(function (response) {
            appService.httpWrapper($http, $state, $rootScope, $scope.getPropositions);
          })
          .catch(function (err) {});
        })
      }

      // delete one proposition

      $scope.deleteProposition = () => {
        appService.httpWrapper($http, $state, $rootScope, function () {
          $http({ method: 'DELETE', url: 'http://localhost:8888/pro/delete/' + $scope.selected.pro_id })
          .then(function (response) {
            appService.httpWrapper($http, $state, $rootScope, $scope.getPropositions);
          })
          .catch(function (err) {});
        })
      }

      // change prop status 

      $scope.validate = (vote) => {
        const requestBody = {
          status: vote ? 1 : 2,
          id: $scope.selected.pro_id,
        }
        appService.httpWrapper($http, $state, $rootScope, function () {
          $http({ method: 'POST', url: 'http://localhost:8888/pro/changeStatus', data: requestBody})    
          .then(function (response) {
            appService.httpWrapper($http, $state, $rootScope, $scope.getPropositions);
          })
          .catch(function (err) {});
        })
      }
    }
  },
  controllerAs: 'homeCtrl'
}
home.$inject = ['$scope', '$http', '$state', 'appService', '$rootScope', '$window'];
export default home;
