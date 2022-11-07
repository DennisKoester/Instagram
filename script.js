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
    let post_content = document.getElementById('post-timeline');
    // post_content.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        let author = posts[i]['author'];
        let author_image = posts[i]['author_image'];
        let location = posts[i]['location'];
        let date = posts[i]['date'];
        let image = posts[i]['image'];
        let description = posts[i]['description'];
        let likes = posts[i]['likes'];

        post_content.innerHTML += postTemplateHTML(i, author, author_image, location, date, image, description, likes);

        renderComments(i, post);
    }
}


function addComment(index) {
    let input = document.getElementById(`input-comment${index}`).value;

    if (input.length >= 1) {
        posts[index]['comments'].push(input);
        renderPosts();
    } else {
        alert('At least one character please.')
    }
    input.value = '';
}


function renderComments(i, post) {
    let comments = document.getElementById(`comments${i}`);
    comments.innerHTML = '';

    for (let j = 0; j < post['comments'].length; j++) {
        const comment = post['comments'][j];
        const author_comment = post['author_comment'][j];
        comments.innerHTML += `
            <div class="comment">
                <div><b>${author_comment}</b> ${comment}</div>
                <div class="comment-heart"><span class="material-symbols-outlined comment-heart">
                favorite
                </span></div>
            </div>`;
    }
}


function openPost(i, author, author_image, location, date, image, description, likes, author_comment, comment) {
    let popup = document.getElementById('popup-post');
    let bodyhtml = document.getElementById('body');
    popup.innerHTML = '';
    popup.innerHTML = popupTemplateHTML(i, author, author_image, location, date, image, description, likes, author_comment, comment);
    popup.classList.remove('d-none');
    bodyhtml.classList.add('no-scroll');
}


function closePost() {
    let popup = document.getElementById('popup-post');
    let bodyhtml = document.getElementById('body');
    bodyhtml.classList.remove('no-scroll');
    popup.classList.add('d-none');
}


function bookmark(i) {
    let bookmark = document.getElementById(`bookmark${i}`);

    bookmark.classList.toggle('bookmarked');
}


function like(i, likes) {
    let like = document.getElementById(`like${i}`);


    like.classList.add('liked');
    likes++;
    renderPosts();

    // } else {
    //     like.classList.remove('liked');
    //     likes--;
    // }
}