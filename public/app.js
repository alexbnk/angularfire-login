var app = angular.module('app', [
        'ui.router',
        'firebase',
        'app.auth',
        'app.home'
    ])



    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/login');

        $locationProvider.html5Mode(true);

    })

    .factory('auth', function($firebaseAuth) {
        var auth = $firebaseAuth();
        return auth;
    })


    .controller('mainCtrl', function($scope, $rootScope) {

        console.log($rootScope.user);


    })

    // .run(function($rootScope, $state, auth ) {
    //
    //   console.log('run section runs');
    //
    //   $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams){
    //
    // console.log($stateChangeError);
    //
    //  });
    //
    //
    //
    // })
    .run(function($rootScope) {
            var user = JSON.parse(localStorage.getItem("Storage.firebase"));
            if (user) {
                console.log(user);
                // $rootScope.currentUser = user.name;
                // $scope.User = $rootScope.currentUser;
                // $rootScope.oid = user.oid;
                // $rootScope.isAuthenticated = true;
                // $rootScope.photoURI = user.photo;
            }
        })
