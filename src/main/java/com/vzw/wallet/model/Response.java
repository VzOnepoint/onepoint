package com.vzw.wallet.model;

import java.util.List;


public class Response {
	
	int errorCode;
	
	String errorMessage;
	
	User user;
	
	Account account;
	
	Loyalty loyalty;
	
	List<Offers> offers;
	
	List<Payee> payees;
	
	List<Transactions> transactions;
	
	List<VzFieldError> errors;

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Loyalty getLoyalty() {
		return loyalty;
	}

	public void setLoyalty(Loyalty loyalty) {
		this.loyalty = loyalty;
	}

	public List<Offers> getOffers() {
		return offers;
	}

	public void setOffers(List<Offers> offers) {
		this.offers = offers;
	}

	public List<Payee> getPayees() {
		return payees;
	}

	public void setPayees(List<Payee> payee) {
		this.payees = payee;
	}

	public List<Transactions> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transactions> transactions) {
		this.transactions = transactions;
	}

	public List<VzFieldError> getErrors() {
		return errors;
	}

	public void setErrors(List<VzFieldError> errors) {
		this.errors = errors;
	}
}
