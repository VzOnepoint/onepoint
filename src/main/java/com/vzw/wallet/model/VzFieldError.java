package com.vzw.wallet.model;

import javax.persistence.Entity;

@Entity
public class VzFieldError {
	 
    private String field;
 
    private String message;
 
    public VzFieldError(String field, String message) {
        this.field = field;
        this.message = message;
    }

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
        
}