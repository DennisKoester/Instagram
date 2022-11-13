let openPopup = false;

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


async function init() {
    await includeHTML();
    renderPosts();
    renderStoryTimeline();
    renderRecommendations();
    window.scrollTo(0, 0);
}


// Render Section

function renderPosts() {
    let post_content = document.getElementById('post-timeline');
    post_content.innerHTML = '';

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


function renderComments(i, post) {
    let comments = document.getElementById(`comments${i}`);
    comments.innerHTML = '';

    for (let j = 0; j < post['comments'].length; j++) {
        const comment = post['comments'][j];
        comments.innerHTML += `
        <div class="comment">
        <div><b>Tom Schlesig</b> ${comment}</div>
        <div class="comment-heart"><span onclick="deleteComment(${i}, ${j})" class="material-symbols-outlined">
        close
        </span><span onclick="likeComment(${i}, ${j})" id="likeComment${i}, ${j}" class="material-symbols-outlined comment-heart">
        favorite
        </span></div>
        </div>`;
    }
}

function renderPopupComments(i, post) {
    let comments = document.getElementById(`popup-comments${i}`);
    comments.innerHTML = '';

    for (let j = 0; j < post['comments'].length; j++) {
        const comment = post['comments'][j];
        comments.innerHTML += `
        <div class="comment">
        <div><b>Tom Schlesig</b> ${comment}</div>
        <div class="comment-heart"><span onclick="deleteComment(${i}, ${j})" class="material-symbols-outlined">
        close
        </span><span onclick="likeComment(${i}, ${j})" id="likePopupComment${i}, ${j}" class="material-symbols-outlined comment-heart">
        favorite
        </span></div>
        </div>`;
    }
}


function renderStoryTimeline() {
    let stories = document.getElementById('story-timeline');
    stories.innerHTML = '';
    stories.innerHTML = storyTimelineHTML();
}


function renderRecommendations() {
    let recos = document.getElementById('recommendation-profiles');
    recos.innerHTML = '';

    for (let i = 0; i < recommendations.length; i++) {
        let recoName = recommendations[i]['name'];
        let recoImage = recommendations[i]['image'];

        recos.innerHTML += recommendationsHTML(i, recoName, recoImage);
    }
}


// Post Popup Section

function openPost(i, author, author_image, location, date, image, description) {
    let popup = document.getElementById('popup-post');
    let bodyhtml = document.getElementById('body');
    let post = posts[i];
    let likes = posts[i]['likes'];
    popup.innerHTML = '';
    popup.classList.remove('d-none');
    popup.innerHTML = popupTemplateHTML(i, author, author_image, location, date, image, description, likes);
    bodyhtml.classList.add('no-scroll');
    openPopup = true;
    renderPopupComments(i, post);
    checkLike(i);
}


function closePost() {
    let popup = document.getElementById('popup-post');
    let bodyhtml = document.getElementById('body');
    bodyhtml.classList.remove('no-scroll');
    popup.classList.add('d-none');
    openPopup = false;
}


// Comment Section

function addComment(index) {
    let input = document.getElementById(`input-comment${index}`);
    let post = posts[index];

    if (input.value.length >= 1) {
        posts[index]['comments'].push(input.value);
        renderComments(index, post);
    } else {
        alert('At least one character please.')
    }
    input.value = '';
}


function addPopupComment(index) {
    let input = document.getElementById(`input-popup-comment${index}`);
    let post = posts[index];

    if (input.value.length >= 1) {
        posts[index]['comments'].push(input.value);
        renderPopupComments(index, post);
        renderComments(index, post)
    } else {
        alert('At least one character please.')
    }
    input.value = '';
}


function deleteComment(i, j) {
    post = posts[i];
    posts[i]['comments'].splice(j, 1);

    if (openPopup == true) {
        renderComments(i, post);
        renderPopupComments(i, post);
    } else {
        renderComments(i, post);
    }

}


// Interactive Section

function bookmark(i) {
    let bookmark = document.getElementById(`bookmark${i}`);
    let bookmarkCheck = posts[i].bookmarkCheck;

    if (!bookmarkCheck) {
        bookmark.classList.add('bookmarked');
        posts[i].bookmarkCheck = true;
    } else {
        bookmark.classList.remove('bookmarked');
        posts[i].bookmarkCheck = false;
    }
}


function like(i, likes) {
    let heart = document.getElementById(`like${i}`);
    let likeId = document.getElementById(`likeId${i}`);
    let likecheck = posts[i].likecheck;

    likeId.innerHTML = '';

    if (!likecheck) {
        heart.classList.add('liked');
        posts[i]['likes'] += 1;
        likes++;
        posts[i].likecheck = true;
    } else {
        heart.classList.remove('liked');
        posts[i]['likes'] -= 1;
        posts[i].likecheck = false;
    }

    likeId.innerHTML = /*html*/ `
            <b>${likes} likes</b>`;
}


function checkLike(i) {
    let heart = document.getElementById(`like-popup${i}`);

    if (posts[i].likecheck == true) {
        heart.classList.add('liked');

    } else {
        heart.classList.remove('liked');
    }
}


function likeComment(i, j) {
    let likeComment = document.getElementById(`likeComment${i}, ${j}`);

    likeComment.classList.toggle('liked');
}


function follow(i) {
    let follow = document.getElementById(`follow${i}`);
    let followcheck = recommendations[i].followcheck;

    if (!followcheck) {
        follow.innerHTML = `<b>following</b>`;
        recommendations[i].followcheck = true;
    } else {
        follow.innerHTML = `<b>follow</b>`;
        recommendations[i].followcheck = false;
    }
}


// To use ENTER for posting comment

function enterFunction() {
    let input = document.getElementById('input-comment');
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById('input-btn').click();
        }
    });
}
