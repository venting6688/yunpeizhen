
 
import { cjRequest } from '@/utils/service.js'
 
 
const patient = {
	/**
		 * 获取今日挂号数据
	*/
	   async todayVisit(data) {
	   	const res = await cjRequest({
	   		url: "diagnose/registration/list",
	   		method: "get",
	   		data:{
	   		patientUniquelyIdentifies: data.patientUniquelyIdentifies,
	   		reserve_time:data.reserve_time,
	   		}
	   
	   	})
	   	return res
	   },
	/**
	 * 获取就诊阶段(上方横条)
    */
   async getTreatmentStageAPI(data) {
   	const res = await cjRequest({
   		url: "cardContent/getTreatmentStage",
   		method: "get",
		data:{
		visitNumber: data,
		}
   		
   
   	})
   	return res
   },
    /**
    	 * 获取建议列表
        */
       async getSuggest(data) {
       	const res = await cjRequest({
       		url: "cardContent/getSuggest",
       		method: "get",
       		data:{
       		visitNumber: data,
       		}
       	},true)
       	return res
       },
		/**
		  	* footer更换就诊人
		*/
		     async updateDefaultArchives(data) {
		     	const res = await cjRequest({
		     		url: `updateDefaultArchives?patientCard=${data.patientCard}&phone=${data.phone}`,
		     		method: "post",
		     		
		     	},true)
		     	return res
		     },
		// 刷新用户信息
	    async refreshUserInfo(phoneNum) {
	    	const res = await cjRequest({
	    		url: `refreshUserInfo?phoneNum=${phoneNum}`,
	    		method: "get",
	    	})
	    	return res
	    },
}
 
export default patient