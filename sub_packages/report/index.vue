<template>
	<view class="box">
		<bar />
		<date />
		<view class="head">
			<view>
				<view class="name" @click="headBtn(1)">
					<view :class="{black:headIndex===1}">
						全部报告
					<view class="wire" :class="{blue:headIndex===1}"></view>
					</view>
				</view>
				<view class="name" @click="headBtn(2)">
					<view :class="{black:headIndex===2}">
						检查报告
						<view class="wire" :class="{blue:headIndex===2}"></view>
					</view>
				</view>
				<view class="name" @click="headBtn(3)">
					<view :class="{black:headIndex===3}">
						检验报告
					<view class="wire" :class="{blue:headIndex===3}"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="information">
			<ul>
				<li @click="information(item)" v-for="item in patientList" :key="item.departmentName">
					<view>
						<view class="title">
							<view class="name">
								<text>{{item.departmentName}}</text>
							    <!-- <image src="../static/image/icon-edit.png" mode=""></image> -->
							</view>
							<view class="delete">
								<text>查看报告</text>
								<image src="../static/image/Vector@2x.png" mode=""></image>
							</view>
						</view>
						<view class="center">
							<view class="no">
								<text>检查单号：</text>
								<text>2324365455</text>
							</view>
							<view class="no">
								<text>申请科室：</text>
								<text>呼吸内科</text>
							</view>
							<view class="no">
								<text>检查项目：</text>
								<text>{{item.project}}</text>
							</view>
							<view class="no">
								<text>检查时间：</text>
								<text>2024-07-15 11:20</text>
							</view>
						</view>
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import bar from '../components/bar.vue'
	import date from '../components/date.vue'
	export default {
		components:{
			bar,
			date,
		},
		data(){
			return {
				headIndex:1,
				patientList:[
					{
						departmentName:'超声科',
						project:'腹部彩超',
						state:1,
					},
					{
						departmentName:'检验科',
						project:'血常规',
						state:2,
					},
					{
						departmentName:'放射科',
						project:'头颅CT平扫',
						state:1,
					},
					{
						departmentName:'心电图1室',
						project:'心电图',
						state:1,
					},
					
				]
			}
		},
		methods: {
			headBtn(num){
				this.headIndex = num
				this.patientList = [
					{
						departmentName:'超声科',
						project:'腹部彩超',
						state:1,
					},
					{
						departmentName:'检验科',
						project:'血常规',
						state:2,
					},
					{
						departmentName:'放射科',
						project:'头颅CT平扫',
						state:1,
					},
					{
						departmentName:'心电图1室',
						project:'心电图',
						state:1,
					},
					
				]
				if(num===2){
					this.patientList = this.patientList.filter(item=>item.state===1)
				}else if(num===3){
					this.patientList = this.patientList.filter(item=>item.state===2)
				}
				
			},
			
			information(item){
				let title = item.departmentName.slice(0,2)
				if(item.state===2){
					//检验
					uni.navigateTo({
						url: `/sub_packages/report/checkout?title=${title}`
					})
				}else {
					//检查
					uni.navigateTo({
						url: `/sub_packages/report/examine?title=${title}`
					})
				}
				
				
			}
			
		},
		mounted(){
		}
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
			margin: 0 auto;
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
			margin-bottom: 50rpx;
			ul {
				width: 681.3rpx;
				margin: 0 auto;
				> li {
					width: 681.3rpx;
					background: #ffffff;
					
					>view{
						padding-bottom: 20rpx;
						margin: 0 20rpx;
						border-bottom: 2rpx solid #eeeeee;
						.title {
							height: 70rpx;
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
								line-height: 34.35rpx;
								font-family: PingFang SC, PingFang SC-600;
								font-weight: 600;
								color: #000000;
								padding: 10rpx 0;
							}
							.delete {
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
						.center {
							height: 140rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							.no {
								font-size: 24rpx;
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
				}
			}
		}
		
	}
</style>