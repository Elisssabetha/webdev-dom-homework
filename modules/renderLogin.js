import { login, updateToken, setName } from "./api.js";
import { renderRegistration } from "./renderRegist.js";
import { getComments } from "./utils.js";

export const renderLogin = () => {
const container = document.querySelector('.container'); 

  container.innerHTML = `
    <section class="add-form">
      <h2>Форма входа</h2>
      <div class="login-form">
        <input class="add-form-name login-input" id="login-input" type="text" placeholder="Логин" required>
        <input class="add-form-name login-input" id="password-input" type="password" placeholder="Пароль" required>
        <button class="add-form-button" id="login-btn">Войти</button>
        <button class="add-form-button notmain" id="reg-btn">Зарегестрироваться</button>
      </div>
    </section>
  `;
    const loginBtn = document.querySelector('#login-btn')
    const regBtn = document.querySelector('#reg-btn')
    const loginEl = document.querySelector('#login-input')
    const passwordEl = document.querySelector('#password-input')

    regBtn.addEventListener('click', () => {
        renderRegistration()
    })

    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        login(loginEl.value, passwordEl.value)
        .then((data) => {
            updateToken(data.user.token)
            setName(data.user.name)
            getComments()
        })
        .catch(error => {
            alert('Ошибка авторизации');
            console.log(`Ошибка авторизации: ${error.message}`);
          })
    })
}