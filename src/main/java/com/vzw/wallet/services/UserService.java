package com.vzw.wallet.services;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vzw.wallet.model.Response;
import com.vzw.wallet.model.User;
import com.vzw.wallet.repo.UserDao;
import com.vzw.wallet.util.Constants;
import com.vzw.wallet.util.Utils;

@Service("UserService")
public class UserService {
	
	@Autowired
	UserDao userDao;
	
	@Autowired 
	private HttpSession httpSession;
	
	@Autowired
	private CoreBankingService coreBankingService;
	
	@Autowired 
	private Utils utils;

	@Transactional
	public Response getUserByMdn(String mdn){
		Response response = new Response();
		
		try {
			User user = this.userDao.getUserByMdn(mdn);
			
			if(user == null) {
				response = this.utils.getResponse(Constants.ERROR_CODE_NOT_REGISTERED, "ERROR_CODE_NOT_REGISTERED");
			}
			else {
				response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
				response.setUser(user);
			}
		} 
		catch(Exception e) {
			e.printStackTrace();
		}

		return response;
	}
	
	@Transactional
	public Response createUser(User user){
		Response response = new Response();
		
		try {
			user.setVzwUser(user.getMdn().startsWith("9"));
			this.userDao.insertUser(user);
			this.coreBankingService.createBankingAccount(user);
			response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
			response.setUser(user);
			this.httpSession.setAttribute(Constants.CURRENT_LOGGED_IN_USER, user);
		}
		catch(Exception e){
			response = this.utils.getResponse(Constants.ERROR_CODE_UNABLE_REGISTERED, "ERROR_CODE_UNABLE_REGISTERED");
		}
		
		return response;
	}
	
	@Transactional
	public Response loginUser(User userParam){
		Response response = new Response();
		User user = this.userDao.getUserByMdn(userParam.getMdn());
		
		if(user == null) {
			response = this.utils.getResponse(Constants.ERROR_CODE_NOT_REGISTERED, "ERROR_CODE_NOT_REGISTERED");
		}
		else {
			if(user.getPassword().equals(userParam.getPassword())) {
				response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
				response.setUser(user);
				this.httpSession.setAttribute(Constants.CURRENT_LOGGED_IN_USER, user);
			}
			else {				
				response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_INVALID_PIN");
			}
		}
				
		return response;
	}
	
	public Response getLoggedInUser(){
		Response response = new Response();
		User user = this.getUserFromSession();
		
		if(user == null) {
			response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
		}
		else {
			response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
			response.setUser(user);
		}
				
		return response;
	}
	
	public User getUserFromSession(){
		return (User) this.httpSession.getAttribute(Constants.CURRENT_LOGGED_IN_USER);
	}
	
	public Response logoutUser(){
		Response response = new Response();
		this.httpSession.invalidate();
		return this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_NOT_LOGGED_IN");
	}
}
