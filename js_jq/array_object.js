var data = [
  {
  "idx" : "평균",
    "area" : {
    "성실성" : 90,
    "정직/겸손" : 50,
    "정서안정" : 9,
    "외향성" : 60,
    "원만성" : 30,
    "개방성" : 80

    }
  },
  {
  "idx" : "내점수",
    "area" : {
    "성실성" :  95.2,
    "정직/겸손" : 50.5,
    "정서안정" : 70.3,
    "외향성" : 70.1,
    "원만성" : 35.3,
    "개방성" : 85.5
    }
  }
];

var reformatData = data;
  var d = [];
  var textValue = [];
  for (var i = 0; i < reformatData.length; i++) {
    var area = reformatData[i].area;
    var area_keys = Object.keys(area);
    var tempArry = [];
    for (var j = 0; j < area_keys.length; j++) {
      console.log('>>>>>>>>>>>', area[j])
      tempArry.push({"area": area_keys[j], "value": area[area_keys[j]]});
    }
    d.push(tempArry);
}

console.log(d)
/* 
[{'area': 60, 'value': 90}, {'area': 60, 'value': 90}]
[{'area': 60, 'value': 90}, {'area': 60, 'value': 90}] */