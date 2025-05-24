import { comments, updateComments } from "./comments.js";
import { renderComments } from "./render.js";
import { apiKey } from "./index.js";

export const loader = document.querySelector(".loader"); 

function delay(interval = 300) {
  return new Promise((resolve) => {
     setTimeout(() => {
     resolve();
     }, interval);
  });
}

// Обработчик лайков
export const tapLikeBtn = (commentsList) => {
    document.querySelectorAll(".like-button").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = btn.dataset.index;

        btn.disabled = true;
        btn.classList.add('-loading-like');

        delay(800).then(() => {
          comments[index].isLiked = !comments[index].isLiked;
          comments[index].likes += comments[index].isLiked ? 1 : -1;
          renderComments(commentsList);
        })
        .finally(() => {
          btn.disabled = false;
          btn.classList.remove('-loading-like');
      });
        
      });
    });
  };

// Обработчик цитирования
export const quoteComm = (li, comment) => {
    li.addEventListener("click", (event) => {
        commentInput.value = `>> ${comment.author.name}: \n>> ${comment.text}`;
      });
}


export const fetchComments = () => {
  return fetch(`https://wedev-api.sky.pro/api/v1/${apiKey}/comments`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
      if (response.status === 500) {
        throw new Error('Сервер сломался, попробуй позже');
      }
      throw new Error('Что-то пошло не так');
    }
    })
    .catch(error => {
      throw error; 
    });
};

export const getComments = (commentsList) => {
  
  fetchComments()
    .then(data => {
      updateComments(data.comments);
      renderComments(commentsList);
    })
    .catch(error => {
      if (error.message === 'Failed to fetch') {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
      } else {
      alert(error.message)
      }
    })
    .finally(() => {
      loader.style.display = 'none';
    });
};
