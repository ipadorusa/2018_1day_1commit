# D3.js ( Data-Driven Documents )



### D3 도입 이유

- UI가 많이 쓰는 Chart library에서 사용할 수 없었다. 

- 벤치 된 사이트는 중국에서 만든 JS 로 가져다가 쓸 수도 있었지만 한번에 통합하여 사용하기 힘들었고 영어 사이트가 아니여서 사용 할 수 없었다.




### D3의 장단점

- 장점 ( 웹표준, 시각화에 뛰어남 - Interactive )
  - 웹표준 ( HTML, SVG 및 CSS) 에서 직접
  - C3.js, nvd.js, Highcharts 등 Chart library 보다 좀 더 디자인 및 커스텀 할수 있다. (직접 만드는거라....)



- 단점 ( learning curve )
  - 실제로 API문서 https://github.com/d3/d3/blob/master/API.md 에 가보면 매우 많다.

  - 한글번역 및 다른 사람들 문서가 많이 없다.

  - 버전이 다양하다. ( v3 ~ v5 ) - SRI는 v4 버전

    

### D3 개발환경

​	로컬에서 개발 할 경우는 서버 환경으로 셋팅해서 사용.  node, apache, tomcat등등



### D3 Browser support

- IE8 이하 미지원 ( 버전별로 스크립트 문제로 인해 ie9이상부터 보시면 될듯 )



### 작업 및 프로젝트 하면서 느낀점

전체적인 기술적인 부분에서 미흡하여 Javscript 및 Json 문법 그외 데이터 받아 올 경우 포맷팅을 생각을 해야


- 막대그래프는 HTML ( DIV, CSS )를 통해서 구현하는게 효율적임. 

  - 다만 조건은 정량적 비율에만 의존해야함 / scale에 대한 범위는 고정적이야여 한다.

- 그 외 그래프 중 유료차트나 무료 차트에 범주 없는 차트를 구현시에는 D3.js 만드는게 좋음

  




### SRI에서 사용하는 그래프


- [ ] 합격스펙

      방사형 차트 ( Radar Chart )
      파이 차트 ( Pie Chart )


- [ ] 연봉정보

      막대차트 ( Bar Chart )
      콤비차트 ( Combbie Chart )
      선차트 ( Line Chart )
      다중선차트 ( Multi Line Char )
