angular.module('Chat.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    // State to represent Login View
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl',
      resolve: {
        requireNoAuth: function($state, Auth){
          return Auth.$requireAuth().then(function(auth){
            $state.go('tab.friends');
          }, function(error){
            return;
          });
        }
      }
    })
    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html",
      resolve: {
        auth: function($state, Auth){
          return Auth.$requireAuth().catch(function(){
            $state.go('login');
          });
        },
      }
    })

    // Each tab has its own nav history stack:

    .state('tab.friends', {
          url: '/friends',
          views: {
            'tab-friends': {
              templateUrl: 'templates/tab-friends.html',
              controller: 'FriendsCtrl'
            }
          }
        })

    .state('tab.rooms', {
      url: '/rooms',
      views: {
        'tab-rooms': {
          templateUrl: 'templates/tab-rooms.html',
          controller: 'RoomsCtrl'
        }
      }
    })

    .state('tab.chat', {
      url: '/chat/:roomId',
      views: {
        'tab-chat': {
          templateUrl: 'templates/tab-chat.html',
          controller: 'ChatCtrl'
        }
      }
    })

    .state('tab.setting', {
      url: '/setting',
      views: {
        'tab-setting': {
          templateUrl: 'templates/tab-setting.html'
          // controller: 'SettingCtrl'
        }
      }
    })

    $urlRouterProvider.otherwise('/login');

});
