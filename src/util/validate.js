//  表单格式校验
const VALIDATE = {
  // 验证中文
  isChinese: function (rule, value, callback) {
    if (!value) {
      value = '';
    }
    if (value.match(/[^\u4e00-\u9fa5]/g)) {
      callback('请输入中文名称');
    } else {
      callback();
    }
  },
  // 正整数
  number: function (rule, value, callback) {
    if (!value) {
      value = '';
    }
    if (!!value && value.match(/^\+?[1-9][0-9]*$/g) || value == 0) {
      callback();
    } else {
      callback('请输入大于等于0的整数');
    }
  },

  // 验证正浮点数
  isFloat: function (rule, value, callback) {

    if (!value) {
      value = '';
    }
    if (!!value && value.match(/^([1-9]\d*|0)(\.\d{1,2})?$/g) || value === 0) {
      callback();
    } else {
      callback('请输入数字，有且仅有两位小数');
    }
  },

  // 验证浮点数及整数
  isAllFloat: function (rule, value, callback) {

    if (!value) {
      value = '';
    }
    if (!!value && value.match(/^-?([1-9]\d*|0)(\.\d{1,2})?$/g) || value === 0) {
      callback();
    } else {
      callback('请输入数字，有且仅有两位小数');
    }
  },

  // 验证手机号
  isPhone: function (rule, value, callback) {
    if (!value) {
      value = '';
    }
    if (!!value && value.match(/^(0|86|17951)?(13[0-9]|147|15[012356789]|17[678]|18[0-9])[0-9]{8}$/g) || value === 0) {
      callback();
    } else {
      callback('请输入正确的手机号码');
    }
  },

  // 验证座机号、手机号
  isTell: function (rule, value, callback) {

    if (!value) {
      value = '';
    }
    if (!!value && value.match(/^\d{3}-\d{8}|\d{4}-\d{7,8}$/g) || value.match(/^(0|86|17951)?(13[0-9]|147|15[012356789]|17[678]|18[0-9])[0-9]{8}$/g) || value === 0) {
      callback();
    } else {
      callback('请输入正确的电话号码');
    }
  },


  // 验证密码
  isPwd: function (rule, value, callback) {
    if (!value) {
      value = '';
    }
    if (!!value && value.match(/^(?![^a-zA-Z]+$)(?!\D+$).{6,15}$/g) || value === 0) {
      callback();
    } else {
      callback('6-15位字符，且至少包含一个字母和数字');
    }
  },

  // 验证身份证
  isCard: function (rule, value, callback) {
    if (!value) {
      value = '';
    }
    if (!!value && value.match(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/g)) {
      callback();
    } else {
      callback('请输入正确的身份证号');
    }
  }
}

window.VALIDATE = VALIDATE;

export default TOOLS;