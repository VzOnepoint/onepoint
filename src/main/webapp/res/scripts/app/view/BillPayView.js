/**
 * 
 */
Ext.define('wallet.view.BillPayView',{
	alias: 'widget.billpayview',
	extend: 'Ext.container.Container',
	layout: {
		type: 'hbox',
		pack: 'center',
		align: 'middle'
	},
	style: 'background-color: #FFFFFF;background: url(res/images/Verizon_Logo.jpg)',
	items:[{
		xtype: 'form',
		itemId: 'billPayPanel',
		title: '<div class="redFontTitle">OnePoint Payment - <span style="font-style:italic;">Money Transfer / Pay Bills</span></div>',
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
					name: 'billRadio',
					itemId: 'payeeRadio',
					cls: 'labelBold',
					boxLabel: 'Transfer to Payee'
				}]
			},{
				xtype: 'container',
				width: '75%',
				itemId: 'toPayeeCnt',
				hidden: true,
				padding: '0 0 0 30',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'container',
					defaults:{
						padding: '0 10 0 0',
					},
					layout: 'vbox',
					items:[{
						xtype: 'combobox',
						fieldLabel: 'To',
						labelWidth: 120,
						itemId: 'toPayee',
						queryMode: 'local',
						store: new Ext.data.Store({
							fields: ['payeeName', 'id']
						}),
						valueField:  'id',
						displayField:  'payeeName',
						value: ''
					},{
						xtype: 'textfield',
						labelWidth: 120,
						fieldLabel: 'Enter Amount ($)',
						name: 'payeeAmount',
						itemId: 'payeeAmount',
						maskRe: /^[0-9\b]+$/,
						beforeLabelTextTpl: '<span style="color:red;">*</span>'
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
					xtype: 'radiofield',
					name: 'billRadio',
					itemId: 'billerRadio',
					cls: 'labelBold',
					boxLabel: 'Transfer to Billers'
				}]
			},{
				xtype: 'container',
				width: '75%',
				itemId: 'toBillCnt',
				hidden: true,
				padding: '0 0 0 10',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items: [{
					xtype: 'container',
					defaults: {
						padding: '0 10 0 0',
					},
					layout: 'vbox',
					items: [{
						xtype: 'combobox',
						fieldLabel: 'Select Biller',
						itemId: 'toBiller',
						labelWidth: 120,
						queryMode: 'local',
						store: new Ext.data.Store({
							fields: ['payeeName', 'id']
						}),
						valueField:  'id',
						displayField:  'payeeName',
					},{
						xtype: 'textfield',
						labelWidth: 120,
						fieldLabel: 'Enter Amount ($)',
						name: 'amount',
						itemId: 'billAmount',
						maskRe: /^[0-9\b]+$/,
						beforeLabelTextTpl: '<span style="color:red;">*</span>'
					},{
						xtype: 'textfield',
						labelWidth: 120,
						fieldLabel: 'Description',
						name: 'description',
						itemId: 'description'
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
					scale: 'medium',
					width: '20%',
					itemId: 'billGoBack',
					text: 'Back'
				},{
					xtype: 'tbspacer',
					width: '10%'
				},{
					xtype: 'button',
					width: '20%',
					scale: 'medium',
					itemId: 'billSubmit',
					text: 'Submit'
				}]
			},{
				xtype: 'tbspacer',
				height: 20
			},{
				xtype: 'container',
				width: '75%',
				height: 30,
				layout: {
					type: 'vbox',
					pack: 'center',
					align: 'center'
				},
				itemId: 'billPayeeResult',
				html: ''
			}]
	}]
});