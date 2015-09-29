/**
 * 
 */
Ext.define('wallet.view.CashView',{
	alias: 'widget.cashview',
	extend: 'Ext.container.Container',
	layout: {
		type: 'hbox',
		pack: 'center',
		align: 'middle'
	},
	style: 'background-color: #FFFFFF;background: url(res/images/Verizon_Logo.jpg)',
	items:[{
		xtype: 'form',
		itemId: 'cashPanel',
		title: '<div class="redFont">Payments</div>',
		width: '75%',
		autoScroll: true,
		height: '85%',
		bodyPadding: 5,
		autoScroll: true,
		dockedItems:[{
			xtype: 'toolbar',
			dock: 'top',
			style: 'background-color:#cd040c;',
			padding: 0,
			items:[{
				xtype:'container',
				width: '100%',
				layout: {
					type: 'column',
					columns: 2
				},
				items: [{
					xtype: 'container',
					width: '100%',
					columnWidth: 0.5, 
					layout: {
						type: 'hbox',
						pack: 'start',
						align: 'left'
					},
					items:[{
						xtype: 'displayfield',
						labelSeparator: '',
						type: 'nameField',
						itemId: 'nameField',
						labelWidth: 15,
						fieldLabel: 'Hi,',
						fieldCls: 'whiteLabelBold',
						labelCls: 'whiteLabel paddingRight',
						value: ''
					}]
				},{
					xtype: 'container',
					columnWidth: 0.5,
					width: '100%',
					layout: {
						type: 'hbox',
						pack: 'end',
						align: 'right'
					},
					items:[{
						xtype: 'displayfield',
						type: 'nameField',
						itemId: 'balField',
						labelWidth: 130,
						fieldLabel: 'Account Balance',
						fieldCls: 'whiteLabelBold',
						labelCls: 'whiteLabel paddingRight',
						value: ''
					}]
				}]
				
			}]
		}],
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'middle'
		},
		tools: [{
			type: 'mytool',
			width: 'auto',
			renderTpl: [
				'<img id="" src="res/images/Logout.png" role="presentation" height="15" width="15"/>'
			],
			handler: function() {
				Ext.Ajax.request({
					url: baseOnePointURL+'/account/logout',
					success: function(response) {
						var response = Ext.decode(response.responseText);
						if (response.errorCode === '0') {
							window.location.href = 'index.jsp';
						}						
					}
				});
				window.location.href = 'index.jsp';
			}
		}],
		items: [{
				xtype: 'container',
				width: '75%',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'radiofield',
					name: 'cashRadio',
					itemId: 'creditRadio',
					boxLabel: 'Credit Card'
				}]
			},{
				xtype: 'container',
				width: '75%',
				padding: '10 0 10 20',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'container',
					hidden: true,
					defaultShow: false,
					itemId: 'creditCardCnt',
					items: [{
						xtype: 'textfield',
						fieldLabel: 'Card Number',
						maskRe: /^[0-9\b]+$/,
						value: '4617-8654-0029-9627',
					},{
						xtype: 'textfield',
						fieldLabel: 'CVV',
						maskRe: /^[0-9\b]+$/,
						inputType: 'password',
						width: 140
					},{
						xtype: 'textfield',
						fieldLabel: 'Card Holder Name',
						value: ''
					},{
						xtype: 'fieldcontainer',
						fieldLabel: 'Expiry Date',
						layout: 'hbox',
						items:[{
							xtype: 'combobox',
							width: 75,
							queryMode: 'local',
							store: ['Month','1','2','3','4','5','6','7','8','9','10','12'],
							value: 'Month'
						},{
							xtype: 'tbspacer',
							width: 5
						},{
							xtype: 'combobox',
							queryMode: 'local',
							width: 70,
							store: ['Year','2015','2016'],
							value: 'Year'
						}]
					}]
				}]
			},{
				xtype: 'container',
				width: '75%',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'radiofield',
					name: 'cashRadio',
					itemId: 'debitRadio',
					boxLabel: 'Debit Card'
				}]
			},{
				xtype: 'container',
				width: '75%',
				padding: '10 0 10 20',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'container',
					itemId: 'debitCardCnt',
					hidden: true,
					defaultShow: false,
					items: [{
						xtype: 'textfield',
						fieldLabel: 'Card Number',
						maskRe: /^[0-9\b]+$/,
						value: '4617-8654-0029-9627',
					},{
						xtype: 'textfield',
						fieldLabel: 'CVV',
						maskRe: /^[0-9\b]+$/,
						inputType: 'password',
						width: 140
					},{
						xtype: 'textfield',
						fieldLabel: 'Card Holder Name',
						value: ''
					},{
						xtype: 'fieldcontainer',
						fieldLabel: 'Expiry Date',
						layout: 'hbox',
						items:[{
							xtype: 'combobox',
							queryMode: 'local',
							width: 75,
							store: ['Month','1','2','3','4','5','6','7','8','9','10','12'],
							value: 'Month'
						},{
							xtype: 'tbspacer',
							width: 5
						},{
							xtype: 'combobox',
							queryMode: 'local',
							width: 70,
							store: ['Year','2015','2016'],
							value: 'Year'
						}]
					}]
				}]
			},{
				xtype: 'container',
				width: '75%',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'radiofield',
					name: 'cashRadio',
					itemId: 'netBankingRadio',
					boxLabel: 'Net Banking'
				}]
			},{
				xtype: 'container',
				width: '75%',
				padding: '10 0 10 20',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'container',
					itemId: 'netBankingCnt',
					hidden: true,
					defaultShow: false,
					items: [{
							xtype: 'combobox',
							queryMode: 'local',
							store: ['Select Bank','ICICI Bank','HDFC Bank', 'Axis Bank'],
							value: 'Select Bank'
						}]
				}]
			},{
				xtype: 'tbspacer',
				height: 20
			},{
				xtype: 'container',
				width: '75%',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'textfield',
					name: 'loadAmount',
					itemId: 'loadAmount',
					maskRe: /^[0-9\b]+$/,
					labelWidth: 120,
					fieldLabel: 'Enter Amount ($)'
				}]
			},{
				xtype: 'tbspacer',
				height: 20
			},{
				xtype: 'container',
				width: '100%',
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'middle'
				},
				items: [{
					xtype: 'button',
					width: '20%',
					itemId: 'cashGoBack',
					text: 'Back'
				},{
					xtype: 'tbspacer',
					width: '10%'
				},{
					xtype: 'button',
					width: '20%',
					itemId: 'cashSubmit',
					text: 'Submit'
				}]
			},{
				xtype: 'container',
				padding: 10,
				width: '100%',
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'middle'
				},
				items: [{
					xtype: 'image',
					src: 'res/images/Payment_Card.png'
				}]
			}]
	}]
});