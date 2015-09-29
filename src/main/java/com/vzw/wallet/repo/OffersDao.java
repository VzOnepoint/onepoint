package com.vzw.wallet.repo;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.vzw.wallet.model.Offers;

@Repository("OffersDao")
public class OffersDao implements BaseDao {
	
	@Autowired
	SessionFactory sessionFactory;
	
	public Offers saveOrUpdateOffers(Offers offers) {
		sessionFactory.getCurrentSession().save(offers);
		return offers;
	}
	
	public List<Offers> getOffers() {
		Query query = null;
		
		try {
			query = sessionFactory.
				      getCurrentSession().
				      createQuery("from Offers");
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	    return (List<Offers>) query.list();
	}
}
