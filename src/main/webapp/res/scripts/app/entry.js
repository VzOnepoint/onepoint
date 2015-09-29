//baseOnePointURL = '/vzwallet/rest';
baseOnePointURL = '/rest';
userName = '';
sessionExpireCallBack = function() {
	Ext.Msg.alert('One Point', 'Session has expired. Please Login', function() {
		window.location.href = 'index.jsp';
	});
};
balAmountCheck = function() {
	var balance = 0.0;
	Ext.Ajax.request({
		url: baseOnePointURL+'/banking/getBalance',
		async: false,
		success: function(response) {
			var res = Ext.decode(response.responseText);
			if (res.errorcode === 3) {
				sessionExpireCallBack();
			} else {
				balance = res.account.balance+'';
			}
		}
	});
	return Ext.util.Format.currency(balance, '$ ', 1);
}
Ext.application({
	name: 'wallet',
	appFolder: 'res/scripts/app',
	requires: ['wallet.view.LoginView', 'wallet.view.DecisionView', 'wallet.view.CashView', 'wallet.view.AddPayeeView', 'wallet.view.BillPayView', 'wallet.view.LoyaltyView'],
	controllers: ['VZWalletController'],
	launch: function() {
		Ext.create('Ext.container.Viewport',{
			renderTo: Ext.getBody(),
			id: 'viewport',
			itemId: 'viewport',
			layout: 'fit',
			items:[{
				xtype: 'loginview',
				itemId: 'loginview'
			},
			{
				xtype: 'decisionview',
				hidden: true
			},{
				xtype: 'cashview',
				hidden: true
			},{
				xtype: 'addpayeeview',
				hidden: true
			},{
				xtype: 'billpayview',
				hidden: true
			},{
				xtype: 'loyaltyview',
				hidden: true
			}]
		});
	}
});