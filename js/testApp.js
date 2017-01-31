/**
 * Created by beeraman on 1/31/2017.
 */
(function(angular){
    'use strict';

    var routerApp = angular.module('testApp',['ui.router']);
        routerApp.config(function($stateProvider,$urlRouterProvider,$locationProvider){
            //$locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/welcome');
            localStorage.setItem('userInfo',{
               name:'Anil',
                email:'a@a.com',
                token:'ASDFASDF'
            });
            $stateProvider
                .state('app',{
                    url:'',
                    abstract:true,
                    requireLogin:true,
                    controller:function($scope){
                        $scope.userInfo = localStorage.getItem('userInfo');
                    },
                    views:{
                        '':{templateUrl:'partials/main.html'},
                        'header@app':{templateUrl:"partials/header.html"},
                        'footer@app':{templateUrl:"partials/footer.html"}
                    }
                })
                .state('welcome',{
                    url:'/welcome',
                    requireLogin:false,
                    views:{
                        '':{templateUrl:"partials/welcome.html"},
                        //'header':{templateUrl:"partials/header.html"},
                        //the above statement dosent display header in welcome
                        //after adding @welcome is displays
                        'header@welcome':{
                            templateUrl:"partials/header.html",
                            //controller:headerController
                            controller:function($scope,$state){
                                $scope.click=function(){
                                    console.log('asdfasdfsad fdas f');
                                    $state.go('app.dash');
                                }
                            }
                        },
                        'footer@welcome':{templateUrl:"partials/footer.html"},
                        'intro@welcome':{templateUrl:"partials/intro.html"}
                    }
                })
                .state('app.dash',{
                    url:'/dashboard',
                    templateUrl:"partials/dashboard.html",
                    controller:function($scope,$state){
                        $scope.click=function(){
                            $state.go('app.read');
                        }
                    }
                })
                .state('app.read',{
                    url:'/read',
                    template:"This is read"
                })
        });


}(angular));