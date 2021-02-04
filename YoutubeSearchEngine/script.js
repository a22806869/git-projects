//取得input的值
$("#btngetval").click(function (e) {
  e.preventDefault();
  let q = $("#inputval").val();
  // console.log(val);

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
      // console.log(res);

      let videos = res.items;

      // console.log([...videos]);
      // console.log(res.nextPageToken);

      let nextPageToken = res.nextPageToken;
      let prevPageToken = res.prevPageToken;

      console.log(nextPageToken);
      // console.log(...videos);
      let output = "";

      [...videos].forEach(function (vid) {
        output += `<section class="video-area">
                <div class="img">
                  
                  <a href="https://www.youtube.com/embed/${vid.id.videoId}"
                    ><img src="${vid.snippet.thumbnails.default.url}"
                  /></a>
                </div>

                <div class="text">
                  <a href="https://www.youtube.com/embed/${vid.id.videoId}"
                    ><h3>${vid.snippet.title}</h3></a
                  ><small>By <span> ${vid.snippet.channelTitle} </span> on ${vid.snippet.publishedAt}</small>
                  <p>${vid.snippet.description}</p>
                </div>
              </section>
              `;

        // console.log(output);
        $(".123").html(output);



        // // 加入下一頁按鈕
        // let btn = `<button class="next-btn btn" onclick = "nextPage()";>Next Page</button>`;
        let buttons = getButtons(nextPageToken, prevPageToken);


        $(".456").html(buttons);
      });
    },
  });
}

// Next Page Function
function nextPage() {
  var token = $('#next-button').data('token');
  var q = $('#next-button').data('query');

  q = $("#inputval").val();
  // Clear Results
  $('.123').html('');
  $('.456').html('');

  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyDNdqNoZCYqxEJ0nHKh3BWO7Yxc7fLLH2I'
    },
    function (data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      // Log Data

      let res = data.items;

      console.log(...res);

      let output = "";

      [...res].forEach(function (vid) {
        output += `<section class="video-area">
                <div class="img">
                  
                  <a href="https://www.youtube.com/embed/${vid.id.videoId}"
                    ><img src="${vid.snippet.thumbnails.default.url}"
                  /></a>
                </div>

                <div class="text">
                  <a href="https://www.youtube.com/embed/${vid.id.videoId}"
                    ><h3>${vid.snippet.title}</h3></a
                  ><small>By <span> ${vid.snippet.channelTitle} </span> on ${vid.snippet.publishedAt}</small>
                  <p>${vid.snippet.description}</p>
                </div>
              </section>
              `;

        var buttons = getButtons(prevPageToken, nextPageToken);


        $(".123").html(output);
        // Display Buttons
        $('.456').append(buttons);
      });
    })
};

// Prev Page Function
function prevPage() {
  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query');

  // Clear Results
  $('.123').html('');
  $('.456').html('');

  // Get Form Input
  q = $("#inputval").val();

  // Run GET Request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key: 'AIzaSyDNdqNoZCYqxEJ0nHKh3BWO7Yxc7fLLH2I'
    },
    function (data) {
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;


      let res = data.items;
      let output = "";

      [...res].forEach(function (vid) {
        output += `<section class="video-area">
                <div class="img">
                  
                  <a href="https://www.youtube.com/embed/${vid.id.videoId}"
                    ><img src="${vid.snippet.thumbnails.default.url}"
                  /></a>
                </div>

                <div class="text">
                  <a href="https://www.youtube.com/embed/${vid.id.videoId}"
                    ><h3>${vid.snippet.title}</h3></a
                  ><small>By <span> ${vid.snippet.channelTitle} </span> on ${vid.snippet.publishedAt}</small>
                  <p>${vid.snippet.description}</p>
                </div>
              </section>
              `;

        var buttons = getButtons(prevPageToken, nextPageToken);

        $(".123").html(output);
        // Display Buttons
        $('.456').append(buttons);
      });
    })
};

// Build the buttons
function getButtons(prevPageToken, nextPageToken) {

  let a = prevPageToken;
  let b = nextPageToken;
  let c = $("#inputval").val();
  if (!a) {
    var btnoutput = '<div class="button-container">' + '<button id="next-button" class="paging-button" data-token="' + b + '" data-query="' + c + '"' +
      'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnoutput = '<div class="button-container">' +
      '<button id="prev-button" class=" btn paging-button" data-token="' + a + '" data-query="' + c + '"' +
      'onclick="prevPage();">Prev Page</button>' +
      '<button id="next-button" class=" btn paging-button" data-token="' + b + '" data-query="' + c + '"' +
      'onclick="nextPage();">Next Page</button></div>';
  }

  return btnoutput;
}