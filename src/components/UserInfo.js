export class UserInfo{
    constructor(userNameSelector, userInfoSelector){
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo(){
        return {name:this._userName.textContent, about:this._userInfo.textContent}
    }

    setUserAvatar(avatarElem, avatar){
        avatarElem.src = avatar;
    }

    setUserInfo(inputsData){
        const {name, about} = inputsData;
        this._userName.textContent = name;
        this._userInfo.textContent = about;
    }
}