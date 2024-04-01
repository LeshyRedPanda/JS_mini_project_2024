let userId = new URL(location.href).searchParams.get('id');
// console.log(userId);


let userIdUrl = 'https://jsonplaceholder.typicode.com/users/'+userId;

fetch(userIdUrl).then(res => res.json())
    .then(user => {

        const { id, name, username, email, address, phone, website, company, } = user;
        const {street,suite,city,zipcode,geo,} = address;
        const {lat,lng} = geo;
        const {name: companyName,catchPhrase,bs} = company;

        // console.log(id);
        //user info
        let userWrap = document.getElementById('userWrap');
        let uDiv = document.createElement('div');
        uDiv.classList.add('userDiv');
        let ul = document.createElement('ul');
        ul.classList.add('ulUsers');

        // user details printer
        keyValuePrinter(ul,'User Id',id);
        keyValuePrinter(ul,'Name',name);
        keyValuePrinter(ul,'User Name',username);
        keyValuePrinter(ul,'Email',email);
        keyValuePrinter(ul,'Phone number',phone);
        keyValuePrinter(ul,'Website',website);
        pPrinter(ul,'Address');
        keyValuePrinter(ul,'Street',street);
        keyValuePrinter(ul,'Suite',suite);
        keyValuePrinter(ul,'City',city);
        keyValuePrinter(ul,'Zipcode',zipcode);
        pPrinter(ul,'Geo')
        keyValuePrinter(ul,'Lat',lat);
        keyValuePrinter(ul,'Lng',lng);
        pPrinter(ul,'Company')
        keyValuePrinter(ul,'Name of the company',companyName);
        keyValuePrinter(ul,'Catch Phrase',catchPhrase);
        keyValuePrinter(ul,'Bs',bs);
        uDiv.appendChild(ul);

        // Post of current user button
        let divPostBtn = document.getElementById('divPostBtn');
        divPostBtn.classList.add('divPostBtn');

        let postBtn = document.createElement('button');
        postBtn.classList.add('postBtn')

        postBtn.innerText = `Post of current user`;

        divPostBtn.appendChild(postBtn);


        // post of current user - button - title only
        let postsId = new URL(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
        fetch(postsId).then(data => data.json())
            .then(posts => {
                // console.log(posts);
                let titlesWrap = document.getElementById('divTitleWrap');

                for (let post of posts) {
                    let {userId:postUserId, id:postId, title,body } = post;
                    // // console.log(title);
                    // console.log(body)

                    let titleDiv1 = document.createElement('div');
                    titleDiv1.classList.add('titleDiv');

                    let h3TitleDiv = document.createElement('div');
                    h3TitleDiv.classList.add('h3TitleDiv');
                    let btnMoreInfoDiv = document.createElement('div');
                    btnMoreInfoDiv.classList.add('btnMoreInfoDiv');

                    let maxCl = 1;

                    postBtn.addEventListener('click', e => {
                        e.preventDefault();
                        //post title
                        let postTile = document.createElement('h3');
                        h3TitleDiv.appendChild(postTile);

                        if (maxCl > 0) {
                            maxCl--;
                            // console.log(maxCl);

                            postTile.innerText = `Title : ${title}`;

                            let moreInfoBtn = document.createElement('button');
                            btnMoreInfoDiv.appendChild(moreInfoBtn);

                            titleDiv1.appendChild(h3TitleDiv);
                            titleDiv1.appendChild(btnMoreInfoDiv);

                            moreInfoBtn.classList.add('moreInfoBtn');
                            moreInfoBtn.innerText = 'More info here ';

                            moreInfoBtn.addEventListener('click', e => {
                                e.preventDefault();
                                location.href = `post-details.html?id=${postUserId}&post=${postId}`;
                                console.log(postId);
                                console.log(postUserId);
                            });
                        }
                        titlesWrap.appendChild(titleDiv1);
                    });
                }
            });
        userWrap.appendChild(uDiv);
    });


// Functions
function keyValuePrinter(wrapperUl, key, value,) {
    let li = document.createElement('li');
    li.innerText = `${key} : ${value}`;
    wrapperUl.appendChild(li);


}function pPrinter(wrapperUl, liTxt,) {
    let p1 = document.createElement('p');
    p1.innerText = `${liTxt} : `;
    wrapperUl.appendChild(p1);
}