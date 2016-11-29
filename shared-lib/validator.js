var isAngular = (typeof exports === 'undefined');
(function(_) {
	/* Example
	const customValidator = {
		check: () => !(questions[0].value == questions[1].value),
		msg:   "Must not be the same",
	}; */

	function validateModel(questions) {
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

    let exports;
    if (isAngular) {
        exports = {};
    } else {
        exports = module.exports = {};
    }

    _.extend(exports, {
        validateModel: validateModel,
    });

    if (isAngular) {
        angular.module('ws.ui').factory('Validator', function() {
            return exports;
        });
    }
}(isAngular ? _ : require('lodash')));
