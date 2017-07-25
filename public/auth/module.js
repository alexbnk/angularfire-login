angular.module('app.auth', [
        'ui.router',
        'firebase'
    ])
    .run(function($rootScope,$state) {




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







    .controller("authCtrl", function($state, $scope, $rootScope, $firebaseAuth, auth, $exceptionHandler) {

    $scope.form = {
        'uid':"433d940jd043dj34d093jd930jdh4389jd9034d340d34-wpwl",
        'email':'alex@lalalalalal.com'
    };




        $scope.registrationError = null;

        $scope.form ={
          'email':'',
          'uid':'',
          'fname':'',
          'lname':''
        };
        $scope.errorMessage = null;

        $scope.show = false

        $scope.toggle = function() {

          $scope.show = !$scope.show;
          console.log($scope.show);

        }



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

        $scope.EPRegistration = function() {

          if( $scope.form.pass1 == $scope.form.pass2 && $scope.form.pass1.length >6) {

            auth.$createUserWithEmailAndPassword(email, pass).then(function(firebaseUser) {
                console.log("User:"+ firebaseUser.uid + " created successfully");


                // console.log(firebaseUser)
                $state.go('profile');
            }).catch(function(err) {
                $scope.errorMessage = err.message;
                console.log(err.message);
                // console.log("Authentication failed:", error);
            });


          } else {

            $scope.error = "errorMessage";

          }






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
            })
            .state('profile', {
                url: '/profile',
                controller: 'authCtrl',
                templateUrl: '/auth/profile.html'
            });

    })
