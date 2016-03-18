var app = angular.module('website', ['ngAnimate', 'ngRoute', 'firebase']);

app.controller('MainCtrl', function($scope, $timeout, $firebaseArray, GradientService, FBURL, $routeParams) {

    var accountId = $routeParams.accountId;

    var ref = new Firebase("https://simplesign.firebaseio.com/accounts/" + accountId + "/slides");

    var slides = $firebaseArray(ref);

    // loading indicator
    $scope.displayLoadingIndicator = true;
    console.log('show loading: ', $scope.displayLoadingIndicator);

    slides.$loaded()
        .then(function(x) {
            // $scope.displayLoadingIndicator = false;
            console.log('show loading: ', $scope.displayLoadingIndicator);
            $scope.slides = slides;
            x === slides; // true
        })
        .catch(function(error) {
            console.log("Error:", error);
        });

    // slideshow
    function isCurrentSlideIndex(index) {
        return $scope.currentIndex === index;
    }

    var INTERVAL = 5000;

    function nextSlide() {
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        $timeout(nextSlide, INTERVAL);
    }

    function loadSlides() {
        $timeout(nextSlide, INTERVAL);
    }

    $scope.currentIndex = 0;

    $scope.isCurrentSlideIndex = isCurrentSlideIndex;

    loadSlides();

});

app.config(function($routeProvider) {
    $routeProvider
        .when('/display', {
            templateUrl: 'display.html',
            controller: 'MainCtrl'
        })
        .when('/display/:accountId', {
            templateUrl: 'display.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.constant('FBURL', 'https://simplesign.firebaseio.com');

app.factory('GradientService', function() {
    var gradients = [{
        "name": "Intuitive Purple",
        "colors": ["#DA22FF", "#9733EE"]
    }, {
        "name": "Emerald Water",
        "colors": ["#348F50", "#56B4D3"]
    }, {
        "name": "Lemon Twist",
        "colors": ["#3CA55C", "#B5AC49"]
    }, {
        "name": "Horizon",
        "colors": ["#003973", "#E5E5BE"]
    }, {
        "name": "Rose Water",
        "colors": ["#E55D87", "#5FC3E4"]
    }, {
        "name": "Frozen",
        "colors": ["#403B4A", "#E7E9BB"]
    }, {
        "name": "Mango Pulp",
        "colors": ["#F09819", "#EDDE5D"]
    }, {
        "name": "Bloody Mary",
        "colors": ["#FF512F", "#DD2476"]
    }, {
        "name": "Aubergine",
        "colors": ["#AA076B", "#61045F"]
    }, {
        "name": "Aqua Marine",
        "colors": ["#1A2980", "#26D0CE"]
    }, {
        "name": "Sunrise",
        "colors": ["#FF512F", "#F09819"]
    }, {
        "name": "Purple Paradise",
        "colors": ["#1D2B64", "#F8CDDA"]
    }, {
        "name": "Sea Weed",
        "colors": ["#4CB8C4", "#3CD3AD"]
    }, {
        "name": "Pinky",
        "colors": ["#DD5E89", "#F7BB97"]
    }, {
        "name": "Cherry",
        "colors": ["#EB3349", "#F45C43"]
    }, {
        "name": "Mojito",
        "colors": ["#1D976C", "#93F9B9"]
    }, {
        "name": "Juicy Orange",
        "colors": ["#FF8008", "#FFC837"]
    }, {
        "name": "Mirage",
        "colors": ["#16222A", "#3A6073"]
    }, {
        "name": "Steel Gray",
        "colors": ["#1F1C2C", "#928DAB"]
    }, {
        "name": "Kashmir",
        "colors": ["#614385", "#516395"]
    }, {
        "name": "Electric Violet",
        "colors": ["#4776E6", "#8E54E9"]
    }, {
        "name": "Venice Blue",
        "colors": ["#085078", "#85D8CE"]
    }, {
        "name": "Bora Bora",
        "colors": ["#2BC0E4", "#EAECC6"]
    }, {
        "name": "Moss",
        "colors": ["#134E5E", "#71B280"]
    }, {
        "name": "Shroom Haze",
        "colors": ["#5C258D", "#4389A2"]
    }, {
        "name": "Mystic",
        "colors": ["#757F9A", "#D7DDE8"]
    }, {
        "name": "Midnight City",
        "colors": ["#232526", "#414345"]
    }, {
        "name": "Sea Blizz",
        "colors": ["#1CD8D2", "#93EDC7"]
    }, {
        "name": "Opa",
        "colors": ["#3D7EAA", "#FFE47A"]
    }, {
        "name": "Titanium",
        "colors": ["#283048", "#859398"]
    }, {
        "name": "Mantle",
        "colors": ["#24C6DC", "#514A9D"]
    }, {
        "name": "Dracula",
        "colors": ["#DC2424", "#4A569D"]
    }, {
        "name": "Peach",
        "colors": ["#ED4264", "#FFEDBC"]
    }, {
        "name": "Moonrise",
        "colors": ["#DAE2F8", "#D6A4A4"]
    }, {
        "name": "Clouds",
        "colors": ["#ECE9E6", "#FFFFFF"]
    }, {
        "name": "Stellar",
        "colors": ["#7474BF", "#348AC7"]
    }, {
        "name": "Bourbon",
        "colors": ["#EC6F66", "#F3A183"]
    }, {
        "name": "Calm Darya",
        "colors": ["#5f2c82", "#49a09d"]
    }, {
        "name": "Influenza",
        "colors": ["#C04848", "#480048"]
    }, {
        "name": "Shrimpy",
        "colors": ["#e43a15", "#e65245"]
    }, {
        "name": "Army",
        "colors": ["#414d0b", "#727a17"]
    }, {
        "name": "Miaka",
        "colors": ["#FC354C", "#0ABFBC"]
    }, {
        "name": "Pinot Noir",
        "colors": ["#4b6cb7", "#182848"]
    }, {
        "name": "Day Tripper",
        "colors": ["#f857a6", "#ff5858"]
    }, {
        "name": "Namn",
        "colors": ["#a73737", "#7a2828"]
    }, {
        "name": "Blurry Beach",
        "colors": ["#d53369", "#cbad6d"]
    }, {
        "name": "Vasily",
        "colors": ["#e9d362", "#333333"]
    }, {
        "name": "A Lost Memory",
        "colors": ["#DE6262", "#FFB88C"]
    }, {
        "name": "Petrichor",
        "colors": ["#666600", "#999966"]
    }, {
        "name": "Jonquil",
        "colors": ["#FFEEEE", "#DDEFBB"]
    }, {
        "name": "Sirius Tamed",
        "colors": ["#EFEFBB", "#D4D3DD"]
    }, {
        "name": "Kyoto",
        "colors": ["#c21500", "#ffc500"]
    }, {
        "name": "Misty Meadow",
        "colors": ["#215f00", "#e4e4d9"]
    }, {
        "name": "Aqualicious",
        "colors": ["#50C9C3", "#96DEDA"]
    }, {
        "name": "Moor",
        "colors": ["#616161", "#9bc5c3"]
    }, {
        "name": "Almost",
        "colors": ["#ddd6f3", "#faaca8"]
    }, {
        "name": "Forever Lost",
        "colors": ["#5D4157", "#A8CABA"]
    }, {
        "name": "Winter",
        "colors": ["#E6DADA", "#274046"]
    }, {
        "name": "Autumn",
        "colors": ["#DAD299", "#B0DAB9"]
    }, {
        "name": "Candy",
        "colors": ["#D3959B", "#BFE6BA"]
    }, {
        "name": "Reef",
        "colors": ["#00d2ff", "#3a7bd5"]
    }, {
        "name": "The Strain",
        "colors": ["#870000", "#190A05"]
    }, {
        "name": "Dirty Fog",
        "colors": ["#B993D6", "#8CA6DB"]
    }, {
        "name": "Earthly",
        "colors": ["#649173", "#DBD5A4"]
    }, {
        "name": "Virgin",
        "colors": ["#C9FFBF", "#FFAFBD"]
    }, {
        "name": "Ash",
        "colors": ["#606c88", "#3f4c6b"]
    }, {
        "name": "Shadow Night",
        "colors": ["#000000", "#53346D"]
    }, {
        "name": "Cherryblossoms",
        "colors": ["#FBD3E9", "#BB377D"]
    }, {
        "name": "Parklife",
        "colors": ["#ADD100", "#7B920A"]
    }, {
        "name": "Dance To Forget",
        "colors": ["#FF4E50", "#F9D423"]
    }, {
        "name": "Starfall",
        "colors": ["#F0C27B", "#4B1248"]
    }, {
        "name": "Red Mist",
        "colors": ["#000000", "#e74c3c"]
    }, {
        "name": "Teal Love",
        "colors": ["#AAFFA9", "#11FFBD"]
    }, {
        "name": "Neon Life",
        "colors": ["#B3FFAB", "#12FFF7"]
    }, {
        "name": "Man of Steel",
        "colors": ["#780206", "#061161"]
    }, {
        "name": "Amethyst",
        "colors": ["#9D50BB", "#6E48AA"]
    }, {
        "name": "Cheer Up Emo Kid",
        "colors": ["#556270", "#FF6B6B"]
    }, {
        "name": "Shore",
        "colors": ["#70e1f5", "#ffd194"]
    }, {
        "name": "Facebook Messenger",
        "colors": ["#00c6ff", "#0072ff"]
    }, {
        "name": "SoundCloud",
        "colors": ["#fe8c00", "#f83600"]
    }, {
        "name": "Behongo",
        "colors": ["#52c234", "#061700"]
    }, {
        "name": "ServQuick",
        "colors": ["#485563", "#29323c"]
    }, {
        "name": "Friday",
        "colors": ["#83a4d4", "#b6fbff"]
    }, {
        "name": "Martini",
        "colors": ["#FDFC47", "#24FE41"]
    }, {
        "name": "Metallic Toad",
        "colors": ["#abbaab", "#ffffff"]
    }, {
        "name": "Between The Clouds",
        "colors": ["#73C8A9", "#373B44"]
    }, {
        "name": "Crazy Orange I",
        "colors": ["#D38312", "#A83279"]
    }, {
        "name": "Hersheys",
        "colors": ["#1e130c", "#9a8478"]
    }, {
        "name": "Talking To Mice Elf",
        "colors": ["#948E99", "#2E1437"]
    }, {
        "name": "Purple Bliss",
        "colors": ["#360033", "#0b8793"]
    }, {
        "name": "Predawn",
        "colors": ["#FFA17F", "#00223E"]
    }, {
        "name": "Endless River",
        "colors": ["#43cea2", "#185a9d"]
    }, {
        "name": "Pastel Orange at the Sun",
        "colors": ["#ffb347", "#ffcc33"]
    }, {
        "name": "Twitch",
        "colors": ["#6441A5", "#2a0845"]
    }, {
        "name": "Instagram",
        "colors": ["#517fa4", "#243949"]
    }, {
        "name": "Flickr",
        "colors": ["#ff0084", "#33001b"]
    }, {
        "name": "Vine",
        "colors": ["#00bf8f", "#001510"]
    }, {
        "name": "Turquoise flow",
        "colors": ["#136a8a", "#267871"]
    }, {
        "name": "Portrait",
        "colors": ["#8e9eab", "#eef2f3"]
    }, {
        "name": "Virgin America",
        "colors": ["#7b4397", "#dc2430"]
    }, {
        "name": "Koko Caramel",
        "colors": ["#D1913C", "#FFD194"]
    }, {
        "name": "Fresh Turboscent",
        "colors": ["#F1F2B5", "#135058"]
    }, {
        "name": "Green to dark",
        "colors": ["#6A9113", "#141517"]
    }, {
        "name": "Ukraine",
        "colors": ["#004FF9", "#FFF94C"]
    }, {
        "name": "Curiosity blue",
        "colors": ["#525252", "#3d72b4"]
    }, {
        "name": "Dark Knight",
        "colors": ["#BA8B02", "#181818"]
    }, {
        "name": "Piglet",
        "colors": ["#ee9ca7", "#ffdde1"]
    }, {
        "name": "Lizard",
        "colors": ["#304352", "#d7d2cc"]
    }, {
        "name": "Sage Persuasion",
        "colors": ["#CCCCB2", "#757519"]
    }, {
        "name": "Between Night and Day",
        "colors": ["#2c3e50", "#3498db"]
    }, {
        "name": "Timber",
        "colors": ["#fc00ff", "#00dbde"]
    }, {
        "name": "Passion",
        "colors": ["#e53935", "#e35d5b"]
    }, {
        "name": "Clear Sky",
        "colors": ["#005C97", "#363795"]
    }, {
        "name": "Master Card",
        "colors": ["#f46b45", "#eea849"]
    }, {
        "name": "Back To Earth",
        "colors": ["#00C9FF", "#92FE9D"]
    }, {
        "name": "Deep Purple",
        "colors": ["#673AB7", "#512DA8"]
    }, {
        "name": "Little Leaf",
        "colors": ["#76b852", "#8DC26F"]
    }, {
        "name": "Netflix",
        "colors": ["#8E0E00", "#1F1C18"]
    }, {
        "name": "Light Orange",
        "colors": ["#FFB75E", "#ED8F03"]
    }, {
        "name": "Green and Blue",
        "colors": ["#c2e59c", "#64b3f4"]
    }, {
        "name": "Poncho",
        "colors": ["#403A3E", "#BE5869"]
    }, {
        "name": "Back to the Future",
        "colors": ["#C02425", "#F0CB35"]
    }, {
        "name": "Blush",
        "colors": ["#B24592", "#F15F79"]
    }, {
        "name": "Inbox",
        "colors": ["#457fca", "#5691c8"]
    }, {
        "name": "Purplin",
        "colors": ["#6a3093", "#a044ff"]
    }, {
        "name": "Pale Wood",
        "colors": ["#eacda3", "#d6ae7b"]
    }, {
        "name": "Haikus",
        "colors": ["#fd746c", "#ff9068"]
    }, {
        "name": "Pizelex",
        "colors": ["#114357", "#F29492"]
    }, {
        "name": "Joomla",
        "colors": ["#1e3c72", "#2a5298"]
    }, {
        "name": "Nighthawk",
        "colors": ["#2980b9", "#2c3e50"]
    }];

    function getGradient(name) {
        return gradients.filter(function(gradient) {
            return gradient.name === name;
        })[0];
    }

    function getGradientByName(name) {
        return gradients.filter(function(gradient) {
            return gradient.name === name;
        })[0];
    }

    function getRandomGradient() {
        return gradients[Math.floor(Math.random() * gradients.length)].colors;
    }

    return {
        getGradient: getGradient,
        getGradientByName: getGradientByName,
        getRandomGradient: getRandomGradient
    }
});

app.animation('.slide-animation', function($window) {
    return {
        enter: function(element, done) {
            var startPoint = $window.innerWidth * 0.05,
                tl = new TimelineLite();

            tl.fromTo(element.find('.title'), 1, {
                    left: 50,
                    alpha: 0,
                    delay: .30
                }, {
                    left: 50,
                    alpha: 1,
                    delay: .30
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
                });
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


app.directive('slideContainerStyler', function(GradientService) {
    var directive = {};

    directive.restrict = 'E';

    directive.compile = function(element, attributes) {
        var colors = GradientService.getRandomGradient();

        function getBackgroundStyle(colors) {
            return "\"background: linear-gradient(to top left," + colors[0] + ", " + colors[1] + ");\"";
        }
        var linkFunction = function($scope, element, attributes) {
            element.html("<div style=" + getBackgroundStyle($scope.slide.colors) + " class='slide-animation flex-contain " + "' slide-animation> <div class='title' titleresizer><span> <div class='title' titleresizer><span>" + $scope.slide.headline + "</span></div></span></div></div>");
        }

        return linkFunction;
    }

    return directive;

});

app.directive('placeholderSlide', function(GradientService) {
    var directive = {};

    directive.restrict = 'E';

    directive.compile = function(element, attributes) {


        function getPlaceholderBackground(colors) {
            return "\"background: linear-gradient(to top left,#457fca,#5691c8);\"";
        }

        var linkFunction = function($scope, element, attributes) {
            element.html("<div style=" + getPlaceholderBackground() + " class='slide-animation flex-contain " + "' slide-animation> <div class='title' titleresizer><span> <div class='title' titleresizer><span>You don't have any signs right now. You should add one!</span></div></span></div></div>");
        }

        return linkFunction;
    }

    return directive;

});
