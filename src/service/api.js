import request from './request';

/**
 * 登录
 * 
 * @param {Object} data
 * @returns {Promise} 
 */
async function login(data) {
  return await request('/login', {
    method: 'post',
    data,
  });
}

export default {
  login,
};