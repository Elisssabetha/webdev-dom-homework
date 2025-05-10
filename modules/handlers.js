import { getComments } from "./utils.js";
import { replaceSymbols } from "./replaceSymbols.js";
// import { format } from "date-fns";
// import { ru } from 'date-fns/locale';
// import { format } from '../node_modules/date-fns/index.js';
// import { ru } from '../node_modules/date-fns/locale/ru.js';
import { comments, updateComments } from "./comments.js";


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
        text
      };
  
      fetch('https://wedev-api.sky.pro/api/v1/lizzy-karankevich/comments', {
        method: 'POST',
        body: JSON.stringify(newComment)
      }).then(response => response.json())
        .then(() => {
          getComments(commentsList)
      })

      nameInput.value = "";
      commentInput.value = "";
    });
  };


