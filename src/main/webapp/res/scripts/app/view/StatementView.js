/**
 * 
 */
Ext.define('wallet.view.StatementView',{
	alias: 'widget.statementview',
	extend: 'Ext.container.Container',
	layout: {
		type: 'hbox',
		pack: 'center',
		align: 'middle'
	},
	style: 'background-color: #FFFFFF;background: url(res/images/Verizon_Logo.jpg)',
	items:[{
		xtype: 'form',
		itemId: 'stmtPanel',
		title: '<div class="redFont">Loyalty</div>',
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
					pack: 'center',
					align: 'middle'
				},
				items: [{
					xtype: 'grid',
					itemId: 'stmtGrid',
					width: '100%',
					height: '40%',
					autoScroll: true,
					title: 'Statements',
					store: new Ext.data.Store({
						fields: ['payeeName', 'description', 'amount', 'date', 'debit', 'debit']
					}),
					columns:[{
						dataIndex: 'payeeName',
						text: 'Name',
						menuDisabled: true,
						sortable: false,
						flex: 1
					},{
						dataIndex: 'description',
						text: 'Description',
						menuDisabled: true,
						sortable: false,
						flex: 1
					},{
						dataIndex: 'date',
						text: 'Date',
						menuDisabled: true,
						sortable: false,
						flex: 1
					},{
						dataIndex: 'debit',
						text: 'Debit',
						menuDisabled: true,
						sortable: false,
						flex: 1,
						renderer: function(val, metaData, record, rowIdx, colIdx, store, view) {
							if (val) {
								return '<div style="border:1px solid green;">'+record.get('amount')+'</div>';
							} else {
								return '<div>&nbsp;</div>';
							}
						}
					},{
						dataIndex: 'debit',
						text: 'Credit',
						menuDisabled: true,
						sortable: false,
						flex: 1,
						renderer: function(val, metaData, record, rowIdx, colIdx, store, view) {
							if (!val) {
								return '<div  style="border:1px solid red;">'+record.get('amount')+'</div>';
							} else {
								return '<div>&nbsp;</div>';
							}
						}
					}]
				}]
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
					itemId: 'stmtGoBack',
					text: 'Back'
				}]
			}]
	}]
});