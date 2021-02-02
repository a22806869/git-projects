//取得input的值
$("#btngetval").click(function (e) {
  e.preventDefault();
  let val = $("#inputval").val();
  console.log(val);

  getVideoData(val);
  nextPage(val);
});

function getVideoData(val) {
  $.ajax({
    type: "GET",
    url: `
    https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&order=relevance&q=${val}&type=video&videoCaption=any&videoEmbeddable=any&videoLicense=any&videoType=any&prettyPrint=true&key=AIzaSyDNdqNoZCYqxEJ0nHKh3BWO7Yxc7fLLH2I`,
    data: "data",
    dataType: "json",
    success: function (res) {
      console.log(res);

      console.log(res);
      let videos = res.items;

      console.log([...videos]);

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

        console.log(output);
        $(".123").html(output);

        let btn = `<button class="next-btn btn" onclick = nextPage();>Next Page</button>`;
        $(".456").html(btn);
      });
    },
  });
}
