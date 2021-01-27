//取得input的值並且使用這個值抓取使用者資料
function getInputValue() {

    const searchUser = $('#searchUser');

    searchUser.keyup(function () {
        getUserData($(this).val());
    });
}

getInputValue();

// 把取得的input作為變數放到url內去搜尋每個輸入的使用者
function getUserData() {
    let username = $('#searchUser').val();
    let url = `https://api.github.com/users/${username}`
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (res) {
            let obj = {};
            obj.avatar_url = res.avatar_url;
            obj.profile_url = res.html_url;
            obj.public_gists = res.public_gists;
            obj.public_repos = res.public_repos;
            obj.followers = res.followers;
            obj.following = res.following;
            obj.comany = res.company;
            obj.location = res.location;
            obj.blog = res.blog;
            obj.create_at = res.create_at;
            // console.log(obj);
            pushElToDOM(obj);
        }

    });
};


function pushElToDOM(obj) {

    `<div id="profile">
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="https://avatars.githubusercontent.com/u/13644380?v=4">
                        <a href="https://github.com/Coding" target="_blank" class="btn btn-primary btn-block mb-4">View
                            Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-primary">Public Repos: 72</span>
                        <span class="badge badge-secondary">Public Gists: 0</span>
                        <span class="badge badge-success">Followers: 0</span>
                        <span class="badge badge-info">Following: 0</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: null</li>
                            <li class="list-group-item">Website/Blog: https://Coding.net</li>
                            <li class="list-group-item">Location: In the Cloud</li>
                            <li class="list-group-item">Member Since: 2015-08-04T14:33:39Z</li>
                        </ul>
                    </div>
                </div>
            </div>`
}