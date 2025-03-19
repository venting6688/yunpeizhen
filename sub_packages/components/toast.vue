<template>
	<view class="box">
		<view class="center">
			<view class="success">
			    {{message}}
			</view>
			<view class="time">
			    <text>{{time}}</text>
			    <!-- <text>秒自动为您切换便捷导引</text> -->
			    <text>{{tips}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '@/wxcomponents/vant/toast/toast.js';
	export default {
		props: {
		    second: {
		        type: Number,
		        required: false,
				default: 3,
		    },
			message: {
			    type: String,
			    required: false,
			},
			tips: {
			    type: String,
			    required: false,
				default: '后关闭',
			},
		    url: {
		        type: String,
		        required: false,
		    },
		},
		watch: {
		    tips(newVal) {
		      if (!newVal) {
		        this.validTips = '后关闭'; // 如果新传过来的值为空，重置为默认值
		      } else {
		        this.validTips = newVal;
		      }
		    }
		},
		data(){
			return {
				time:0,
				validTips: this.tips
			}
		},
		methods: {
			
		},
		mounted(){
			this.time = this.second;
			    this.$nextTick(() => {
			      try {
			        const timer = setInterval(() => {
			          this.time--;
			          if (this.time <= 0) {
			            clearInterval(timer);
			           
			            this.$emit('back', false);
			            // wx.reLaunch({
			            //     url: `/pages/convenient/index`,
			            // })
			          }
			        }, 1000);
			      } catch (toastShowError) {
			        console.error('显示Toast提示时出现错误：', toastShowError);
			      }
			    });
			
		}
	}
</script>

<style lang="less" scoped>
	.box {
		// position: relative;
		width: 100vw;
		height: 100%; 
		// background-color: #f5f5f5;
		// display: flex;
		//   justify-content: center;
		//   align-items: center;
		.center {
			margin: auto;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			
			color: #000000;
			padding:70rpx 40rpx;
			background-color: #ffffff;
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
</style>