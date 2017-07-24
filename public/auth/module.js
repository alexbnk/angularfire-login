angular.module('app.auth', [
        'ui.router',
        'firebase'
    ])
    .run(function($rootScope,$state) {



      var config = {
          apiKey: 'AIzaSyCHohSWJsm2ujcVPdUYmvr_FrPbhRXMkG4',
          authDomain: 'test1-a924d.firebaseapp.com',
          databaseURL: 'https://test1-a924d.firebaseio.com',
          storageBucket: 'test1-a924d.appspot.com'
      };
      firebase.initializeApp(config);
      console.log("firebase initialized");

    
      firebase.initializeApp(config);
      console.log("firebase initialized");


  })

    // .run(function($rootScope, $state ) {
    //
    //   console.log('run section runs');
    //
    //
    //
    //
    //
    // })







    .controller("authCtrl", function($state, $scope, $rootScope, $firebaseAuth, auth) {

        $scope.errorMessage = null;



        // var auth = $firebaseAuth(); // replaced by 'auth' factory

        $scope.EPlogin = function(email, pass) {
            auth.$signInWithEmailAndPassword(email, pass).then(function(firebaseUser) {
                console.log("Signed in as:", firebaseUser.email);
                $rootScope.user = firebaseUser.email;

                // console.log(firebaseUser)
                $state.go('home');
            }).catch(function(err) {
                $scope.errorMessage = err.message;
                console.log(err.message);
                // console.log("Authentication failed:", error);
            });



        }

        $scope.EPRegistration = function(email, pass) {
            auth.$createUserWithEmailAndPassword(email, pass).then(function(firebaseUser) {
                console.log("User:"+ firebaseUser.uid + " created successfully");


                // console.log(firebaseUser)
                $state.go('home');
            }).catch(function(err) {
                $scope.errorMessage = err.message;
                console.log(err.message);
                // console.log("Authentication failed:", error);
            });



        }

















        $scope.logout = function() {

            auth.$signOut().then(function() {
                // Sign-out successful.
                $state.go('login');
            }, function(error) {
                // An error happened.
            });


        }




        // $scope.signout = function() {
        //   auth.$signOut()
        //   .then(function() {
        //   console.log('sign out clicked');
        //    console.log(firebaseUser)
        //   // Sign-out successful.
        // }).catch(function(error) {
        //   // An error happened.
        //   console.log(error);
        // });
        // }


    })

    .component('login', {

        templateUrl: '/auth/login.html',
        controller: 'authCtrl'


    })

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/auth/login.html',
                controller: 'authCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/auth/register.html',
                controller:'authCtrl'
            })
            .state('logout', {
                url: '/logout',
                controller: 'authCtrl',
                templateUrl: '/auth/logout.html'
            });

    })
