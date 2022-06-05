import { MsalAuthProvider, LoginType } from 'react-aad-msal';


const config = {

    auth: {
        authority: 'https://login.microsoftonline.com/7653af48-8d24-4c43-bbaa-b8547139c0f5',
        clientId: "3bfebebe-9bb6-4757-adef-04f4ebc10efc",
        postLogoutRedirectUri: window.location.origin,
        redirectUri: window.location.origin,
        validateAuthority: true,
        navigateToLoginRequestUrl: true
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
}

// Authentication Parameters
export const authenticationParameters = {
    scopes: [
        'user.read'
    ]
}
export const authenticationParametersGraph = {
    scopes: [
        'openid'
    ]
}
// Options
export const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin
}

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options)