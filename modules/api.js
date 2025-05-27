import { getComments } from "./utils.js"

export const apiKey = 'liza-karankevich'
export const host = `https://wedev-api.sky.pro/api/v2/${apiKey}/comments`
export const authHost ='https://wedev-api.sky.pro/api/user'
export let token = ''
export let name = ''

export const updateToken = (newToken) => {
    token = newToken
} 
  export const setName = (newName) => {
    name = newName
}   


export const fetchComments = () => {
    return fetch(host)
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

export const postComment = (newComment) => {
    return fetch(`https://wedev-api.sky.pro/api/v2/${apiKey}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          Authorization: `Bearer ${token}`,
        }
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
        return getComments();
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
    // .finally(() => {
        
    //     addForm.style.display = 'flex';
    //     btn.disabled = false;
        
    // });
};



export const login = (login, password) => {
    return fetch(authHost + '/login', { 
       method: 'POST', 
       body: JSON.stringify({ login: login, password: password }), 
    }).then(response => response.json());
 }

 export const registration = (name, login, password) => {
    return fetch(authHost, { 
       method: 'POST', 
       body: JSON.stringify({name: name, login: login, password: password}), 
    }).then(response => response.json());
 }