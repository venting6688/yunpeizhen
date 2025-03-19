
 
import { cjRequest } from '@/utils/service.js'
 
 
const patient = {
	
   /**
   	 * 获取初诊回诊卡片数据 tag = 1 初诊 tag = 2 回诊
   */
   	async registrationCardAPI(data) {
   		const res = await cjRequest({
   			url: "cardContent/registrationCard",
   			method: "get",
			data:{
			visitNumber: data.visitNumber,
			tag:data.tag,
			}
   			
   	
   		})
   		
   		return res
   	},
	/**
		 * 获取查验接口
	*/
	async examineCard(data) {
		const res = await cjRequest({
			url: "cardContent/examineCard",
			method: "get",
			data:{
			visitNumber: data.visitNumber,
			}
			
	
		})
		
		return res
	},
    /**
    	 * 获取处方接口
    */
    async prescriptionCard(data) {
    	const res = await cjRequest({
    		url: "cardContent/prescriptionCard",
    		method: "get",
    		data:{
    		visitNumber: data.visitNumber,
    		}
    		
    
    	})
    	
    	return res
    },
	/**
		 * 签到接口
	*/
	async signIn(data) {
		const res = await cjRequest({
			url: "cardContent/signIn",
			method: "get",
			data:{
			visitNumber: data.visitNumber,
			signInType:data.signInType,
			queueId:data.queueId
			}
			
	
		})
		
		return res
	},
	/**
		 * 缴费接口
	*/
	async examineOrInspectPayment(data) {
		const res = await cjRequest({
			url: "cardContent/examineOrInspectPayment",
			method: "get",
			data:{
			doctorOrderId: data.doctorOrderId,
			}
			
	
		})
		
		return res
	},
	/**
		* 刷新呼叫信息接口
	*/
	async getQueueingDTO(data) {
		const res = await cjRequest({
			url: "cardContent/getQueueingDTO",
			method: "get",
			data:{
			visitNumber: data.visitNumber,
			queueCode:data.queueCode,
			}
			
	
		})
		
		return res
	},
	/**
		* 预问诊结论保存
	*/
	async PreConsultation(data) {
		const res = await cjRequest({
			url: "PreConsultation",
			method: "post",
			data:data.data,
		})
		
		return res
	},
}
 
export default patient