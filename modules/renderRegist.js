import { registration, updateToken, setName } from "./api.js";
import { renderLogin } from "./renderLogin.js";
import { getComments } from "./utils.js";

export const renderRegistration = () => {
const container = document.querySelector('.container'); 

  container.innerHTML = `
    <section class="add-form">
      <h2>Форма регистрации</h2>
      <div class="login-form">
        <input class="add-form-name login-input" id="name-input" type="text" placeholder="Имя" required>
        <input class="add-form-name login-input" id="login-input" type="text" placeholder="Логин" required>
        <input class="add-form-name login-input" id="password-input" type="password" placeholder="Пароль" required>
        <button class="add-form-button" id="reg-btn">Зарегистрироваться</button>
        <button class="add-form-button notmain" id="login-btn">Войти</button>
        
      </div>
    </section>
  `;
    const regBtn = document.querySelector('#reg-btn')
    const loginBtn = document.querySelector('#login-btn')
    const nameEl = document.querySelector('#name-input')
    const loginEl = document.querySelector('#login-input')
    const passwordEl = document.querySelector('#password-input')

    loginBtn.addEventListener('click', () => {
        renderLogin()
    })

    regBtn.addEventListener('click', (event) => {
        event.preventDefault();
        registration(nameEl.value, loginEl.value, passwordEl.value)
        .then((data) => {
            updateToken(data.user.token)
            setName(data.user.name)
            getComments()
        })
        .catch(error => {
            alert('Ошибка регистрации');
            console.log(`Ошибка регистрации: ${error.message}`);
          })
    })
}