import { comments, updateComments } from "./comments.js";
import { renderComments } from "./render.js";

// Обработчик лайков
export const tapLikeBtn = (commentsList) => {
    document.querySelectorAll(".like-button").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = btn.dataset.index;
        comments[index].isLiked = !comments[index].isLiked;
        comments[index].likes += comments[index].isLiked ? 1 : -1;
        renderComments(commentsList);
      });
    });
  };

// Обработчик цитирования
export const quoteComm = (li, comment) => {
    li.addEventListener("click", (event) => {
        commentInput.value = `>> ${comment.author.name}: \n>> ${comment.text}`;
      });
}

export const getComments = (commentsList) => {
  fetch('https://wedev-api.sky.pro/api/v1/lizzy-karankevich/comments').then(response => response.json())
.then(data => {
  updateComments(data.comments)
  renderComments(commentsList)
})
}