

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



});