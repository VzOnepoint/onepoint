/**
 * 
 */
Ext.define('wallet.view.LoginView',{
	alias: 'widget.loginview',
	itemId: 'loginview',
	extend: 'Ext.container.Container',
	layout: {
		type: 'border'
	},
	height: '100%',
	style: 'background-color: #FFFFFF;background: url(res/images/Verizon_Logo.jpg)',
	items: [{
		xtype: 'container',
		region: 'north',
		height: '25%'
	},{
		xtype: 'container',
		region: 'south',
		height: '25%'
	},{
		xtype: 'container',
		region: 'east',
		width: '15%'
	},{
		xtype: 'container',
		region: 'west',
		width: '15%'
	},{
		xtype: 'form',
		itemId: 'loginForm',
		title: '<div class="redFont">Login</div>',
		region: 'center',
		width: '100%',
		height: '100%',
		style: 'background:url(res/images/vz_logo.jpg) 50% 50%;',
		layout:{
			type: 'vbox',
			pack: 'center'
		},
		items:[{
			xtype: 'container',
			width: '100%',
			padding: '0 0 10 0',
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Let\'s start by verifying your phone number',
				labelSeparator: '',
				labelAlign: 'top',
				maskRe: /^[0-9\b]+$/,
				itemId: 'mdnText',
				name: 'mdn',
				enforceMaxLength: true,
				maxLength: 10,
				emptyText: 'Enter 10-digit mobile number'
			}]
		},{
			xtype: 'container',
			width: '100%',
			itemId: 'nameCnt',
			hidden: true,
			padding: '0 0 10 0',
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Enter Name',
				labelSeparator: '',
				labelAlign: 'top',
				name: 'userName',
				itemId: 'name',
				allowBlank: false,
				enforceMaxLength: true,
				minLength: 5,
				emptyText: 'Minimum 5 Characters'
			}]
		},{
			xtype: 'container',
			width: '100%',
			itemId: 'pinCnt',
			hidden: true,
			padding: '0 0 10 0',
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Enter 6 Digit PIN Number',
				inputType: 'password',
				labelSeparator: '',
				labelAlign: 'top',
				maskRe: /^[0-9\b]+$/,
				itemId: 'pintText',
				name: 'password',
				enforceMaxLength: true,
				maxLength: 6,
				emptyText: 'Enter 10-digit mobile number'
			}]
		},{
			xtype: 'container',
			padding: '0 0 10 0',
			itemId: 'rePinCnt',
			hidden: true,
			width: '100%',
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Re-Enter 6 Digit PIN Number',
				labelSeparator: '',
				inputType: 'password',
				labelAlign: 'top',
				maskRe: /^[0-9\b]+$/,
				itemId: 'rePintText',
				enforceMaxLength: true,
				maxLength: 6,
				emptyText: 'Enter 10-digit mobile number'
			}]
		},{
			xtype: 'container',
			padding: '0 0 10 0',
			width: '100%',
			layout: {
				type: 'hbox',
				pack: 'center'
			},
			items: [{
				xtype: 'button',
				width: '20%',
				scale: 'medium',
				text: 'OK',
				itemId: 'okBtn'
			}]
		}]
	}]
});