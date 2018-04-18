import './styles.scss'
import 'bootstrap';
import $ from 'jquery'

const firebase = require('firebase');

var app = firebase.initializeApp({
    apiKey: "AIzaSyDUv5vGfXXtX6IG8AZuM7RSPLg_1CRN6dQ",
    authDomain: "project-1-34e91.firebaseapp.com",
    databaseURL: "https://project-1-34e91.firebaseio.com",
    projectId: "project-1-34e91",
    storageBucket: "project-1-34e91.appspot.com",
    messagingSenderId: "122271825774"
});
let api_response = {
    '29839653': {
        id: 29839653,
        answers: {
            '2973097': {},
            '2973100': {},
            '2973101': {},
            '2973102': {},
            firstname: {},
            lastname: {},
            email: { answer: 'mavhias@gmail.com', question: 'email' }, // email: { answer: 'example@gmail.com', question: 'email'}
            phone_countrycode: {},
            phone: {},
            phonenumber: {}
        }
    },
    '37823279': {
        id: 37823279,
        answers: {
            '2973097': {},
            '2973100': {},
            firstname: {},
            lastname: {},
            email: { answer: 'mathiasvillar@gmail.com', question: 'email1' }, // email: { answer: 'example@gmail.com', question: 'email'}
            phone_countrycode: {},
            phone: {},
            phonenumber: {}
        }
    },
    '66761762': {
        id: 66761762,
        answers: {
            '2973097': {},
            '2973100': {},
            '2973101': {},
            '2973102': {},
            firstname: {},
            lastname: {},
            email: { answer: 'nwardez@gmail.com', question: 'email2' }, // email: { answer: 'example@gmail.com', question: 'email'}
            phone_countrycode: {},
            phone: {}
        }
    }
}
let UserList = {};
let EmailList = [];
let idList = [];
function getUserInfo(api_response) {
    for (let key in api_response) {
        UserList[key] = {
            id: key,
            email: api_response[key].answers.email.answer
        };
        EmailList.push(api_response[key].answers.email.answer);
        idList.push(key);
    }

    let userRef = firebase.database().ref('Users');
    userRef.on('value', function (snapshot) {
        let users = snapshot.val();
        for (let key in users) {
            let userinfo = users[key].userinfo;
            let index = EmailList.indexOf(userinfo.email);
            if (index > -1) {   //if email is exist in api_response
                UserList[idList[index]].avatar = userinfo.avatar;
            }
        }
        const person = {
            name: 'Wes',
            job: 'Web Developer',
            city: 'Hamilton',
            bio: 'Wes is a really cool guy that loves to teach web development!'
        }


        $("#content-div").html("");
        let number = 0;
        for (let key in UserList) {
            number++;
            // create markup div for user           
            const markup = `
                <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${UserList[key].avatar}" alt="Profile image">
                <div class="card-body">
                    <h5 class="card-title">${UserList[key].email}</h5>                    
                </div>
                </div>`;
            $("#content-div").append(markup);
        }
    });
}
getUserInfo(api_response);



