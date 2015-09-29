package com.vzw.wallet.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

import com.vzw.wallet.model.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import com.vzw.wallet.util.Constants;
import com.vzw.wallet.repo.CoreBankingDao;
import com.vzw.wallet.model.Account;
import com.vzw.wallet.model.Loyalty;
import com.vzw.wallet.model.Payee;
import com.vzw.wallet.model.Response;
import com.vzw.wallet.model.Transactions;
import com.vzw.wallet.model.User;
import com.vzw.wallet.util.Utils;

@Service("CoreBankingService")
public class CoreBankingService {
	
	private static final float LOYALTY_POINTS_PERCENTAGE_CALCULATION = 1.0f;
	
	private static final float MIN_LOYALTY_POINTS_TO_ENCASH = 5.0f;

	@Autowired 
	private Utils utils;

	@Autowired
	private UserService userService;

	@Autowired
	private CoreBankingDao coreBankingDao;

	@Transactional
	public Response loadCash(float amount) {
		Response response = new Response();
		User user = this.getCurrentUser();
		
		if (user == null) {
			response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
		}
		else if(amount > 0) {
			Account account = this.coreBankingDao.getAccountByMdn(user.getMdn());
			account.setMdn(user.getMdn());
			account.setBalance(account.getBalance() +  amount);
			
			if(this.coreBankingDao.saveOrUpdateAccount(account)) {
				this.addTransactions(user, this.utils.getMessage("MSG_CASH_CREDITED"), this.utils.getMessage("MSG_CASH_CREDITED_FROM_BANK"), amount, false);
				response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
				response.setAccount(account);
			}
			else {
				response = this.utils.getResponse(Constants.ERROR_CODE_CASH_NOT_LOADED, "ERROR_CODE_CASH_NOT_LOADED");
			}
		}
		else {
			response = this.utils.getResponse(Constants.ERROR_CODE_INVALID_AMOUNT, "ERROR_CODE_INVALID_AMOUNT");
		}
		
		return response;
	}
	
	@Transactional
	public Response getBalance() {
		Response response = new Response();
		User user = this.getCurrentUser();
		
		if (user == null) {
			response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
		}
		else {
			response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
			response.setAccount(this.coreBankingDao.getAccountByMdn(user.getMdn()));
		}
		
		return response;
	}
	
	
	@Transactional
	public Response registerPayee(Payee payee) {
		Response response = new Response();
		
		try{
			User user = this.getCurrentUser();
			
			if (user == null) {
				response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
			}
			else {
				
				boolean isValidPayee = false;
				
				//if the registered payee is mdn based need to verify if the payee is registered user 
				if(payee.isMdnAccount()) {
					Response userServiceResponse = this.userService.getUserByMdn(user.getMdn());
					isValidPayee = (userServiceResponse.getErrorCode() == Constants.ERROR_CODE_SUCCESS && user.getMdn() != payee.getAccountNumber());
				}
				else 
					isValidPayee = true;
				
				if(isValidPayee) {
					payee.setMdn(user.getMdn());
					
					if(this.coreBankingDao.saveOrUpdatePayee(payee)) { 			
						response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
						List<Payee> payeeList = new ArrayList<Payee>();
						payeeList.add(payee);
						response.setPayees(payeeList);
					}
					else {
						response = this.utils.getResponse(Constants.ERROR_CODE_UNABLE_PAYEE_REGISTRATION, "ERROR_CODE_UNABLE_PAYEE_REGISTRATION");
					}
				}
				else {
					response = this.utils.getResponse(Constants.ERROR_CODE_MDN_NOT_REGISTERED_FOR_ONEPOINT_PAYMENT, "ERROR_CODE_MDN_NOT_REGISTERED_FOR_ONEPOINT_PAYMENT");				
				}
			}
		}
		catch(Exception e){
			response = this.utils.getResponse(Constants.ERROR_CODE_MDN_NOT_REGISTERED_FOR_ONEPOINT_PAYMENT, "ERROR_CODE_MDN_NOT_REGISTERED_FOR_ONEPOINT_PAYMENT");
		}
				
		return response;
	}
	
	@Transactional
	public Response getPayees() {
		Response response = new Response();
		User user = this.getCurrentUser();
		
		if (user == null) {
			response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
		}
		else {
			response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
			response.setPayees(this.coreBankingDao.getPayeesByMdn(user.getMdn()));
		}
		
		return response;
	}
	
	@Transactional
	public Response transfer(int payeeId, float amount) {
		Response response = new Response();
		
		try{
			User user = this.getCurrentUser();
			
			if (user == null) {
				response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
			}
			else {
				if(amount > 0) {
					Payee payee = this.coreBankingDao.getPayeeById(payeeId);
					
					if(payee == null || !payee.getMdn().equals(user.getMdn())) {
						response = this.utils.getResponse(Constants.ERROR_CODE_INVALID_PAYEE_ID, "ERROR_CODE_INVALID_PAYEE_ID");
					}
					else {
						Account account = this.coreBankingDao.getAccountByMdn(user.getMdn());
						float userBalance = account.getBalance();
						
						if(userBalance >= amount) {
							Account payeeAccount = this.coreBankingDao.getAccountByMdn(payee.getAccountNumber());
							payeeAccount.setBalance(payeeAccount.getBalance() + amount);
							account.setBalance(account.getBalance() - amount);
							
							if(this.coreBankingDao.saveOrUpdateAccount(account) && this.coreBankingDao.saveOrUpdateAccount(payeeAccount)) { 
								this.addTransactions(user, payee.getPayeeName(), payee.getDescription(), amount, true);
								this.calculateLoyaltyPoints(user, amount);
								response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
								response.setAccount(account);
							}
							else {
								response = this.utils.getResponse(Constants.ERROR_CODE_UNABLE_TO_TRANSFER, "ERROR_CODE_UNABLE_TO_TRANSFER");
							}
						}
						else {
							response = this.utils.getResponse(Constants.ERROR_CODE_TRANSFER_INSUFFICIENT_BALANCE, "ERROR_CODE_TRANSFER_INSUFFICIENT_BALANCE");
						}
						
					}
				}
				else {
					response = this.utils.getResponse(Constants.ERROR_CODE_INVALID_AMOUNT, "ERROR_CODE_INVALID_AMOUNT");
				}
			}
		}
		catch(Exception e){
			e.printStackTrace();
			response = this.utils.getResponse(Constants.ERROR_CODE_UNABLE_TO_TRANSFER, "ERROR_CODE_UNABLE_TO_TRANSFER");
		}
				
		return response;
	}
	
	@Transactional
	public Response payBill(Payee payee, float amount) {
		Response response = new Response();
		
		try{
			User user = this.getCurrentUser();
			
			if (user == null) {
				response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
			}
			else {
				if(amount > 0) {
					Payee verifyPayee = this.coreBankingDao.getPayeeById(payee.getId());
					
					if(verifyPayee == null || !verifyPayee.getMdn().equals(user.getMdn())) {
						response = this.utils.getResponse(Constants.ERROR_CODE_INVALID_PAYEE_ID, "ERROR_CODE_INVALID_PAYEE_ID");
					}
					else {
						Account account = this.coreBankingDao.getAccountByMdn(user.getMdn());
						float userBalance = account.getBalance();
						
						if(userBalance >= amount) {
							account.setBalance(account.getBalance() - amount);
							
							if(this.coreBankingDao.saveOrUpdateAccount(account)) { 
								this.addTransactions(user, payee.getPayeeName(), payee.getDescription(), amount, true);
								this.calculateLoyaltyPoints(user, amount);
								response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
								response.setAccount(account);
							}
							else {
								response = this.utils.getResponse(Constants.ERROR_CODE_UNABLE_TO_PAY_BILL, "ERROR_CODE_UNABLE_TO_PAY_BILL");
							}
						}
						else {
							response = this.utils.getResponse(Constants.ERROR_CODE_TRANSFER_INSUFFICIENT_BALANCE, "ERROR_CODE_TRANSFER_INSUFFICIENT_BALANCE");
						}
						
					}
				}
				else {
					response = this.utils.getResponse(Constants.ERROR_CODE_INVALID_AMOUNT, "ERROR_CODE_INVALID_AMOUNT");
				}
			}
		}
		catch(Exception e){
			e.printStackTrace();
			response = this.utils.getResponse(Constants.ERROR_CODE_UNABLE_TO_PAY_BILL, "ERROR_CODE_UNABLE_TO_PAY_BILL");
		}
				
		return response;
	}
	
	@Transactional
	public Response getTranactionStatements(){
		Response response = new Response();
		User user = this.getCurrentUser();
		
		if (user == null) {
			response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
		}
		else {
			response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
			response.setTransactions(this.coreBankingDao.getTransactionsByMdn(user.getMdn()));
		}
		
		return response;
	}
	
	
	@Transactional
	public Response getLoyaltyBalance(){
		Response response = new Response();
		User user = this.getCurrentUser();
		
		if (user == null) {
			response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
		}
		else {
			response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
			response.setLoyalty(this.coreBankingDao.getLoyaltyByMdn(user.getMdn()));
		}
		
		return response;
	}
	
	@Transactional
	public Response encashLoyaltyPoints(){
		Response response = new Response();
		User user = this.getCurrentUser();
		
		try{
			if (user == null) {
				response = this.utils.getResponse(Constants.ERROR_CODE_NOT_LOGGED_IN, "ERROR_CODE_NOT_LOGGED_IN");
			}
			else {
				Loyalty loyalty = this.coreBankingDao.getLoyaltyByMdn(user.getMdn());
				
				if(loyalty.getBalance() < MIN_LOYALTY_POINTS_TO_ENCASH) {
					response = this.utils.getResponse(Constants.ERROR_CODE_MIN_LOYALTY_POINTS, "ERROR_CODE_MIN_LOYALTY_POINTS");
				}
				else {
					Account account = this.coreBankingDao.getAccountByMdn(user.getMdn());
					float amount = loyalty.getBalance();
					account.setBalance(account.getBalance() + amount);
					loyalty.setBalance(0);
					
					if(this.coreBankingDao.saveOrUpdateAccount(account) && this.coreBankingDao.saveOrUpdateLoyalty(loyalty)) { 
						this.addTransactions(user, this.utils.getMessage("MSG_ENCASHED_POINTS"), this.utils.getMessage("MSG_ENCASHED_POINTS"), amount, false);
						response = this.utils.getResponse(Constants.ERROR_CODE_SUCCESS, "ERROR_CODE_SUCCESS");
						response.setAccount(account);
					}
					else {
						response = this.utils.getResponse(Constants.ERROR_CODE_UNABLE_ENCASH_POINTS, "ERROR_CODE_UNABLE_ENCASH_POINTS");
					}
				}
			}
		}
		catch(Exception e){
			response = this.utils.getResponse(Constants.ERROR_CODE_UNABLE_ENCASH_POINTS, "ERROR_CODE_UNABLE_ENCASH_POINTS");
		}
		
		return response;
	}

	
	@Transactional
	public void createBankingAccount(User user){
		//Create intial balance
		Account account = new Account();
		account.setMdn(user.getMdn());
		account.setBalance(0);
		this.coreBankingDao.saveOrUpdateAccount(account);
		
		//Create intial loyalty points
		Loyalty loyalty = new Loyalty();
		loyalty.setMdn(user.getMdn());
		loyalty.setBalance(0);
		this.coreBankingDao.saveOrUpdateLoyalty(loyalty);
	}
	
	@Transactional
	private void addTransactions(User user,
								String payeeName, 
								String description,
								float amount,
								boolean debit){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
		Transactions transactions = new Transactions();
		transactions.setMdn(user.getMdn());
		transactions.setPayeeName(payeeName);
		transactions.setDescription(description);
		transactions.setAmount(amount);
		transactions.setDebit(debit);
		transactions.setDate(new java.sql.Date(new Date().getTime()));
		this.coreBankingDao.saveOrUpdateTransaction(transactions);
	}
	
	@Transactional
	private void calculateLoyaltyPoints(User user, float amount){
		Loyalty loyalty = this.coreBankingDao.getLoyaltyByMdn(user.getMdn());
		loyalty.setBalance(loyalty.getBalance() + ((LOYALTY_POINTS_PERCENTAGE_CALCULATION/100f) * amount));
		this.coreBankingDao.saveOrUpdateLoyalty(loyalty);
	}

	private User getCurrentUser(){
		return this.userService.getUserFromSession();
	}
}