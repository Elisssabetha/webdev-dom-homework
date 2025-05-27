import { comments } from "./comments.js";
import { tapLikeBtn, quoteComm } from "./utils.js"
import { format, parseISO } from '../node_modules/date-fns/index.js';
import { ru } from '../node_modules/date-fns/locale/ru.js';
import { renderLogin } from "./renderLogin.js";
import { name, token } from "./api.js";
import { tapAddCommentBtn } from "./handlers.js";

export const renderComments = () => {
    const container = document.querySelector('.container')

    const commentsHtml = comments
    .map((comment, index) => {

      return `
        <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.author.name}</div>
          <div>${format(parseISO(comment.date), 'dd.MM.yy HH:mm', { locale: ru })}</div>
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
        </li>
      `
    })
    .join('')

    const addCommentsHtml = `
      <div class="add-form">
        <input
          id="nameInput"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          readonly
          value="${name}"
        />
        <textarea
          id="commentInput"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="btn" class="add-form-button">Написать</button>
        </div>
      </div>
    </div>
    `
    const loginLink =`
    <p> Для добавления комментария <span class="link-login">войдите</span>
    `
    const baseHtml = `<ul class="comments">${commentsHtml}</ul>
    ${token ? addCommentsHtml : loginLink}
    `

    container.innerHTML = baseHtml
    if (token) {
      tapLikeBtn(renderComments)
      quoteComm()
      tapAddCommentBtn()
    } else {
      document.querySelector(".link-login").addEventListener('click', () => {
        renderLogin()
      })
    }

}