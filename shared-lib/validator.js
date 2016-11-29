var isAngular = (typeof angular !== 'undefined');
(function(_) {
    function Validator() {
        const validatorsFor = {
            number: [ 'isNotEmpty', 'isNumber' ],
            select: [ 'isNotEmpty' ],
        };

        const validatorEnv = {
            'isNotEmpty': {
                'check': (value) => !_.isNil(value),
                'msg':   "Is required",
            },
            'isNumber': {
                'check':  _.isNumber,
                'msg':   "Must be a number",
            },
        };

        let exports = {};
        _.extend(exports, {
            validateModel: validateModel,
        });

        return exports;

        function validateModel(questions) {
            function doValidate(value) {
                return function(result, validatorName) {
                    let validator;
                    if (validatorEnv.hasOwnProperty(validatorName)) {
                        validator = validatorEnv[validatorName];
                    } else if (_.isObject(validatorName)) {
                        validator = validatorName;
                    } else {
                        console.warn("validator doesn't exist " + validatorName);
                        return result;
                    }

                    if (!validator.check(value)) {
                        result.push(validator.msg);
                    }

                    return result;
                }
            }

            let modelErrors = {};
            for (let question of questions) {
                let validators = question.validators || validatorsFor[question.type];
                let validate   = doValidate(question.value);
                let errors     = validators.reduce(validate, []);

                if (errors.length) {
                    modelErrors[question.name] = errors;
                }
            }
            return modelErrors;
        }
    }

    /* Return module for frontend/backend */
    if (isAngular) {
        angular.module('ws.ui').factory('Validator', Validator);
    } else {
        module.exports = Validator();
    }
}(isAngular ? _ : require('lodash')));
