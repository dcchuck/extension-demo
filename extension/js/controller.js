/* global SYMPHONY */
const salesDemoControllerService = SYMPHONY.services.register('sales-demo:controller');

// Currently in another symphony-of brnahc
// When this is deployed to prod we will use the symphony-of window to call the parent
window.httpGet = url => {
    return new Promise(resolve => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                resolve(JSON.parse(xmlHttp.responseText));
            }
        };
        xmlHttp.open('GET', url, true);
        xmlHttp.setRequestHeader('Content-type', 'application/json'); 
        xmlHttp.send(null);
    });
};

SYMPHONY.remote.hello().then(function (data) {

    SYMPHONY.application.register('sales-demo', ['ui'], ['sales-demo:controller']).then(function (response) {

        const uiService = SYMPHONY.services.subscribe('ui');

        uiService.registerExtension('cashtag', 'sales-demo-cashtag', 'sales-demo:controller', {label: 'Send Ticker'});

        salesDemoControllerService.implement({
            trigger: function(uiClass, id, payload, data) {
                if(uiClass === 'cashtag') {
                    let cashtagValue = payload.entity.name.slice(1);
                    var payload = {
                        entity: 'ticker',
                        value: cashtagValue
                    }
                    fin.desktop.InterApplicationBus.publish('ticker-updated', payload);
                    console.log(`The value of the cashtage is ${cashtagValue}`);
                }
            }
        });
        // TODO - use parent app implementation (See above) - we will need to be retrieving the pod URL in the parent version to do so
        function findUserById(userId) {
            return window.httpGet(`https://openfin.symphony.com/pod/v2/user/?uid=${userId}`);
        }
    }.bind(this));
}.bind(this));
