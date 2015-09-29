package com.vzw.wallet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vzw.wallet.model.Offers;
import com.vzw.wallet.model.Response;
import com.vzw.wallet.model.User;
import com.vzw.wallet.repo.OffersDao;
import com.vzw.wallet.util.Utils;
import com.vzw.wallet.util.Constants;

@Service("OffersService")
public class OffersService {
	
	@Autowired 
	private Utils utils;

	@Autowired
	private UserService userService;
	
	@Autowired
	private OffersDao offersDao;

	@Transactional
	public Response getOffers() {
		Response response = new Response();
		User user = this.getCurrentUser();
		
		if (user == null) {
			response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
		}
		else {
			response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
			response.setOffers(this.offersDao.getOffers());
		}
		
		return response;
	}
	
	@Transactional
	public Response createOffers(Offers offers){
		Response response = new Response();
		
		try {
			this.offersDao.saveOrUpdateOffers(offers);
			response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
		}
		catch(Exception e){
			response = this.utils.getResponse(Constants.ERROR_CODE_UNABLE_CREATE_OFFERS, "ERROR_CODE_UNABLE_CREATE_OFFERS");
		}
		
		return response;
	}
	
	private User getCurrentUser(){
		return this.userService.getUserFromSession();
	}
}
