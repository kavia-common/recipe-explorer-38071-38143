(function () {
  'use strict';

  // PUBLIC_INTERFACE
  function initSignInScreen() {
    /** Initialize interactions for the Sign In screen (click + keyboard). */
    var btn = document.getElementById('big-button-54-668');
    if (btn) {
      var onAction = function (e) {
        console.log('Sign In clicked');
      };
      btn.addEventListener('click', onAction);
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onAction(e);
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSignInScreen);
  } else {
    initSignInScreen();
  }
})();
