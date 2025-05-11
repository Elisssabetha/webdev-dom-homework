import { comments } from "./comments.js";
import { tapLikeBtn, quoteComm } from "./utils.js"
import { format, parseISO } from '../node_modules/date-fns/index.js';
import { ru } from '../node_modules/date-fns/locale/ru.js';

export const renderComments = (commentsList) => {
    commentsList.innerHTML = "";

    // для каждого коммента из массива создаем нужную html-структуру
    comments.forEach((comment, index) => {
      const formattedDate = format(parseISO(comment.date), 'dd.MM.yy HH:mm', { locale: ru })

      const li = document.createElement("li");
      li.className = "comment";
      li.innerHTML = `
        <div class="comment-header">
          <div>${comment.author.name}</div>
          <div>${formattedDate}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="like-button ${
        comment.isLiked ? "-active-like" : ""
      }"></button>
          </div>
        </div>
      `;

      // добавляем новый элемент к списку
      commentsList.appendChild(li);
      quoteComm(li, comment);

    });
    tapLikeBtn(commentsList);
}