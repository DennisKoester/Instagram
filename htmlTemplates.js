function postTemplateHTML(author, location, date, image, description, likes, author_comment, comment) {
    return /*html*/ `
    <div class="post">
            <div class="post-header">
                <div class="profile-info">
                    <div class="post-profile-photo"><img src="img/IMG_1220.JPG" alt=""></div>
                    <div class="post-info-container">
                        <div class="post-name-date"><span><b>${author}</b></span>
                            <div class="date-posted">&#8226; ${date} d</div>
                        </div>
                        <div class="location">${location}</div>
                    </div>
                </div>
                <img class="dots" src="img/icons/icons8-dots-loading-30.png" alt="Dots">
            </div>
            <img  onclick="openPost()" class="post-image" src="${image}" alt="">
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
                <div class="comment">
                    <div><b>${author_comment}</b> ${comment}</div>
                    <div class="comment-heart"><span class="material-symbols-outlined comment-heart">
                            favorite
                        </span></div>
                </div>
                <div class="add-comment-section">
                    <form action="">
                        <input id="input-comment" class="input-comment" type="text" placeholder="Add a comment...">
                </form>
                    <!-- <div class="add-comment">Add a comment...</div> -->
                    <div class="emoji"><span class="material-symbols-outlined">
                            sentiment_satisfied
                        </span></div>
                </div>
            </div>
        </div>`
}