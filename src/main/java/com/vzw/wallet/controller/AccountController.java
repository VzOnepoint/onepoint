package com.vzw.wallet.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.vzw.wallet.model.User;
import com.vzw.wallet.model.Response;
import com.vzw.wallet.services.UserService;

@RestController("AccountController")
@RequestMapping("/account")
public class AccountController {
	
	@Autowired
	UserService userService;

	@RequestMapping(value = "/get/{mdn}", method = RequestMethod.GET)
	public ResponseEntity<?> getUser(@PathVariable String mdn){	
		System.out.println("Get MDN...");
		return new ResponseEntity<Response>(userService.getUserByMdn(mdn), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> createUser(@Valid @RequestBody User user){		
		return new ResponseEntity<Response>(userService.createUser(user), HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<?> loginUser(@RequestBody User user){		
		return new ResponseEntity<Response>(userService.loginUser(user), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getLoggedIn", method = RequestMethod.GET)
	public ResponseEntity<?> getLoggedInUser(){		
		return new ResponseEntity<Response>(userService.getLoggedInUser(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public ResponseEntity<?> logoutUser(){		
		return new ResponseEntity<Response>(userService.logoutUser(), HttpStatus.OK);
	}
}