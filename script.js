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
        let location = posts[i]['location'];
        let date = posts[i]['date'];
        let image = posts[i]['image'];
        let description = posts[i]['description'];
        let likes = posts[i]['likes'];
        let author_comment = posts[i]['author_comment'];
        let comment = posts[i]['comment'];

        post.innerHTML += postTemplateHTML(author, location, date, image, description, likes, author_comment, comment);
    }
}

function 



function openPost() {
    let popup = document.getElementById('popup-post');
    popup.style.display = "block";
}

function closePost() {
    let popup = document.getElementById('popup-post');
    popup.style.display = "none";
}