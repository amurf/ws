let wsQuestionErrors = {
    templateUrl: 'src/question-errors/question-errors.html',
    controllerAs: 'ws',
    bindings: {
        question: '<',
    },
};

angular
    .module('ws.ui.question-errors', [])
    .component('wsQuestionErrors', wsQuestionErrors);
