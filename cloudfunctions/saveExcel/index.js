// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    console.log(11);
    const wxContext = cloud.getWXContext()
    const xlsx = require('node-xlsx');

    let xlsxObj = [
      ['id', 'name'],
      ['1', 'jack'],
      ['2', 'rose']
    ];

    var buffer = xlsx.build([{
      name: "mySheet",
      data: xlsxObj
    }])

    return await cloud.uploadFile({
      cloudPath: 'demo.xlsx',
      fileContent: buffer,
    })

  } catch (error) {
    console.log(error);
    return error;
  }
}