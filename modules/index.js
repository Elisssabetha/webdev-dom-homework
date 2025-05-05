import { renderComments } from './render.js';
import { tapAddCommentBtn } from './handlers.js';

const commentsList = document.querySelector(".comments"); //спискок комментариев
const nameInput = document.getElementById("nameInput"); // Поле ввода имени
const commentInput = document.getElementById("commentInput"); // Поле ввода комментария


renderComments(commentsList);
tapAddCommentBtn(nameInput, commentInput, commentsList);
