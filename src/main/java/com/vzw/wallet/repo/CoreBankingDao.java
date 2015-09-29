package com.vzw.wallet.repo;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.vzw.wallet.model.Account;
import com.vzw.wallet.model.Loyalty;
import com.vzw.wallet.model.Payee;
import com.vzw.wallet.model.Transactions;
import com.vzw.wallet.repo.BaseDao;

@Repository("CoreBankingDao")
public class CoreBankingDao implements BaseDao {

	@Autowired
	SessionFactory sessionFactory;
	
	public boolean saveOrUpdateAccount(Account account){
		boolean saveSucessful = true;
		
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(account);
		}
		catch(Exception e){
			saveSucessful = false;
		}
		
		return saveSucessful;
	}
	
	public boolean saveOrUpdateLoyalty(Loyalty loyalty){
		boolean saveSucessful = true;
		
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(loyalty);
		}
		catch(Exception e){
			saveSucessful = false;
		}
		
		return saveSucessful;
	}
	
	public boolean saveOrUpdatePayee(Payee payee){
		boolean saveSucessful = true;
		
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(payee);
		}
		catch(Exception e){
			saveSucessful = false;
		}
		
		return saveSucessful;
	}
	
	public boolean saveOrUpdateTransaction(Transactions transactions){
		boolean saveSucessful = true;
		
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(transactions);
		}
		catch(Exception e){
			saveSucessful = false;
		}
		
		return saveSucessful;
	}
		
	public Account getAccountByMdn(String mdn){
		Query query = null;
		
		try {
			query = sessionFactory.
				      getCurrentSession().
				      createQuery("from Account where mdn = :mdn");
		    query.setParameter("mdn", mdn);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	    return (Account) ((query.list() == null || query.list().size() == 0) ? null : query.list().get(0));
	}
	
	public Loyalty getLoyaltyByMdn(String mdn){
		Query query = null;
		
		try {
			query = sessionFactory.
				      getCurrentSession().
				      createQuery("from Loyalty where mdn = :mdn");
		    query.setParameter("mdn", mdn);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	    return (Loyalty) ((query.list() == null || query.list().size() == 0) ? null : query.list().get(0));
	}
	
	public List<Payee> getPayeesByMdn(String mdn){
		Query query = null;
		
		try {
			query = sessionFactory.
				      getCurrentSession().
				      createQuery("from Payee where mdn = :mdn");
		    query.setParameter("mdn", mdn);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	    return (List<Payee>) query.list();
	}
	
	public Payee getPayeeById(int id){
		Query query = null;
		
		try {
			query = sessionFactory.
				      getCurrentSession().
				      createQuery("from Payee where id = :id");
		    query.setParameter("id", id);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	    return (Payee) ((query.list() == null || query.list().size() == 0) ? null : query.list().get(0));
	}
	
	public List<Transactions> getTransactionsByMdn(String mdn){
		Query query = null;
		
		try {
			query = sessionFactory.
				      getCurrentSession().
				      createQuery("from Transactions where mdn = :mdn");
		    query.setParameter("mdn", mdn);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
	    return (List<Transactions>) query.list();
	}
}
