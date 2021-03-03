const auth_code = document.URL.split('=')[1];
let cs = document.cookie.split('; ');
var temp;

console.log(document.cookie);


if(!cs.find(row => row.startsWith('_a_tok='))){
    SetAuthToken();
}
ShowSelfInfo();


// SSIDE

async function SetAuthToken(){
    const response = 
        await fetch('/token/' + 
        cs.find(row => row.startsWith('_c_ver=')).split('=')[1] + '/' + auth_code);
    
    const res_json = await response.json();
    
    document.cookie = '_a_tok=' + res_json.access_token;
}

async function ShowSelfInfo(){
    const response = await fetch('/user/' + cs.find(row => row.startsWith('_a_tok=')).split('=')[1]);
    const res_json = await response.json();

    document.querySelector('#id_holder').textContent = res_json.id;
    document.querySelector('#name_holder').textContent = res_json.name;
}