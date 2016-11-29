// Define the `ws.ui` module
angular.module('ws.ui', [
    'ws.ui.page',
    'ws.ui.question',
    'ws.ui.question-errors',
    'ws.ui.select',
    'ws.ui.number',
]);

angular
    .module('ws.ui')
    .controller('TheController', ['Survey', '$scope', '$http', TheController]);

function TheController(Survey, $scope, $http) {
    angular.extend($scope, {
        config:            Survey.config,
        pages:             Survey.pages,

        validateModel:     validator.validateModel,

        validatePage:      validatePage,
        validateQuestions: validateQuestions,

        questions:         Survey.questions,
        questionsByName:   Survey.questionsByName,
        questionsForPage:  Survey.questionsForPage,
    });

    function doValidation(questions) {
        $http.put('http://localhost:8080/validate', {questions: questions}).then(function(response) {
            let errors = response.data;
            questions.forEach(function(question) {
                if (errors[question.name]) {
                    question.errors = errors[question.name];
                } else {
                    delete question.errors;
                }
            });
        });
    }

    function validatePage(page) {
        doValidation(Survey.questionsForPage(page));
    }

    function validateQuestions(questions) {
        doValidation(questions);
    }

    $scope.currentPage = Survey.config.firstPage;
}

angular
    .module('ws.ui')
    .factory('Survey', Survey);

function Survey() {
    let service = {};

    let config = {
        firstPage: 'start',
    };

    let survey = {
        start: [
            {
                type: 'select',
                label: 'First Question',
                name: 'question_one',
                options: [
                    'One',
                    'Two',
                    'Three',
                ],
            },
            {
                type: 'select',
                label: 'Second Question',
                name: 'question_two',
                instructions: 'You should probably fill this out after the first question',
                options: [
                    'Four',
                    'Five',
                    'Six',
                ],
            },
        ],
        second: [
            {
                type: 'number',
                label: 'Third Question',
                name: 'question_three',
                showValue: true,
                value: 5,
            },
            {
                type: 'number',
                label: 'Fourth Question',
                name: 'question_four',
                lessThan: 'question_three',
                showValue: true,
            },
        ],
    };

    let questions       = _.flatten(_.valuesIn(survey));
    let pages           = _.keysIn(survey);
    let questionsByName = _.keyBy(questions, 'name');

    angular.extend(service, {
        config:            config,
        pages:             pages,
        questions:         questions,
        questionsByName:   questionsByName,
        questionsForPage:  questionsForPage,
    });

    return service;

    function questionsForPage(page)  {
        return survey[page];
    }

}
