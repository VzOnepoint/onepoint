package com.vzw.wallet.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.vzw.wallet.model.Payee;
import com.vzw.wallet.model.Response;
import com.vzw.wallet.services.CoreBankingService;

@RestController("CoreBankingController")
@RequestMapping("/banking")
public class CoreBankingController {
	
	@Autowired
	CoreBankingService coreBankingService;

	@RequestMapping(value = "/loadCash/{amount:.*}", method = RequestMethod.POST)
	public ResponseEntity<?> loadCash(@PathVariable float amount){	
		return new ResponseEntity<Response>(this.coreBankingService.loadCash(amount), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getBalance", method = RequestMethod.GET)
	public ResponseEntity<?> getBalance(){	
		return new ResponseEntity<Response>(this.coreBankingService.getBalance(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/registerPayee", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> registerPayee(@Valid @RequestBody Payee payee){	
		System.out.println("in registerPayee controller");
		return new ResponseEntity<Response>(this.coreBankingService.registerPayee(payee), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getPayees", method = RequestMethod.GET)
	public ResponseEntity<?> getPayees(){	
		return new ResponseEntity<Response>(this.coreBankingService.getPayees(), HttpStatus.OK);
	}	
	
	@RequestMapping(value = "/transfer/{id}/{amount:.*}", method = RequestMethod.POST)
	public ResponseEntity<?> transfer(@PathVariable int id, @PathVariable float amount){	
		return new ResponseEntity<Response>(this.coreBankingService.transfer(id, amount), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/payBills/{amount:.*}", method = RequestMethod.POST)
	public ResponseEntity<?> payBills(@Valid @RequestBody Payee payee, @PathVariable float amount){	
		return new ResponseEntity<Response>(this.coreBankingService.payBill(payee, amount), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getStatements", method = RequestMethod.GET)
	public ResponseEntity<?> getStatements(){	
		return new ResponseEntity<Response>(this.coreBankingService.getTranactionStatements(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getLoyaltyBalance", method = RequestMethod.GET)
	public ResponseEntity<?> getLoyaltyBalance(){	
		return new ResponseEntity<Response>(this.coreBankingService.getLoyaltyBalance(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/encashLoyaltyPoints", method = RequestMethod.GET)
	public ResponseEntity<?> encashLoyaltyPoints(){	
		return new ResponseEntity<Response>(this.coreBankingService.encashLoyaltyPoints(), HttpStatus.OK);
	}
}
