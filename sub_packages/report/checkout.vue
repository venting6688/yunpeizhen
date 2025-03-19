<template>
	<view class="details">
		<view class="middle">
			<personalInformation />
			<view class="personal-2">
				<view class="center">
					<view class="title">
						<view></view>
						<view>代号</view>
						<view>项目</view>
						<view>结果</view>
						<view>参考值</view>
					</view>
					<ul>
						<li v-for="(item,index) in List" :key="index">
							<view>
								{{index+1}}
							</view>
							<view>
								{{item.num}}
							</view>
							<view>
								{{item.name}}
							</view>
							<view>
								{{item.result}}
							</view>
							<view>
								{{item.consult}}
							</view>
						</li>
					</ul>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import personalInformation from './components/personalInformation.vue';
	export default {
		components:{
			personalInformation
		},
		data(){
			return {
				title:'',
				List:[
					{
						num:'WBS',
						name:'白细胞',
						result:'22.22',
						consult:'3.97-9.15'
					},
					{
						num:'WBS',
						name:'白细胞',
						result:'22.22',
						consult:'3.97-9.15'
					},
					{
						num:'WBS',
						name:'白细胞',
						result:'22.22',
						consult:'3.97-9.15'
					},
					{
						num:'WBS',
						name:'白细胞',
						result:'22.22',
						consult:'3.97-9.15'
					},
					{
						num:'WBS',
						name:'白细胞',
						result:'22.22',
						consult:'3.97-9.15'
					},
					{
						num:'WBS',
						name:'白细胞',
						result:'22.22',
						consult:'3.97-9.15'
					},
					
					{
						num:'WBS',
						name:'白细胞',
						result:'22.22',
						consult:'3.97-9.15'
					},
					{
						num:'WBS',
						name:'白细胞',
						result:'22.22',
						consult:'3.97-9.15'
					},
					{
						num:'WBS',
						name:'白细胞',
						result:'22.22',
						consult:'3.97-9.15'
					},
					{
						num:'WBS',
						name:'白细胞',
						result:'22.22',
						consult:'3.97-9.15'
					},
					{
						num:'NEUT%',
						name:'中性细胞比率中性细胞比率',
						result:'22.22',
						consult:'3.97-9.15'
					},
					
				],
			}
		},
		onLoad(e) {
			this.title = e.title
			if(e.title){
				wx.setNavigationBarTitle({
				      title: e.title+'报告单'
				})
			}
			
		},
		methods: {
			
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
			.personal-2{
					background: #ffffff;
					width: 722rpx;
					margin: 16rpx auto 0 auto;
					border-radius: 12rpx;
				.center {
					margin: 0 20rpx;
					display: flex;
					flex-direction: column;
					
					.title {
						display: flex;
						// justify-content: center;
						align-items: center;
						width: 680rpx;
						height: 46rpx;
						background: #f0f0f0;
						margin: 26rpx auto 0 auto;
						>view {
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 24rpx;
							line-height: 24rpx;
							&:nth-child(1){
								width: 8%;
							}
							&:nth-child(2){
								width: 20%;
							}
							&:nth-child(3){
								width: 27%;
							}
							&:nth-child(4){
								width: 16%;
							}
							&:nth-child(5){
								width: 29%;
							}
						}
					}
					>ul {
						margin-bottom: 26rpx;
						
						>li {
							display: flex;
							width: 680rpx;
							border-bottom: 2rpx solid #dcdfe5;
							>view {
								flex: 1;
							    display: flex;
							    justify-content: center;
							    align-items: center;
							    font-size: 24rpx;
								min-height: 46rpx;
								border-right: 2rpx solid #dcdfe5;
							    &:nth-child(1){
							    	max-width: 8%;
							    }
							    &:nth-child(2){
							    	max-width: 20%;
							    }
							    &:nth-child(3){
							    	max-width: 27%;
							    }
							    &:nth-child(4){
							    	max-width: 16%;
							    }
							    &:nth-child(5){
							    	max-width: 29%;
									border: 0;
							    }
						    }
						}
					}
					
				}
			}
			
		}
		
		
	}
</style>