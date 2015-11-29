var app = angular.module('website', ['ngAnimate', 'ui.bootstrap', 'ngRoute', 'ngResource', 'firebase', 'toaster', 'ui.bootstrap']);


app.controller('MainCtrl', function($scope, $timeout, QueueService, $route, $routeParams, $location, $firebase, $log) {
    $scope.$route = $route;
    $scope.$location = $location;
    var INTERVAL = 7000;

    $scope.$on('$routeChangeSuccess', function(ev, current, prev) {

        var ref = new Firebase("https://eventsboard.firebaseio.com");


    });
    var slides = [{
        id: "image00",
        color: "redBg",
        src: "./images/image00.jpg",
        headline: "hello 1 In hac habitasse platea dictumst."
    }, {
        id: "image01",
        color: "blueBg",
        src: "./images/image01.jpg",
        headline: "hello 2"
    }, {
        id: "image02",
        color: "greenBg",
        src: "./images/image02.jpg",
        headline: "hello 3"
    }, {
        id: "image03",
        color: "blue",
        src: "./images/image03.jpg",
        headline: "hello 4"
    }, {
        id: "image04",
        color: "purple",
        src: "./images/image04.jpg",
        headline: "hello 5"
    }];
    $scope.colorVal = '';
    var colCount = 0;
    var colorArr = ['redBg', 'greenBg', 'blueBg', 'whiteBg'];
    var currColor = '';
    $scope.displayLoadingIndicator = false;
    $scope.slides = slides;
    $scope.colorVal = colorArr[0];


    function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
        // console.log("set current slide");
    }

    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }



    $scope.test3 = function() {
        colCount++;
        if (colCount < colorArr.length) {
            $scope.colorVal = colorArr[colCount];
        } else {
            colCount = 0;
            $scope.colorVal = colorArr[colCount];
        }
    }

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $scope.$apply(function() {
            colCount++;
            if (colCount < colorArr.length) {
                $scope.colorVal = colorArr[colCount];
            } else {
                colCount = 0;
                $scope.colorVal = colorArr[colCount];
            }
        });
        $timeout(nextSlide, INTERVAL);
    }

    function setCurrentAnimation(animation) {
        $scope.currentAnimation = animation;
    }

    function isCurrentAnimation(animation) {
        return $scope.currentAnimation === animation;
    }

    function loadSlides() {
        // QueueService.loadManifest(slides);
        $timeout(nextSlide, INTERVAL);
    }

    $scope.$on('queueProgress', function(event, queueProgress) {
        $scope.$apply(function() {
            $scope.progress = queueProgress.progress * 100;
        });
    });

    $scope.$on('queueComplete', function(event, slides) {
        $scope.$apply(function() {
            $scope.slides = slides;
            $scope.loaded = true;

            $timeout(nextSlide, INTERVAL);
        });
    });

    $scope.progress = 0;
    $scope.loaded = true;
    $scope.currentIndex = 0;
    $scope.currentAnimation = 'fade-in-animation';

    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.setCurrentAnimation = setCurrentAnimation;
    $scope.isCurrentAnimation = isCurrentAnimation;

    loadSlides();





});

app.config(function($routeProvider) {
    $routeProvider
        .when('/display', {
            templateUrl: 'display.html',
            controller: 'MainCtrl'
        })
        .when('/display/:boardid', {
            templateUrl: 'display.html',
            controller: 'MainCtrl'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'EventController'
        })
        .when('/post', {
            templateUrl: 'views/post.html',
            controller: 'EventController'
        })
        .when('/edit/:taskId', {
            templateUrl: 'views/edit.html',
            controller: 'TaskController'
        })
        .otherwise({
            redirectTo: '/'
        });
})


app.factory('QueueService', function($rootScope) {
    var queue = new createjs.LoadQueue(true);

    function loadManifest(manifest) {
        queue.loadManifest(manifest);

        queue.on('progress', function(event) {
            $rootScope.$broadcast('queueProgress', event);
        });

        queue.on('complete', function() {
            $rootScope.$broadcast('queueComplete', manifest);
        });
    }

    return {
        loadManifest: loadManifest
    }
});

app.animation('.slide-animation', function($window) {
    return {
        enter: function(element, done) {
            var startPoint = $window.innerWidth * 0.05,
                tl = new TimelineLite();

            tl.fromTo(element.find('.bg'), .5, {
                    alpha: 0
                }, {
                    alpha: 1
                })
                .fromTo(element.find('.xlarge'), 1, {
                    left: startPoint,
                    alpha: 0
                }, {
                    left: 50,
                    alpha: 1
                })
                .fromTo(element.find('.title'), 1, {
                    left: 50,
                    alpha: 0
                }, {
                    left: 50,
                    alpha: 1
                })
                .fromTo(element.find('.dateTime'), 1, {
                    left: 50,
                    alpha: 0
                }, {
                    left: 50,
                    alpha: 1,
                    onComplete: done
                })
                .fromTo(element.find('.time'), 1, {
                    left: 50,
                    alpha: 0
                }, {
                    left: 50,
                    alpha: 1,
                    onComplete: done
                })

            ;

        },

        leave: function(element, done) {
            var tl = new TimelineLite();

            tl.to(element, .5, {
                alpha: 0,
                onComplete: done
            });
        }
    };
});


app.directive('titleresizer', function($window) {
    return function(scope, element, attrs) {
        var resizeBG = function() {
            var bgwidth = element.width();
            var bgheight = element.height();

            var winwidth = $window.innerWidth;
            var winheight = $window.innerHeight;

            var widthratio = winwidth / bgwidth;
            var heightratio = winheight / bgheight;

            var widthdiff = heightratio * bgwidth;
            var heightdiff = widthratio * bgheight;

            if (heightdiff > winheight) {
                element.css({
                    fontSize: '153px'
                });
            } else if (heightdiff < winheight) {
                element.css({
                    fontSize: '153px'

                });
            }
        };



        var windowElement = angular.element($window);
        windowElement.resize(resizeBG);

        element.bind('load', function() {
            resizeBG();
        });
    }
});
