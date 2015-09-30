/**
 * 
 */
Ext.define('wallet.view.LoyaltyView',{
	alias: 'widget.loyaltyview',
	extend: 'Ext.container.Container',
	layout: {
		type: 'hbox',
		pack: 'center',
		align: 'middle'
	},
	style: 'background-color: #FFFFFF;background: url(res/images/Verizon_Logo.jpg)',
	items:[{
		xtype: 'form',
		itemId: 'loyaltyPanel',
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
				height: 200,
				padding: '20 20 20 20',
				layout: {
					type: 'vbox',
					pack: 'center',
					align: 'middle'
				},
				items:[{
					xtype: 'container',
					style: 'cursor:pointer;',
					itemId: 'points'
					
				},{
					xtype: 'container',
					html: '<span style="font-weight:bold;font-style:italic;font-size:10pt;">click on points to encash</span>'
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
					width: '10%',
					itemId: 'loyaltyGoBack',
					text: 'Back'
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
				itemId: 'result',
				html: ''
			},{
				xtype: 'tbspacer',
				height: 30
			},{
				xtype: 'container',
				width: '85%',
				padding: '0 0 20 0',
				layout: {
					type: 'vbox',
					pack: 'center',
					align: 'center'
				},
				items: [{
					xtype: 'fieldcontainer',
					width: '100%',
					labelAlign: 'top',
					fieldLabel: '<span style="font-weight:bold;font-style:italic;font-size:8pt;">Our valuable partners are</span>',
					defaults: {
						padding: '0 10 0 0',
					},
					layout: 'hbox',
					items: [{
						xtype: 'image',
						height: 35,
						width: 115,
						src: 'res/images/partners/Macys-logo.png'
					},{
						xtype: 'image',
						height: 35,
						width: 45,
						src: 'res/images/partners/Mcdonalds_logo.png'
					},{
						xtype: 'image',
						height: 35,
						width: 115,
						src: 'res/images/partners/Papa_Johns.png'
					},{
						xtype: 'image',
						height: 35,
						width: 75,
						src: 'res/images/partners/Sears_Logo.png'
					},{
						xtype: 'image',
						height: 35,
						width: 75,
						src: 'res/images/partners/Subway_Logo.png'
					},{
						xtype: 'image',
						height: 35,
						width: 125,
						src: 'res/images/partners/Walmart_Logo.png'
					}]
				}]
			},{
				xtype: 'container',
				width: '75%',
				padding: '20 0 0 0',
				layout: {
					type: 'vbox',
					pack: 'start',
					align: 'left'
				},
				items:[{
					xtype: 'container',
					itemId: 'offersCnt',
					layout: 'vbox',
					width: '100%'
				}]
			}]
	}]
});