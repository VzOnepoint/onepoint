package com.vzw.wallet.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="account")
public class Account {

	private static final long serialVersionUID = 1L;
	
	@NotEmpty
	@Length(min=10, max=10) //make mdn is 10 digits
	@Id @Column(nullable=false, length=10)
	String mdn;
	
	@Column(nullable=false)
	float balance;
	
	@Column(nullable=true)
	Date lastIntrestDate;

	public String getMdn() {
		return mdn;
	}

	public void setMdn(String mdn) {
		this.mdn = mdn;
	}

	public float getBalance() {
		return balance;
	}

	public void setBalance(float balance) {
		this.balance = balance;
	}

	public Date getLastIntrestDate() {
		return lastIntrestDate;
	}

	public void setLastIntrestDate(Date lastIntrestDate) {
		this.lastIntrestDate = lastIntrestDate;
	}
}
