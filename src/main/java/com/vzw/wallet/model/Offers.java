package com.vzw.wallet.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table(name="offers")
public class Offers {

	private static final long serialVersionUID = 1L;
	
	@Id	
	@Column(nullable=false)
	@GeneratedValue(strategy=GenerationType.TABLE)
	private int id;
	
	@NotEmpty
	@Length(min=5, max=50)
	@Column(nullable=false, length=50)
	String offerName;
	
	@Length(max=150)
	@Column(nullable=true, length=150)
	String description;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOfferName() {
		return offerName;
	}

	public void setOfferName(String offerName) {
		this.offerName = offerName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
