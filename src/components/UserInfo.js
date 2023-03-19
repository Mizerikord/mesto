export class UserInfo{
    constructor(avatarElem, userNameSelector, userInfoSelector){
        this._avatarElem = avatarElem;
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo(){
        return {name:this._userName.textContent, about:this._userInfo.textContent}
    }

    setUserAvatar(avatar){
        this._avatarElem.src = avatar;
    }

    setUserInfo(inputsData){
        const {name, about} = inputsData;
        this._userName.textContent = name;
        this._userInfo.textContent = about;
    }
}