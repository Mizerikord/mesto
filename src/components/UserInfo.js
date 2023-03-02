import { config } from '../pages/utils/constants.js'

export class UserInfo{
    constructor(userName, userInfo){
        this._userName = userName;
        this._userInfo = userInfo;
    }

    getUserInfo(){
        return {name:this._userName.textContent, theme:this._userInfo.textContent}
    }

    setUserInfo(inputsData){
        const [name, theme] = inputsData;
        config.profileName.textContent = name.value;
        config.profileTheme.textContent = theme.value;
    }
}