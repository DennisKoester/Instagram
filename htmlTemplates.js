function postTemplateHTML(i, author, author_image, location, date, image, description, likes, author_comment, comment) {
    return /*html*/ `
    <div class="post">
            <div class="post-header">
                <div class="profile-info">
                    <div class="post-profile-photo"><img src="${author_image}" alt=""></div>
                    <div class="post-info-container">
                        <div class="post-name-date"><span><b>${author}</b></span>
                            <div class="date-posted">&#8226; ${date} d</div>
                        </div>
                        <div class="location">${location}</div>
                    </div>
                </div>
                <img class="dots" src="img/icons/icons8-dots-loading-30.png" alt="Dots">
            </div>
            <img  onclick="openPost(${i}, '${author}', '${author_image}', '${location}', '${date}', '${image}', '${description}', '${likes}', '${author_comment}', '${comment}')" class="post-image" src="${image}" alt="Post Image">
            <div class="post-footer">
                <div><span onclick="like(${i}, ${likes})" id="like${i}" class="material-symbols-outlined heart">
                        favorite
                    </span>
                    <span class="material-symbols-outlined bubble">
                        mode_comment
                    </span>
                    <span class="material-symbols-outlined paper-plane">
                        send
                    </span>
                </div>
                <div onclick="bookmark(${i})">
                    <span id="bookmark${i}" class="material-symbols-outlined bookmark">
                        bookmark
                    </span>
                </div>
            </div>
            <div id="likeId${i}" class="likes"><b>${likes} likes</b></div>
            <div class="description"><b>${author}</b> ${description}</div>
            <div class="comment-section">
                <div id="comments${i}"></div>
                <div class="add-comment-section">
                    <form action="">
                        <input id="input-comment${i}" class="input-comment" type="text" placeholder="Add a comment...">
                        <button onclick="addComment(${i})" type="button">Send</button>
                </form>
                    <div class="emoji"><span class="material-symbols-outlined">
                            sentiment_satisfied
                        </span></div>
                </div>
            </div>
        </div>`
}

function popupTemplateHTML(i, author, author_image, location, date, image, description, likes, author_comment, comment) {
    return /*html*/ `
<div onclick="closePost()" class="close-btn"><span class="material-symbols-outlined">
                close
            </span>
        </div>
        <div class="popup-container">
            <div class="post">
                <div class="post-header">
                    <div class="profile-info">
                        <div class="post-profile-photo"><img src="${author_image}" alt=""></div>
                        <div class="post-info-container">
                            <div class="post-name-date"><span><b>${author}</b></span>
                                <div class="date-posted">&#8226; ${date} d</div>
                            </div>
                            <div class="location">${location}</div>
                        </div>
                    </div>
                    <img class="dots" src="img/icons/icons8-dots-loading-30.png" alt="Dots">
                </div>
                <img id="post-image"  class="post-image" src="${image}" alt="" style="cursor: default;">
                <div class="post-footer">
                    <div><span class="material-symbols-outlined heart">
                            favorite
                        </span>
                        <span class="material-symbols-outlined bubble">
                            mode_comment
                        </span>
                        <span class="material-symbols-outlined paper-plane">
                            send
                        </span>
                    </div>
                    <div>
                        <span class="material-symbols-outlined bookmark">
                            bookmark
                        </span>
                    </div>
                </div>
                <div class="likes"><b>${likes} likes</b></div>
                <div class="description"><b>${author}</b> ${description}</div>
                <div class="comment-section">
                <div id="comments${i}"></div>
                    <div class="add-comment-section">
                        <form action="">
                            <input id="input-comment${i}" class="input-comment" type="text" placeholder="Add a comment...">
                            <button onclick="addComment(${i})" type="button">Send</button>
                    </form>
                        <div class="emoji"><span class="material-symbols-outlined">
                                sentiment_satisfied
                            </span></div>
                    </div>
                </div>
            </div>
        </div>`
}

