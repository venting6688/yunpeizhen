<template>
	<view class="box">
		<bar />
		<view class="head">
			<view>
				<view class="name" @click="headBtn(1)">
					<view :class="{black:headIndex===1}">
						未缴费
					<view class="wire" :class="{blue:headIndex===1}"></view>
					</view>
				</view>
				<view class="name" @click="headBtn(2)">
					<view :class="{black:headIndex===2}">
						缴费记录
						<view class="wire" :class="{blue:headIndex===2}"></view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="information">
			<ul v-if="headIndex===1 && !loading.loadingState">
				<li v-for="(item,index) in billList" :key="index">
					<view class="middle">
						<view class="title">
							<view class="time">
								2023年12月20日
							</view>
							<view class="clinic">
								<text>就诊科室：{{item.admDept}}</text>
								<text>就诊医生：{{item.admDoctor}}</text>
							</view>
							
						</view>
						<view class="center"  v-for="(i,x) in item.itemList.item" :key="x">
							<view class="no">
								<view class="name">
									{{i.itemName}}
								</view>
								<view class="price">
									<text>单价：{{i.itemPrice}}</text>
									<text>￥{{i.itemSum}}</text>
								</view>
							</view>
							
						</view>
					</view>
					<view class="totalMoney">
						<view class="">
							<text>待缴费金额：</text>
							<text>{{item.orderSum}}元</text>
						</view>
					</view>
					<view class="btn">
						<view class="medical">
							医保支付
						</view>
						<view class="self-paying" @click="pay(item)">
							立即缴费
						</view>
					</view>
				</li>
			</ul>
			<view class="loading" v-else-if="loading.loadingState">
				<van-loading size="24px" vertical>{{loading.loadingName}}</van-loading>
			</view>
			<ul v-if="headIndex===2">
				<li @click="particulars" v-for="item in patientList" :key="item.departmentName">
					<view class="middle">
						<view class="title">
							<view class="header">
								<view class="time">
								    2023年12月20日
							    </view>
								<view class="delete">
									<text>费用明细</text>
									<image src="../static/image/Vector@2x.png" mode=""></image>
								</view>
							</view>
							
							<view class="clinic">
								<text>就诊科室：呼吸内科门诊</text>
								<text>就诊医生：张海松/主任医师</text>
							</view>
							
						</view>
						<view class="list">
							<view>
								<text>挂号费用：</text>
								<text>20:00元</text>
							</view>
							<view>
								<text>检查费用：</text>
								<text>11:00元</text>
							</view>
							<view>
								<text>检验费用：</text>
								<text>130:00元</text>
							</view>
							<view>
								<text>药品费用：</text>
								<text>200:00元</text>
							</view>
							<view>
								<text>治疗费用：</text>
								<text>120:00元</text>
							</view>
							
						</view>
					</view>
					<view class="totalMoney">
						<view>
							<text>合计：</text>
							<text class="black">44.94元</text>
						</view>
					</view>
					
				</li>
			</ul>
		</view>
		<Toast v-if="toastState" @back="closeToast" :second="toastObj.second" :message="toastObj.message" :tips="toastObj.tips" :url="toastObj.url" />
	</view>
</template>

<script>
	import bar from '../components/bar.vue'
	import Toast from '../components/toast.vue'
	import { mapState } from 'vuex'
	import outpatientExpenditureApi from '@/api/outpatientExpenditureApi.js'
	export default {
		components:{
			bar,
			Toast,
		},
		data(){
			return {
				headIndex:1,
				list1:[],
				list2:[],
				billList:[],
				loading:{
					loadingState:false,
					loadingName:'加载中',
				},
				second:3,
				message:'',
				toastState:false,
				toastObj:{}
			}
		},
		computed: {
			...mapState({ footData: state => state.footData })
		},
		mounted(){
			
			this.queryMedicalRecords()
			
			// this.toastState = true
			// this.toastObj = {
			// 	second:300,
			// 	message:'结算完成',
			// }
			
		},
		methods: {
			closeToast(state){
				console.log('state',state)
				this.toastState = state
			},
			particulars(){
				uni.navigateTo({
					url: `/sub_packages/outpatientExpenditure/particulars`
				})
			},
			async queryMedicalRecords(){
				if(this.footData.patientUniquelyIdentifies){
					// this.loading = {
					// 	loadingState:true,
					// 	loadingName:'加载中',
					// }
					let time = await this.getLastWeek()
					let msg = {
						patientID:this.footData.patientUniquelyIdentifies, 
						startDate:time.startDate,
						endDate:time.endDate,
					}
					console.log(time)
					console.log(msg)
					this.billList = [
						{
							admDept:'呼吸内科',
							admDoctor:'张三',
							itemList:{
								item:[
									{
										itemName:'肺力咳胶囊',
										itemPrice:'29.8*1',
										itemSum:'29.8'
									},
									{
										itemName:'蛇胆川贝液',
										itemPrice:'7.57*2',
										itemSum:'15.14'
									}
								]
							},
							orderSum:'44.94'
						}
					]
				 //    outpatientExpenditureApi.queryMedicalRecords(msg).then(res => {
					// 	console.log('res',res)
					// 	if(res.data.code===200){
					// 		// 
					// 		this.list1 = res.data.data.admList.admItem
					// 		// this.billList = this.list1
					// 		for (let i = 0; i < this.list1.length; i++) {
					// 			let data = {
					// 				patientID:this.footData.patientUniquelyIdentifies,  
					// 				visitNumber:this.list1[i].adm,
					// 				startDate:time.startDate,
					// 				endDate:time.endDate,
					// 			}
					// 			outpatientExpenditureApi.getToBePaid(data).then(result => {
					// 				console.log('result',result)
					// 				if(res.data.code===200){
					// 					if(res.data.data.resultCode!==-1){
					// 						this.list2 = result.data.data.payOrdList.payOrder
					// 						if(this.list2.length){
					// 							this.loading = {
					// 								loadingState:false,
					// 							}
					// 							for (let j = 0; j < this.list2.length; j++) {
					// 							    this.$set(this.list2[j],'admDept',this.list1[i].admDept)
					// 							    this.$set(this.list2[j],'admDoctor',this.list1[i].admDoctor)
					// 							    this.$set(this.list2[j],'adm',this.list1[i].adm)
					// 						    	this.billList.push(this.list2[j])
					// 						    }
					// 						}
											
					// 						console.log('this.billList',this.billList)
					// 					}else{
					// 						Toast({
					// 						    duration: 0,
					// 						    forbidClick: true, // 禁用背景点击
					// 						    selector: '#custom-selector'
					// 						});
					// 						this.second = 5;
					// 						this.message = res.data.data.resultMsg
					// 						const timer = setInterval(() => {
					// 						    this.second--;
					// 						    if (!this.second) {
					// 						        clearInterval(timer);
					// 						        Toast.clear();
					// 						    }
					// 						}, 1000);
					// 					}
										
					// 				}
					// 			})
					// 		}
					// 	}
						
					// })
				}
			},
			pay(item){
				let loginValue = uni.getStorageSync("loginData");
				let data = JSON.parse(loginValue)
				let msg = {
					patientID:this.footData.patientUniquelyIdentifies,
					patientName:this.footData.patientName,
					patientOpenid:data.xcxOpenId,
					visitNumber:item.adm,
					orderNo:item.orderNo,
					orderSum:item.orderSum,
				}
				outpatientExpenditureApi.toBePaidPreOrder(msg).then(result => {
					console.log('result',result)
					let obj = result.data.data.prePayResponse
					uni.requestPayment({
						provider: 'wxpay', // 服务提提供商
						timeStamp: obj.body.miniPayRequest.timeStamp, // 时间戳
						nonceStr: obj.body.miniPayRequest.nonceStr, // 随机字符串
						package: obj.body.miniPayRequest.pkg,
						signType: obj.body.miniPayRequest.signType, // 签名算法
						paySign: obj.body.miniPayRequest.paySign, // 签名
						success: function (res) {
							console.log('支付成功',res);
							this.loading = {
								loadingState:true,
								loadingName:'正在查询支付结果',
							}
							this.queryPayResultForToBePaid(result.data.data)
						},
						fail: function (err) {
							console.log('支付失败',err);
							let cancelPreSettlementData = {
								patientID:result.data.data.patientID,
								visitNumber:item.adm,
								orderNo:result.data.data.orderNo,
							}
							outpatientExpenditureApi.cancelPreSettlement(cancelPreSettlementData).then(r => {
								console.log('取消预结算',r)
								
							})
						}
					});
				})
				
				
			},
			queryPayResultForToBePaid(data){
				outpatientExpenditureApi.queryPayResultForToBePaid(data).then(res => {
					if(res.data.code===999){
						this.queryPayResultForToBePaid(data)
					}else if(res.data.code===200){
						this.loading = {
							loadingState:false,
						}
						console.log('结果',res)
					}
				})
				.catch(err => {
					console.log('errrrrr：', err);
				})
			},
			// 获取近一周的时间
			getLastWeek() {
			    const now = new Date();
			    const year = now.getFullYear();
			    const month = now.getMonth() + 1;
			    const day = now.getDate();
			    let dateRange = {};
			    dateRange.endDate = `${year}-${this.padDate(month)}-${this.padDate(day)}`;
			    const oneDayMs = 24 * 60 * 60 * 1000; 
			    const sevenDaysAgo = now.getTime() - 7 * oneDayMs;
			    const startDate = new Date(sevenDaysAgo);
			    const startYear = startDate.getFullYear();
			    const startMonth = startDate.getMonth() + 1;
			    const startDay = startDate.getDate();
			    dateRange.startDate = `${startYear}-${this.padDate(startMonth)}-${this.padDate(startDay)}`;
			    return dateRange;
			},
			padDate(value) {
			    return value < 10 ? '0' + value : value
			},
			
			headBtn(num){
				this.headIndex = num
			},
		},
		
	}
</script>

<style lang="less" scoped>
	.box {
		width: 100vw;
		height: 100%; 
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		
		.head {
			width: 681.3rpx;
			margin: 20rpx auto 0  auto;
			background: #ffffff;
			// height: 120rpx;
			
			border-radius: 12rpx 12rpx 0 0;
			>view{
				padding-top: 20rpx;
				margin: 0 20rpx;
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #eeeeee;
				
				.name {
					display: flex;
					align-items: center;
					margin-right:40rpx;
					font-family: PingFang SC, PingFang SC-600;
					color: #000000;
					padding: 10rpx 0;
					font-size: 32rpx;
					line-height: 32rpx;
					color: #8a8a8a;
										
				}
				
				.wire {
					width: 92rpx;
					height: 8rpx;
					margin: 18rpx auto 0 auto;
					border-radius: 8rpx;
				}
				.blue {
					background: #4286ff;
				}
				.black {
					color: #000000;
				}
			}
			
			
		}
		.information {
			width: 100%;
			overflow: auto;
			margin: 0 auto 60rpx auto;
			ul {
				width: 681.3rpx;
				margin: 0 auto;
				background: #ffffff;
				border-radius:0 0 12rpx 12rpx;
				> li {
					width: 681.3rpx;
					&:first-child{
						>view {
							border: 0;
						}
						
					}
					
					.middle{
						padding-bottom: 20rpx;
						margin: 0 20rpx;
						border-top: 2rpx solid #eeeeee;
						
						.title {
							.time {
							    padding: 15rpx 0;
							}
							.header {
								
								display: flex;
								justify-content: space-between;
								align-items: center;
								
								image {
									width: 12rpx;
									height: 18rpx;
									margin-left:20rpx;
								}
								.delete {
									display: flex;
									align-items: center;
									font-size: 26.72rpx;
									line-height: 26.72rpx;
									font-family: PingFang SC, PingFang SC-400;
									font-weight: 400;
									color: #4286ff;
									padding-top: 15rpx;
								}
							}
							
							
							.clinic {
								margin: 10rpx 0;
								font-size: 24rpx;
								color: #103060 !important;
								display: flex;
								justify-content: space-between;
								
							}
							
							
							
						}
						.center {
							display: flex;
							.no {
								width: 100%;
								font-size: 24rpx;
								margin: 14rpx 0;
								
								.price{
									display: flex;
									justify-content: space-between;
									text {
										&:nth-child(1){
											color: #999999;
										}
										&:nth-child(2){
											color: #333333;
										}
									}
								}
								
							}
						}
						.list {
							font-size: 26rpx;
							>view {
								margin: 10rpx 0;
								>text{
									&:first-child{
										color: #888888;
									}
								}
							}
						}
					}
					.totalMoney{
						
						text-align: right;
						view {
							padding: 10rpx 0 20rpx 0;
							margin: 0 20rpx;
							text{
								&:last-child{
									color: red;
								}
							}
							.black {
								color: #000000 !important;
							}
						}
					}
					.btn {
						display: flex;
						justify-content: space-around;
						width: 681.3rpx;
						padding-bottom: 60rpx;
						margin: 0 auto;
						view {
							width: 304rpx;
							height: 84rpx;
							border-radius: 46rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							color: #ffffff;
							font-size: 32rpx;
							line-height: 32rpx;
							
							&:first-child{
								background: #3cd0aa;
							}
							&:last-child{
								background: #4286ff;
							}
						}
					}
					
					
				}
			}
			.loading {
				width: 681.3rpx;
				margin: 0 auto;
				background: #ffffff;
				min-height: 500rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		
	}
</style>