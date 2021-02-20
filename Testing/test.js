const clientID = "2b8d36cc897656a0b7ec7ccce4c0707c";
const clientSecret = "23f59c115d756619a4a1afc822c3ae94ea9eb942c7c4fb067e10730ed315c1a2";

function generateRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function print_new_authorization_url(code_challenge){
    url = "https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=" + clientID + "&code_challenge=" + code_challenge ;
    return url;
}

var currUrl = document.URL;


const codeVerifier = code_challenge = generateRandomString(128);

var auth_code = currUrl.split("code=")[1];

console.log(auth_code);

if(currUrl.includes("code")){
    var auth_code = currUrl.split("code=")[1];

    var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://myanimelist.net/v1/oauth2/token');
xhr.setRequestHeader('client_id', clientID);
xhr.setRequestHeader('client_secret', clientSecret);
xhr.setRequestHeader('code', "def502008873c4058e7cbe5743c871f84064d6718f6c92a176ff8870f475eb2a6bf650a41c927850c1fc484ae14dd01c1b7e9874e1d4d24164c3889f6a305a4a4d009c657d0d4eeb071e977bac50a04a4f34223b77f7fad82b3c5f578788d38221ad44573a199c3505f7db85bb49841f7c2a52c1eb715d09fd2d15fd3bb11a7617d66d5bfb28bb8e9ad4c2309e54687c9bd713304a842ea34d4dccc46fec5152499f0df618ae8a98628eb920e6a3e419c3a48fae1e7450470ef26c14f824e0c1357c51e6a942317a82c326ce1606e017b7766b81df88be1c6231e04a83d67db7c3450340b0b2c46567f0457f5392e7f091d81e8cefcf9693405803b6682646bff9cd4034d4f24705f1603e4629fb342524bba4e9e6714839a00a7b1b32ceb45af4bc5bafe7cfd7ae8d59d9d5c8e291c4cb814dcce21a6ca3280e6ec049c79a5db6122ecc420726822d277758a03d8fb8917bbf76b87443cabf08eb254ce4b31788d2f8de7aea3aa96db8c0058ca15fbbe87515d0a1cdc02761d2dd43669f389abd9598ce5c9ff09152625cd3e9d63001f30b57da7641d41900ed85a632513bfd60378453c148367f5284380f3870d17d578ce6f8f759e6c18dc254c42de8d779691dbc2e54f7fe41e808aee281457fdd463720272dc9a916816fbff19558eccd336d9e9d8e1cffcb58");
xhr.setRequestHeader('code_verifier', codeVerifier);
xhr.setRequestHeader('grant_type', 'authorization_code');

xhr.onload = function(){
    if(this.status == 200 || this.status == 304){
        var json_response = JSON.parse(this);
        console.log(this.token);
    }
}

xhr.send();

}



//main


document.querySelector('#link').setAttribute('href', print_new_authorization_url(codeVerifier));
console.log(codeVerifier);

//def50200e407d75975306e319d7043584e4c0d72e3ec7d63fa5591eeef85866aeb756b905a85bdbb94e28311825a79dac51c43b46eccf8b366a96cd596bf4d6239af5e7956923e86c19874022dc30371bf668a10825154a0047ba17f24b43ed5600c01747838c3a5a5b1e6e24689914c60382a6611a749b90f9d8b84374272aeb22afabc20155706358137f3e0e5013fef610ee8912d158058b4fc714b8f4801d5f87fce849543909e3ad80ef08fc497f18bb239fca1a912850c91e76690b64864b8372da6908c72936e40766b926995221fa1ac725c37a769cce9f6d78c95d9654214f00c9266f5b04f406a6c476fc331a683166516bb0bdd7de1d883a1685bcf2b5913224d8332f50d4bc2ad5c8413e917bee5264e2c13ee27d63017d17f0aabb322aee174b3b6786262dc980687c1b614487ae66454b96eacbf3573f66c99e4d2160050bc3a06bcaeae71fc15041d22fd66f2dd95307693d5bf4854c3cace3e461ab330a9f61e6a3362e8affb969e9bc673fc3bca8195054a579a0f4f57f9e4c5a089af62c4fbf55232e65317352e5ad21482571ba086ef02550221a8d04e2d3bc9942b07fd408a2f040da7dc38b78c75a1ad975e8d61885714bd937fc7dd2f4311653e826247557fa8450887c544cc7f127b96c0bb61465a72c995d6a4db1b68404621674a2fc0