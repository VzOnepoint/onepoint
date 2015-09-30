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
		title: '<div class="redFontTitle">Loyalty</div>',
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
					pack: 'center',
					align: 'middle'
				},
				items: [{
					xtype: 'grid',
					itemId: 'stmtGrid',
					width: '100%',
					height: 300,
					autoScroll: true,
					tools:[{
						type:'refresh',
						tooltip: 'Refresh the statement',
						// hidden:true,
						handler: function(event, toolEl, panelHeader) {
							// refresh logic
						}
					},
					{
						type:'help',
						tooltip: 'Get Help',
						callback: function(panel, tool, event) {
							// show help here
						}
					},{
						type:'custom',
						tooltip: 'Download PDF',
						width: 'auto',
						renderTpl: [
							'<img id="" src="res/images/pdf-icon.png" role="presentation" height="16" width="16"/>'
						],
						callback: function(panel, tool, event) {
							// show help here
						}
					},{
						type:'custom',
						tooltip: 'Download Excel',
						width: 'auto',
						renderTpl: [
							'<img id="" src="res/images/excel-icon.png" role="presentation" height="16" width="16"/>'
						],
						callback: function(panel, tool, event) {
							// show help here
						}
					}],
					title: '<div style="font-weight:bold;">Statements</div>',
					store: new Ext.data.Store({
						fields: ['payeeName', 'description', 'amount', 'date', 'debit', 'debit']
					}),
					columns:[{
						dataIndex: 'payeeName',
						text: 'Name',
						menuDisabled: true,
						sortable: false,
						flex: 2
					},{
						dataIndex: 'description',
						text: 'Description',
						menuDisabled: true,
						sortable: false,
						flex: 3
					},{
						dataIndex: 'date',
						text: 'Date',
						menuDisabled: true,
						sortable: false,
						flex: 2,
						renderer: function(val){
							var dt = Ext.Date.parse(val, 'Y-m-d');
							var formatDt = Ext.Date.format(dt, 'm/d/Y');
							return '<div>'+formatDt+'</div>';
						}
					},{
						dataIndex: 'debit',
						text: 'Debit',
						menuDisabled: true,
						sortable: false,
						flex: 1,
						renderer: function(val, metaData, record, rowIdx, colIdx, store, view) {
							var amount = Ext.util.Format.currency(record.get('amount'), '',1);
							if (val) {
								metaData.tdStyle = 'background-color:pink;font-weight:bold;';
								return '<div>'+amount+'</div>';
							} else {
								return '<div></div>';
							}
						}
					},{
						dataIndex: 'debit',
						text: 'Credit',
						menuDisabled: true,
						sortable: false,
						flex: 1,
						renderer: function(val, metaData, record, rowIdx, colIdx, store, view) {
							var amount = Ext.util.Format.currency(record.get('amount'), '',1);
							if (!val) {
								metaData.tdStyle = 'background-color:orange;font-weight:bold;';
								return '<div>'+amount+'</div>';
							} else {
								return '<div></div>';
							}
						}
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
					itemId: 'stmtGoBack',
					text: 'Back'
				}]
			}]
	}]
});