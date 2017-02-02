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
                        'header@app':{
                            templateUrl:"partials/header.html",
                            controller:function($scope){
                                $scope.click=function(){
                                    $state.go('app.read');
                                }
                            }
                        },
                        'footer@app':{templateUrl:"partials/footer.html"}
                    }
                })
                .state('welcome',{
                    url:'/welcome',
                    requireLogin:false,
                    views:{
                        '':{templateUrl:"partials/welcome.html"},
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
                    templateUrl:"partials/reader.html",
                    controller:function($scope,$state){
                        $scope.click=function(){
                            $state.go('logout');
                        }
                    }
                })
                .state('logout',{
                    url:'/logout',
                    templateUrl:"partials/logout.html",
                    controller:function($scope,$state,$timeout){
                        $scope.secRem = 5;
                        var timer = setInterval ( function(){
                            $scope.secRem --;
                            $scope.$apply();
                            if($scope.secRem==5){
                                clearInterval ( timer );
                            }
                        }, 1000 );
                        $timeout(function(){
                            $state.go('welcome');
                        },5000);
                    }
                })
        });


}(angular));