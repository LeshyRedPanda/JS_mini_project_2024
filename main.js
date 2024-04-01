const url = 'https://jsonplaceholder.typicode.com/users';

function getObj(url) {
    fetch(url).then(res => res.json())
        .then(data => {
            // console.log(data);
            pageBuilder(data);

        })
}

getObj(url);

function pageBuilder(users) {
    let usersWrap = document.getElementById('usersWrap');
    usersWrap.innerHTML = '';
    // console.log(usersWrap);
    let btnMoreInfo ;
    function createP(wrap,txtP,txtP2) {
        let p = document.createElement('p');
        let p2 = document.createElement('p');

        p.innerText = txtP;
        p2.innerText = txtP2;

        wrap.append(p,p2);
    }

    // console.log(users);
    for (let user of users) {
        // console.log(user);
        let userDiv = document.createElement('div');
        userDiv.classList.add('userCont')
        const { id, name, username, email, address, phone, website, company, } = user
        // console.log(id,name);

        // userDiv.append(h2,pName);
        createP(userDiv,`User ID : ${id}`,`User Name : ${name} `);

        let btn = document.createElement('button');
        btn.classList.add('userBtn');

        btn.innerText = `More Info Here`;

        btn.addEventListener("click", (e) =>{
            e.preventDefault()
            location.href = 'user-details.html?id=' + id;
        })
        userDiv.appendChild(btn);
        usersWrap.append(userDiv);
    }
}