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
				<view class="center">
					<view class="word">
						<text></text>
						<view>
							挂号费用
						</view>
						<view class="cer">
							<view class="no">
								<view class="name">
									专家门诊诊察费
								</view>
								<view class="price">
									<text>单价：29.80*1</text>
									<text>￥29.80</text>
								</view>
							</view>
							
						</view>
					</view>
					<view class="word">
						<text></text>
						<view>
							检查费用：
						</view>
						<view class="cer">
							<view class="no">
								<view class="name">
									胸部CT平扫
								</view>
								<view class="price">
									<text>单价：29.80*1</text>
									<text>￥29.80</text>
								</view>
							</view>
						</view>
					</view>
					<view class="word">
						<text></text>
						<view>
							检验费用：
						</view>
						<view class="cer">
							<view class="no">
								<view class="name">
									血常规
								</view>
								<view class="price">
									<text>单价：29.80*1</text>
									<text>￥29.80</text>
								</view>
							</view>
						</view>
					</view>
					<view class="word">
						<text></text>
						<view>
							药品费用：
						</view>
						<view class="cer">
							<view class="no">
								<view class="name">
									肺力咳胶囊
								</view>
								<view class="price">
									<text>单价：29.80*1</text>
									<text>￥29.80</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="totalMoney">
					<view>
						<text>合计：</text>
						<text>44.94元</text>
					</view>
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
				}else {
					uni.navigateTo({
						url: `/sub_packages/report/checkout`
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
					
					>.name {
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
					
					>.name {
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
						.cer {
							display: flex;
							.no {
								width: 100%;
								font-size: 24rpx;
								margin: 14rpx 0;
								color: #000000;
								
								.price{
									display: flex;
									justify-content: space-between;
									>text {
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
						>text {
							position: absolute;
							top: 18rpx;
							display: inline-block;
							width: 4rpx;
							height: 20rpx;
							background: #0680ff;
						}
						>view {
							margin-left: 15rpx;
							&:first-child{
								font-size: 28rpx;
							}
							&:last-child{
								margin-top: 6rpx;
								color: #888888;
								font-size: 24rpx;
							}
						}
						// &:last-child {
						// 	border: 0;
						// }
					}
				}
				.totalMoney{
					
					text-align: right;
					view {
						padding: 20rpx 0 10rpx 0;
						margin: 0 20rpx;
						text{
							&:last-child{
								color: red;
							}
						}
					}
				}
			}
			
		}
		
		
	}
</style>