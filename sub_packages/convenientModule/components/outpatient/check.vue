<template>
	<view class="check">
		<view class="center" v-for="(item,index) in checkContentList" :key="index">
			<view class="title" v-if="item.signInStatus==='已签到'">
				<view class="clinic">
					{{item.aaa.departmentName ?item.aaa.departmentName :''}}
				</view>
				<view class=" title-calling">
					<view class="left">
					    <view class="no">
						    {{item.aaa.medicalTreatmentNumber?item.aaa.medicalTreatmentNumber+'号':''}}
					    </view>
					    <view class="text">
						    就诊序号
					    </view>
				    </view>
					<view class="middle">
					    <view class="call">
							{{item.aaa.calling?item.aaa.calling+'号':''}}
					    </view>
					    <view class="text">
						    正在呼叫
					    </view>
					</view>
				    <view class="right">
					    <view class="time">
				    		{{item.aaa.expectToWait?item.aaa.expectToWait:''}}
					    </view>
					    <view class="text">
						    预计等候
					    </view>
				    </view>
				</view>
			</view>
			<view class="wire-box" :class="{wireState:item.signInStatus!=='已签到'}">
				<view class="wire" v-if="item.signInStatus=='已签到'">
					<image src="@/static/image/Group 679.png" mode=""></image>
				    <image src="@/static/image/Group 679.png" mode=""></image>
				</view>
			</view>
			<view class="content">
				<view class="icon">
					<text>{{item.payStatus=='未收费'?item.payStatus:item.signInStatus}}</text>
					<image  v-if="item.signInStatus=='已签到'" src="@/static/image/Union.png" mode="widthFix"></image>
					<image  v-if="item.signInStatus=='未签到'" src="@/static/image/Union2.png" mode="widthFix"></image>
				</view>
				<ul>
					<li v-if="item.acceptDeptName">
						<view class="attribute">
							查验科室:
						</view>
						<view class="name">
							{{item.acceptDeptName}}
						</view>
					</li>
					<li v-if="item.itemName">
						<view class="attribute">
							查验项目:
						</view>
						<view class="name">
							{{item.itemName}}
						</view>
					</li>
					<!-- <li v-if="item.signInStatus=='已签到' && item.callObj.medicalTreatmentNumber">
						<view class="attribute">
							排队序号:
						</view>
						<view class="name">
							{{item.callObj.medicalTreatmentNumber}}号
						</view>
					</li> -->
					<li v-else-if="item.sign">
						<view class="attribute">
							预计等待:
						</view>
						<view class="name">
							{{item.time}}
						</view>
					</li>
					<li  v-if="item.countPrice">
						<view class="attribute">
							查验费用:
						</view>
						<view class="name">
							{{item.countPrice}}元
						</view>
					</li>
					<li  v-if="item.acceptDeptLocation">
						<view class="attribute">
							科室位置:
						</view>
						<view class="name department" @click="navigation">
							{{item.acceptDeptLocation}}
						</view>
						<view class="img">
							<image src="@/static/image/location.png" mode=""></image>
						</view>
					</li>
					<li  v-if="item.notice">
						<view class="attribute">
							注意事项:
						</view>
						<view class="name">
							{{item.notice}}
						</view>
					</li>
				</ul>
				<view class="btn" v-if="item.acceptDeptName ||item.itemName">
					<view v-if="item.payStatus!=='已收费'">
						<button class="cu-btn" @click="leftBtn(index)">{{btn(item.payStatus)}}</button>
					    <!-- <button class="cu-btn">暂未开放</button> -->
					</view>
					<view v-else>
						<button class="cu-btn" @click="leftBtn(index)">{{btn(item.signInStatus)}}</button>
					    <!-- <button class="cu-btn">暂未开放</button> -->
					</view>
				</view>
				<!-- <view class="footer" v-else>
					<view>
						<text>检查已经结束，请您移步至检查检验科室继续就诊</text>
					</view>
				</view> -->
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
				checkContentList:[],
				aaa:[
					{
						departmentName:'2号窗口',
						medicalTreatmentNumber:'23',
						calling:'16',
						expectToWait:'14分钟'
					},
					{
						departmentName:'3号检查室',
						medicalTreatmentNumber:'12',
						calling:'12',
						expectToWait:'0分钟'
					},
					{
						departmentName:'1号检验室',
						medicalTreatmentNumber:'34',
						calling:'26',
						expectToWait:'12分钟'
					},
				],
			}
		},
		mounted() {
			this.examineCard()
		},
		methods: {
			navigation(){
				// let latitude = 36.183242794928994
				// let longitude = 117.07709640617486
				// wx.openLocation({
				//           latitude: latitude,//目的地的纬度
				//           longitude: longitude,//目的地的经度
				//           name: '山东第一医科大学第二附属医院', 
				//         })
			},
			btn(value) {
			            switch (value) {
			                case '未签到':
			                    return '立即签到'
			                case '已签到':
			                    return '刷新呼叫信息'
							default: 
								return '立即缴费'; 
			                
			            }
						
			        },
			leftBtn(index){
				if(this.checkContentList[index].payStatus!=='已收费'){
					this.examineOrInspectPayment(index)
				}else if(this.checkContentList[index].signInStatus=='未签到'){
					this.signIn(index)
				}else{
					this.getQueueingDTO(index)
				}
				
			},
			//签到
			async signIn(index){
				try{
					const res = await guideApi.signIn({
						visitNumber:this.headerEmit.visitNumber,
						signInType:'查验',
						queueId:this.checkContentList[index].acceptDeptCode
				   }).then((res) => {
				  this.examineCard()
				           }) 
				}catch(e){
					console.log(e)
				}
				// this.checkContentList[index].signInStatus = '已签到'
				// for (let i = 0; i < this.checkContentList.length; i++) {
				// 	if(this.checkContentList[i].signInStatus=='已签到'){
				// 		this.getQueueingDTO(i)
				// 	}
					
				// }
				
			},
			//缴费
			async examineOrInspectPayment(i){
				console.log(34,this.checkContentList[i],this.checkContentList[i].doctorOrderId)
				try{
					const res = await guideApi.examineOrInspectPayment({
						doctorOrderId:this.checkContentList[i].doctorOrderId,
				   }).then((res) => {
				   this.examineCard()
				           }) 
				}catch(e){
					console.log(e)
				}
				// this.checkContentList[i].payStatus = '已收费'
				// this.examineCard(i)
			},
			//获取查验数据
			async examineCard() {
				try{
					const res= await guideApi.examineCard({
						visitNumber:this.headerEmit.visitNumber,
					}).then((res) => {
						this.checkContentList = res.data.list?res.data.list:[]
						// if(this.checkContentList.callState=='已签到'){
						// 	this.getQueueingDTO()
						// }
						for (let i = 0; i < this.checkContentList.length; i++) {
							if(this.checkContentList[i].signInStatus=='已签到'){
								this.getQueueingDTO(i)
							}
							
						}
					})
				}catch(e){
					console.log(e)
				}
						// this.checkContentList = [{
						// 	acceptDeptName:'检验中心',
						// 	itemName:'血常规',
						// 	countPrice:'120',
						// 	acceptDeptLocation:'门诊楼三楼东侧检验中心',
						// 	notice:'采血完成后请按压针孔3分钟，注意护理避免感染',
						// 	signInStatus:'未签到',
						// 	payStatus:'未收费'
							
						// },{
						// 	acceptDeptName:'超声中心',
						// 	itemName:'心脏超声',
						// 	countPrice:'200',
						// 	acceptDeptLocation:'门诊楼四楼西侧超声中心',
						// 	notice:'前列腺超声需要憋尿，请您多喝水与走动',
						// 	signInStatus:'未签到',
						// 	payStatus:'未收费'
						// }]
						// if(this.checkContentList.callState=='已签到'){
						// 	this.getQueueingDTO()
						// }
						
			},
			// 刷新呼叫信息
			async getQueueingDTO(i) {
				try{
						const res= await guideApi.getQueueingDTO({
						visitNumber:this.headerEmit.visitNumber,
						queueCode:this.checkContentList[i].acceptDeptCode,
			        }).then((res) => {
					this.$set(this.checkContentList[i], 'callObj', res.data)
					this.$set(this.checkContentList[i], 'aaa', this.aaa[i])
			                })
				}catch(e){
					console.log(e)
				}
					// this.callObj = {
					// 	calling:'8',
					// 	expectToWait:'10分钟',
					// 	medicalTreatmentNumber:'16',
					// }
					// this.checkContentList[i].callObj = this.callObj
					
				           
			    
			},
		}
	}
</script>

<style lang="less">
	
	.check{
		// background: fuchsia;
		
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
							max-width: 70%;
						}
						.department {
							color: #076AFF;
						}
						.img {
							image {
								width: 34rpx;
								height: 34rpx;
							}
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
