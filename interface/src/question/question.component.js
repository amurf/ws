let wsQuestion = {
    templateUrl: 'src/question/question.html',
    controllerAs: 'ws',
    bindings: {
        question: '<',
    },
};

angular
    .module('ws.ui.question', [])
    .component('wsQuestion', wsQuestion);
