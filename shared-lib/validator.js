var isAngular = (typeof exports === 'undefined');

(function(_, exports){
	// Example
	const customValidator = {
		check: () => !(questions[0].value == questions[1].value),
		msg:   "Must not be the same",
	};

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

	function validateModel(questions) {
		function doValidate(value) {
			return function(result, validatorName) {
				let validator;
				if (validatorEnv.hasOwnProperty(validatorName)) {
					validator = validatorEnv[validatorName];
				} else if (_.isObject(validatorName)) {
					validator = validatorName;
				} else if (_.hasOwnProperty(validatorName)) {
					validator = {
						check: _[validatorName],
						msg: 'Validator: ' + validatorName,
					};
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

	/*
	let result = validateModel(questions);
	*/


	exports.validateModel = validateModel;
}(isAngular ? _ : require('lodash'), isAngular ? this.validator = {} : exports));

