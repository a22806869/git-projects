//取得input的值並且使用這個值抓取使用者資料
function getInputValue() {
    const searchUser = $("#searchUser");

    searchUser.keyup(function () {
        getUserData($(this).val());
        getRepoData($(this).val());
    });
}

getInputValue();

// 把取得的input作為變數放到url內去搜尋每個輸入的使用者
function getUserData() {
    let username = $("#searchUser").val();
    let url = `https://api.github.com/users/${username}`;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (res) {
            let obj = {};
            obj.avatar_url = res.avatar_url || "no data";
            obj.profile_url = res.html_url || "no data";
            obj.public_gists = res.public_gists || "no data";
            obj.public_repos = res.public_repos || "no data";
            obj.followers = res.followers || "no data";
            obj.following = res.following || "no data";
            obj.company = res.company || "no data";
            obj.location = res.location || "no data";
            obj.blog = res.blog || "no data";
            obj.create_at = res.created_at || "no data";
            // console.log(obj);
            pushElToProfile(obj);
        },
    });
}

function getRepoData() {
    let username = $("#searchUser").val();
    let url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created: asc `;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",

        error: function (jqXHR, exception) {
            var msg = "";
            if (jqXHR.status === 0) {
                msg = "Not connect.\n Verify Network.";
            } else if (jqXHR.status == 404) {
                msg = `<div class = "alert alert-danger">Requested page not found.</div>`;
            } else if (jqXHR.status == 500) {
                msg = "Internal Server Error [500].";
            } else if (exception === "parsererror") {
                msg = "Requested JSON parse failed.";
            } else if (exception === "timeout") {
                msg = "Time out error.";
            } else if (exception === "abort") {
                msg = "Ajax request aborted.";
            } else {
                msg = "Uncaught Error.\n" + jqXHR.responseText;
            }
            $("#alert").html(msg);

            setTimeout(() => {
                $("#123").html("");
                $("#alert").html("");
                $("profile").html("");
            }, 3000);
        },

        // 把得到的陣列資料直接做forEach處理並且直接+=到設置為空的output上面最後再把處理好的output貼到html上面
        success: function (res) {
            let output = "";

            res.forEach(function (re) {
                output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${re.profile}" target="_blank">${re.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${re.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${re.watchers_count}</span>
            <span class="badge badge-success">Forks: ${re.forks_count}</span>
            </div>
          </div>
        </div>
      `;
            });

            // 把剛剛做好的output貼上去html位置<div id="123">
            $("#123").html(output);
        },
    });
}

//profile區域比較單純只要貼上變數即可
function pushElToProfile(obj) {
    let profile = `<div id="profile">
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${obj.avatar_url}">
                        <a href="${obj.profile_url}" target="_blank" class="btn btn-primary btn-block mb-4">View
                            Profile</a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-primary">Public Repos: ${obj.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${obj.public_gists}</span>
                        <span class="badge badge-success">Followers: ${obj.followers}</span>
                        <span class="badge badge-info">Following: ${obj.following}</span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${obj.company}</li>
                            <li class="list-group-item">Website/Blog: ${obj.blog}</li>
                            <li class="list-group-item">Location: ${obj.location}</li>
                            <li class="list-group-item">Member Since: ${obj.create_at}</li>
                        </ul>
                    </div>
                </div>
            </div>`;

    $("#profile").html(profile);
}

// function showAlert(message, className) {
//     $("#alert").html(`<div class = ${className}>${message}</div>`);

//     setTimeout(() => {
//         this.clearAlert();
//     }, 3000);
// }

function clearAlert() {
    this.profile.innerHTML = "";
}