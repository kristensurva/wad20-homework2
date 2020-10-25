

$(function () {
    $('.avatar').click(function() {
        if($('.dropdown-content').css("display")==="none") {
            $('.dropdown-content').css("display", "block")
            console.log("on")
        }
        else {
            $('.dropdown-content').css("display", "none")
            console.log("off")
        }
    });

    function loadUserInfo() {
        return $.get(
            {
                url: 'https://private-anon-09e69e2e84-wad20postit.apiary-mock.com/users/1',
                success: function (response) {
                    return response;
                },
                error: function () {
                    alert('error')
                }
            }
        );
    }

    loadUserInfo().then(function(userinfo) {
        $('.avatar').attr('src', userinfo.avatar)
        $('#info').html(userinfo.firstname + " " + userinfo.lastname + "<br>" + userinfo.email)
    });

    //TASK 2
    $.get("https://private-anon-114ac88fb2-wad20postit.apiary-mock.com/posts", function (response) {
        for(post of response) {
            //creating post div
            let divPost = $('<div class="post">');
            //creating post-author div-s
            let divPostauthor = $('<div class="post-author">');
            let spanAuthorinfo = $('<span class="post-author-info">');
            let createTime = $('<small>').text(post.createTime);
            let avatar = $('<img>').attr('src', post.author.avatar);
            let authorName = $('<small>').text(post.author.firstname + " " + post.author.lastname);
            //nesting post-author divs
            spanAuthorinfo.append(avatar, authorName);
            divPostauthor.append(spanAuthorinfo, createTime);
            divPost.append(divPostauthor);

            //post-image or video div
            let divPostimage = $('<div class="post-image">');
            let mediaType;

            //throws error, because cant read null from
            try {
                mediaType = post.media.type;
            } catch (error) {
                mediaType = ""; /* any default can be used */
            };

            if (mediaType === "image") {
                let imgMedia = $('<img>').attr('src', post.media.url);
                divPostimage.append(imgMedia);
            }
            else if (mediaType === "video") {
                let divVideo = $('<video>').attr('src', post.media.url);
                divVideo.attr('controls', true);
                divPostimage.append(divVideo);
            }

            divPost.append(divPostimage);

            //post-title div
            let divPosttitle = $('<div class="post-title">');
            let postTitle = $('<h3>');
            let titleText;
            try{
                titleText = post.text;
            } catch (error) {
                titleText = "";
            }
            if(titleText != ""){
                postTitle.append(titleText);
                divPosttitle.append(postTitle)
                divPost.append(divPosttitle);
            }

            //post actions div
            let divPostactions = $('<div class = "post-actions">');
            let button = $('<button class="like-button">').attr({
                type: "button",
                name: "like",
            });
            button.text(post.likes);
            divPostactions.append(button);
            divPost.append(divPostactions);
            //button to toggle class .like-button.liked in css to change color when clicked
            $(button).click(function () {
                $(this).toggleClass('liked');
            });

            //into to main post div
            $('.main-container').append(divPost);

        }
    })

    //TASK 3

    $.get("https://private-anon-3956ba9be8-wad20postit.apiary-mock.com/profiles", function (response) {
        for (profile of response) {
            let divProfile = $('<div class="profile">');

            let avatar = $('<img>').attr('src', profile.avatar);
            let spanProfileauthor = $('<span class="profile-author">');
            let authorName = $('<p>').text(profile.firstname + " " + profile.lastname);

            spanProfileauthor.append(authorName);
            divProfile.append(avatar, spanProfileauthor);

            let divProfileactions = $('<div class = "profile-actions">');
            let button = $('<button class="follow-button">').attr({
                type: "button",
                name: "follow",
            });
            button.text('Follow');
            divProfileactions.append(button);
            divProfile.append(divProfileactions);

            $(button).click(function () {
                $(this).toggleClass('pressed');
                $(this).text('Followed');
            });

            $('.browse-page').append(divProfile);
        }
    });
});

