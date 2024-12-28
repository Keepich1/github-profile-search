const mainEL = document.querySelector('.main');

const formEL = document.createElement('form');
formEL.classList.add('search');
formEL.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputsValue = Object.fromEntries(new FormData(e.target));
    try {
        const response = await fetch(`https://api.github.com/users/${inputsValue.name}`);

        // Удаление предыдущей карточки, если она есть
        const existingCard = document.querySelector('.profile-card');
        if (existingCard) existingCard.remove();

        if (response.ok) {
            const data = await response.json();

            // Создание карточки профиля
            const card = document.createElement('div');
            card.classList.add('profile-card');

            card.innerHTML = `
                <img src="${data.avatar_url}" alt="${data.name}" class="profile-img">
                <h2>${data.name || 'No Name Provided'}</h2>
                <p>Followers: ${data.followers}</p>
                <p>Following: ${data.following}</p>
                <p>Repos: ${data.public_repos}</p>
                <a href="${data.html_url}" target="_blank" class="profile-link">View Profile</a>
            `;

            mainEL.appendChild(card);
        } else {
            alert('Пользователь не найден');
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});

const inputEL = document.createElement('input');
inputEL.classList.add('search-input');
inputEL.setAttribute('name', 'name');
inputEL.setAttribute('placeholder', 'Введите имя пользователя GitHub');

const searchButtonEL = document.createElement('button');
searchButtonEL.classList.add('search-button');
searchButtonEL.setAttribute('type', 'submit');
searchButtonEL.innerHTML = 'Поиск';

formEL.appendChild(inputEL);
formEL.appendChild(searchButtonEL);
mainEL.appendChild(formEL);