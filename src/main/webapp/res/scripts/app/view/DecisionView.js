/**
 * 
 */
Ext.define('wallet.view.DecisionView',{
	alias: 'widget.decisionview',
	extend: 'Ext.container.Container',
	layout: {
		type: 'hbox',
		pack: 'center',
		align: 'middle'
	},
	style: 'background-color: #FFFFFF;background: url(res/images/Verizon_Logo.jpg)',
	items:[{
		xtype: 'panel',
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
						type: 'balField',
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
		title: '<div class="redFontTitle">OnePoint Payment</div>',
		autoScroll: true,
		style: 'overflow-x:hidden;overflow-y:auto;',
		width: '75%',
		height: '85%',
		bodyPadding: 5,
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'middle'
		},
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
		defaults: {
			padding: '0 0 0 20',
		},
		items: [{
			xtype: 'container',
			width: '60%',
			padding: '0 0 10 20',
			layout: {
				type: 'vbox',
				pack: 'start',
				align: 'left'
			},
			items: [{
				xtype: 'container',
				layout:{
					type: 'table',
					columns: 3
				},
				itemId: 'loadCashCnt',
				style: 'cursor:pointer;',
				items:[{
						xtype: 'container',
						html: '<img src="./res/images/Load_Cash.jpg" height="50" width="50" id="loadCash" style="" />'
					},{
						xtype: 'tbspacer',
						width: 10
					},{
						xtype: 'container',
						height: '100%',
						width: '100%',
						html: '<b><span style="cursor:pointer;" id="loadCash">Load Cash</span></b>'
				}]
			}]
		},{
			xtype: 'container',
			width: '60%',
			padding: '0 0 10 20',
			layout: {
				type: 'vbox',
				pack: 'start',
				align: 'left'
			},
			items: [{
				xtype: 'container',
				layout:{
					type: 'table',
					columns: 3
				},
				itemId: 'nfcCnt',
				style: 'cursor:pointer;',
				items:[{
						xtype: 'container',
						html: '<img src="./res/images/NFC_Icon.png" height="50" width="55" id="nfc" style="" />'
					},{
						xtype: 'tbspacer',
						width: 10
					},{
						xtype: 'container',
						height: '100%',
						width: '100%',
						html: '<b><span style="cursor:pointer;" id="nfc">Pay By NFC / IOT</span></b>'
				}]
			}]
		},{
			xtype: 'container',
			padding: '0 0 10 20',
			width: '60%',
			layout: {
				type: 'vbox',
				pack: 'start',
				align: 'left'
			},
			items: [{
				xtype: 'container',
				layout:{
					type: 'table',
					columns: 3
				},
				itemId: 'addPayeeCnt',
				style: 'cursor:pointer;',
				items:[{
					xtype: 'container',
					html: '<img src="./res/images/Payee.jpg" height="50" width="50" id="addPayee" style="cursor:pointer;"/>'
				},{
					xtype: 'tbspacer',
					width: 10
				},{
					xtype: 'container',
					height: '100%',
					width: '100%',
					html: '<b><span style="cursor:pointer;" id="addPayee">Add Payee</span></b>'
				}]
			}]
		},{
			xtype: 'container',
			padding: '0 0 10 20',
			width: '60%',
			layout: {
				type: 'vbox',
				pack: 'start',
				align: 'left'
			},
			items: [{
				xtype: 'container',
				layout:{
					type: 'table',
					columns: 3
				},
				itemId: 'billPayCnt',
				style: 'cursor:pointer;',
				items:[{
					xtype: 'container',
					html: '<img src="./res/images/Money_Transfer.jpg" height="50" width="50" id="billPay" style="cursor:pointer;"/>'
				},{
					xtype: 'tbspacer',
					width: 10
				},{
					xtype: 'container',
					height: '100%',
					width: '100%',
					html: '<b><span style="cursor:pointer;" id="billPay">Transfer Money / Bill Pay</span></b>'
				}]
			}]
		},{
			xtype: 'container',
			padding: '0 0 10 20',
			width: '60%',
			layout: {
				type: 'vbox',
				pack: 'start',
				align: 'left'
			},
			items: [{
				xtype: 'container',
				layout:{
					type: 'table',
					columns: 3
				},
				itemId: 'loyaltyCnt',
				style: 'cursor:pointer;',
				items:[{
					xtype: 'container',
					html: '<img src="./res/images/Loyalty_Offers.jpg" height="50" width="50" id="loyalty" style="cursor:pointer;"/>'
				},{
					xtype: 'tbspacer',
					width: 10
				},{
					xtype: 'container',
					height: '100%',
					width: '100%',
					html: '<b><span style="cursor:pointer;" id="loyalty">Redeem Points / Offers</span></b>'
				}]
			}]
		},{
			xtype: 'container',
			width: '60%',
			layout: {
				type: 'vbox',
				pack: 'start',
				align: 'left'
			},
			items: [{
				xtype: 'container',
				layout:{
					type: 'table',
					columns: 3
				},
				itemId: 'statementCnt',
				style: 'cursor:pointer;',
				items:[{
					xtype: 'container',
					html: '<img src="./res/images/statement-icon.png" height="50" width="50" id="statement" style="cursor:pointer;"/>'
				},{
					xtype: 'tbspacer',
					width: 10
				},{
					xtype: 'container',
					height: '100%',
					width: '100%',
					html: '<b><span style="cursor:pointer;" id="statement">View Statements</span></b>'
				}]
			}]
		}]
	}]
});