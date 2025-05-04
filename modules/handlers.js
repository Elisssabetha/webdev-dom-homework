import { addComment } from "./comments.js";
import { renderComments } from "./render.js";
import { replaceSymbols } from "./replaceSymbols.js";
// import { format } from "date-fns";
// import { ru } from 'date-fns/locale';
import { format } from '../node_modules/date-fns/index.js';
import { ru } from '../node_modules/date-fns/locale/ru.js';


// Обработчик добавления комментария
export const tapAddCommentBtn = (nameInput, commentInput, commentsList) => {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", () => {
      nameInput.classList.remove("error");
      commentInput.classList.remove("error");
  
      const name = replaceSymbols(nameInput.value);
      const text = replaceSymbols(commentInput.value);
  
      if (!name || !text) {
        if (!name) nameInput.classList.add("error");
        if (!text) commentInput.classList.add("error");
        return;
      }
  
      const newComment = {
        name,
        date: format(new Date(), 'dd.MM.yy HH:mm', { locale: ru }),
        text,
        likes: 0,
        isLiked: false,
      };
  
      addComment(newComment);
      renderComments(commentsList);

      nameInput.value = "";
      commentInput.value = "";
    });
  };


