export class UserInfo{
    constructor(userNameSelector, userInfoSelector){
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    getUserInfo(){
        return {name:this._userName.textContent, theme:this._userInfo.textContent}
    }

    setUserInfo(inputsData){
        const {name, theme} = inputsData;
        this._userName.textContent = name;
        this._userInfo.textContent = theme;
    }
}