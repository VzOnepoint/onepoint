package com.vzw.wallet.util;

public class Constants {
	
	public static final int ERROR_CODE_SUCCESS = 0; //success
	public static final int ERROR_CODE_FAILURE = 1; //failure
	public static final int ERROR_CODE_NOT_LOGGED_IN = 2; //not logged in
	public static final int ERROR_CODE_NOT_REGISTERED = 3; //not registered
	public static final int ERROR_CODE_UNABLE_REGISTERED = 4; //unable to registered
	public static final int ERROR_CODE_CASH_NOT_LOADED = 5; //unable to load cash
	public static final int ERROR_CODE_INVALID_AMOUNT = 6; //invalid amount
	public static final int ERROR_CODE_INVALID_PIN = 7; //invalid pin
	public static final int ERROR_CODE_MDN_NOT_REGISTERED_FOR_ONEPOINT_PAYMENT = 8; //payee mdn not registered
	public static final int ERROR_CODE_UNABLE_PAYEE_REGISTRATION = 9; //unable to register payee
	public static final int ERROR_CODE_FIELD_ERRORS = 10; //unable to register payee
	public static final int ERROR_CODE_INVALID_PAYEE_ID = 11; //invalid payee
	public static final int ERROR_CODE_UNABLE_TO_TRANSFER = 12; //unable to transfer
	public static final int ERROR_CODE_TRANSFER_INSUFFICIENT_BALANCE = 13; //Insufficient Balance
	public static final int ERROR_CODE_UNABLE_TO_PAY_BILL = 14; //unable to pay bill
	public static final int ERROR_CODE_UNABLE_ENCASH_POINTS = 15; //unable to encash points
	public static final int ERROR_CODE_MIN_LOYALTY_POINTS = 16; //unable to encash min loyalty points
	public static final int ERROR_CODE_UNABLE_CREATE_OFFERS = 17; //unable to create users
	
	public static final String CURRENT_LOGGED_IN_USER = "currentUser";
	
}
