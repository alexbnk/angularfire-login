angular.module('app.home', [
        'ui.router',
        'firebase'

    ])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/home/home.html',
            controller: 'homeCtrl',
            resolve: {
                currentAuth: function(auth) {
                    return auth.$requireSignIn();
                }
                //
            }
        });

    })
