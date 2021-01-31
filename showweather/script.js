fetch(
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B7CE0CAC-3B18-4745-B65B-190B83AD9DCD&format=JSON&locationName=&elementName="
)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    const weatherData = data.records.location;

    // console.log(data.records.location);
  });
