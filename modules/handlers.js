import { getComments } from "./utils.js";
import { replaceSymbols } from "./replaceSymbols.js";
import { apiKey } from "./index.js";

export const loaderNewComm = document.querySelector(".loaderNewComm");
export const addForm = document.querySelector(".add-form");

// Обработчик добавления комментария
export const tapAddCommentBtn = (nameInput, commentInput, commentsList) => {
  const btn = document.getElementById("btn");
  
  const handleClick = () => {
      nameInput.classList.remove("error");
      commentInput.classList.remove("error");

      const name = replaceSymbols(nameInput.value);
      const text = replaceSymbols(commentInput.value);

      if (!name) nameInput.classList.add("error");
      if (!text) commentInput.classList.add("error");
      if (name.length < 3) nameInput.classList.add("error");
      if (text.length < 3) commentInput.classList.add("error");

      const newComment = {
          name,
          text,
          forceError: true  
      };

      btn.disabled = true;
      addForm.style.display = 'none';
      loaderNewComm.textContent = 'Комментарий добавляется...';
      loaderNewComm.style.display = 'block';

      const send = () => {
          fetch(`https://wedev-api.sky.pro/api/v1/${apiKey}/comments`, {
              method: 'POST',
              body: JSON.stringify(newComment),
          })
          .then(response => {
              if (response.status === 201) {
                  return response.json();
              } else if (response.status === 500) {
                  throw new Error('Сервер сломался, пробуем ещё раз...');
              } else if (response.status === 400) {
                  throw new Error('Введены некорректные данные. Имя и комментарий должны содержать не менее 3х символов');
              } else {
                  throw new Error('Что-то пошло не так');
              }
          })
          .then(() => {
              nameInput.value = "";
              commentInput.value = "";
              return getComments(commentsList);
          })
          .catch(error => {
              if (error.message === 'Failed to fetch') {
                  alert('Кажется, у вас сломался интернет, попробуйте позже');
              } else if (error.message === 'Сервер сломался, пробуем ещё раз...') {
                  send();
                  console.log(error.message);
              } else {
                  alert(error.message);
              }
          })
          .finally(() => {
              loaderNewComm.style.display = 'none';
              addForm.style.display = 'flex';
              btn.disabled = false;
              
          });
      };

      send();
  };

  btn.addEventListener("click", handleClick);
};
