<template>
	<view class="doctorsDetails">
		<view class="middle">
			<view class="center">
				<view class="datum">
					<view class="img">
						<image src="../../static/image/doctor.png" mode=""></image>
					</view>
					<view class="message">
						<view class="name">
						    <text>{{doctor.DoctorName||''}}</text>
						    <text>{{doctor.DoctorSessType||''}}</text>
					    </view>
						<view class="synopsis">
							擅长治疗慢性支气管炎、肺气肿、肺心病、支气管哮喘、呼吸衰竭、肺部感染、肺癌、胸膜疾病擅长治疗慢性支气管炎、肺气肿、肺心病、支气管哮喘、呼吸衰竭、肺部感染、肺癌、胸膜疾病、肺间质...
						</view>
					</view>
				</view>
				<view class="information">
					<view>
						<text >{{doctor.clinic || ''}}</text>
						<text>肾内科门诊</text>
					</view>
					<view>
						<text>科室地点</text>
						<text>门诊口三楼内科诊区</text>
					</view>
					<view>
						<text>诊查费</text>
						<text class="money">￥{{doctor.Fee || ''}}</text>
					</view>
					<view>
						<text>就诊日期</text>
						<view class="time">
							<!-- <text class="twoDays">两天后</text> -->
						    <text>{{doctor.ServiceDate||''}} {{doctor.SessionName||''}}</text>
						</view>
					</view>
					<view>
						<text>就诊时间</text>
						<view class="time">
							<text>{{doctor.StartTime||''}}-{{doctor.EndTime||''}}</text>
							<!-- <image src="@/static/image/more/FrameRight.png" mode=""></image> -->
						</view>
					</view>
				</view>
			</view>
			<view class="me">
				<view class="title">
					就诊人
				</view>
				<view class="name">
					<text>{{footData.patientName ? footData.patientName:''}}</text>
					<!-- <image src="@/static/image/more/FrameRight.png" mode=""></image> -->
				</view>
			</view>
			<view class="tips">
				<view class="tips-head">
					温馨提示
				</view>
				<view class="tips-middle">
					<view v-for="(item,index) in tipsList" :key="index">
						<text>★</text>
						<text>{{item}}</text>
					</view>
				</view>
			</view>
			<view class="btn">
				    <view class="confirm" @click="confirm">
			         	<text>确定预约</text>
			        </view>
			    <view class="agreement">
			    	<view @click="agreementState = !agreementState">
			    	<image v-if="agreementState" src="../static/image/icon-ok.png" mode=""></image>
			    	<text v-else class="yuan"></text>
			    	<text>预约即同意</text>
			    	</view>
			    	<text class="blue" @click="appointment">《预约须知》</text>
			    	
			    </view>
			</view>
			
		</view>
		<van-toast id="custom-selector">
			<view class="success">
				预约成功!
			</view>
		    <view class="time">
		        <text>{{second}}</text>
		        <text>秒自动为您切换便捷导引</text>
	    	</view>
		</van-toast>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Toast from '@/wxcomponents/vant/toast/toast.js';
	import registrationApi from '@/api/registrationApi.js'
	export default {
		data() {
			return {
				doctor:{
					ServiceDate:'',
					hour:'',
					DoctorName:'',
					DoctorSessType:'',
					Fee:'',
					clinic:'',
					StartTime:'',
					EndTime:''
				},
				agreementState:false,
				second:3,
				tipsList:[
					'请使用患者本人身份证和医保卡(或医保电子凭证)进行预约挂号，儿童请用儿童身份证或身份信息。',
					'如需取消预约，请在就诊前一日取消。',
					'请按照候诊时间提示到医院等待就诊，请勿迟到根据国家医保政策规定，医保患者住院期间一律不得使用医保账户支付门诊费用，否则将影响住院费用的医保报销结算。',
					'同一身份证号码，30天内总计爽约5次，进入黑名单14天，14天内不能预约就诊，可以现场挂号，14天后黑名单自动解除。黑名单触发三次以上拉黑90天。'
				]
			}
		},
		computed: { 
			...mapState({ footData: state => state.footData })
		},
		methods: {
			appointment(){
				uni.navigateTo({
					url:`/sub_packages/agreement/appointment`
				})
			},
			confirm(){
				if(!this.agreementState){
					uni.showToast({
					    title: '请先阅读预约须知',
					    icon: 'none',   
					    duration: 2000 
					}) 
					 return
				}
				let loginValue = uni.getStorageSync("loginData");
				let data = JSON.parse(loginValue)
				let msg = {
					patientID:this.footData.patientUniquelyIdentifies,
					patientName:this.footData.patientName,
					scheduleItemCode:this.doctor.scheduleItemCode,
					startTime:this.doctor.StartTime,
					endTime:this.doctor.EndTime,
					amount:this.doctor.Fee,
					patientOpenid:data.xcxOpenId,
				}
				console.log('msg',msg)
				registrationApi.registrationPreOrder(msg).then(res => {
					if(res.data.code===200) {
						console.log('支付',res)
						let obj = res.data.data.prePayResponse
						uni.requestPayment({
							provider: 'wxpay', // 服务提提供商
							timeStamp: obj.body.miniPayRequest.timeStamp, // 时间戳
							nonceStr: obj.body.miniPayRequest.nonceStr, // 随机字符串
							package: obj.body.miniPayRequest.pkg,
							signType: obj.body.miniPayRequest.signType, // 签名算法
							paySign: obj.body.miniPayRequest.paySign, // 签名
							success: function (result) {
								console.log('支付成功',result);
								registrationApi.queryPayResult(res.data.data).then(r => {
									console.log('r',r)
									Toast({
									    duration: 0,
									    forbidClick: true, // 禁用背景点击
									    selector: '#custom-selector'
									});
									this.second = 5;
									const timer = setInterval(() => {
									    this.second--;
									    if (!this.second) {
									        clearInterval(timer);
									        Toast.clear();
											wx.reLaunch({
											    url: `/pages/convenient/index`,
											})
									    }
									}, 1000);
								})
								.catch(err => {
									console.log('errrrrr：', err);
								})
							},
							fail: function (err) {
								console.log('支付失败',err);
								let unLockNumData = {
									patientID:res.data.data.patientID,
									scheduleItemCode:res.data.data.lockNumResponse.scheduleItemCode,
									lockQueueNo:res.data.data.lockNumResponse.lockQueueNo,
									transactionId:res.data.data.lockNumResponse.transactionId,
								}
								registrationApi.unLockNum(unLockNumData).then(r => {
									console.log('取消锁号',r)
									
								})
							}
						});	
						
					}
				})
				.catch(err => {
					console.log('errrrrr：', err);
				})
				
				
				
			},
			timeBtn(item){
				this.timevisitTable = item
				// uni.navigateBack({
				//     delta: 2
				// });
			},
		},
		onLoad(e) {
			wx.setNavigationBarTitle({
			      title: e.title
			})
			this.doctor = JSON.parse(decodeURIComponent(e.doctor))
			
			console.log('doctor',this.doctor,this.footData)
		},
	}
</script>

<style lang="less" scoped>
    .doctorsDetails {
	    width: 100vw;
	    height: 100%; 
	    background-color: #f5f5f5;
	    display: flex;
		// align-items: center;
	    flex-direction: column;
		
		.middle {
			overflow: auto;
			margin: 15rpx  0 50rpx 0;
			
			.center {
				width: 680rpx;
				height: 480rpx;
				background: #ffffff;
				border-radius: 11.45rpx;
				margin: 25rpx auto;
				
			
				
				.datum{
					margin:0 10rpx;
					padding: 17rpx 0;
					display: flex;
					
					.img{
						width: 122.14rpx;
						height: 152.67rpx;
						border-radius: 9.54rpx;
						image{
							width: 122.14rpx;
							height: 152.67rpx;
							border-radius: 9.54rpx;
						}
					}
					.message {
						margin-left:24rpx;
						.name {
							display: flex;
							align-items: center;
							position: relative;
							text {
								
								&:nth-of-type(1){
									font-size: 36rpx;
									line-height: 27rpx;
									margin-right: 20rpx;
								}
								&:nth-of-type(2){
									font-size: 30rpx;
									line-height: 23rpx;
									color: #999999;
									margin-right: 20rpx;
								}
							}
						}
						.synopsis {
							width: 508rpx;
							height: 99rpx;
							margin-top: 18rpx;
							font-size: 23rpx;
							line-height: 26rpx;
							color: #999999;
							overflow: hidden;
							display: -webkit-box; //将元素设为盒子伸缩模型显示
							-webkit-box-orient: vertical; //伸缩方向设为垂直方向
							-webkit-line-clamp: 4;  //超出3行隐藏，并显示省略号
							
						}
					}
				}
				.information {
					> view {
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 30rpx;
						margin: 16rpx 20rpx;
						
						> text {
							&:first-child{
								color: #999999;
							}
						}
						.money{
							color: #FFC03D;
						}
						.time {
							display: flex;
							align-items: center;
							color: #4286FF;
							text {
								margin-left: 20rpx;
							}
							
							.twoDays {
								width: 64.89rpx;
								height: 26.72rpx;
								background: #fffaf0;
								border-radius: 17.18rpx;
								color: #FFC03D;
								font-size: 15.27rpx;
								display: flex;
								justify-content: center;
								align-items: center;
							
							}
							
							image {
								width: 27rpx;
								height: 27rpx;
								margin-left: 10rpx;
							}
						}
						
												
					}
				}
			}
			.me {
				width: 680rpx;
				height: 72rpx;
				background: #ffffff;
				border-radius: 11.45rpx;
				margin: 25rpx auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 27rpx;
				
				>.title {
					color: #999999;
					line-height: 27rpx;
					margin-left: 20rpx;
				}
				>.name {
					margin-right: 20rpx;
					color: #4286ff;
					display: flex;
					align-items: center;
					
					text {
						line-height: 27rpx;
					}
					
					image {
						width: 27rpx;
						height: 27rpx;
						margin-left: 10rpx;
					}
				}
			}
			.tips {
				width: 680rpx;
				height: 500rpx;
				background: #ffffff;
				border-radius: 11.45rpx;
				margin: 25rpx auto;
				
				.tips-head {
					margin: 20rpx 15rpx;
					padding-top: 20rpx;
				}
				
				.tips-middle {
					> view {
						margin: 20rpx 15rpx;
						display: flex;
						font-size: 22.9rpx;
						line-height: 40 rpx;
						
						&:first-child{
							color: #FFC03D;
						}
						
						text {
							&:first-child{
								margin-right: 14rpx;
							}
						}
					}
				}
			}
			.btn {
				width: 100%;
				position: absolute;
				bottom: 110rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.confirm{
					width: 681.3rpx;
					height: 87.79rpx;
					background: #4286ff;
					border-radius: 43.89rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #ffffff;
					font-size: 30.53rpx;
					line-height: 30.53rpx;
					margin-bottom: 40rpx;
					
					text {
						letter-spacing: 4rpx;
						padding-left: 4rpx;
					}
					
				}
				.agreement {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #999999;
					
					>view {
						display: flex;
						align-items: center;
						justify-content: center;
						.yuan{
							width: 26rpx;
							height: 26rpx;
							border: 2rpx solid #999999;
							border-radius: 50%;
							margin-right: 15rpx;
						}
						image {
							width: 32rpx;
							height: 32rpx;
							margin-right: 12rpx;
						}
					}
					
					
					.blue {
						color: #076AFF;
					}
					
				}
			}
			
		}
		// van-transition custom-class
		/deep/.van-transition {
			top: 45%;
			
			.van-toast {
				color: #0000000;
				padding:70rpx 40rpx;
				background: #ffffff;
				border-radius: 15.27rpx;
				box-shadow: 0rpx 0rpx 19.08rpx 0rpx rgba(0,0,0,0.10); 
				
				.success {
					color: #4286ff;
					font-size: 40rpx;
					line-height: 40rpx;
					margin-bottom: 60rpx;
				}
				>.time{
					font-size: 36rpx;
					line-height: 36rpx;
					>text {
						color: #999999;
						&:first-child{
							color: #ffc03d;
							margin-right: 8rpx;
						}
					}
				}
			}
		}
	}
</style>
