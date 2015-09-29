package com.vzw.wallet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="loyalty")
public class Loyalty {

	private static final long serialVersionUID = 1L;
	
	@NotEmpty
	@Length(min=10, max=10)
	@Id @Column(nullable=false, length=10)
	String mdn;

	@Column(nullable=false)
	float balance;

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
}
