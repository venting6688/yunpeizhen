export default {
	
    methods: {
		
        pixelateNumber(value) {
            if (value) {
                // 判断括号
                if (value.length > 6) {
                    return `${value[0]}${value[1]}${value[2]}***${value[value.length - 3]}${value[value.length - 2]}${value[value.length - 1]}`
                }
            } else {
                return value
            }
        },
        pixelate(value) {
            if (value) {
                // 判断括号
                let bracket = ''
                if (value.search(/\( | （/)) {
                    let result = /[(,（].*[),）]/.exec(value)
                    if (result) bracket = result[0]
                    value = value.replace(/[(,（].*[),）]/, '')
                }
                if (value.length === 2) {
                    return `${value[0]}*${bracket}`
                }
                if (value.length > 2) {
                    return `${value[0]}*${value[value.length - 1]} ${bracket}`
                }
            } else {
                return value
            }
        },
		getDate(type) { //年月日
		    const date = new Date();
		    let year = date.getFullYear();
		    let month = date.getMonth() + 1;
		    let day = date.getDate();
		    			
		    if (type === 'start') {
		        year = year - 100;
		    } else if (type === 'end') {
		        year = year;
		    }
		    month = month > 9 ? month : '0' + month;
		    day = day > 9 ? day : '0' + day;
		    return `${year}-${month}-${day}`;
		},
    },
}
