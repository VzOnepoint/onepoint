/**
 * 
 */
Ext.define('wallet.controller.VZWalletController',{
	extend: 'Ext.app.Controller',
	views: ['LoginView', 'DecisionView', 'CashView','AddPayeeView', 'BillPayView', 'LoyaltyView', 'StatementView', 'NFCView'],
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
		
	},{
		ref: 'statementview',
		selector: 'statementview'
		
	},{
		ref: 'nfcview',
		selector: 'nfcview'
		
	}],
	init: function() {
		this.control({
			'textfield[itemId=mdnText]': {
				'change': function(field, newVal, oldVal) {
					//this.getLoginview().down('[itemId=okBtn]').setDisabled(Ext.isEmpty(newVal));
					var existingUser = false, newUser = false;
					if (!Ext.isEmpty(newVal) && newVal.length === 10 ) {
						field.up('[itemId=loginview]').down('[itemId=okBtn]').enable();
						Ext.Ajax.request({
							url: baseOnePointURL+'/account/get/'+newVal,
							success: function(response) {
								var resp = Ext.decode(response.responseText);
								if (resp.errorCode === 3) {
									newUser = true;
									Ext.Msg.alert('OnePoint Payment', resp.errorMessage, function() {
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
					} else {
						field.up('[itemId=loginview]').down('[itemId=rePinCnt]').hide();
						field.up('[itemId=loginview]').down('[itemId=pinCnt]').hide();
						field.up('[itemId=loginview]').down('[itemId=nameCnt]').hide();
						field.up('[itemId=loginview]').down('[itemId=okBtn]').setText('OK');
						field.up('[itemId=loginview]').down('[itemId=okBtn]').disable();
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
					view.down('[itemId=loadCashCnt]').getEl().on('click', function() {
						this.hideAllViews();
						this.getCashview().show();
						this.getCashview().down('[itemId=cashPanel]').getForm().reset();
						this.getCashview().down('[itemId=nameField]').setValue(userName);
						this.getCashview().down('[itemId=balField]').setValue(balAmountCheck());
						this.getCashview().down('[itemId=cashResult]').update('');
						this.getCashview().down('[itemId=creditCardName]').setValue(userName);
						this.getCashview().down('[itemId=debitCardName]').setValue(userName);
						Ext.iterate(this.getCashview().down('[itemId=cashPanel]').query('container[defaultShow=false]'), function(cnt) {
							cnt.hide();
						});
					}, this);
					
					view.down('[itemId=nfcCnt]').getEl().on('click', function() {
						var me = this;
						this.hideAllViews();
						this.getNfcview().show();
						this.getNfcview().down('[itemId=nfcPanel]').getForm().reset();
						this.getNfcview().down('[itemId=nameField]').setValue(userName);
						this.getNfcview().down('[itemId=balField]').setValue(balAmountCheck());
						this.getNfcview().down('[itemId=nfcResult]').update('');
						Ext.Ajax.request({
							url: baseOnePointURL+'/banking/getPayees',
							async: false,
							success: function(response) {
								var resp = Ext.decode(response.responseText);
								var payeeArr = [], billersArr = [];
								if (resp.errorCode === 0) {
									me.getBillpayview().down('[itemId=toPayeeCnt]').hide();						
									me.getBillpayview().down('[itemId=toBillCnt]').hide();
									if (!Ext.isEmpty(resp.payees)) {
										globalPayeeId = resp.payees[0]['id'];
									}
								}
							}
						});
					}, this);
					view.down('[itemId=addPayeeCnt]').getEl().on('click', function() {
						this.hideAllViews();
						this.getAddpayeeview().down('[itemId=addPayeePanel]').getForm().reset();
						this.hideAllAddPayeeViews();
						this.getAddpayeeview().show();
						this.getAddpayeeview().down('[itemId=nameField]').setValue(userName);
						this.getAddpayeeview().down('[itemId=balField]').setValue(balAmountCheck());
						this.getAddpayeeview().down('[itemId=payeeResult]').update('');
					}, this);
					view.down('[itemId=billPayCnt]').getEl().on('click', function() {
						var me = this;
						me.hideAllViews();
						me.getBillpayview().down('[itemId=billPayPanel]').getForm().reset();
						me.getBillpayview().down('[itemId=nameField]').setValue(userName);
						me.getBillpayview().down('[itemId=balField]').setValue(balAmountCheck());
						me.getBillpayview().down('[itemId=billPayeeResult]').update('');
						Ext.Ajax.request({
							url: baseOnePointURL+'/banking/getPayees',
							async: false,
							success: function(response) {
								var resp = Ext.decode(response.responseText);
								var payeeArr = [], billersArr = [];
								if (resp.errorCode === 0) {
									me.getBillpayview().down('[itemId=toPayeeCnt]').hide();						
									me.getBillpayview().down('[itemId=toBillCnt]').hide();
									Ext.iterate(resp.payees, function(item){
										if (item.mdnAccount) {
											payeeArr.push({
												'payeeName': item.payeeName,
												'id': item.id
											});
										} else {
											billersArr.push({
												'payeeName': item.payeeName,
												'id': item.id
											});
										}
									});
									if (!Ext.isEmpty(payeeArr)) {
										me.getBillpayview().down('[itemId=toPayee]').getStore().loadRawData(payeeArr);
										me.getBillpayview().down('[itemId=toPayee]').setValue(payeeArr[0]['id']);
									}
									if (!Ext.isEmpty(billersArr)) {
										me.getBillpayview().down('[itemId=toBiller]').getStore().loadRawData(billersArr);
										me.getBillpayview().down('[itemId=toBiller]').setValue(billersArr[0]['id']);
									}
									me.getBillpayview().show();
								}
							}
						});
					}, this);
					view.down('[itemId=loyaltyCnt]').getEl().on('click', function() {
						this.hideAllViews();
						var me = this;
						this.getLoyaltyview().show();
						this.getLoyaltyview().down('[itemId=loyaltyPanel]').getForm().reset();
						this.getLoyaltyview().down('[itemId=nameField]').setValue(userName);
						this.getLoyaltyview().down('[itemId=balField]').setValue(balAmountCheck());
						this.getLoyaltyview().down('[itemId=result]').update('');
						Ext.Ajax.request({
							url: baseOnePointURL+'/banking/getLoyaltyBalance',
							async: false,
							success: function(response) {
								var respText = response.responseText;
								var startString = respText.substring(0, respText.indexOf('"balance":')+'"balance":'.length);
								var getBeforeString = respText.substring(respText.indexOf('"balance":')+'"balance":'.length);
								var getAfterString =  getBeforeString.substring(getBeforeString.indexOf('}'));
								var value = '"'+getBeforeString.substring(0, getBeforeString.indexOf('}'))+'"';
								var totTalResponseText = startString+value+getAfterString;
								console.log('totTalResponseText ',totTalResponseText);
								var resp = Ext.decode(totTalResponseText);
								if (resp.errorCode === 0) {
									me.getLoyaltyview().down('[itemId=points]').update('<div class="pointsRadius" style="height:100%;width:100%;"><div class="yellowFont60">'+Ext.util.Format.round(resp.loyalty.balance)+'</div></div>');
								}
							}
						})
					}, this);
					view.down('[itemId=statementCnt]').getEl().on('click', function() {
						this.hideAllViews();
						var me = this;
						this.getStatementview().show();
						this.getStatementview().down('[itemId=stmtPanel]').getForm().reset();
						this.getStatementview().down('[itemId=nameField]').setValue(userName);
						this.getStatementview().down('[itemId=balField]').setValue(balAmountCheck());
						Ext.Ajax.request({
							url: baseOnePointURL+'/banking/getStatements',
							success: function(response) {
								var resp = Ext.decode(response.responseText);
								if (resp.errorCode === 0) {
									//me.getStatementview().down('[itemId=stmtGrid]').getStore().loadData(resp.transactions);
									var genTableTpl = '';
									
									Ext.iterate(resp.transactions, function(item, index) {
										var colorFlag = (index%2 === 0) ? '#FFFFFF' : '#E4E4E1';
										var dt = Ext.Date.parse(item['date'], 'Y-m-d');
										var formatDt = Ext.Date.format(dt, 'm/d/Y');
										var payeeNameDesc = item['payeeName']+'|'+ (Ext.isEmpty(item['description'])? '' : item['description']);
										var isDebit = (item['debit']) ? 'green' : 'black'; 
										
										genTableTpl += '<div><table width="100%" border="0" style="background-color:'+colorFlag+';height:25px;"><tr height="10"><td><div class="calibriFontBold">'+formatDt+'</div></td><td align="right" valign="middel" height="10"><div class="calibriFontBold" style="color:'+isDebit+';">$'+item['amount']+'</div></td></tr><tr height="10"><td colspan="2"><div class="calibriFont">'+payeeNameDesc+'</div></td></tr></table></div>';
									});
									me.getStatementview().down('[itemId=stmtGrid]').update('<div style="height:250px;overflow-y:auto;">'+genTableTpl+'</div>');
								}
							}
						})
					}, this);
				},
				'show': function() {
					this.getDecisionview().down('[itemId=nameField]').setValue(userName);
					this.getDecisionview().down('[itemId=balField]').setValue(balAmountCheck());
				}
			},
			'button[itemId=cashGoBack]': {
				'click': function(){
					this.hideAllViews();
					this.getDecisionview().show();
				}
			},
			'nfcview button[itemId=nfcGoBack]': {
				'click': function(){
					this.hideAllViews();
					this.getDecisionview().show();
				}
			},
			'nfcview button[itemId=nfcApprove]': {
				'click': function() {
					var me = this, myWindow = new Ext.window.Window({
						height: 200,
						width: 400,
						closable: false,
						modal: true,
						layout: {
							type: 'vbox',
							pack: 'center',
							align: 'middle',
						},
						items: [{
							xtype: 'container',
							items: [{  
								xtype: 'image',
								src: './res/images/Touch_ID.png'
							},{
								xtype: 'container',
								html: 'Scanning finger print...'
							}]
						}]
					});
					if (Ext.isEmpty(globalPayeeId)) {
						Ext.Msg.alert('OnePoint Payment', 'No NFC / IOT device detected.', function() {
							me.getCashview().down('[itemId=cashResult]').update('');
						});
						return;
					} else {
						myWindow.show();
						Ext.defer(function() {
						//	globalPayeeId = '56';
							myWindow.close();
							Ext.Ajax.request({
								url: baseOnePointURL+'/banking/transfer/'+globalPayeeId+'/1',
								method: 'POST',
								async: false,
								success: function(response) {
									var resp = Ext.decode(response.responseText);
									if (resp.errorCode === 0) {
										me.getNfcview().down('[itemId=balField]').setValue(balAmountCheck());
										me.getNfcview().down('[itemId=nfcResult]').update('<div class="greenFont">Your amount has been transferred. Thanks for using our service.</div>');
									} else {
										me.getNfcview().down('[itemId=nfcResult]').update('<div class="redFont">'+resp.errorMessage+'</div>');
									}
								}
							});
						}, 3000, this);
					}
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
			'statementview button[itemId=stmtGoBack]': {
				'click': function(btn) {
					this.hideAllViews();
					this.getDecisionview().show();
				}
			},
			'cashview button[itemId=cashSubmit]': {
				'click': function(btn) {
					var me = this;
					var amount = btn.up('cashview').down('[itemId=loadAmount]').getValue(), me = this;
					if (Ext.isEmpty(amount)) {
						Ext.Msg.alert('OnePoint Payment', 'Please enter valid amount.', function() {
							me.getCashview().down('[itemId=cashResult]').update('');
						});
						return;
					}
					
					Ext.Ajax.request({
						url: baseOnePointURL+'/banking/loadCash/'+amount,
						async: false,
						method: 'POST',
						success: function(response) {
							var res = Ext.decode(response.responseText);
							if (res.errorCode === 0) {
								me.getCashview().down('[itemId=balField]').setValue(balAmountCheck());
								me.getCashview().down('[itemId=cashResult]').update('<div class="greenFont">Amount Successfully loaded...</div>');
							} else {
								me.getCashview().down('[itemId=cashResult]').update('<div class="redFont">'+res.errorMessage+'</div>');
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
					me.getAddpayeeview().down('[itemId=payeeResult]').update('');
					if(btn.up('addpayeeview').down('[itemId=addPayeePanel]').getForm().findField('typeOfBill').getValue()) {
						if (Ext.isEmpty(getFormValues['payeeName'])) {
							Ext.Msg.alert('OnePoint Payment', 'Please enter valid Nick name');
							return;
						} else if (getFormValues['payeeName'].length < 5) {
							Ext.Msg.alert('OnePoint Payment','Invalid Payee name, must be between 5 to 50 characters!');
							return;
						}
					} else {
						if (Ext.isEmpty(btn.up('addpayeeview').down('[itemId=actNumber]').getValue())) {
							Ext.Msg.alert('OnePoint Payment', 'Please enter valid Account Number');
							return;
						}
					}
					Ext.apply(getFormValues, {'mdnAccount': btn.up('addpayeeview').down('[itemId=addPayeePanel]').getForm().findField('typeOfBill').getValue()});
					if (!btn.up('addpayeeview').down('[itemId=addPayeePanel]').getForm().findField('typeOfBill').getValue()) {
						Ext.apply(getFormValues, {'accountNumber':btn.up('addpayeeview').down('[itemId=actNumber]').getValue()});
						Ext.apply(getFormValues, {'payeeName': btn.up('addpayeeview').down('[itemId=sectors]').getValue(), 'description': btn.up('addpayeeview').down('[itemId=sectors]').getValue()})
					}
					Ext.Ajax.request({
						url: baseOnePointURL+'/banking/registerPayee',
						jsonData: getFormValues,
						params: getFormValues,
						async: false,
						success: function(response) {
							var res = Ext.decode(response.responseText);
							if (res.errorCode === 0 ) {
								var type = (getFormValues['mdnAccount']) ? 'Beneficiary' : 'Biller';
								me.getAddpayeeview().down('[itemId=payeeResult]').update('<div class="greenFont">'+type+' added successfully. Proceed to pay.</div>');
							} else {
								me.getAddpayeeview().down('[itemId=payeeResult]').update('<div class="redFont">'+res.errorMessage+'</div>');
							}
						}
					});
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
							'displayField': 'Aetna',
							'valueField': 'Aetna'
						},{
							'displayField': 'United Health Group',
							'valueField': 'United Health Group'
						},{
							'displayField': 'Cigna',
							'valueField': 'Cigna'
						},{
							'displayField': 'Humana',
							'valueField': 'Humana'
						}]);
						sectorCombo.setValue('Athena');
					} else if (value === 'Electricity') {
						sectorStore.loadRawData([{
							'valueField': 'Alabama Power',
							'displayField': 'Alabama Power'
						},{
							'valueField': 'Salt River Power',
							'displayField': 'Salt River Power'
						},{
							'valueField': 'Ampit Energy',
							'displayField': 'Ampit Energy'
						},{
							'valueField': 'Pacific Corp',
							'displayField': 'Pacific Corp'
						}]);
						sectorCombo.setValue('Alabama Power');
					} else if (value === 'Telephone') {
						sectorStore.loadRawData([{
							'valueField': 'Verizon',
							'displayField': 'Verizon'
						}, {
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
			'billpayview button[itemId=billSubmit]': {
				'click': function(btn) {
					var me = this, accountId, payeeAmount, myWindow = new Ext.window.Window({
						height: 200,
						width: 400,
						closable: false,
						modal: true,
						layout: {
							type: 'vbox',
							pack: 'center',
							align: 'middle',
						},
						items: [{
							xtype: 'container',
							items: [{  
								xtype: 'image',
								src: './res/images/Touch_ID.png'
							},{
								xtype: 'container',
								html: 'Scanning finger print...'
							}]
						}]
					});

					if (this.getBillpayview().down('[itemId=billPayPanel]').getForm().findField('billRadio').getValue()) {
						payeeAmount = this.getBillpayview().down('[itemId=payeeAmount]').getValue();
						if (Ext.isEmpty(payeeAmount)) {
							Ext.Msg.alert('OnePoint Payment', 'Please enter valid amount.', function() {
								me.getBillpayview().down('[itemId=billPayeeResult]').update('');
							});
							return;
						}
					} else if (!this.getBillpayview().down('[itemId=billPayPanel]').getForm().findField('billRadio').getValue()) {
						var billAmount = this.getBillpayview().down('[itemId=billAmount]').getValue();
						if (Ext.isEmpty(billAmount)) {
							Ext.Msg.alert('OnePoint Payment', 'Please enter valid amount.', function() {
								me.getBillpayview().down('[itemId=billPayeeResult]').update('');
							});
							return;
						}
					} else {
						return;
					}
					
					myWindow.show();
					Ext.defer(function() {
						myWindow.close();
						if (this.getBillpayview().down('[itemId=billPayPanel]').getForm().findField('billRadio').getValue()) {
							accountId = this.getBillpayview().down('[itemId=toPayee]').getValue();
							Ext.Ajax.request({
								url: baseOnePointURL+'/banking/transfer/'+accountId+'/'+payeeAmount,
								method: 'POST',
								async: false,
								success: function(response) {
									var resp = Ext.decode(response.responseText);
									if (resp.errorCode === 0) {
										me.getBillpayview().down('[itemId=balField]').setValue(balAmountCheck());
										me.getBillpayview().down('[itemId=billPayeeResult]').update('<div class="greenFont">Your amount has been transferred. Thanks for using our service.</div>');
									} else {
										me.getBillpayview().down('[itemId=billPayeeResult]').update('<div class="redFont">'+resp.errorMessage+'</div>');
									}
								}
							});
						} else {
							accountId = this.getBillpayview().down('[itemId=toBiller]').getValue();
							var billerName = this.getBillpayview().down('[itemId=toBiller]').getRawValue();
							var jsonData = {
								'id': accountId,
								'payeeName': billerName,
								'description': this.getBillpayview().down('[itemId=description]').getValue(),
								'accountNumber': '9999999999'
							};
							Ext.Ajax.request({
								url: baseOnePointURL+'/banking/payBills/'+billAmount,
								method: 'POST',
								jsonData: jsonData,
								async: false,
								success: function(response) {
									var resp = Ext.decode(response.responseText);
									if (resp.errorCode === 0) {
										me.getBillpayview().down('[itemId=balField]').setValue(balAmountCheck());
										me.getBillpayview().down('[itemId=billPayeeResult]').update('<div class="greenFont">Your bill is paid. Please check your loyalty points.</div>');
									} else {
										me.getBillpayview().down('[itemId=billPayeeResult]').update('<div class="redFont">'+resp.errorMessage+'</div>');
									}
								}
							})
						}
					}, 3000, this);
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
			},
			'loyaltyview button[itemId=encashBtn]': {
				'click': function(view) {
					var me = this;
					Ext.Ajax.request({
						url: baseOnePointURL+'/banking/encashLoyaltyPoints',
						success: function(response) {
							var resp = Ext.decode(response.responseText);
							if (resp.errorCode === 0) {
								Ext.Msg.alert('OnePoint Payment', 'Your points has been encashed.')
							} else {
								me.getLoyaltyview().down('[itemId=result]').update('<div class="redFont">'+resp.errorMessage+'</div>');
							}
						}
					});
				}
			},
			'loyaltyview': {
				'show': function(view) {
					var me = this, offersCnt = me.getLoyaltyview().down('[itemId=offersCnt]');
					offersCnt.removeAll();
					Ext.Ajax.request({
						url: baseOnePointURL+'/offers/get',
						success: function(response) {
							var resp = Ext.decode(response.responseText);
							Ext.iterate(resp.offers, function(offer) {
								offersCnt.add({
									xtype: 'container',
									html: '<div class="offersFont">'+offer.offerName+'</div>'
								},{
									xtype: 'container',
									html: '<div class="offersDescFont">'+(Ext.isEmpty(offer.description) ? '': offer.description)+'</div>'
								},{
									xtype: 'tbspacer',
									height: 10
								});
							});
							offersCnt.doLayout();
						}
					});
				},
				'afterrender': function(view) {
					view.down('[itemId=points]').getEl().on('click', function() {
						var me = this;
						Ext.Ajax.request({
							url: baseOnePointURL+'/banking/encashLoyaltyPoints',
							success: function(response) {
								var resp = Ext.decode(response.responseText);
								if (resp.errorCode === 0) {
									Ext.Msg.alert('OnePoint Payment', 'Your points has been encashed.', function() {
										me.getLoyaltyview().down('[itemId=balField]').setValue(balAmountCheck());
										me.getLoyaltyview().down('[itemId=points]').update('<div class="pointsRadius" style="height:100%;width:100%;"><div class="yellowFont60">0</div></div>');
									})
								} else {
									me.getLoyaltyview().down('[itemId=result]').update('<div class="redFont">'+resp.errorMessage+'</div>');
								}
							}
						});
					}, this);
				}
			}
		});
	},
	hideAllViews: function() {
		this.getLoginview().hide();
		this.getDecisionview().hide();
		this.getAddpayeeview().hide();
		this.getNfcview().hide();
		this.getCashview().hide();
		this.getBillpayview().hide();
		this.getLoyaltyview().hide();
		this.getStatementview().hide();
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
