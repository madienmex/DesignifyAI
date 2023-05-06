// Initialize the Facebook SDK
window.fbAsyncInit = function () {
    FB.init({
        appId: '169539095747203',
        cookie: true,
        xfbml: true,
        version: 'v12.0',
    });

    FB.AppEvents.logPageView();
};
