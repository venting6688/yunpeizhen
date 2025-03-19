<template>
	<view class="answer">
		<view class="center">
			<view class="title" v-if="answerContent.callState=='已签到'">
				<!-- <view class="clinic">
					{{callObj.departmentName?callObj.departmentName:''}}
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
							回诊8号
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
							45号
						</view>
					    <view class="text">
						    正在呼叫
					    </view>
					</view>
				    <view class="right">
					    <!-- <view class="time">
				    		{{callObj.expectToWait?callObj.expectToWait:''}}
					    </view> -->
						<view class="time">
							30分钟
						</view>
					    <view class="text">
						    预计等候
					    </view>
				    </view>
				</view>
			</view>
			<view class="wire-box" :class="{wireState:answerContent.callState!=='已签到'}">
				<view class="wire" v-if="answerContent.callState=='已签到'">
					<image src="@/static/image/Group 679.png" mode=""></image>
				    <image src="@/static/image/Group 679.png" mode=""></image>
				</view>
			</view>
			<view class="content">
				<view class="icon">
					<text>{{answerContent.callState}}</text>
					<image  v-if="answerContent.callState=='已签到'" src="@/static/image/Union.png" mode="widthFix"></image>
					<image  v-if="answerContent.callState=='未签到'" src="@/static/image/Union2.png" mode="widthFix"></image>
				</view>
				<ul>
					<li v-if="answerContent.queueName">
						<view class="attribute">
							回诊科室:
						</view>
						<view class="name">
							{{answerContent.queueName}}
						</view>
					</li>
					<li v-if="answerContent.doctorName">
						<view class="attribute">
							回诊医生:
						</view>
						<view class="name">
							{{answerContent.doctorName}}
						</view>
					</li>
					<!-- <li v-if="callObj.medicalTreatmentNumber">
						<view class="attribute">
							就诊序号:
						</view>
						<view class="name">
							{{callObj.medicalTreatmentNumber}}号
						</view>
					</li> -->
					<li v-if="answerContent.queueLocation">
						<view class="attribute">
							科室位置:
						</view>
						<view class="name">
							{{answerContent.queueLocation}}
						</view>
					</li>
					<li v-if="answerContent.precautions">
						<view class="attribute">
							注意事项:
						</view>
						<view class="name">
							{{answerContent.precautions}}
						</view>
					</li>
					
				</ul>
				<view class="btn" v-if="answerContent.queueName || answerContent.doctorName">
					<view >
						<button class="cu-btn" @click="leftBtn(answerContent.callState)">{{btn(answerContent.callState)}}</button>
					    <!-- <button class="cu-btn">暂未开放</button> -->
					</view>
				</view>
				<!-- <view class="footer" v-else>
					<view>
						<text>回诊已经结束，请您移步至门诊一楼输液或拿药</text>
					</view>
				</view> -->
			</view>
			
		</view>

		</view>
		
	</view>
</template>

<script>
	import guideApi from '@/api/guideApi.js'
	export default {
		props: {
		           headerEmit: Object,
		        },
		data() {
			return {
				answerContent:{},
				callObj:{
					calling:'',
					departmentName:'',
					expectToWait:'',
					medicalTreatmentNumber:'',
				},
			}
		},
		mounted() {
			this.registrationCardAPI()
		},
		methods: {
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
							signInType:'回诊',
							queueId:this.answerContent.queueId
					   }).then((res) => {
					   this.registrationCardAPI()
					           }) 
					}catch(e){
						console.log(e)
					}
					// this.answerContent.callState='已签到'
					// console.log('this.answerContent',this.answerContent)
					// this.registrationCardAPI()
				}else{
					this.getQueueingDTO()
				}
			},
			// 获取回诊数据
			async registrationCardAPI() {
				try{
					const res= await guideApi.registrationCardAPI({
						visitNumber:this.headerEmit.visitNumber,
						tag:'2',   //1初诊    2回诊
			        }).then((res) => {
					this.answerContent = res.data?res.data:{}
					if(this.answerContent.callState=='已签到'){
						this.getQueueingDTO()
					}
			                })
				}catch(e){
					console.log(e);
				}
				// this.answerContent = {
				// 	queuename:'呼吸内科',
				// 	doctorName:'张海松',
				// 	queueLocation:'门诊楼三楼西侧内科门诊',
				// 	precautions:'就诊前请到分诊台检查血压',
				// 	appointmentTime:'2024/8/8 09:35',
				// 	callState:this.answerContent.callState=='已签到'?'已签到':'未签到',
					
				// }
				// if(this.answerContent.callState=='已签到'){
				// 	this.getQueueingDTO()
				// }
			     
			},
			// 刷新呼叫信息
			async getQueueingDTO() {
				try{
					 const res= await guideApi.getQueueingDTO({
						visitNumber:this.headerEmit.visitNumber,
						queueCode:this.answerContent.queueId,
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
			
		}
	}
</script>

<style lang="less">
	.answer{
		
		.center {
			margin:28rpx 33rpx 0 33rpx;
			width: 684rpx;
			background: #ffffff;
			border-radius: 12rpx;
			
			&:last-of-type{
				margin:28rpx 33rpx 28rpx 33rpx;
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
						
						button {
							
							width: 270rpx;
							margin: 0 30rpx 24rpx 30rpx;
							height: 72rpx;
							line-height: 72rpx;
							background: linear-gradient(350deg,#479cff 0%, rgba(71,216,251,0.80) 100%);
							border-radius: 70rpx;
							font-size: 35rpx;
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
			}
		}
	}
</style>
