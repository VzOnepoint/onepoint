/**
 * 
 */
Ext.define('wallet.controller.VZWalletController',{
	extend: 'Ext.app.Controller',
	views: ['LoginView', 'DecisionView', 'CashView','AddPayeeView', 'BillPayView', 'LoyaltyView'],
	refs:[{
		ref: 'loginview',
		selector: 'loginview'
		
	},{
		ref: 'decisionview',
		selector: 'decisionview'
		
	},{
		ref: 'cashview',
		selector: 'cashview'
		
	},{
		ref: 'addpayeeview',
		selector: 'addpayeeview'
		
	},{
		ref: 'billpayview',
		selector: 'billpayview'
		
	},{
		ref: 'loyaltyview',
		selector: 'loyaltyview'
		
	}],
	init: function() {
		this.control({
			'textfield[itemId=mdnText]': {
				'change': function(field, newVal, oldVal) {
					//this.getLoginview().down('[itemId=okBtn]').setDisabled(Ext.isEmpty(newVal));
					var existingUser = false, newUser = false;
					if (!Ext.isEmpty(newVal) && newVal.length === 10 ) {
						Ext.Ajax.request({
							url: baseOnePointURL+'/account/get/'+newVal,
							success: function(response) {
								var resp = Ext.decode(response.responseText);
								if (resp.errorCode === 3) {
									newUser = true;
									Ext.Msg.alert('OnePoint', resp.errorMessage, function() {
										field.up('[itemId=loginview]').down('[itemId=pinCnt]').show();
										field.up('[itemId=loginview]').down('[itemId=rePinCnt]').show();
										field.up('[itemId=loginview]').down('[itemId=nameCnt]').show();
										field.up('[itemId=loginview]').down('[itemId=okBtn]').setText('Register');
									});
									
								} else if (resp.errorCode === 0) {
									field.up('[itemId=loginview]').down('[itemId=pinCnt]').show();
									field.up('[itemId=loginview]').down('[itemId=rePinCnt]').hide();
									field.up('[itemId=loginview]').down('[itemId=nameCnt]').hide();
									field.up('[itemId=loginview]').down('[itemId=okBtn]').setText('Login');
								}
								
							}
						});
					}
				}
			},
			'loginview button[itemId=okBtn]': {
				'click': function(btn) {
					var params = btn.up('[itemId=loginForm]').getForm().getValues(), me = this;
					var URLPattern = btn.up('[itemId=loginview]').down('[itemId=rePinCnt]').isVisible() ? 'create' : 'login';
					Ext.Ajax.request({
						url: baseOnePointURL+'/account/'+URLPattern,
						params: Ext.encode(params),
						jsonData: Ext.encode(params),
						defaultXdrContentType: 'application/json',
						method: 'POST',
						success: function(response) {
							console.log('The response ',response);
							var resp = Ext.decode(response.responseText);
							if (resp.errorCode === 0) {
								userName = resp.user.userName;
								me.hideAllViews();
								me.getDecisionview().down('[itemId=nameField]').setValue(resp.user.userName);
								me.getDecisionview().down('[itemId=balField]').setValue(balAmountCheck());
								me.getDecisionview().show();								
							}
						}
					});
				}			
			},
			'decisionview': {
				'afterrender': function(view) {
					Ext.get('loadCash').on('click', function() {
						this.hideAllViews();
						this.getCashview().show();
						this.getCashview().down('[itemId=cashPanel]').getForm().reset();
						this.getCashview().down('[itemId=nameField]').setValue(userName);
						this.getCashview().down('[itemId=balField]').setValue(balAmountCheck());
						Ext.iterate(this.getCashview().down('[itemId=cashPanel]').query('container[defaultShow=false]'), function(cnt) {
							cnt.hide();
						});
					}, this);
					Ext.get('billPay').on('click', function() {
						var me = this;
						me.hideAllViews();
						me.getBillpayview().down('[itemId=nameField]').setValue(userName);
						me.getBillpayview().down('[itemId=balField]').setValue(balAmountCheck());
						Ext.Ajax.request({
							url: baseOnePointURL+'/banking/getPayees',
							async: false,
							success: function(response) {
								var resp = Ext.decode(response.responseText);
								var payeeArr = [], billersArr = [];
								if (resp.errorCode === 0) {
									me.getBillpayview().down('[itemId=billPayPanel]').getForm().reset();
									me.getBillpayview().down('[itemId=toPayeeCnt]').hide();						
									me.getBillpayview().down('[itemId=toBillCnt]').hide();
									Ext.iterate(resp.payees, function(item){
										if (item.mdnAccount) {
											payeeArr.push({
												'payeeName': item.payeeName
											});
										} else {
											billersArr.push({
												'payeeName': item.payeeName
											});
										}
									});
									me.getBillpayview().down('[itemId=toPayee]').getStore().loadRawData(payeeArr);
									me.getBillpayview().down('[itemId=toPayee]').setValue(payeeArr[0]['payeeName']);
									me.getBillpayview().down('[itemId=toBiller]').getStore().loadRawData(billersArr);
									me.getBillpayview().down('[itemId=toBiller]').setValue(billersArr[0]['payeeName']);
									me.getBillpayview().show();
								}
							}
						});
					}, this);
					Ext.get('loyalty').on('click', function() {
						this.hideAllViews();
						this.getLoyaltyview().down('[itemId=loyaltyPanel]').getForm().reset();
						this.getLoyaltyview().show();
					}, this);
				}
			},
			'button[itemId=cashGoBack]': {
				'click': function(){
					this.hideAllViews();
					this.getDecisionview().show();
				}
			},
			'cashview radiofield': {
				'change': function(field, newVal, oldVal) {
					if (newVal) {
						this.hideAllPayments();
						if (field.itemId === 'creditRadio') {
							this.getCashview().down('[itemId=creditCardCnt]').show();
						} else if (field.itemId === 'debitRadio') {
							this.getCashview().down('[itemId=debitCardCnt]').show();
						} else if (field.itemId === 'netBankingRadio') {
							this.getCashview().down('[itemId=netBankingCnt]').show();
						}
					}
					
				}				
			},
			'cashview': {
				'afterrender': function(view) {
					Ext.get('addPayee').on('click', function() {
						this.hideAllViews();
						this.getAddpayeeview().down('[itemId=addPayeePanel]').getForm().reset();
						this.hideAllAddPayeeViews();
						this.getAddpayeeview().show();
						this.getAddpayeeview().down('[itemId=nameField]').setValue(userName);
						this.getAddpayeeview().down('[itemId=balField]').setValue(balAmountCheck());
						this.getAddpayeeview().down('[itemId=payeeResult]').update('');
					}, this);
					
				}
			},
			'cashview button[itemId=cashSubmit]': {
				'click': function(btn) {
					var amount = btn.up('cashview').down('[itemId=loadAmount]').getValue(), me = this;
					Ext.Ajax.request({
						url: baseOnePointURL+'/banking/loadCash/'+amount,
						async: false,
						method: 'POST',
						success: function(response) {
							var res = Ext.decode(response.responseText);
							if (res.errorCode === 0) {
								Ext.Msg.alert('One Point', 'Amount Successfully loaded...', function() {
									me.hideAllViews();
									me.getDecisionview().down('[itemId=balField]').show();
									me.getDecisionview().down('[itemId=balField]').setValue(balAmountCheck());
									me.getDecisionview().show();
								})							
							} else {
								Ext.Msg.alert('One Point', res.errorMessage);
							}
						}
					});
				}
			},
			'addpayeeview button[itemId=payeeGoBack]': {
				'click': function(btn) {
					this.hideAllViews();
					this.getDecisionview().show();
				}
			},
			'addpayeeview button[itemId=payeeSubmit]': {
				'click': function(btn) {
					var getFormValues = btn.up('addpayeeview').down('[itemId=addPayeePanel]').getForm().getValues(), me = this;
					Ext.apply(getFormValues, {'mdnAccount': btn.up('addpayeeview').down('[itemId=addPayeePanel]').getForm().findField('typeOfBill').getValue()});
					if (!btn.up('addpayeeview').down('[itemId=addPayeePanel]').getForm().findField('typeOfBill').getValue()) {
						Ext.apply(getFormValues, {'accountNumber':btn.up('addpayeeview').down('[itemId=actNumber]').getValue()});
						Ext.apply(getFormValues, {'payeeName': btn.up('addpayeeview').down('[itemId=typeOfBillers]').getValue(), 'description': btn.up('addpayeeview').down('[itemId=sectors]').getValue()})
					}
					Ext.Ajax.request({
						url: baseOnePointURL+'/banking/registerPayee',
						jsonData: getFormValues,
						params: getFormValues,
						async: false,
						success: function(response) {
							var res = Ext.decode(response.responseText);
							if (res.errorCode === 0 ) {
								me.getAddpayeeview().down('[itemId=payeeResult]').update('<div class="greenFont">Beneficiary added successfully. Proceed to pay.</div>');
							} else {
								me.getAddpayeeview().down('[itemId=payeeResult]').update('<div class="redFont">'+res.errorMessage+'</div>');
							}
						}
						
					})
				}
			},
			'addpayeeview radiofield': {
				'change': function(field, newVal, oldVal) {
					if (newVal) {
						this.hideAllAddPayeeViews();
						if (field.itemId === 'toBillers') {
							this.getAddpayeeview().down('[itemId=toBillersCnt]').show();
						} else if (field.itemId === 'toAccount') {
							this.getAddpayeeview().down('[itemId=toAccountCnt]').show();
						}
					}
				}
			},
			'addpayeeview combo[itemId=typeOfBillers]': {
				'select': function(combo, value) {
					var sectorStore = combo.up('addpayeeview').down('[itemId=sectors]').getStore();
					var sectorCombo = combo.up('addpayeeview').down('[itemId=sectors]');
					var value = combo.getValue();
					if (value === 'Insurance') {
						sectorStore.loadRawData([
						{
							'valueField': 'Athena',
							'displayField': 'Athena'
						}]);
						sectorCombo.setValue('Athena');
					} else if (value === 'Electricity') {
						sectorStore.loadRawData([{
							'valueField': 'E.B',
							'displayField': 'E.B'
						}]);
						sectorCombo.setValue('E.B');
					} else if (value === 'Telephone') {
						sectorStore.loadRawData([{
							'valueField': 'Verizon',
							'displayField': 'Verizon'
						},
						{
							'valueField': 'Verizon FIOS',
							'displayField': 'Verizon FIOS'
						},{
							'valueField': 'AT&T',
							'displayField': 'AT&T'
						},{
							'valueField': 'T-Mobile',
							'displayField': 'T-Mobile'
						},{
							'valueField': 'Sprint',
							'displayField': 'Sprint'
						}]);
						sectorCombo.setValue('Verizon');
					}
				}
			},
			'billpayview button[itemId=billGoBack]': {
				'click': function(btn) {
					var me = this;
					this.hideAllViews();
					this.getDecisionview().show();
				}
			},
			'billpayview radiofield': {
				'change': function(field, newVal, oldVal) {
					if (newVal) {
						this.hideAllBillPayments();
						if (field.itemId === 'payeeRadio') {
							this.getBillpayview().down('[itemId=toPayeeCnt]').show();
						} else if (field.itemId === 'billerRadio') {
							this.getBillpayview().down('[itemId=toBillCnt]').show();
						}
					}
					
				}
			},
			'loyaltyview button[itemId=loyaltyGoBack]': {
				'click': function(view) {
					this.hideAllViews();
					this.getDecisionview().show();
				}
			}
		});
	},
	hideAllViews: function() {
		this.getLoginview().hide();
		this.getDecisionview().hide();
		this.getAddpayeeview().hide();
		this.getCashview().hide();
		this.getBillpayview().hide();
		this.getLoyaltyview().hide();
	},
	hideAllPayments: function() {
		this.getCashview().down('[itemId=creditCardCnt]').hide();
		this.getCashview().down('[itemId=debitCardCnt]').hide();
		this.getCashview().down('[itemId=netBankingCnt]').hide();
	},
	hideAllBillPayments: function() {
		this.getBillpayview().down('[itemId=toPayeeCnt]').hide();
		this.getBillpayview().down('[itemId=toBillCnt]').hide();
	},
	hideAllAddPayeeViews: function() {
		this.getAddpayeeview().down('[itemId=toAccountCnt]').hide();
		this.getAddpayeeview().down('[itemId=toBillersCnt]').hide();
	}
});
