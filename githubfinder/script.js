//取得input的值並且使用這個值抓取使用者資料
function getInputValue() {

    const searchUser = $('#searchUser');

    searchUser.keyup(function () {
        getUserProfile($(this).val());
    });
}

getInputValue();


function getUserProfile() {
    let username = $('#searchUser').val();
    let url = `https://api.github.com/users/${username}`
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (res) {
            console.log(res);
        }
    });
};