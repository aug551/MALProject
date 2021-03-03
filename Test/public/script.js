// Client ID:
// 2b8d36cc897656a0b7ec7ccce4c0707c

var code_verifier = code_challenge = "";
const client_id = '2b8d36cc897656a0b7ec7ccce4c0707c';

if(document.cookie == ""){
    document.cookie = '_c_ver=' + generateRandomString(128);
}

let cs = document.cookie.split('; ');

if(cs.find(row => row.startsWith('_a_tok')))
{
    window.location.replace('authorized.html');
}

code_verifier = code_challenge = cs.find(row => row.startsWith('_c_ver=')).split('=')[1];

console.log(code_verifier);


const auth_url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${client_id}&code_challenge=${code_challenge}`;

document.querySelector('#auth').href = auth_url;

function generateRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
