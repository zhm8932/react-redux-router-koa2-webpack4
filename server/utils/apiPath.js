
//API地址

module.exports =  {

	//注册登录
	accountRegister:'account/register',	//注册
	accountLogin:'account/login',
	accountLogout:'account/logout',  //安全退出
	accountCheckMobile:'account/check/mobile',  //检测手机号
	accountForgetPassword:'account/forget/password',  //忘记密码
	accountAuthMobile:'account/auth/newMobile',  //鉴权手机号

	//验证码
	captchaPicture:'captcha/picture',  //图片验证码
	captchaSmsCode:'captcha/send/smsCode',  //短信验证码
	captchaCardSmsCode:'captcha/bind/card/smsCode',  //绑卡验证码

	//交易密码
	passwordSet:'password/set/payPassword',  //设置
	passwordModify:'password/modify/payPassword',  //修改
	passwordForget:'password/forget/payPassword',  //忘记
	passwordVerify:'password/verify/payPassword',  //验证

	//文件
	fileUpload:'file/upload',  //上传
	fileupload64:'file/upload64',  //上传base64
	fileTreaty:'file/static/treaty',  //静态协议 ABOUT_US;关于我们 PRODUCTION_INTRODUCTION;产品介绍 USER_HELP; 用户帮助 STORE_BRANCH; 门店地址 LIFE_INSURANCE_PROTOCOL;寿险计划 REGISTRATION_PROTOCOL;注册协议 BROKEN_SCREEN_INTRODUCTION 碎屏险

	//额度

	loanApplyNo:'loan/get/applyNo',  //获取申请单号,创建新单号
	loanApplyLimit:'loan/apply/limit',  //额度申请
	loanFaceIdentify:'loan/face/identify',  //人脸识别验证

	paygwCardInfo:'paygw/cardInfo',		//根据银行卡查询银行信息

	creditLimit:'credit/limit',  		//查询我的额度
	applyConfirmContract:'apply/confirmContract',  		//用户确认合同
	getApplyDetail:'apply/getApplyDetail',  		//申请单状态
	getLatestApply:'apply/getLatestApply',  		//最近一笔申请单查询
	getApplyContract:'apply/getContract',  			//获取用户合同
	getApplyTemplate:'apply/getTemplate',  			//获取协议内容


	comboList:'combo/list',						//套餐列表
	comboRecommend:'combo/recommend',			//推荐套餐列表
	comboDetail:'combo/detail',					//套餐详情
	merchantNearby:'merchant/get/nearby',		//获取附近（推荐）商家
	merchantCategory:'merchant/get/category',	//获取品类列表
	merchantFilter:'merchant/filter',			//筛选商家列表
	merchantInfo:'merchant/get/infos',			//·根据城市、搜索条件搜索商家列表
	merchantDetail:'merchant/get/detail',		//商户详情


	//我的收藏
	customerAdd:'customer/add',			//添加收藏
	customerDel:'customer/del',  		//删除收藏
	customerCancel:'customer/cancel',  		//取消收藏
	customerIsCollect:'customer/isCollect',  //是否已收藏

	//客户
	custRealName:'cust/real/name/verify',  //实名认证
	custIdent:'cust/ident/verify',  		//身份验证
	custSubmitInfo:'cust/submit/info',  //提交客户信息
	custBasicToken:'cust/auth/token',  //获取征信token
	custIdentInfo:'cust/get/ident/info',  //获取身份信息
	addBankCard:'bank/add/bankCard',  //添加银行卡


	//优惠券
	couponMerchantList:'coupon/merchant/getlist',
	couponAdd:'coupon/add/',   //领取优惠券


	//邀请活动
	getAllInviteActivity:'invite/getAllInviteActivity',
	getInviteDetail:'invite/inviteDetail',
	getInviteCouponDetail:'invite/coupon/detail',  //活动奖励明细

	//活动
	activityMain:'activity/maininfo',  //推广活动
	activityTab:'activity/tab/get',

	//爬虫
	crawlerAuthen:'crawler/authen',

};