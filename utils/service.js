import login from './login.js'

export const cjRequest = (parmas,state) => {
	return new Promise((resolve, reject) => {
	    // login.loginData(state).then(data => {
	    		// 基础url
	    		const baseUrl = "https://www.chinzsoft.com/api/mobile/"
				// const baseUrl = "https://aiwz.sdtyfy.com:8099/mobile/"
	    		    wx.request({
	    		        ...parmas,
	    		        url: baseUrl + parmas.url,
	    		        success: (result) => {
	    		            resolve(result)
	    		        },
	    		        fail: (err) => {
	    		            reject(err)
	    		        },
	    		       
	    		    });
	    		 
	    		// })
	})
    
}
 