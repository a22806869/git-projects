//取得input的值
$('#btngetval').click(function (e) {
    e.preventDefault();
    let val = $('#inputval').val()
    console.log(val);

    getVideoData(val);
})


function getVideoData(val) {

    $.ajax({

        type: "GET",
        url: `
    https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&order=relevance&q=${val}&videoCaption=any&videoEmbeddable=any&videoLicense=any&videoType=any&prettyPrint=true&key=AIzaSyDNdqNoZCYqxEJ0nHKh3BWO7Yxc7fLLH2I`,
        data: "data",
        dataType: "dataType",
        success: function (res) {
            // console.log(res);
            let videos = res.item;

            [...videos].forEach(function (vid) {

                let output =
                    `<section class="video-area">
                <div class="img">
                  <a href="https://i.ytimg.com/vi/DZgFH-xagTY/hqdefault.jpg"
                    ><img src="https://i.ytimg.com/vi/DZgFH-xagTY/hqdefault.jpg"
                  /></a>
                </div>
        
                <div class="text">
                  <a href="https://i.ytimg.com/vi/DZgFH-xagTY/hqdefault.jpg"
                    ><h3>Video Titlesdffffffffffffffffffffffffffffffffffffffff</h3></a
                  ><small>By <span> AuthorName </span> on 2015-05-17T09:54:02Z</small>
                  <p>Video Description</p>
                </div>
              </section>`

                $('#container').html(output);

            })
        }
    });

};