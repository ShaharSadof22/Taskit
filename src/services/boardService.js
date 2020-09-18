
import httpService from './httpService';
const boards = require('../data.json').board

export const boardService = {
  query,
  loadBoard,
  removeBoard,
  save,
  addGroup,
  removeGroup,
  removeCard,
  addCard,
  getCardById,
  updateCard
};

function loadBoard(boardId) {

  const board = boards.find(board => board._id === boardId)
  return board
  //   return httpService.get(`board/${boardId}`)
}

// function getById(boardId) {
//    const board = boards.find(board => board._id === boardId)
//    return board
//   return httpService.get(`board/${boardId}`)
// }

async function save(board) {
  if (board._id) {
    return httpService.put(`board/${board._id}`, board);
  }
  else {
    const addedBoard = httpService.post(`board`, board);
    return addedBoard
  }
}
function query(filterBy) {

  // var queryStr =''
  // if (filterBy)  queryStr = `?name=${filterBy.name}&type=${filterBy.type}&inStock=${filterBy.inStock}`;
  // return httpService.get(`board${queryStr|| ''}`);
  return boards
}

function removeBoard(boardId) {
  return httpService.delete(`board/${boardId}`);
}

function addGroup(boardId, group) {
  group = {
    id: 'g' + makeId(),
    title: group.title,
    cards: []
  }
  const board = boards.find(board => board._id === boardId)
  board.groups.push(group)
  return board
}

function removeGroup(boardId, groupId) {
  console.log(groupId)
  const board = boards.find(board => board._id === boardId)
  var groupIdx = board.groups.findIndex(group => group.id === groupId)
  board.groups.splice(groupIdx,1)
  return board
}


function removeCard(boardId, groupId, cardId) {
  const board = boards.find(board => board._id === boardId)
  const group = board.groups.find(group => group.id === groupId)
  const carIdx = group.cards.findIndex(card => card.id === cardId)
  group.cards.splice(carIdx, 1)
  return board
}


function addCard(boardId, groupId, card) {
  card = {
    id: 'c' + makeId(),
    title: card.title,
  }
  const board = boards.find(board => board._id === boardId)
  const group = board.groups.find(group => group.id === groupId)
  group.cards.push(card)
  return board
}

function updateCard(boardId, groupId, card) {
  var cardId = card.id;
  const board = boards.find(board => board._id === boardId);
  const group = board.groups.find(group => group.id === groupId);
  let cardIdx = group.cards.findIndex(card => card.id === cardId);
  group.cards.splice(cardIdx, 1, card)
  return board

}

// function addImgToCard(boardId, groupId, card, imgUrl) {
//   const board = boards.find(board => board._id === boardId);
//   const group = board.groups.find(group => group.id === groupId);
//   let cardIdx = group.cards.findIndex(card => card.id === cardId);
//   group.cards.splice(cardIdx, 1, card)
//   return board
// }








function getCardById(board, groupId, cardId) {
  const group = board.groups.find(group => group.id === groupId)
  return group.cards.find(card => card.id === cardId)
}

function makeId(length = 3) {
  var txt = '';
  var possible = '0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}