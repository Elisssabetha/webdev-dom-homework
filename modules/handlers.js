import { addComment } from "./comments.js";
import { renderComments } from "./render.js";
import { replaceSymbols } from "./replaceSymbols.js"  


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
        date: new Date().toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).replace(",", ""),
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


