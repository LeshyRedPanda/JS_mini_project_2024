const userIdPost = new URL(location.href).searchParams.get('id');
// console.log(userIdPost);
// console.log(typeof userIdPost);

let postId1 = new URL(location.href).searchParams.get('post');
// console.log(postId1);
// console.log(typeof postId1);

let postsId = new URL(`https://jsonplaceholder.typicode.com/users/${userIdPost}/posts`);

fetch(postsId).then(data => data.json())
    .then(post => {
        postDetails(post);

    });

function postDetails(post) {
    // console.log(post);

    let postWrap = document.getElementById('postWrap');

    // //debugger
    for (const postElement of post) {
        let {userId:postUserId, id:postIdBody, title,body } = postElement;
        // console.log(postElement);


        if (postId1 == postIdBody){
            // console.log(postIdBody);
            // post and comments wrapper
            let postDiv1 = document.createElement('div');
            postDiv1.classList.add('postDiv');

            // post userId/postId/post title/post
            let idDiv = document.createElement('div');
            idDiv.classList.add('idDiv');

            let userIdH = document.createElement('h4');
            userIdH.innerText = `User ID : ${postUserId}`;

            let titleAndBody1Div = document.createElement('div');
            titleAndBody1Div.classList.add('titleAndBody1Div')

            let postIdH = document.createElement('h4');
            postIdH.innerText = `Post ID : ${postIdBody}`;

            let titleH = document.createElement('h4');
            titleH.innerText = `Title : ${title}`;

            let bodyP = document.createElement('p');
            bodyP.innerText = `Writing text : ${body}`;

            // comments wrap
            let commentsWrap = document.createElement('div');
            commentsWrap.classList.add('commentsWrap');

            // append user post info
            idDiv.append(userIdH,postIdH);
            titleAndBody1Div.append(titleH,bodyP);
            postDiv1.append(idDiv,titleAndBody1Div);

            // add comments
            let comments = new URL(`https://jsonplaceholder.typicode.com/posts/${postIdBody}/comments`);
            // console.log(comments);
            fetch(comments).then(res => res.json())
                .then(comments => {
                    // console.log(comments[0]);
                    // div for 1 comment
                    let comment1Div = document.createElement('div');
                    // div comment body
                    // id wrap
                    let comIdWrap = document.createElement('div');
                    comIdWrap.classList.add('comIdWrap');

                    let comPostIdH4 = document.createElement('h4');
                    let comIdP = document.createElement('h4');
                    comIdWrap.append(comPostIdH4,comIdP);
                    // comment body
                    let comParamDiv = document.createElement('div');
                    comParamDiv.classList.add('comParamDiv');
                    let comNameP = document.createElement('p');
                    let comEmailP = document.createElement('p');
                    let commentP = document.createElement('p');
                    comParamDiv.append(comNameP,comEmailP,commentP);

                    for (const comment of comments) {
                        let {postId:postIdent,id:comId,name,email,body:comBody} = comment;
                        console.log(postIdent);
                        if (postIdBody === postIdent){

                            let comment1Div = document.createElement('div');
                            comment1Div.classList.add('comment1Div');
                            // div comment body
                            // id wrap
                            let comIdWrap = document.createElement('div');
                            comIdWrap.classList.add('comIdWrap');

                            let comPostIdH4 = document.createElement('h4');
                            let comIdP = document.createElement('h4');
                            comIdWrap.append(comPostIdH4,comIdP);
                            // comment body
                            let comParamDiv = document.createElement('div');
                            comParamDiv.classList.add('comParamDiv');
                            let comNameP = document.createElement('p');
                            let comEmailP = document.createElement('p');
                            let commentP = document.createElement('p');
                            comParamDiv.append(comNameP,comEmailP,commentP);
                            //comments inner text
                            comPostIdH4.innerText =`Post identification : ${postIdent}`;
                            comIdP.innerText =`Comment identification : ${comId}`;

                            comNameP.innerText =`Comment Title : ${name}`;
                            comEmailP.innerText =`User email : ${email}`;
                            commentP.innerText =`Message : ${comBody}`;
                            //append comment body
                            comment1Div.append(comIdWrap,comParamDiv);
                            commentsWrap.appendChild(comment1Div);

                        }
                    }
                });
            //append post and comments wrapper
            postWrap.append(postDiv1,commentsWrap);
        }
    }
}