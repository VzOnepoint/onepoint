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
						type: 'balField',
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
		title: '<div class="redFontTitle">Actions</div>',
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
				'<img id="" src="res/images/Logout.png" role="presentation" height="15" width="15"/>'
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
		items: [{
			xtype: 'container',
			width: '30%',
			padding: '0 0 10 0',
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
				items:[{
						xtype: 'container',
						html: '<img src="./res/images/Load_Cash.jpg" height="50" width="50"/>'
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
			padding: '0 0 10 0',
			width: '30%',
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
				items:[{
					xtype: 'container',
					html: '<img src="./res/images/Payee.jpg" height="50" width="50"/>'
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
			padding: '0 0 10 0',
			width: '30%',
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
				items:[{
					xtype: 'container',
					html: '<img src="./res/images/Money_Transfer.jpg" height="50" width="50"/>'
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
			padding: '0 0 10 0',
			width: '30%',
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
				items:[{
					xtype: 'container',
					html: '<img src="./res/images/Loyalty_Offers.jpg" height="50" width="50"/>'
				},{
					xtype: 'tbspacer',
					width: 10
				},{
					xtype: 'container',
					height: '100%',
					width: '100%',
					html: '<b><span style="cursor:pointer;" id="loyalty">Loyalty Points / Offers</span></b>'
				}]
			}]
		},{
			xtype: 'container',
			width: '30%',
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
				items:[{
					xtype: 'container',
					html: '<img src="./res/images/statement-icon.png" height="50" width="50"/>'
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