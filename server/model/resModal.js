/**
 * @description 返回数据的基本模型
 */

// 希望最后是这个样子
// {
//   errno: 0,  成功失败都有
//   data: {},  成功时
//   message: '' 失败时
// }
class ResModal {
  constructor({errno, data, message}){
    this.errno = errno
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

//成功模型
class SuccessModal extends ResModal {
  constructor({data}){
    super({data, errno: 0})
  }
}

//失败模型
class ErrorModal extends ResModal {
  constructor({errno, message}){
    super({errno, message})
  }
}

module.exports = {
  SuccessModal,
  ErrorModal
}