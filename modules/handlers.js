import { replaceSymbols } from "./replaceSymbols.js";
import { postComment } from "./api.js";

export const container = document.querySelector(".container");



// Обработчик добавления комментария
export const tapAddCommentBtn = () => {
  const btn = document.getElementById("btn");
  const nameInput = document.getElementById("nameInput");
  const commentInput = document.getElementById("commentInput");
  const addForm = document.querySelector(".add-form");
  
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
          forceError: false  
      };

      const loader = document.createElement("div");
      loader.className = "comment-loader";
      loader.innerHTML = `
      <h2>Комментарий добавляется...</h2>
     `;

      btn.disabled = true;
      addForm.style.display = 'none';

      container.appendChild(loader)

      postComment(newComment);
  };

  btn.addEventListener("click", handleClick);
};
