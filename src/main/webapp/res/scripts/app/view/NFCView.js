/**
 * 
 */
Ext.define('wallet.view.NFCView',{
	alias: 'widget.nfcview',
	extend: 'Ext.container.Container',
	layout: {
		type: 'hbox',
		pack: 'center',
		align: 'middle'
	},
	style: 'background-color: #FFFFFF;background: url(res/images/Verizon_Logo.jpg)',
	items:[{
		xtype: 'form',
		itemId: 'nfcPanel',
		title: '<div class="redFontTitle">OnePoint Payment - <span style="font-style:italic">Pay By NFC / IOT</span></div>',
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
		items: [{
				xtype: 'container',
				width: '75%',
				padding: '10 0 10 20',
				layout: {
					type: 'vbox',
					pack: 'center',
					align: 'middle'
				},
				items: [{
					xtype: 'container',
					height: 50,
					padding: 10,
					html: '<div style="font-size:35pt;font-weight:bold;">Biller - Wallmart</div>'
				},{
					xtype: 'container',
					padding: 5,
					html: '<div style="font-size:12pt;color:#ABABAB;">Requesting $1 By NFC / IOT</div>'
				}]
			},{
				xtype: 'tbspacer',
				height: 20
			},{
				xtype: 'container',
				padding: '0 0 20 0',
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
					itemId: 'nfcGoBack',
					text: 'Back'
				},{
					xtype: 'tbspacer',
					width: '10%'
				},{
					xtype: 'button',
					width: '20%',
					scale: 'medium',
					itemId: 'nfcApprove',
					text: 'Approve'
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
					itemId: 'nfcResult',
					html: ''
				}]
			}]
	}]
});