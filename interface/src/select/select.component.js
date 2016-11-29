let wsSelect = {
    templateUrl: 'src/select/select.html',
    bindings: {
        question: '<',
    },
};

angular
    .module('ws.ui.select', [])
    .component('wsSelect', wsSelect);
