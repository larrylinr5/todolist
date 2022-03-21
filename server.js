const http = require('http');
const libs = require('./libs');
const { errorHandler } = require('./responseHandler');
const { getTodo, getTodos } = require('./getTodo');
const postTodo = require('./postTodo');
const patchTodo = require('./patchTodo');
const { deleteTodos, deleteTodo } = require('./deleteTodo');
/** 代辦清單 */
const todos = []

const requestListener = (req, res) => {
  const { url, method } = req
  const { headers, message } = libs
  /** requestListener 資訊與清單物件 */
  const data = {
    /** requestListener req */
    req,
    /** requestListener res */
    res,
    /** 代辦清單 */
    todos
  }
  /** http 傳來的 body 資訊 */
  let body = "";

  // 監聽 req 當 req 收到片段的 chunk 時，將片段資料加入 body 內。
  req.on('data', chunk => {
    body += chunk;
  });

  if (url === "/todos" && method === "GET") {
    getTodos(data)
  } else if (url.startsWith("/todos/") && method === "GET") {
    getTodo(data)
  } else if (url === "/todos" && method === "POST") {
    req.on('end', () => postTodo(data,body));
  } else if (url === "/todos" && method === "DELETE") {
    deleteTodos(data)
  } else if (url.startsWith("/todos/") && method === "DELETE") {
    deleteTodo(data)
  } else if (url.startsWith("/todos/") && method === "PATCH") {
    req.on('end', () => patchTodo(data,body));
  } else if (method === "OPTIONS") {
    res.writeHead(200, headers)
    res.end()
  } else {
    errorHandler(res, 404, message[404])
  }
}

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);