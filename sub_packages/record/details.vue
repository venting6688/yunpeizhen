<template>
	<view class="details">
		<view class="middle">
			<view class="personal personal-1">
				<view class="title1">
					<view class="name">
						<text>张*萌</text>
						<text>23岁</text>
						<text>女</text>
					</view>
				</view>
				<view class="center">
					<view class="no">
						<text>就诊科室：</text>
						<text>{{item.patientName}}</text>
					</view>
					<view class="no doctor">
						<text>就诊医生：</text>
						<text>张海松</text>
						<text>主任医师</text>
					</view>
					<view class="no">
						<text>就诊时间：</text>
						<text>2023-07-15</text>
					</view>
				</view>
				<view class="tips">
					温馨提示：本次诊疗仅针对目前病情，如有病情变化，请及时复诊。
				</view>
			</view>
			<view class="personal personal-2">
				<view class="title">
					<view class="name">
						<text>就诊信息</text>
					</view>
					<view class="right" @click="caseHistoryReport(1)">
						<text>查看病历</text>
						<image src="../static/image/Vector@2x.png" mode=""></image>
					</view>
				</view>
				<view class="center">
					<view class="word">
						<text></text>
						<view>
							主诉：突发咯血半天，量少，有误吸史，偶有咯痰。  双肺阴性
						</view>
					</view>
					<view class="word">
						<text></text>
						<view>
							诊断：咯血待诊
						</view>
					</view>
					<view class="word">
						<text></text>
						<view>
							处置：门诊随访，1-3天后复诊，若有异常不适，即刻复诊，休息3天。
						</view>
					</view>
				</view>
			</view>
			<view class="personal personal-3">
				<view class="title">
					<view class="name">
						<text>检查信息</text>
					</view>
					<view class="right"  @click="caseHistoryReport(2)">
						<text>查看报告</text>
						<image src="../static/image/Vector@2x.png" mode=""></image>
					</view>
				</view>
				<view class="center">
					<view class="no">
						<text>检查项目：</text>
						<text>CT胸部平扫</text>
					</view>
					<view class="no">
						<text>检查项目：</text>
						<text>胸部平扫</text>
					</view>
					<view class="no">
						<text>检查项目：</text>
						<text>血常规</text>
					</view>
				</view>
			</view>
			<view class="personal personal-4">
				<view class="title">
					<view class="name">
						<text>就诊费用</text>
					</view>
					<view class="right"  @click="caseHistoryReport(3)">
						<text>费用明细</text>
						<image src="../static/image/Vector@2x.png" mode=""></image>
					</view>
				</view>
				<view class="center">
					<view class="no">
						<text>挂号费用：</text>
						<text>20.00元</text>
					</view>
					<view class="no">
						<text>检查费用：</text>
						<text>430.00元</text>
					</view>
					<view class="no">
						<text>检验费用：</text>
						<text>50.00元</text>
					</view>
					<view class="no">
						<text>药品费用：</text>
						<text>50.00元</text>
					</view>
					<view class="no">
						<text>治疗费用：</text>
						<text>50.00元</text>
					</view>
				</view>
				<view class="total">
					<text>合计：</text>
					<text>544.94元</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods: {
			caseHistoryReport(num){
				if(num===1){
					uni.navigateTo({
						url: `/sub_packages/caseHistory/details`
					})
				}else if(num===2){
					uni.navigateTo({
						url: `/sub_packages/report/checkout`
					})
				}else {
					uni.navigateTo({
						url: `/sub_packages/outpatientExpenditure/particulars`
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.details {
		width: 100vw;
		height: 100%; 
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		.middle {
			overflow: auto;
			margin-bottom: 50rpx;
			.personal {
				width: 722rpx;
				background: #ffffff;
				border-radius: 12rpx;
				margin: 30rpx auto 0 auto;
				padding-bottom: 20rpx;
				.title {
					margin: 0 20rpx;
					height: 65rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					image {
						width: 12rpx;
						height: 18rpx;
						margin-left:20rpx;
					}
					
					.name {
						display: flex;
						align-items: center;
						font-size: 28rpx;
						line-height: 28rpx;
						font-family: PingFang SC, PingFang SC-600;
						color: #000000;
						padding: 10rpx 0;
					}
					.right {
						display: flex;
						align-items: center;
						font-size: 26.72rpx;
						line-height: 26.72rpx;
						font-family: PingFang SC, PingFang SC-400;
						font-weight: 400;
						color: #4286ff;
						padding: 10rpx 0;
					}
				}
			}
			.personal-1 {
				.title1 {
					margin: 0 20rpx;
					height: 70rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.name {
						display: flex;
						align-items: center;
						font-size: 40rpx;
						line-height: 40rpx;
						font-family: PingFang SC, PingFang SC-600;
						font-weight: 600;
						color: #000000;
						padding: 10rpx 0;
						text{
							margin-right:60rpx;
							
						}
					}
					
				}
				.center {
					margin: 0 20rpx;
					.no {
						margin: 12rpx 0;
						text {
							&:nth-child(1){
								color: #888888;
							}
							
						}
						
					}
					.doctor {
						text {
							&:nth-child(2){
								margin-right: 30rpx;
							}
							&:nth-child(3){
								color: #888888;
							}
						}
					}
				}
				.tips {
					margin:25rpx 20rpx 0 20rpx;
					font-size: 20rpx;
					color: #4286ff;
					line-height: 20rpx;
				}
			}
			.personal-2{
				
				.center {
					margin: 0 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;				
					.word {
						border-bottom: 2rpx solid #eeeeee;
						padding: 10rpx 0;
						position: relative;
						text {
							position: absolute;
							top: 20rpx;
							display: inline-block;
							width: 16rpx;
							height: 16rpx;
							background: #ff6262;
							border-radius: 50%;
							
						}
						view {
							margin-left: 25rpx;
						}
						&:last-child {
							border: 0;
						}
					}
				}
			}
			.personal-3,.personal-4{
				.center {
					margin: 0 20rpx;
					
					.no {
						margin: 12rpx 0;
						text {
							&:nth-child(1){
								color: #888888;
							}
							
						}
						
					}
				}
			}
			.personal-4 {
				.center {
					border-bottom: 2rpx solid #eeeeee;
				}
				.total {
					margin-top: 20rpx;
					text-align: right;
					text {
						&:nth-child(2){
							color: #ec2e50;
							margin-right: 20rpx;
						}
						
					}
				}
			}
		}
		
		
	}
</style>