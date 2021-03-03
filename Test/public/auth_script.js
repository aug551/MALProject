const auth_code = document.URL.split('=')[1];
let cs = document.cookie.split('; ');
var temp;

console.log(document.cookie);


if(!cs.find(row => row.startsWith('_a_tok='))){
    SetAuthToken();
}

const token = cs.find(row => row.startsWith('_a_tok=')).split('=')[1];

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
    const response = await fetch('/user/' + token);
    const res_json = await response.json();

    document.querySelector('#id_holder').textContent = res_json.id;
    document.querySelector('#name_holder').textContent = res_json.name;
}

// Button submit to search
document.querySelector('#submit').addEventListener('click', () => {
    var anime = document.querySelector('#searchedAnime').value;
    FindAnime(anime);
})

async function FindAnime(anime){
    const response = await fetch('/anime/' + token + '/' + anime);
    const res_json = await response.json();
    console.log(res_json);

    document.querySelector('#anime_title').textContent = res_json.node.title;
    document.querySelector('#status').textContent = res_json.list_status.status;
    document.querySelector('#watched').textContent = res_json.list_status.num_episodes_watched;
}


