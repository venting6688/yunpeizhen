<template>
	<view class="head" :class="{convenient:footState===2}">
		<image class="background" src="https://aiwz.sdtyfy.com:8099/img/Group.png" mode="widthFix"></image>
		<view class="text">
			<view class="title">您好！"安好" 为您服务<image class="icon" src="@/static/image/Group308.png" mode="widthFix"></image></view>
			<view class="news">
				{{ animatedText.slice(0,39) }}
			</view>
		</view>
		<view class="dist" v-if="footState===2">
			<ul>
				<li v-for="(item,index) in departmentList" :key="index">
					<view class="test" @click="departmentBtn(item)"  :class="{ barBackground: headerEmit.visitNumber==item.visitNumber }">
				        <view>{{item.queueName?item.queueName.replace('门诊',''):''}}</view>
				        <view>{{item.doctorName?item.doctorName:''}}</view>
			        </view>
					<view class="wire">
					</view>
				</li>
			</ul>
		</view>
		<view class="bar" v-if="footState===2">
			<view v-for="(item,index) in barList" @click="btns(index,item.number)" class="barList" :key="index">
				<view  class="bar-name"  :class="{ barColor:item.number==1 }">
					<view>
						<text :class="{ barBackground: item.state==item.name }">{{ item.name }}</text>
					</view>
					<!-- <view>
						<text class="iocns" v-if="index!==barList.length-1">》》</text>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderbarApi from '@/api/HeaderbarApi.js'
	import bus from "@/utils/bus.js";
	import {mapState,mapActions} from 'vuex'
export default {
	props:{
		footState:Number,
	},
	data() {
		return {
			barList: [],
			hospitalizedBarList:[],
			headerEmit:{
				visitNumber:'',
				userId:'',
				state:'',
			},
			animatedText: '',
			interval: null,
			nanbers: null,
			getSuggestTimer:null,
			getSuggestText:'',
			departmentList:[],
			userId:'',
			userIdList:[],
		}
	},
	watch: {
		// 'HeaderBar.number': {
		// 	handler: function (newVal, oldVal) {
		// 		this.barList.forEach((item, index) => {
		// 			item.state = false
		// 			if (item.number == newVal) {
		// 				this.barList.slice(0, index + 1).forEach((v) => {
		// 					v.state = true
		// 				})
		// 			}
		// 		})
		// 	},
		// 	immediate: true
		// },
		
		
		'getSuggestText': 'animateText',
		'headerEmit.visitNumber': {
			handler: function (newVal, oldVal) {
				this.updateVisitNumber(newVal)
				if(oldVal!==""){
					this.getTreatmentStageAPI()
				}
			},
			// immediate: true
		}
	},
	computed: {
		...mapState({ 
			visitNumber: state => state.visitNumber,
			}),
		
	},
	async created() {
		await this.todayVisit()
		await this.getSuggest()
		this.getTreatmentStageAPI()
		this.animateText()
	},
	methods: {
		...mapActions(['updateVisitNumber']),
		//获取就诊阶段(上方横条)
		async getTreatmentStageAPI() {
			try{
				this.barList = []
				const res = await HeaderbarApi
				.getTreatmentStageAPI(this.headerEmit.visitNumber)
				.then((data) => {
					if(this.visitNumber==='1358799'){
						let data = {
							data:{
								'住院信息':'1',
								'住院事项':'1',
								'住院日清单':'1',
							}
						}
						for (let key in data.data) {
						  this.barList.push({name: ' ', number: data.data[key],state:false},{name: key, number: data.data[key],state:false});
						}
						this.barList.shift()
					}else {
						for (let key in data.data) {
						  this.barList.push({name: '》》', number: data.data[key],state:false},{name: key, number: data.data[key],state:false});
						}
						this.barList.shift()
					}
					// for (let key in data.data) {
					//   this.barList.push({name: '》》', number: data.data[key],state:false},{name: key, number: data.data[key],state:false});
					// }
					// this.barList.shift()
					let lastIndex = this.barList.findLastIndex(item => item.number === '1');
					if(lastIndex>=0){
						this.barList[lastIndex].state=this.barList[lastIndex].name
						this.$set(this.headerEmit,'state',this.barList[lastIndex].name)
					}
			     bus.$emit("loadPatients");
					this.$emit('handle',this.headerEmit)
					// arr.splice(2, 0, 5);
				})
			}catch(e){
				console.log(e);
			}
			// this.barList = []
			// let data = {
			// 	"初诊":'1',
			// 	"查验":'0',
			// 	"回诊":'0',
			// 	"医嘱":'0'
				
			// }
			// 	for (let key in data) {
			// 	  this.barList.push({name: '》》', number: data[key],state:false},{name: key, number: data[key],state:false});
			// 	}
			// 	this.barList.shift()
			// 	let lastIndex = this.barList.findLastIndex(item => item.number === '1');
			// 	let index = this.departmentList.findIndex(item => item.visitNumber === this.headerEmit.visitNumber);
			// 	this.barList[lastIndex].state=this.barList[lastIndex].name
			// 	this.$set(this.headerEmit,'state',this.barList[lastIndex].name)
			// 	this.$set(this.headerEmit,'userId',this.userIdList[index])
			// 	this.$emit('handle',this.headerEmit)
			// 	// arr.splice(2, 0, 5);
							
						
			
		},
		//获取今日挂号数据
		async todayVisit() {
			try{
				let now = new Date();
				let newData = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}` +
				              ` ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
				const res = await HeaderbarApi
				.todayVisit({
						patientUniquelyIdentifies:'0001883179',
						reserve_time:newData,
			        })
				.then((data) => {
					this.departmentList = data.data.list || []
					if(!this.headerEmit.visitNumber){
						this.$set(this.headerEmit,'visitNumber',data.data.list[0].visitNumber)
					}
				})
			}catch(e){
				//TODO handle the exception
			}
							
			// this.departmentList =[{queueName:'呼吸内科',doctorName:'张海松',visitNumber:'12345'},{queueName:'神经外科',doctorName:'李志',visitNumber:'678910'}]
			// for (let i = 0; i < this.departmentList.length; i++) {
			// 	this.userIdList[i] = 'id-' + new Date().getTime().toString(36) + '-' + Math.random().toString(36).substr(2, 9)
			// }	
			// this.$set(this.headerEmit,'visitNumber','12345')
						
			
		},
		//获取建议列表
		async getSuggest() {
			// clearTimeout(this.getSuggestTimer)
			try{
				const res = await HeaderbarApi
				.getSuggest(
					this.headerEmit.visitNumber
				)
				.then((data) => {
					this.getSuggestText = data.data[0]? data.data[0]:''
				})
			}catch(e){
				//TODO handle the exception
			}
			
			// this.getSuggestText = '您的余额不足200元，为了您的就诊顺利，建议您进行充值'
			
			// this.getSuggestTimer = setTimeout(()=>{
			// 	this.getSuggest()
			// },20000)
		},
		btns(i,num) {
			if(i % 2 === 0 && num ==1){
				this.barList.forEach((v,x)=>{
				if(i==x){
					v.state = v.name
					this.headerEmit.state = v.name
				}else {
					v.state = false
				}
			})
			this.$emit('handle',this.headerEmit)
			}else {
				return
			}
		},
		//切换科室
		departmentBtn(item){
			if(this.headerEmit.visitNumber !== item.visitNumber){
				this.headerEmit.visitNumber = item.visitNumber
			}
		},
		animateText() {
			if (this.interval) {
				clearInterval(this.interval)
			}
			this.animatedText = ''
			let index = 0
			if(this.getSuggestText){
				this.interval = setInterval(() => {
				this.animatedText += this.getSuggestText[index]
				index++
				if (index === this.getSuggestText.length) {
					clearInterval(this.interval)
				}
			}, 100)
			}
			
		}
	},
	
}
</script>

<style lang="less">
	.convenient {
		height: 397rpx !important;
	}
.head {
	position: relative;
	flex: 0 0 auto;
	width: 100%;
	min-height: 325rpx;
	.text {
		position: absolute;
		width: 480rpx;
		color: #ffffff;
		font-weight: 600;
		margin: 46rpx 0 0 32rpx;

		.title {
			font-size: 32rpx;
		}

		.news {
			margin-top: 10rpx;
			font-size: 37rpx;
		}
	}

	.background {
		display: block;
		position: absolute;
		height: 325rpx;
		width: 100%;
	}

	.icon {
		position: absolute;
		top: 10rpx;
		left: 340rpx;
		width: 100rpx;
		height: 44rpx;
	}
	.dist {
		position:fixed;
		background: #edfeff;
		border: 2rpx solid #499eff;
		box-shadow: 0rpx 8rpx 12rpx 0rpx rgba(73,160,252,0.40);
		border-radius: 38rpx;
		transform: translate(20rpx,232rpx);
		>ul {
			display: flex;
			align-items: center;
			margin:0 6rpx;
			
			li {
				height: 78rpx;
				display: flex;
				align-items: center;
				.test {
					min-width: 160rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					padding: 0 18rpx;
				    height: 71rpx;
				    margin:  0;
				    border-radius: 32rpx;
				    font-size: 28rpx;
					line-height: 28rpx;
				    font-weight: 400;
				  
			    }
				.wire {
					width: 2rpx;
					height: 56rpx;
					margin: 0 6rpx;
					background: #cacaca;
				}
				&:last-child{
					.wire {
						margin: 0;
						width: 0;
					}
					
				}
			}
		}
			
	}
	.bar {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 72rpx;
		background: rgba(255, 255, 255, 0.82);
		box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(31, 104, 135, 0.14);
		// filter: blur(40rpx);
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #888888;

		.barList {
			display: flex;
			justify-content: center;
			width: 100%;
			&:nth-of-type(even){
				max-width: 60rpx;
				 .bar-name {
					 >view {
						  >text {
							  padding: 0;
							  padding: 0 0 0 15rpx;
				 }
					 }
				 }
				
			}
			.bar-name {
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				width: 70%;
				height: 60rpx;
				
				>view {
					display: flex;
					align-items: center;
					white-space: nowrap;
					justify-content: center;
					height: 52rpx;
					font-size: 32rpx;
					line-height: 32rpx;
					
					>text {
						border-radius: 10rpx;
						padding: 10rpx 20rpx;
						// width: 110rpx;
					}
				}
				
				
				.icons {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 30%;
					background: #222;
					font-size: 28rpx;
					height: 60rpx;
					letter-spacing: -10rpx;
				
					text {
						display: block;
						line-height: 28rpx;
					}
				}
			}
			
		}
	}
	.barColor {
		color: #0f74c8 !important;
	}
	.barBackground {
		background: #1b98ff !important;
		color: #ffffff;
	}
}
</style>
