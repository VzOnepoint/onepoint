package com.vzw.wallet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="payee")
public class Payee {

	private static final long serialVersionUID = 1L;
	
	@Id	
	@Column(nullable=false)
	@GeneratedValue(strategy=GenerationType.TABLE)
	private int id;

	@Column(nullable=false, length=10)
	String mdn;

	@NotEmpty
	@Length(min=5, max=50)
	@Column(nullable=false, length=50)
	String payeeName;

	@Length(max=150)
	@Column(nullable=true, length=150)
	String description;

	@NotEmpty
	@Length(min=10, max=50)
	@Column(nullable=false, length=50)	
	String accountNumber;
	
	@Column(nullable=false)	
	boolean mdnAccount;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMdn() {
		return mdn;
	}

	public void setMdn(String mdn) {
		this.mdn = mdn;
	}

	public String getPayeeName() {
		return payeeName;
	}

	public void setPayeeName(String payeeName) {
		this.payeeName = payeeName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public boolean isMdnAccount() {
		return mdnAccount;
	}

	public void setMdnAccount(boolean mdnAccount) {
		this.mdnAccount = mdnAccount;
	}
}
