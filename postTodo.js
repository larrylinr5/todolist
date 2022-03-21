const { v4: uuidv4 } = require('uuid');
const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs')

/** 新增單筆代辦
 * @param data requestListener 資訊與清單物件
 * @param body http 傳來的 body 資訊
 */
const postTodo = (data, body) => {
  const { res, todos } = data;

  const { wrongColumn, postFail } = message
  try {
    const title = JSON.parse(body).title;
    if (title !== undefined) {
      const todo = {
        title,
        'id': uuidv4(),
      };
      todos.push(todo);
      successHandler(res, todos);
    } else {
      errorHandler(res, 400, wrongColumn);
    }
  } catch {
    errorHandler(res, 400, postFail);
  }

};

module.exports = postTodo;