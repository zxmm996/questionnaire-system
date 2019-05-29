import request from './request';

/**
 * 注册
 *
 * @param {Object} data
 * @returns {Promise}
 */
async function regist(data) {
  return await request('/test/reg', {
    method: 'post',
    data,
  });
}

/**
 * 登录
 *
 * @param {Object} data
 * @returns {Promise}
 */
async function login(data) {
  return await request('/test/login', {
    method: 'post',
    data,
  });
}

/**
 * 创建表单
 *
 * @param {Object} data
 * @returns {Promise}
 */
async function createForm(data) {
  return await request('/form', {
    method: 'post',
    data,
  });
}

/**
 * 获取用户创建的表单列表
 *
 * @param {Object} data
 * @returns {Promise}
 */
async function getFormList(data) {
  return await request('/forms', {
    method: 'get',
    params: data,
  });
}

/**
 * 获取单个表单详情
 *
 * @param {Object} data
 * @returns {Promise}
 */
async function getFormDetail(data) {
  return await request('/form', {
    method: 'get',
    params: data,
  });
}

/**
 * 删除表单
 *
 * @param {Object} data
 * @returns {Promise}
 */
async function deleteForm(data) {
  return await request('/form', {
    method: 'delete',
    data,
  });
}

/**
 * 填写表单
 *
 * @param {Object} data
 * @returns {Promise}
 */
async function fillForm(data) {
  return await request('/fill', {
    method: 'post',
    data,
  });
}

export default {
  regist,
  login,
  createForm,
  getFormList,
  deleteForm,
  getFormDetail,
  fillForm,
};
