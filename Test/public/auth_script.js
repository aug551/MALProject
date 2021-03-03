console.log(document.cookie);
const auth_code = document.URL.split('=')[1];



fetch('/token/' + document.cookie + '/' + auth_code);

// function onComplete()
// {
//     console.log(this.responseText);
// }

// const encodeParameters = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

// // const request = new XMLHttpRequest();
// // request.addEventListener("load", onComplete);
// // request.open("POST", token_url);
// // request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// // request.send(encodeParameters({
// //     client_id: c_id,
// //     client_secret: c_sec,
// //     code: auth_code,
// //     code_verifier: document.cookie,
// //     grant_type: "authorization_code"
// // }));
