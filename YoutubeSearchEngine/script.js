// 功能:取得input的值並且輸入getVideoData(q)內
$("#btngetval").click(function (e) {
  e.preventDefault();
  let q = $("#inputval").val();
  getVideoData(q);
});

// 功能:呈現搜尋內容

// 把輸入的資料來搜尋影片使用$.ajax()
// 網址中的參數是輸入的內容成功載入資料後會跑func sucess
// 處理得到的資料並且forEach到DOM上面
// 取出當前網址的下一頁/上一頁的token並且賦予變數並且傳到getBtn裡面
// 把取得到頁面token以及DOM內容分別貼上HTML
// iframe 的使用格式得參照官網 頗複雜
function getVideoData(q) {
  $.ajax({
    type: "GET",
    url: `
    https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&order=relevance&q=${q}&type=video&videoCaption=any&videoEmbeddable=any&videoLicense=any&videoType=any&prettyPrint=true&key=AIzaSyDNdqNoZCYqxEJ0nHKh3BWO7Yxc7fLLH2I`,
    dataType: "json",
    success: function (res) {
      let videos = res.items;
      let nextPageToken = res.nextPageToken;
      let prevPageToken = res.prevPageToken;
      let output = "";

      [...videos].forEach(function (vid) {
        output += `<section class="video-area">
                <div class="img">
                  <a data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/${vid.id.videoId}" href="javascript:;"
                    ><img src="${vid.snippet.thumbnails.default.url}"
                  /></a>
                </div>

                <div class="text">
                  <a data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/${vid.id.videoId}" href="javascript:;"
                    ><h3>${vid.snippet.title}</h3></a
                  ><small>By <span> ${vid.snippet.channelTitle} </span> on ${vid.snippet.publishedAt}</small>
                  <p>${vid.snippet.description}</p>
                </div>
              </section>
              `;

        //貼上搜尋到的結果
        $(".results").html(output);

        // // 加入下一頁按鈕
        let btn = getBtn(nextPageToken, prevPageToken);
        $(".buttons").html(btn);
      });
    },
  });
}

// 功能:呈現下一頁內容

// 功能跟getVideoData()類似
// 從getBtn()取得當前的q以及nextPageToken來跑下一個頁面的資料出來
// 清空最初的搜尋內容並且forEach下一頁的內容上去DOM
// 一樣得取出當前網址的下一頁/上一頁的token並且賦予變數並且傳到getBtn裡面(因為每個下一頁都可能會有上一頁/下一頁)
function nextPage() {
  let nextPageToken = $("#next-button").data("token");
  let q = $("#next-button").data("query");

  q = $("#inputval").val();

  // 清空內容
  $(".results").html("");
  $(".buttons").html("");

  $.ajax({
    type: "GET",
    url: `
    https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&order=relevance&pageToken=${nextPageToken}&q=${q}&type=video&videoCaption=any&videoEmbeddable=any&videoLicense=any&videoType=any&prettyPrint=true&key=AIzaSyDNdqNoZCYqxEJ0nHKh3BWO7Yxc7fLLH2I`,
    dataType: "json",
    success: function (data) {
      let nextPageToken = data.nextPageToken;
      let prevPageToken = data.prevPageToken;

      // Log Data
      let res = data.items;
      let output = "";

      [...res].forEach(function (vid) {
        output += `<section class="video-area">
                <div class="img">
                  
                  <a data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/${vid.id.videoId}" href="javascript:;"
                    ><img src="${vid.snippet.thumbnails.default.url}"
                  /></a>
                </div>

                <div class="text">
                  <a data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/${vid.id.videoId}" href="javascript:;"
                    ><h3>${vid.snippet.title}</h3></a
                  ><small>By <span> ${vid.snippet.channelTitle} </span> on ${vid.snippet.publishedAt}</small>
                  <p>${vid.snippet.description}</p>
                </div>
              </section>
              `;

        let btn = getBtn(nextPageToken, prevPageToken);

        //貼上下一頁的搜尋結果
        $(".results").html(output);

        // Display Buttons
        $(".buttons").html(btn);
      });
    },
  });
}

// 功能:呈現上一頁內容

// 基本上跟netxPage()功能一樣指示修改參數名稱
function prevPage() {
  let prevPageToken = $("#prev-button").data("token");
  let q = $("#next-button").data("query");

  q = $("#inputval").val();

  // 清空內容
  $(".results").html("");
  $(".buttons").html("");

  $.ajax({
    type: "GET",
    url: `
    https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&order=relevance&pageToken=${prevPageToken}&q=${q}&type=video&videoCaption=any&videoEmbeddable=any&videoLicense=any&videoType=any&prettyPrint=true&key=AIzaSyDNdqNoZCYqxEJ0nHKh3BWO7Yxc7fLLH2I`,
    dataType: "json",
    success: function (data) {
      let nextPageToken = data.nextPageToken;
      let prevPageToken = data.prevPageToken;
      let res = data.items;
      let output = "";

      [...res].forEach(function (vid) {
        output += `<section class="video-area">
                <div class="img">
                  
                  <a data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/${vid.id.videoId}" href="javascript:;"
                    ><img src="${vid.snippet.thumbnails.default.url}"
                  /></a>
                </div>

                <div class="text">
                  <a data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/${vid.id.videoId}" href="javascript:;"
                    ><h3>${vid.snippet.title}</h3></a
                  ><small>By <span> ${vid.snippet.channelTitle} </span> on ${vid.snippet.publishedAt}</small>
                  <p>${vid.snippet.description}</p>
                </div>
              </section>
              `;

        let btn = getBtn(nextPageToken, prevPageToken);

        //貼上上一頁的搜尋結果
        $(".results").html(output);

        //貼上按鈕
        $(".buttons").html(btn);
      });
    },
  });
}

// 功能:製造按鈕

// 按鈕傳遞上一頁/下一頁的token
// 使用判斷是來決定呈現什麼按鈕
// 一樣必須定義q是搜尋欄輸入的內容
// 使用onclick把換頁以及搜尋參數傳入nextPage(),prevPage() function內
function getBtn(nextPageToken, prevPageToken) {
  let q = $("#inputval").val();

  // 如果沒有下一頁則按鈕不顯示
  if (nextPageToken === undefined) {
    $(".buttons").html();
    return;
    // 如果沒有上一頁的token則只顯示下一頁
  } else if (prevPageToken === undefined) {
    $(".buttons").html(
      `<div class="button-container"><button id="next-button" class="btn paging-button" data-token="${nextPageToken}" data-query="${q}" onclick="nextPage();">Next Page</button></div>`
    );
    return;
    //其他都顯示
  } else {
    $(".buttons").html(
      `<div class="button-container"><button id="prev-button" class="btn paging-button" data-token="${prevPageToken}" data-query="${q}" onclick="prevPage();">Prev Page</button></div>
    <div class="button-container"><button id="next-button" class="btn paging-button" data-token="${nextPageToken}" data-query="${q}" onclick="nextPage();">Next Page</button></div> `
    );
  }
}
