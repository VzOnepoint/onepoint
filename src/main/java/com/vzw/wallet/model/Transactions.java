package com.vzw.wallet.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="transactions")
public class Transactions{
	
	private static final long serialVersionUID = 1L;
	
	@Id	
	@Column(nullable=false)
	@GeneratedValue(strategy=GenerationType.TABLE)
	private int id;
	
	@NotEmpty
	@Length(min=10, max=10) //make mdn is 10 digits
	@Column(nullable=false, length=10)
	String mdn;
	
	@NotEmpty
	@Length(min=5, max=50)
	@Column(nullable=false, length=50)
	String payeeName;
	
	@Length(max=150)
	@Column(nullable=true, length=150)
	String description;
	
	@Column(nullable=false)
	boolean isDebit;
	
	@Column(nullable=false)
	float amount;
	
	@Column(nullable=false)
	Date date;

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

	public boolean isDebit() {
		return isDebit;
	}

	public void setDebit(boolean isDebit) {
		this.isDebit = isDebit;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
}
