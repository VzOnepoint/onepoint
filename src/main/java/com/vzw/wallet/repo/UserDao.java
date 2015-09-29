package com.vzw.wallet.repo;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vzw.wallet.model.User;

@Repository("UserDao")
public class UserDao implements BaseDao{
	
	@Autowired
	SessionFactory sessionFactory;
	
	public User insertUser(User user) {
		sessionFactory.getCurrentSession().save(user);
		return user;
	}
	
	public User getUserByMdn(String mdn) {
		Query query = null;
		
		try {
			query = sessionFactory.
				      getCurrentSession().
				      createQuery("from User where mdn = :mdn");
		    query.setParameter("mdn", mdn);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	    return (User) ((query.list() == null || query.list().size() == 0) ? null : query.list().get(0));
	}
	
}
