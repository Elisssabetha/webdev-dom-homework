import { comments, updateComments } from "./comments.js";
import { renderComments } from "./render.js";
import { fetchComments } from "./api.js";

export const loader = document.querySelector(".loader"); 

function delay(interval = 300) {
  return new Promise((resolve) => {
     setTimeout(() => {
     resolve();
     }, interval);
  });
}

// Обработчик лайков
export const tapLikeBtn = () => {
    document.querySelectorAll(".like-button").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = btn.dataset.index;
        const comment = comments[index]

        btn.disabled = true;
        btn.classList.add('-loading-like');

        delay(800).then(() => {
          comment.isLiked = !comment.isLiked;
          comment.likes += comment.isLiked ? 1 : -1;
          renderComments();
        })
        .finally(() => {
          btn.disabled = false;
          btn.classList.remove('-loading-like');
      });
        
      });
    });
  };

// Обработчик цитирования
export const quoteComm = () => {
  const commentEls = document.querySelectorAll('.comment')
  commentEls.forEach((comm) => {
    comm.addEventListener("click", () => {
      const currentComm = comments[comm.dataset.index]
      commentInput.value = `>> ${currentComm.author.name}: \n>> ${currentComm.text}`;
    });
  }) 
}

export const getComments = (isFirstLoading) => {
  if (isFirstLoading) {
    document.querySelector('.container').innerHTML = 
    `<h2> Загрузка комментариев </h2>`
  }
  fetchComments()
    .then(data => {
      updateComments(data.comments);
      renderComments();
    })
    .catch(error => {
      if (error.message === 'Failed to fetch') {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
      } else {
      alert(error.message)
      }
    })
};
