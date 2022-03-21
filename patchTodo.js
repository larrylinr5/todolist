const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs')

/** 編輯單筆代辦
 * @param data requestListener 資訊與清單物件
 * @param body http 傳來的 body 資訊
 */
const patchTodo = (data, body) => {
  const { req, res, todos } = data;

  const { noData, wrongColumn } = message
  try {
    const { title } = JSON.parse(body);

    if (title) {
      const id = req.url.split('/').pop();
      const index = todos.findIndex((todo) => todo.id === id);

      if (index !== -1) {
        todos[index].title = title;
        successHandler(res, todos);
      } else {
        errorHandler(res, 400, noData);
      }
    } else {
      errorHandler(res, 400, wrongColumn);
    }
  } catch (err) {
    errorHandler(res, 400, err.message);
  }
};

module.exports = patchTodo;