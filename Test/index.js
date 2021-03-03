// ALL CLIENT INFORMATION:
// Client ID:
// 2b8d36cc897656a0b7ec7ccce4c0707c

// Client Secret:
// 23f59c115d756619a4a1afc822c3ae94ea9eb942c7c4fb067e10730ed315c1a2
const { response } = require('express');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xhr = new XMLHttpRequest();

// start the server
app.listen(60000, () => console.log('listening at 60000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// server skeleton end ----------------------------------------

const c_id = '2b8d36cc897656a0b7ec7ccce4c0707c';
const c_sec = '23f59c115d756619a4a1afc822c3ae94ea9eb942c7c4fb067e10730ed315c1a2';
const token_url = 'https://myanimelist.net/v1/oauth2/token';


app.get('/token/:c_ver/:code', (request, response) => {

    const code_verif = request.params.c_ver;
    const auth_code = request.params.code;

    // console.log();

    const encodeParameters = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");


    async function getAuthToken(){
        const auth_res = await fetch(token_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodeParameters({
                client_id: c_id,
                client_secret: c_sec,
                code: auth_code,
                code_verifier: code_verif,
                grant_type: "authorization_code"
            })
        });
        
        const json = await auth_res.json();
        response.send(json);
    }


    getAuthToken();
    

    // async function GetUser(){
    //     await getAuthToken();
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer ' + auth_token.access_token,
    //         }
    //     }

    //     const response = await fetch('https://api.myanimelist.net/v2/users/@me', options);
    //     const me_json = await response.json();
    //     console.log(me_json);
    // }

    // GetUser();


})

app.get('/user/:token', (request, response) => {
    
    const token = request.params.token;

    const options = {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token,
        }
    }

    async function GetUser(){
        const res = await fetch('https://api.myanimelist.net/v2/users/@me', options);
        const me_json = await res.json();
        response.send(me_json);
    }

    //GetUser(request.params.token);

    //anime testing-----------------------------------------------

    let ani;

    async function GetAnime(anime){
        const res = await fetch('https://api.myanimelist.net/v2/anime?q='+ anime +'&limit=5', options);
        const a_list = await res.json();
        const q_res = await a_list.data;
        
        q_res.forEach(ani_res => {
            if(ani_res.node.title == anime){
                ani = ani_res.node;
                //console.log(ani);
            }
        });

        
    }

    
    GetAnime('Enen no Shouboutai');


    async function GetAnimeList(){
        await GetAnime('Enen no Shouboutai');
        
        const res = await fetch('https://api.myanimelist.net/v2/users/@me/animelist?fields=list_status&limit=1000', options);
        const res_json = await res.json();
        const q_res = await res_json.data;

        q_res.forEach(i => {
            if(i.node.id == ani.id){
                console.log(i);
            }
        })

        //console.log(q_res);

    }

    GetAnimeList();

})