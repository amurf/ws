let wsPage = {
    templateUrl: 'src/page/page.html',
    controllerAs: 'ws',
    controller: 'PageController',
    bindings: {
        questions: '<',
        pageName:  '<',
    },
};

angular
    .module('ws.ui.page', [])
    .component('wsPage', wsPage);
