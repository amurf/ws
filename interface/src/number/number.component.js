let wsNumber = {
    templateUrl: 'src/number/number.html',
    controllerAs: 'ws',
    bindings: {
        question: '<',
    },
};

angular
    .module('ws.ui.number', [])
    .component('wsNumber', wsNumber);
