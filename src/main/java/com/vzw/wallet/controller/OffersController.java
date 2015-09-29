package com.vzw.wallet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.vzw.wallet.model.Offers;
import com.vzw.wallet.model.Response;
import com.vzw.wallet.services.OffersService;

@RestController("OffersController")
@RequestMapping("/offers")
public class OffersController {

	@Autowired
	OffersService offersService;

	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public ResponseEntity<?> loadCash(){	
		return new ResponseEntity<Response>(this.offersService.getOffers(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Offers offers){	
		return new ResponseEntity<Response>(this.offersService.createOffers(offers), HttpStatus.OK);
	}

}
