/**
 * 
 */
Ext.define('wallet.view.AddPayeeView',{
	alias: 'widget.addpayeeview',
	extend: 'Ext.container.Container',
	layout: {
		type: 'hbox',
		pack: 'center',
		align: 'middle'
	},
	style: 'background-color: #FFFFFF;background: url(res/images/Verizon_Logo.jpg)',
	items:[{
		xtype: 'form',
		itemId: 'addPayeePanel',
		title: '<div class="redFontTitle">OnePoint Payment - <span style="font-style:italic">Add Payee</span></div>',
		width: '75%',
		autoScroll: true,
		height: '85%',
		bodyPadding: 5,
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
						padding: '0 0 0 5',
						labelWidth: 65,
						fieldLabel: 'Welcome',
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
						labelWidth: 65,
						fieldLabel: 'Balance',
						fieldCls: 'whiteLabelBold',
						labelCls: 'whiteLabel paddingRight',
						value: ''
					}]
				}]
				
			}]
		}],
		tools: [{
			type: 'mytool',
			width: 'auto',
			renderTpl: [
				'<img id="" src="res/images/Logout.png" role="presentation" height="25" width="25"/>'
			],
			handler: function() {
				Ext.Ajax.request({
					url: baseOnePointURL+'/account/logout',
					success: function(response) {
						var response = Ext.decode(response.responseText);
						if (response.errorCode === 0) {
							window.location.href = 'index.html';
						}						
					}
				});
			}
		}],
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'middle'
		},
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
					name: 'typeOfBill',
					itemId: 'toBillers',
					cls: 'labelBold',
					boxLabel: 'Add Beneficiary'
				}]
			},{
				xtype: 'container',
				width: '75%',
				itemId: 'toBillersCnt',
				hidden: true,
				padding: '0 0 0 20',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'textfield',
					name: 'payeeName',
					fieldLabel: 'Nick Name'
				},{
					xtype: 'textfield',
					maskRe: /^[0-9\b]+$/,
					enforceMaxLength: true,
					maxLength: 10,
					name: 'accountNumber',
					fieldLabel: 'MDN'
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
					xtype: 'radiofield',
					name: 'typeOfBill',
					itemId: 'toAccount',
					cls: 'labelBold',
					boxLabel: 'Add Billers'
				}]
			},{
				xtype: 'container',
				width: '75%',
				itemId: 'toAccountCnt',
				hidden: true,
				padding: '0 0 0 20',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'textfield',
					maskRe: /^[0-9\b]+$/,
					enforceMaxLength: true,
					maxLength: 20,
					itemId: 'actNumber',
					fieldLabel: 'Account No'
				},{
					xtype: 'fieldcontainer',
					layout: 'vbox',
					defaults: {
						padding: '0 10 0 0',
					},
					items:[{
						xtype: 'combobox',
						fieldLabel: 'Biller Type',
						itemId: 'typeOfBillers',
						queryMode: 'local',
						store: new Ext.data.Store({
							fields: ['valueField', 'displayField'],
							data: [{
								'valueField': 'Insurance',
								'displayField': 'Insurance'
							},{
								'valueField': 'Electricity',
								'displayField': 'Electricity'
							},{
								'valueField': 'Telephone',
								'displayField': 'Telephone'
							}]
						}),
						valueField: 'valueField',
						displayField: 'displayField',
						value: 'Insurance'
					},{
						xtype: 'combobox',
						queryMode: 'local',
						itemId: 'sectors',
						fieldLabel: 'Merchandise',
						store: new Ext.data.Store({
							fields: ['displayField', 'valueField'],
							data:[{
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
							}]
						}),
						displayField: 'displayField',
						valueField: 'valueField',
						value: 'Aetna'
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
					xtype: 'fieldcontainer',
					defaultType: 'checkboxfield',
					layout: 'hbox',
					items:[{
						boxLabel: 'Auto Pay',
					}]
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
					scale: 'medium',
					itemId: 'payeeGoBack',
					text: 'Back'
				},{
					xtype: 'tbspacer',
					width: '10%'
				},{
					xtype: 'button',
					width: '20%',
					scale: 'medium',
					itemId: 'payeeSubmit',
					text: 'Submit'
				}]
			},{
				xtype: 'tbspacer',
				height: 20
			},{
				xtype: 'container',
				width: '75%',
				height: 20,
				layout: {
					type: 'vbox',
					pack: 'center',
					align: 'center'
				},
				itemId: 'payeeResult',
				html: ''
			}]
	}]
});