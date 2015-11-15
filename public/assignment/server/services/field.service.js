"use strict";

module.exports = function(app, formModel, db){
	app.get("/api/assignment/form/:formId/field", getFormFields);
	app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
	app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
	app.post("/api/assignment/form/:formId/field", createField);
	app.put("/api/assignment/form/:formId/field/:fieldId", updateField);

	function updateField(req, res, next){
		var inputField = req.body || {};
		var formId = req.params.formId, fieldId = req.params.fieldId;
		formModel.findFormById(formId)
		.then(function(requiredForm){
			requiredForm = requiredForm || {};
			fields = requiredForm.fields || [];
			fields.forEach(function(field, index){
				if (fieldId == field.id){
					field = inputField;
				}
			});
			requiredForm.fields = fields || [];
			formModel.updateForm(formId, requiredForm)
			.then(function(updatedForm){
				res.json(inputField);
			});
		})
		.catch(function(error){
			console.log('updateForm error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function createField(req, res, next){
		var queryFormModel = formModel;
		var field = req.body || {};
		field.id = guid();
		var formId = req.params.formId;
		formModel.findFormById(formId)
		.then(function(requiredForm){
			requiredForm = requiredForm || {};
			requiredForm.fields = requiredForm.fields || [];
			requiredForm.fields.push(field);
			formModel.updateForm(formId, requiredForm)
			.then(function(updatedForm){
				var newFields = updatedForm.fields || [];
				console.log(newFields);
				res.json(newFields);
			});
		})
		.catch(function(error){
			console.log('createField error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function deleteFieldById(req, res, next){
		var formId = req.params.formId, fieldId = req.params.fieldId;
		formModel.findFormById(formId)
		.then(function(requiredForm){
			requiredForm = requiredForm || {};
			var fields = requiredForm.fields || [];
			var remainingFields = [];
			fields.forEach(function(field, index){
				if (fieldId == field.id){
					fields.splice(index, 1);
				} else {
					remainingFields.push(field);
				}
			});
			requiredForm.fields = remainingFields;
			formModel.updateForm(formId, requiredForm)
			.then(function(updatedForm){
				res.json(remainingFields);
			});
		})
		.catch(function(error){
			console.log('deleteFieldById error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getFieldById(req, res, next){
		var formId = req.params.formId, fieldId = req.params.fieldId;
		formModel.findFormById(formId)
		.then(function(requiredForm){
			requiredForm = requiredForm || {};
			var fields = requiredForm.fields || [];
			var requiredField;
			fields.forEach(function(field, index){
				if (fieldId == field.id){
					requiredField = field;
				}
			});
			if (requiredField){
				res.json(fields);
			} else {
				res.status(400).send("no field found with id:"+fieldId);	
			}
		})
		.catch(function(error){
			console.log('getFieldById error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	function getFormFields(req, res, next){
		var formId = req.params.formId;
		formModel.findFormById(formId)
		.then(function(requiredForm){
			requiredForm = requiredForm || {};
			var fields = requiredForm.fields || [];
			res.json(fields);
		})
		.catch(function(error){
			console.log('getFormFields error', JSON.stringify(error));
			res.status(400).send(JSON.stringify(error));
		});
	}

	/**
	 * [guid generates a unique id]
	 * @return String [a unique id]
	 */
	 function guid() {
	 	function s4() {
	 		return Math.floor((1 + Math.random()) * 0x10000)
	 		.toString(16)
	 		.substring(1);
	 	}
	 	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	 	s4() + '-' + s4() + s4() + s4();
	 }
};