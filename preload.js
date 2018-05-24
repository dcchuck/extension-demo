/*
    This file can be includes as a preload to force load this application if it's not deployed to your POD
    Users will see a warning about untrusted applications, which is standard for non-deployed applications
    Deploying this application to your pod will remove the warning and make this functionality accesible via Symphony Market
*/

window.addEventListener('load', () => {
    function loadBundleIfNotPresent() {
        let cookies = document.cookie.split(';');
        let appLoaded = false;
        cookies.forEach(cookie => {
            let strippedCookie = cookie.replace(/\s/g, '');
            if (strippedCookie === 'extensionLoaded=true') {
                appLoaded = true;
            }
        });
        if (!appLoaded && (window.location.pathname === '/client/index.html')) {
            document.cookie = 'extensionLoaded=true';
            window.location.href = window.location.href + 'bundle=https://dcchuck.github.io/extension-demo/extension/demo.json'
        }
    }

    loadBundleIfNotPresent();
});