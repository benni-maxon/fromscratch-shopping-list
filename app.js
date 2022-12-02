/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import {
    buyListItem,
    checkAuth,
    createListItem,
    deleteAllListItems,
    getListItems,
    signOutUser,
} from './fetch-utils.js';

/* Get DOM Elements */

const form = document.querySelector('.item-form');
const deleteButton = document.querySelector('.delete');
const listEl = document.querySelector('.list');

checkAuth();

const logoutButton = document.getElementById('logout');

/* State */

/* Events */

deleteButton.addEventListener('click', async () => {
    await deleteAllListItems();

    await fetchAndDisplayList();
});

logoutButton.addEventListener('click', () => {
    signOutUser();

    location.replace('./auth');
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const item = data.get('item');
    const quantity = data.get('quantity');

    await createListItem(item, quantity);

    form.reset();

    fetchAndDisplayList();
});

/* Display Functions */

async function fetchAndDisplayList() {
    const list = await getListItems();
    listEl.textContent = '';
    for (let item of list) {
        const listItemEl = document.createElement('li');

        listItemEl.classList.add('list-item');

        listItemEl.textContent = `${item.quantity} ${item.item}`;

        if (item.bought) {
            listItemEl.classList.add('bought');
        } else {
            listItemEl.classList.add('not-bought');
            listItemEl.addEventListener('click', async () => {
                await buyListItem(item.id);
                fetchAndDisplayList();
            });
        }

        listEl.append(listItemEl);
    }
}

function renderItem() {}

window.addEventListener('load', async () => {
    fetchAndDisplayList();
});
