fetch(
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B7CE0CAC-3B18-4745-B65B-190B83AD9DCD&format=JSON&locationName=&elementName="
)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    const weatherData = data.records.location;

    // console.log(data.records.location);

    [...weatherData].forEach((currentValue, index) => {
        let name = weatherData[index].locationName;
        let POP =
          weatherData[index].weatherElement[1].time[2].parameter.parameterName;
        let Wx =
          weatherData[index].weatherElement[0].time[2].parameter.parameterName;
        let MinT =
          weatherData[index].weatherElement[2].time[2].parameter.parameterName;
        let MaxT =
          weatherData[index].weatherElement[4].time[2].parameter.parameterName;
  
      
        console.log(currentValue);












  });
