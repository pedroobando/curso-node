const { request, response } = require('express');

const userGet = (req = request, res = response) => {
  const { page = 1, limit = 10, orderby = 'asc' } = req.query;
  res.json({ msg: 'get api - controllers', query: { page: parseInt(page, 10), limit, orderby } });
};

const userPost = (req = request, res = response) => {
  const body = req.body;
  res.json({ msg: 'post api - controllers', body });
};

const userPut = (req = request, res = response) => {
  const { id } = req.params;
  const { order, total } = req.query;
  const { name, email } = req.body;
  res.json({ msg: 'put api - controllers', id, name, email, query: { order, total } });
};

const userDelete = (req = request, res = response) => {
  res.json({ msg: 'delete api - controllers' });
};

const userPatch = (req = request, res = response) => {
  res.json({ msg: 'patch api - controllers' });
};

module.exports = { userGet, userDelete, userPatch, userPost, userPut };
