/**
 * Vue的工具类插件
 */

let local = {

  /*用localstorage存储和读取数据*/
  save(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },
  fetch(key){
    return JSON.parse(localStorage.getItem(key)) || {}
  }

}


let dicAction = {

  /*在指定字典项，通过字段code查询并返回对应的中文value*/
  /*DIC：字典数据，dicName：字典项的key值，code：字段code*/
  getCnNameByCode(DIC, dicName, code){
    if(!code || DIC==={}) return '' 
    let cnName = '';
    let dicValue = DIC[dicName].value;
    cnName = dicValue[code];
    return cnName;
  }

}

let strAction = {

  /*将返回的地址信息按照“（）”拆分成两条信息*/
  getAddress(address){
    if(!address) return ['', '']
    let leftindex = address.indexOf('（');
    let rightindex = address.indexOf('）');
    return [
      address.slice(0, leftindex) + address.slice(rightindex+1),
      address.slice(leftindex+1, rightindex)
    ]
  },

  /*逆操作--拼接地址*/
  getJoinedAddress(scaleAdd, DetailAdd){
    return scaleAdd + '（' + DetailAdd + '）'
  },

  /**
   * 将 Query 格式的字符串转成标准 Json 格式
   * "a=1&b=2&c=3" -->  {"a":"1", "b":"2", "c":"3"}
   */
  query2json(str){
    if(!str) return {}

    let obj = {}
    let arr = str.split('&')  //--> ['a=1', 'b=2', 'c=3']
    _.forEach(arr, (item, index) => {
      arr[index] = arr[index].split('=')  //--> [[a, 1], [b, 2], [c, 3]]
      obj[arr[index][0]] = arr[index][1]
    })
    return obj

  },

  //将中文转为unicode
  encodeUnicode(str){
    if(!str) return ''
    var res = [];
    for (let i=0; i<str.length; i++ ) {
	    res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
    }
    return "\\u" + res.join("\\u");
  }

}


let objAction = {

  /**
   * 将页面中的数据对象转为后台要求的参数格式
   * @param {Object} obj --> 需要转换的对象
   * @param {String} pre --> 需要添加的前缀字符串
   */
  getStringifiedKeyParams(obj, pre){

    if(!obj) return null
    if(obj==={}) return {}

    let newObj = {}
    _.forIn(obj, (value, key) => {
      newObj[pre+"."+key] = value
    })
    return newObj
    
  }

}


let timeAction = {

  //将yyyy-MM-dd格式的日期转换为时间戳，便于比较
  date2timestamp(date){
    if(!date) return 0
    var timestamp = new Date(date)
    return timestamp.getTime()
  },

  //输出今天的时间戳
  today2timestamp(){
    let time = new Date()
    let y = time.getFullYear()
    let m = ('0' + (time.getMonth()+1)).slice(-2) //1-9前面加0
    let d = ('0' + time.getDate()).slice(-2)  //1-9前面加0
    var timestamp = new Date(y +'-'+ m +'-'+ d)
    return timestamp.getTime()
  },

  
  //时间对象格式化
  formatDate(date, fmt) {

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };

    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }

    function padLeftZero(str) {
      return ('00' + str).substr(str.length);
    }

    return fmt;
  }
}

export default {
  install(vm){
    vm.prototype.$local = local;
    vm.prototype.$dicAction = dicAction;
    vm.prototype.$strAction = strAction;
    vm.prototype.$objAction = objAction;
    vm.prototype.$timeAction = timeAction;
  }
}