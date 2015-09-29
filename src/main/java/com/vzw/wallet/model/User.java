package com.vzw.wallet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="users")
public class User  {

	private static final long serialVersionUID = 1L;
	
	@NotEmpty
	@Length(min=10, max=10) //make mdn is 10 digits
	@Id	@Column(nullable=false, length=10)	
	private String mdn;
	
	@NotEmpty
	@Length(min=5, max=50)
	@Column(nullable=false, length=50)
	private String userName;
		
	@NotEmpty
	@Length(min=6, max=6)
	@Column(nullable=false, length=6)
	private String password;
	
	//@Email
	@Column(nullable=true, length=50)
	private String email;
	
	@Column(nullable=true, length=50)
	private String ssn;
	
	@Column(nullable=false)
	private boolean vzwUser;

	public String getMdn() {
		return mdn;
	}

	public void setMdn(String mdn) {
		this.mdn = mdn;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	//@JsonIgnore
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSsn() {
		return ssn;
	}

	public void setSsn(String ssn) {
		this.ssn = ssn;
	}

	public boolean isVzwUser() {
		return vzwUser;
	}

	public void setVzwUser(boolean vzwUser) {
		this.vzwUser = vzwUser;
	}
}
