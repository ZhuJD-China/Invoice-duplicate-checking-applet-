// 云函数入口文件
const cloud = require('wx-server-sdk')
const tencentcloud = require("tencentcloud-sdk-nodejs"); //腾讯云API 3.0 SDK
cloud.init()

var InvoiceIdentification=function(url)
{
  const OcrClient = tencentcloud.ocr.v20181119.Client;
  const models = tencentcloud.ocr.v20181119.Models;

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;

  let cred = new Credential("AKIDAfuvgVJarsfJvJTKzOceQUK0xi3L69k7", "MTVO4vZwGUTItHYieQWTSN7eJ4d0Dcpv");
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "ocr.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new OcrClient(cred, "ap-guangzhou", clientProfile);

  let req = new models.VatInvoiceOCRRequest();
  let params = '{"ImageUrl":"' + url + '"}' //拼接参数
  req.from_json_string(params);

  return new Promise(function (resolve, reject) { //构造异步函数
    client.VatInvoiceOCR(req, function (errMsg, response) {

      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response);
      }
    })
  })
}



// 云函数入口函数
exports.main = async (event, context) => {
  const data = event
  const fileList = [data.fileID] //读取来自客户端的fileID
  const result = await cloud.getTempFileURL({
    fileList, //向云存储发起读取文件临时地址请求
  })
  const url = result.fileList[0].tempFileURL
  datas = await InvoiceIdentification(url) //调用异步函数，向腾讯云API发起请求
  return datas

  
  // const fileList = ['cloud://zhujiadong-e9urk.7a68-zhujiadong-e9urk-1258940313/发票查重小程序/发票样例.jpg']
  // const result = await cloud.getTempFileURL({
  //   fileList,
  // })
  // return result.fileList
}