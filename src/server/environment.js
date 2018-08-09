let environment = {

  dev: 'http://10.10.80.135:8880/maccs/wxqyh',
  HSW: 'http://10.10.143.152:28080/maccs/wxqyh',
  test: 'http://wxsp.hanhua.com:10080/maccs/wxqyh',
  prod: 'http://creditmobile.hanhua.com/maccs/wxqyh'

}
environment.url = environment.dev
environment.uploadUrl = environment.url + '/wx_upload.do'

export default environment
