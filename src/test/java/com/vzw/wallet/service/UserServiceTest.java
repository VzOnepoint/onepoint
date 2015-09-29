package com.vzw.wallet.service;

import javax.servlet.http.HttpSession;

import org.junit.Test;
import org.junit.Assert;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.vzw.wallet.model.Response;
import com.vzw.wallet.model.User;
import com.vzw.wallet.services.UserService;
import com.vzw.wallet.util.Constants;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration (locations = {"classpath:test_service_context.xml"})
public class UserServiceTest {

	@Autowired
	protected UserService userService;
	
	public UserServiceTest(){
		
	}
	
	/**
	 * Tests if Userservice is created.
	 */
	@Test
	 public void test_UserServiceNotNull(){
		 Assert.assertNotNull(userService);
	 }
	
	/**
	 * Tests Userservice's createUser using null user.
	 */
	@Test
	public void test_CreateUser_Invalid_User(){
		Response response = userService.createUser(null);
		Assert.assertTrue(response.getErrorCode() == Constants.ERROR_CODE_UNABLE_REGISTERED);
	}
	
	/**
	 * Tests Userservice's createUser using valid user.
	 */
	@Test
	public void test_CreateUser_Valid_User(){
		User user = new User();
		user.setMdn("9991234567");
		user.setUserName("TestUser");
		user.setPassword("123456");
		Response response = userService.createUser(user);
		Assert.assertTrue(response.getErrorCode() == Constants.ERROR_CODE_SUCCESS);
		Assert.assertTrue(response.getUser().isVzwUser());
	}
	
	 
	/**
	 * Tests Userservice's getUserByMdn using null mdn string.
	 */
	@Test
	 public void test_GetUserByMdn_Null_Mdn(){
		 Response response = userService.getUserByMdn(null);
		 Assert.assertTrue(response.getErrorCode() == Constants.ERROR_CODE_NOT_REGISTERED);
	 }
	 
	/**
	 * Tests Userservice's getUserByMdn using invalid mdn string.
	 */
	 @Test
	 public void test_GetUserByMdn_Invalid_Mdn(){
		 Response response = userService.getUserByMdn("1233455");
		 Assert.assertTrue(response.getErrorCode() == Constants.ERROR_CODE_NOT_REGISTERED);
	 }
	 
	 /**
	 * Tests Userservice's getUserByMdn using valid mdn string.
	 */
	 @Test
	 public void test_GetUserByMdn_Valid_Mdn(){
		 Response response = userService.getUserByMdn("9991234567");
		 Assert.assertTrue(response.getErrorCode() == Constants.ERROR_CODE_SUCCESS);
	 }
}
