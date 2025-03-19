<template>
	<view class="first">
		<view class="center" >
			<view class="head">
				<view class="">
					距离您的就诊日还有 3 天
				</view>
			</view>
			<view class="title" v-if="firstContent.callState=='已签到'">
				<!-- <view class="clinic">
					{{callObj.departmentName ?callObj.departmentName :''}}
				</view> -->
				<view class="clinic">
					消化内科二诊室
				</view>
				<view class=" title-calling">
					<view class="left">
					   <!-- <view class="no">
						    {{callObj.medicalTreatmentNumber?callObj.medicalTreatmentNumber+'号':''}}
					    </view> -->
						<view class="no">
							12号
						</view>
					    <view class="text">
						    就诊序号
					    </view>
				    </view>
					<view class="middle">
					    <!-- <view class="call">
							{{callObj.calling?callObj.calling+'号':''}}
					    </view> -->
						<view class="call">
							8号
						</view>
					    <view class="text">
						    正在呼叫
					    </view>
					</view>
				    <view class="right">
					    <view class="time">
				    		{{callObj.expectToWait?callObj.expectToWait:''}}
					    </view>
					    <view class="text">
						    预计等候
					    </view>
				    </view>
				</view>
			</view>
			<view class="wire-box" :class="{wireState:firstContent.callState!=='已签到'}">
				<view class="wire" v-if="firstContent.callState=='已签到'">
					<image src="@/static/image/Group 679.png" mode=""></image>
				    <image src="@/static/image/Group 679.png" mode=""></image>
				</view>
			</view>
			<view class="content">
				<view class="icon">
					<text>{{firstContent.callState}}</text>
					<image  v-if="firstContent.callState=='已签到'" src="@/static/image/Union.png" mode="widthFix"></image>
					<image  v-if="firstContent.callState=='未签到'" src="@/static/image/Union2.png" mode="widthFix"></image>
				</view>
				<ul>
					<li v-if="firstContent.queueName">
						<view class="attribute">
							挂号科室:
						</view>
						<view class="name">
							{{firstContent.queueName}}
						</view>
					</li>
					<li v-if="firstContent.doctorName">
						<view class="attribute">
							挂号医生:
						</view>
						<view class="name">
							{{firstContent.doctorName}}
						</view>
					</li>
					<!-- <li v-if="firstContent.callState=='已签到' && callObj.medicalTreatmentNumber">
						<view class="attribute">
							就诊序号:
						</view>
						<view class="name">
							{{callObj.medicalTreatmentNumber}}号
						</view>
					</li> -->
					<li v-if="firstContent.appointmentTime">
						<view class="attribute">
							预约时间:
						</view>
						<view class="name">
							{{firstContent.appointmentTime}}
						</view>
					</li>
					<li v-if="firstContent.queueLocation">
						<view class="attribute">
							科室位置:
						</view>
						<view class="name">
							{{firstContent.queueLocation}}
						</view>
					</li>
					<li v-if="firstContent.precautions">
						<view class="attribute">
							注意事项:
						</view>
						<view class="name">
							{{firstContent.precautions}}
						</view>
					</li>
					
				</ul>
				<view class="btn" v-if="firstContent.queueName || firstContent.doctorName">
					<view>
						<!-- <button class="cu-btn" @click="leftBtn(firstContent.callState)">{{btn(firstContent.callState)}}</button> -->
					    <button class="cu-btn" >更改预约</button>
					    <button class="cu-btn" >预约车位</button>
					    <button class="cu-btn" @click="navigation">导航到院</button>
					</view>
				</view>
				<!-- <view class="footer" v-else>
					<view>
						<text>初诊已经结束，请您移步至检查检验科室继续就诊</text>
					</view>
				</view> -->
				<view class="inquiry">
					<view>
						<view class="inquiry-box">
							<view class="left">
								<image src="../../../static/image/inquiry.png" mode=""></image>
								<text>智能问诊</text>
							</view>
							<view class="inquiryBtn" @click="navigateToPage">
								去填写
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import guideApi from '@/api/guideApi.js'
	import bus from "@/utils/bus.js";
	export default {
		props: {
		           headerEmit: Object,
		        },
		data() {
			return {
				firstContent:{},
				callObj:{
					calling:'',
					departmentName:'',
					expectToWait:'',
					medicalTreatmentNumber:''
				},
			}
		},
		mounted() {
			this.registrationCardAPI()
		},
		
		methods: {
			navigation(){
				let latitude = 36.183242794928994
				let longitude = 117.07709640617486
				wx.openLocation({
				          latitude: latitude,//目的地的纬度
				          longitude: longitude,//目的地的经度
				          name: '山东第一医科大学第二附属医院', 
				        })
			},
			navigateToPage() {
			      uni.navigateTo({
			        url: '/sub_packages/convenientModule/inquiry?params='+this.headerEmit.userId
			      });
			    },
			btn(value) {
			            switch (value) {
			                case '未签到':
			                    return '立即签到'
			                case '已签到':
			                    return '刷新呼叫信息'
			                
			                
			            }
			},
			// 签到按钮
			leftBtn(item){
				if(item=='未签到'){
					try{
						// 签到
						const res =  guideApi.signIn({
							visitNumber:this.headerEmit.visitNumber,
							signInType:'初诊',
							queueId:this.firstContent.queueId
					   }).then((res) => {
					   this.registrationCardAPI()
					           }) 
					}catch(e){
						console.log(e)
					}
					// this.firstContent.callState='已签到'
					// console.log(this.firstContent)
					// this.registrationCardAPI()
					         
					
				}else{
					this.getQueueingDTO()
				}
			},
			
			// 获取初诊数据
			async registrationCardAPI() {
				try{
					const res= await guideApi.registrationCardAPI({
						visitNumber:this.headerEmit.visitNumber,
						tag:'1',
			        }).then((res) => {
					this.firstContent = res.data?res.data:{}
					if(this.firstContent.callState=='已签到'){
						this.getQueueingDTO()
					}
			                })
				}catch(e){
					console.log(e);
				}
				
					// this.firstContent = {
					// 	queuename:'呼吸内科',
					// 	doctorName:'张海松',
					// 	queueLocation:'门诊楼三楼西侧内科门诊',
					// 	precautions:'就诊前请到分诊台检查血压',
					// 	appointmentTime:'2024/8/8 09:35',
					// 	callState:this.firstContent.callState=='已签到'?'已签到':'未签到',
						
					// }
					// if(this.firstContent.callState=='已签到'){
					// 	this.getQueueingDTO()
					// }
				
			     
			},
			// 刷新呼叫信息
			async getQueueingDTO() {
				try{
					 const res= await guideApi.getQueueingDTO({
						visitNumber:this.headerEmit.visitNumber,
						queueCode:this.firstContent.queueId,
			        }).then((res) => {
					this.callObj = res.data
						
			                })
				}catch(e){
					console.log(e);
				}
					// this.callObj = {
					// 	calling:'8',
					// 	expectToWait:'10分钟',
					// 	medicalTreatmentNumber:'16',
					// }
				
			    
			},
			
		},
		
		
	}
</script>

<style lang="less">
	.moveR-enter-active,  .moveR-leave-active {
	    transition: all 4s linear;
	    transform: translateX(0);
	  }
	   .moveR-enter,  .moveR-leave {
	    transform: translateX(100%);
	  }
	   .moveR-leave-to{
	     transform: translateX(100%);
	   }
	.first{
		// background: fuchsia;
		
		.center {
			margin:28rpx 33rpx 0 33rpx;
			width: 684rpx;
			background: #ffffff;
			border-radius: 12rpx;
			
			&:last-of-type{
				margin:28rpx 33rpx 28rpx 33rpx;
			}
			.head {
				padding-top: 10rpx;
				view{
					width: 654rpx;
					height: 84rpx;
					border-radius: 14rpx;
					color: #499fff;
					background: #f4faff;
					margin: 10rpx auto;
					font-size: 32rpx;
					line-height: 32rpx;
					font-weight: 500;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				
			}
			
			.title {
				.clinic{
					width: 646rpx;
					height: 56rpx;
					line-height: 36rpx;
					background: #5cb5ff;
					border-radius: 12rpx;
					margin:  22rpx auto;
					transform: translate(0,20rpx);
					font-size: 36rpx;
					color: #ffffff;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				
				
				.title-calling{
					height: 95rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					position: relative;
					font-size: 30rpx;
					.left {
					width: 33.33%;
					
					
					.no{
						font-weight: 600;
					}
					.text {
						color: #aaaaaa;
						font-size: 22rpx;
					}
				}
				.middle {
					width: 33.33%;
					border-left: 4rpx solid #DDDDDD;
					border-right:  4rpx solid #DDDDDD;
					.call{
						font-weight: 600;
					}
					.text {
						color: #aaaaaa;
						font-size: 22rpx;
					}
				}
				.right {
					width: 33.33%;
					
					.time {
						font-weight: 600;
					}
					.text {
						font-size: 22rpx;
						color: #aaaaaa;
					}
				}
				}
				
			}
			.wire-box{
				height: 10rpx;
				>.wire {
					display: flex;
					align-items: center;
					justify-content: space-between;
				    height: 0rpx;
				    border: 4rpx solid #eeeeee;
				
				    image{
					    width: 10rpx;
					    height: 36rpx;
					    margin: 0 10rpx;
				    }
			    }
			    .wireState {
			    	border: 2rpx solid #ffffff;
			    }
			}
			.content {
				margin-top: 3%;
				position: relative;
				
				.icon {
					position: absolute;
					width: 110rpx;
					height: 52rpx;
					line-height: 52rpx;
					right: -12rpx;
					display: flex;
					flex-direction: column;
					text {
						display: inline-block;
						z-index: 1;
						color: #ffffff;
						font-size: 25rpx;
						
					}
					image {
						position: absolute;
						top: -10rpx;
						width: 110rpx;
						height: 52rpx;
						
						
					}
				}
				
				ul {
					li {
						margin:0 6% 0 4%;
						width: 90%;
						display: flex;
						
						&:first-of-type{
							// margin:3% 6% 0 4%;
						}
						
						.attribute{
							color: #888888;
							width: 22%;
							display: flex;
							margin-bottom:2%;
							justify-content: left;
						}
						
						.name {
							min-height: 36rpx;
							display: flex;
							text-align: left;
							margin-bottom:2%;
							width: 70%;
						}
					}
				}
				
				.btn {
					view {
						display: flex;
						justify-content: center;
						
						// button {
							
						// 	width: 270rpx;
						// 	margin: 0 30rpx 24rpx 30rpx;
						// 	height: 72rpx;
						// 	line-height: 72rpx;
						// 	background: linear-gradient(350deg,#479cff 0%, rgba(71,216,251,0.80) 100%);
						// 	border-radius: 70rpx;
						// 	font-size: 35rpx;
						// 	color: #ffffff;
						// 	font-family: Source Han Sans CN, Source Han Sans CN-500;
						// 	font-weight: 500;
						// }
						button {
							
							width: 270rpx;
							margin: 30rpx 20rpx 24rpx 20rpx;
							height: 56rpx;
							line-height: 56rpx;
							background: linear-gradient(350deg,#479cff 0%, rgba(71,216,251,0.80) 100%);
							border-radius: 70rpx;
							font-size: 32rpx;
							color: #ffffff;
							font-family: Source Han Sans CN, Source Han Sans CN-500;
							font-weight: 500;
						}
					}
				}
				.footer {
					border-top: 2rpx solid #eeeeee;
					width: 94%;
					margin: 0 3%;
					height: 80rpx;
					font-size: 26rpx;
					line-height: 26rpx;
					color: #777777;
					display: flex;
					align-items: center;
					justify-content: center;
					view{
						text{
							
						}
					}
				}
				.inquiry{
					display: flex;
					justify-content: center;
					> view {
						display: flex;
						align-items: center;
						width: 654rpx;
						height: 92rpx;
						background: #f4faff;
						border-radius: 14rpx;
						margin-bottom:24rpx;
						
						.inquiry-box {
							width: 100%;
							height: 60rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin: 0 25rpx;
							
							.left {
								display: flex;
								align-items: center;
								height: 52rpx;
								image {
									width: 60rpx;
									height: 60rpx;
									margin-right: 10rpx;
								}
								text {
									font-size: 32rpx;
									font-weight: 500;
									color: #499fff;
									line-height: 32rpx;
									font-family: Source Han Sans CN, Source Han Sans CN-500;
									font-weight: 500;
									
								}
								
							}
							.inquiryBtn {
								display: flex;
								justify-content: center;
								align-items: center;
								width: 130rpx;
								height: 50rpx;
								font-size: 28rpx;
								line-height: 24rpx;
								color: #ffffff;
								background: #49a0ff;
								border-radius: 38rpx;
							}
						}
					}
					
				}
			}
		}
	}
</style>
