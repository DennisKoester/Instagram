async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function init() {
    includeHTML();
    renderPosts();
}


function renderPosts() {

    for (let i = 0; i < posts.length; i++) {
        let post = document.getElementById('post-timeline');
        let author = posts[i]['author'];
        let author_image = posts[i]['author_image'];
        let location = posts[i]['location'];
        let date = posts[i]['date'];
        let image = posts[i]['image'];
        let description = posts[i]['description'];
        let likes = posts[i]['likes'];
        let author_comment = posts[i]['author_comment'];
        let comment = posts[i]['comments'];

        post.innerHTML += postTemplateHTML(i, author, author_image, location, date, image, description, likes, author_comment, comment);
    }
}

function pushComment() {
    let comment = document.getElementById('input-comment').value;

    posts['author_comment'].push("Guest User")
    posts['comments'].push(comment)

    comment.innerHTML = '';
}


function openPost(i, author, author_image, location, date, image, description, likes, author_comment, comment) {
    let popup = document.getElementById('popup-post');
    let bodyhtml = document.getElementById('body');
    popup.innerHTML = '';
    popup.innerHTML = popupTemplateHTML(i, author, author_image, location, date, image, description, likes, author_comment, comment);
    popup.classList.remove("d-none");
    bodyhtml.classList.add("no-scroll");



}

function closePost() {
    let popup = document.getElementById(`popup-post`);
    let bodyhtml = document.getElementById('body');
    bodyhtml.classList.remove("no-scroll");
    popup.classList.add("d-none");
}
