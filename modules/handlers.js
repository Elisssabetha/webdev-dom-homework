import { getComments, loader } from "./utils.js";
import { replaceSymbols } from "./replaceSymbols.js";
import { apiKey } from "./index.js";

export const loaderNewComm = document.querySelector(".loaderNewComm");
export const addForm = document.querySelector(".add-form");

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

      btn.disabled = true;
      addForm.style.display = 'none';
      loaderNewComm.textContent = 'Комментарий добавляется...'
      loaderNewComm.style.display = 'block'
  
      fetch(`https://wedev-api.sky.pro/api/v1/${apiKey}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment)
      })
        .then(() => {
          return getComments(commentsList)
        })
        .catch(error => {
          console.error('Ошибка:', error);
          return Promise.reject(error);
       })
        .finally(() => {
          loaderNewComm.style.display = 'none'
          addForm.style.display = 'flex';
          btn.disabled = false;
        });

      nameInput.value = "";
      commentInput.value = "";
    });
  };


