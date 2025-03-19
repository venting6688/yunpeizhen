<template>
	<view class="details">
		<view class="middle">
			<personalInformation :title="title" />
			<view class="personal-2">
				<view class="center">
					<view class="word">
						<view>
							{{title==='放射'?'影像表现:':title==='超声'?title+'所见:':'诊断结论'}}
						</view>
						<view v-if="title==='心电'">
							窦性心悸
							正常ECG
						</view>
						<view v-else>
							肝左叶长3.8CM，厚7.0CM，右叶斜径14.2CM，肝内可探及多个大小不等的中强回声，边界清，较大者大小约2.0*1.7CM，CDFI示:周边可探及血流信号。余肝肉回声均包。管状结构清晰，门静脉内径为1.20M。胖内胆管未见明显扩张。胆囊形态正常，大小约6.1*2.6CM，囊壁毛糙折叠，囊内透声可，胆总管内径为0.6CM。脾脏厚3.5CM，长11.2CM，形态正常，实质回声均匀。胰腺胰头厚1.1CM、胰体厚1.5CM、胰尾厚1.8CM，实质回声均匀。
						</view>
					</view>
					<view class="word" v-if="title!=='心电'">
						<view>
							{{title==='放射'?'影像意见:':title+'意见:'}}
						</view>
						<view>
							肝内多发实性包块，建议进一步检查
						</view>
					</view>
					
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
					justify-content: space-between;				
					.word {
						border-bottom: 2rpx solid #eeeeee;
						padding: 16rpx 0;
						position: relative;
						text {
							position: absolute;
							top: 18rpx;
							display: inline-block;
							width: 4rpx;
							height: 20rpx;
							background: #0680ff;
							
						}
						
						view {
							margin-left: 15rpx;
							&:first-child{
								font-size: 28rpx;
							}
							&:last-child{
								margin-top: 10rpx;
								color: #888888;
								font-size: 24rpx;
								line-height: 35rpx;
								letter-spacing: 2rpx;
							}
						}
						&:last-child {
							border: 0;
						}
					}
				}
			}
			
		}
		
		
	}
</style>