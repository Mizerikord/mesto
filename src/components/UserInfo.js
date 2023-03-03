export class UserInfo{
    constructor(userName, userInfo){
        this._userName = document.querySelector(userName);
        this._userInfo = document.querySelector(userInfo);
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