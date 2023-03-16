export class Api {
    constructor(addres, token) {
        this._addres = addres;
        this._token = token;
    }

    _getAnswer(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getUserData() {
        const user = fetch(`${this._addres}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
        return user.then(this._getAnswer)
    }

    getInitialCards() {
        const cards = fetch(`${this._addres}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token
            }
        })
        return cards.then(this._getAnswer)
    }

    patchProfile(profileData) {
        return fetch(`${this._addres}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: profileData.name, about: profileData.about }),
        }).then(this._getAnswer)
    }

    postNewCard(newCardData) {
        return fetch(`${this._addres}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newCardData.name,
                link: newCardData.link
            })
        }).then(this._getAnswer)
    }

    deleteMyCard(card) {
        return fetch(`${this._addres}/cards/${card._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        }).then(this._getAnswer)
    }

    makeLikeCard(card) {
        return fetch(`${this._addres}/cards/${card._id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        }).then(this._getAnswer)
    }

    deleteLikeCard(card) {
        return fetch(`${this._addres}/cards/${card._id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        }).then(this._getAnswer)
    }

    patchAvatarUser(avatar) {
        return fetch(`${this._addres}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatar }),
        }).then(this._getAnswer)
    }
}