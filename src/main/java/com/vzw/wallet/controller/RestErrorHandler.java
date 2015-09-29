package com.vzw.wallet.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.vzw.wallet.util.Utils;
import com.vzw.wallet.util.Constants;
import com.vzw.wallet.model.Response;
import com.vzw.wallet.model.VzFieldError;

@ControllerAdvice
public class RestErrorHandler {
	
	@Autowired 
	private Utils utils;

	@Autowired
    private MessageSource messageSource;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public Response handleException(MethodArgumentNotValidException ex) {
    	Response response = this.utils.getResponse(Constants.ERROR_CODE_FIELD_ERRORS, "ERROR_CODE_FIELD_ERRORS");
    	List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
	    List<ObjectError> globalErrors = ex.getBindingResult().getGlobalErrors();
	    List<VzFieldError> errors = new ArrayList<VzFieldError>();
	    Locale currentLocale =  LocaleContextHolder.getLocale();
	    String error;
	    
	    for (FieldError fieldError : fieldErrors) {
	    	String msgProp = fieldError.getObjectName() + "." + fieldError.getField() + "." + fieldError.getCode();
	    	String localizedErrorMessage = messageSource.getMessage(msgProp, null, currentLocale);
	        error =  (localizedErrorMessage == null) ? msgProp + ", " + fieldError.getDefaultMessage() : localizedErrorMessage;
	        VzFieldError vzfieldError = new VzFieldError(fieldError.getField(), error);
	        errors.add(vzfieldError);
	    }

	    for (ObjectError objectError : globalErrors) {
	        errors.add(new VzFieldError(objectError.getObjectName(), objectError.getDefaultMessage()));
	    }
	    
	    response.setErrors(errors);
	    return response;
	}
}