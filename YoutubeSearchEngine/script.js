//取得input的值並且輸入getVideoData(q)內
$("#btngetval").click(function (e) {
  e.preventDefault();
  let q = $("#inputval").val();
  getVideoData(q);
});

function getVideoData(q) {
  $.ajax({
    type: "GET",
    url: `
    https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&order=relevance&q=${q}&type=video&videoCaption=any&videoEmbeddable=any&videoLicense=any&videoType=any&prettyPrint=true&key=AIzaSyDNdqNoZCYqxEJ0nHKh3BWO7Yxc7fLLH2I`,
    data: "data",
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
        $(".123").html(output);

        // // 加入下一頁按鈕
        let btn = getBtn(nextPageToken, prevPageToken);
        $(".456").html(btn);
      });
    },
  });
}

// Next Page Function
function nextPage() {
  let nextPageToken = $("#next-button").data("token");
  let q = $("#next-button").data("query");

  q = $("#inputval").val();

  // 清空內容
  $(".123").html("");
  $(".456").html("");

  $.ajax({
    type: "GET",
    url: `
    https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&order=relevance&pageToken=${nextPageToken}&q=${q}&type=video&videoCaption=any&videoEmbeddable=any&videoLicense=any&videoType=any&prettyPrint=true&key=AIzaSyDNdqNoZCYqxEJ0nHKh3BWO7Yxc7fLLH2I`,
    data: "data",
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
        $(".123").html(output);

        // Display Buttons
        $(".456").css("display", "flex");
        $(".456").html(btn);
      });
    },
  });
}

// Prev Page Function
function prevPage() {
  let token = $("#prev-button").data("token");
  let q = $("#next-button").data("query");

  q = $("#inputval").val();

  // Clear Results
  $(".123").html("");
  $(".456").html("");

  // Run GET Request on API
  $.ajax({
    type: "GET",
    url: `
    https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&order=relevance&pageToken=${nextPageToken}&q=${q}&type=video&videoCaption=any&videoEmbeddable=any&videoLicense=any&videoType=any&prettyPrint=true&key=AIzaSyDNdqNoZCYqxEJ0nHKh3BWO7Yxc7fLLH2I`,
    data: "data",
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
        $(".123").html(output);

        //貼上按鈕
        $(".456").css("display", "flex");
        $(".456").html(btn);
      });
    },
  });
}

//製造按鈕
function getBtn(nextPageToken, prevPageToken) {
  let q = $("#inputval").val();

  // 如果沒有下一頁則按鈕不顯示
  if (nextPageToken === undefined) {
    $(".456").html();
    return;
    // 如果沒有上一頁的token則只顯示下一頁
  } else if (prevPageToken === undefined) {
    $(".456").html(
      `<div class="button-container"><button id="next-button" class="btn paging-button" data-token="${nextPageToken}" data-query="${q}" onclick="nextPage();">Next Page</button></div>`
    );
    return;
    //其他都顯示
  } else {
    $(".456").html(
      `<div class="button-container"><button id="prev-button" class="btn paging-button" data-token="${prevPageToken}" data-query="${q}" onclick="prevPage();">Prev Page</button></div>
    <div class="button-container"><button id="next-button" class="btn paging-button" data-token="${nextPageToken}" data-query="${q}" onclick="nextPage();">Next Page</button></div> `
    );
  }
}

// $('[data-fancybox]').fancybox({
//   toolbar: false,
//   smallBtn: true,
//   iframe: {
//     preload: false
//   }
// })