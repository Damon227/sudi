// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
  
    const wxContext = cloud.getWXContext()
    const xlsx = require('node-xlsx');
    
    let xlsxObj = [
      ['总监昵称', '收件人', '电话', '地区', '详细地址']
    ];
    event.infos.map(function (value, index, array) {
      xlsxObj.push([value.name, value.addressee, value.phoneNo, value.region, value.address])
    })

    var buffer = xlsx.build([{
      name: "mySheet",
      data: xlsxObj
    }])

    return await cloud.uploadFile({
      cloudPath: Date.parse(new Date()) + '.xlsx',
      fileContent: buffer,
    })

  } catch (error) {
    console.log(error);
    return error;
  }
}