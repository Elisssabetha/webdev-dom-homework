import { tapAddCommentBtn } from './handlers.js';
import { getComments } from './utils.js';

export const apiKey = 'liza-karankevich'

const commentsList = document.querySelector(".comments"); //спискок комментариев
const nameInput = document.getElementById("nameInput"); // Поле ввода имени
const commentInput = document.getElementById("commentInput"); // Поле ввода комментария



getComments(commentsList)
tapAddCommentBtn(nameInput, commentInput, commentsList);

