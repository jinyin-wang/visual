var parameter=1;
var slider_old = 10;
var n = 1;
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 860 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;



var svg = d3.select("#container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
var g = svg.append("g")//注意这个地方对g操作，不要直接对svg操作了，变换pie和bar也就是remove这个g再新建个就行
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var data_educ;
    
var data_sector;
var data_expert;




d3.csv("CPS85.csv", type, function(error, data) {
  // console.log(data);
  if (error) throw error;

  data_educ = d3.nest()
  .key(function(d) { return d.educ;})//设定key
  .rollup(function(d) { 
   return d3.sum(d, function(g) {return g.wage; });
  }).entries(data);

  var educ = "educ";
  var sector = "sector";
  var wage = "wage"

  data_sector = d3.nest()
 .key(function(d) { return d.sector;})//设定key
 .rollup(function(d) { 
  return d3.sum(d, function(g) {return g.wage; });
 }).entries(data);


 data_exper = d3.nest()
 .key(function(d) { return d.exper;})//设定key
 .rollup(function(d) { 
  return d3.sum(d, function(g) {return g.wage; });
 }).entries(data);
  //此处加一个触发事件
  // console.log(data_exper);

  var k=new Array(11);
  
  k[0] = "0-4", k[1] = "5-9", k[2]="10-14", k[3]="15-19", k[4]="20-24", k[5]="25-29", 
  k[6]="30-34", k[7]="35-39", k[8]="40-44", k[9]="45-49", k[10]=">50";
  var v = [0,0,0,0,0,0,0,0,0,0,0];
  var count = [0,0,0,0,0,0,0,0,0,0,0];
  var v_average = [0,0,0,0,0,0,0,0,0,0,0];
  data_exper.forEach(function(d, i) {

    d.key = +d.key;
    d.value = d.value;
    if(d.key >= 0 && d.key <= 4){
      v[0]=v[0]+d.value;
      count[0]= count[0]+1;
    }
    else if(d.key >= 5 && d.key <= 10){
      v[1]=v[1]+d.value;
      count[1]= count[1]+1;
    }
    else if(d.key >= 10 && d.key <= 14){
      v[2]=v[2]+d.value;
      count[2]= count[2]+1;
    }
    else if(d.key >= 15 && d.key <= 20){
      v[3]=v[3]+d.value;
      count[3]= count[3]+1;
    }
    else if(d.key >= 20 && d.key <= 24){
      v[4]=v[4]+d.value;
      count[4]= count[4]+1;
    }
    else if(d.key >= 25 && d.key <= 30){
      v[5]=v[5]+d.value;
      count[5]= count[5]+1;
    }
    else if(d.key >= 30 && d.key <= 34){
      v[6]=v[6]+d.value;
      count[6]= count[6]+1;
    }
    else if(d.key >= 35 && d.key <= 40){
      v[7]=v[7]+d.value;
      count[7]= count[7]+1;
    }
    else if(d.key >= 40 && d.key <= 44){
      v[8]=v[8]+d.value;
      count[8]= count[8]+1;
    }
    else if(d.key >= 45 && d.key <= 50){
      v[9]=v[9]+d.value;
      count[9]= count[9]+1;
    } else{
      v[10]=v[10]+d.value;
      count[10]= count[10]+1;
    }
   });

   console.log(v);
   for (var i = 0; i<11; i++){
     if(count[i]!=0){
       v_average[i]=v[i]/count[i];
       
     }
   }
   console.log(v_average);
  data_expert = getDataExpert(k, v_average);


 chooseChart(parameter, data_educ, data_sector, data_expert, slider)//chooseChart and get the value of the slider.
//  barChart(data_educ);


});
function getDataExpert(k,v){
  var data_expert = []
  for (var i = 0; i < 11; i++) {
    var activeExpertObject = {};
    for (var j = 0; j < 11; j++) {
     if (i == j) {
      activeExpertObject.key = k[i];
      activeExpertObject.value = v[j];
      data_expert.push(activeExpertObject);
     }
    }
   }
   console.log(data_expert);
   return data_expert;
}
function parameterChoose(i) {
  parameter=i;
  chooseChart(parameter, data_educ, data_sector, data_expert,slider);
}
function sliderChoose(i) {
  
  n=i/10;

  chooseChart(parameter, data_educ, data_sector, data_expert,slider);
}

function type(d) {
  d.wage = +d.wage;
  d.educ = +d.educ;
  d.exper = +d.exper;
  d.age = +d.age;
  // d.population = +d.population;
  // d.gdp =+d.gdp;
  return d;
}

function chooseChart(parameter, data_educ, data_sector, data_expert,slider){
  if (parameter ==1) {
    barChart(data_educ, slider);
  }

  if(parameter ==2) {
    barChart(data_sector, slider);
  }
  if(parameter ==3) {
    barChart(data_expert, slider);
  }
}

function barChart(data, slider){
  var x = d3.scaleBand()
    .rangeRound([0, width*n], .1)
		.paddingInner(0.4);

var y = d3.scaleLinear()
    .range([height, 0]);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(10, "1");
  // console.log(data);
  d3.select("g")
  .remove();
  // console.log(data);
  var g = svg.append("g")//注意这个地方对g操作，不要直接对svg操作了，变换pie和bar也就是remove这个g再新建个就行
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(function(d) { return d.key; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);
  
  g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  g.append("g")
      // .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .text("population")
      .attr("transform", "rotate(-90)")
      // .attr("y", 6)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .style("")
      

  g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.key); })
      .attr("width", x.bandwidth()*n)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", "steelblue")
      // .append("title")//着两行显示的是鼠标经过时候显示数据
      // .text(function(d){return d.population})
      .on("mouseover", function(d,i){ //鼠标交互动态效果
        d3.select(this)
        .attr("class","highlight");

        d3.select(this)
        .transition()
        .duration(200)
        .attr("width",x.bandwidth())
        .attr("x",function(d) {
          return x(d.key) +2;
        })
        .attr("y", function(d){
          return y(d.value)-10;
        })
        .attr("height", function (d) {
          return height- y(d.value);
        })
        .style("fill", "grey");

        g.append("text")
        .attr("class","val")
        .attr("x",function(){
          return x(d.key);
        })
        .attr("y",function(){
          return y(d.value);
        })
        .attr("text-anchor","middle")
        .text(d3.format("d")(d.value))
        })
      .on("mouseout", function onmouseout(d, i) {
        d3.select(this)
        .attr("class","bar");
      
        d3.select(this)
        .transition()
        .duration(200)
        .attr("x",function(d){
          return x(d.key);
        })
        .attr("y", function(d) {
          return y(d.value);
        })
        .attr("width",x.bandwidth()/1.1)
        .attr("height", function(d) {
          return height - y(d.value);
        })
        .style("fill", "steelblue");
        d3.selectAll(".val")
        .remove()
      })
      
  svg.on("click",function(){
    console.log("svg clicked")
    pieChart(data)
  });
}

function pieChart(data) {
  d3.select("g")
  .remove();
  // console.log(data);
  var g = svg.append("g")
  .attr("transform","translate(250,250)");//translate是偏移量，即svg中心的位置
  
  var arc_generator = d3.arc()
  .innerRadius(0)
  .outerRadius(200)
  var arc_generator_bigger = d3.arc()
  .innerRadius(0)
  .outerRadius(240)
  // .startAngle(0)//从0度开始
  // .endAngle(120*Math.PI/180)//转换成极坐标，120度
  var angle_data = d3.pie()
  .value(function(d){return d.value;});
  
  // console.log(angle_data(data));
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  g.selectAll("path")
  .data(angle_data(data))
  .enter()//选择那些只有数据还没有元素度selection
  .append("path")//添加path
  .attr("d",arc_generator)//给设置d属性，即arc_generator
  .style("fill",function(d, i){return color(i);})
  .on("mouseover",function(d,i){ //鼠标交互动态效果
    // console.log(d);
    d3.select(this)
            .select("path")
            .transition()
            .attr("d", function(d) {
              console.log(d);
              return arc_generator_bigger(d);
            });
    svg.append("text")
    d3.select(this)
        .attr("opacity",1)
        .append("title")//着两行显示的是鼠标经过时候显示数据
      .text(function(d){return d.value});;
})
  .on("mouseout",function(d,i){
    d3.select(this)
        .transition()
        .duration(500)
        .attr("opacity",0.4);
});

  g.selectAll("text")
  .data(angle_data(data))
  .enter()//选择那些只有数据还没有元素度selection
  .append("text")//添加text
  .text(function(d){return d.data.key;})
  .attr("transform", function(d) {
    return "translate("+arc_generator.centroid(d)+")";//对字进行分开
  })
  .attr("text-anchor","middle")

  svg.on("click",function(){
    console.log("svg clicked")
    barChart(data)
  });
}

// function onmouseout(d, i) {
//   d3.select(this)
//   .attr("class","bar");

//   d3.select(this)
//   .transition()
//   .duration(200)
//   .attr("x",function(d){
//     return x(d.key);
//   })
//   .attr("y", function(d) {
//     return y(d.value);
//   })
//   .attr("width",x.bandwidth()/1.1)
//   .attr("height", function(d) {
//     return height - y(d.value);
//   })
//   .style("fill", "steelblue");
//   d3.selectAll(".val")
//   .remove()
// }