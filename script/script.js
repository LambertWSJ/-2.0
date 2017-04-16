/*
舊版1.0
http://codepen.io/LambertWu/pen/KgLRva
*/

var infos = new Array(),
    roombox = new Array(5),
    luckyRoom = new Array(5), //被抽到的房間
infos=[
  {
    building:"A",
    floors:["1","2","3","4","5"], 
    room: 29, 
  },
  {
    building:"B",
    floors:["1","2","3","4","5","6","7","8","9","10","11","12"],
    room: 23,
  },
  {
    building:"C",
    floors:["1","2","3","4","5","6","7","8","9","10"],
    room: 20,
  },
  {
    building:"D",
    floors:["2","3","4","5","6","7","8","9","10","11","12"],
    room: 24,
  }
];

//-----------------------------

var vm =new Vue({
  el: "#app",
  data: {house:infos,
         index: 0,
        },
  methods:{
    lucky:function(){
 // -----------------------------
    var floors = $("#floors").val(); //get選取樓層的值
    var building = $("#building option:selected").val(),
        buildinfo={},
        buildinfo = infos[0],
        average = 1;
      
//接收樓層值並將其設定到infos進去  ----------------------------------
   switch (building){
        case "0":
           buildinfo = infos[0];
           var average = 6;
            break;
        case "1":
           buildinfo = infos[1];
           average = 5;
            break;
        case "2":
           buildinfo = infos[2];
           average = 4;
            break;
        case "3":
           buildinfo = infos[3];
           average = 5;
            break;
    }

//接收空房值並轉成number---------------------------------
    var empty_in = $("#empty_room").val(),
        empty = new Array();
    
    for(var i=0;i<empty_in.length;i++){
        
      if(i==0){
        empty.push(parseInt(empty_in[i]+empty_in[i+1]));
      }else if(empty_in[i]==","){
        i++;
        empty.push(parseInt(empty_in.slice(i,i+2)));
      }else if(isNaN(empty_in[i])){
          alert("請勿輸入文字或符號");
          vm.clear();
          return false;
        }
    }

//檢查input的值-------------------
      for(var i=0;i<empty.length;i++){
        if(isNaN(empty[i])){
          alert("請勿輸入文字或符號");
          vm.clear();
          return false;
        }else if(empty[i]>buildinfo.room){
          alert("空房房號超過最大值");
          vm.clear();
          return false;
        }else if(empty.indexOf(empty[i])!=empty.lastIndexOf(empty[i])){
          alert("請勿重複出現房號");
          vm.clear();
          return false;
        }
      }  
      
      
      
// 抽籤------------------- 
  var d=0;
      
    while(d<5){
      
      if(full(average,empty,d)){
        roombox[d]="空房";
        d++;
      }else{
        roombox[d]=(parseInt(Math.random()*40))%(average)+(average*d+1);
        d++;
        if( check(roombox[d-1],empty) ){
        d--;
        }
      }

    }   
    if(roombox[0]==0) roombox[0]=1;
 
      
var room_html=buildinfo.building+floors+"<br>"
//輸出----------------------------------
for(var i=0;i<5;i++){
  if(roombox[i]=="空房"){
    luckyRoom[i]="空房"
  }else{
    if(roombox[i]<10)
    {luckyRoom[i]=buildinfo.building+floors+"0"+roombox[i];}
    else{
      luckyRoom[i]=buildinfo.building+floors+roombox[i];
    }
  }
}

for(var i=1;i<=5;i++){
  $('#room'+i).html(luckyRoom[i-1]);
}  

//infos
  for(var i=0;i<empty.length;i++){
  if(empty[i]<10){
    empty[i] = buildinfo.building+floors+"0"+empty[i];
  }else{
    empty[i] = buildinfo.building+floors+empty[i];
  }
}
  
  $("#emp_room").html(empty.join(","));
  
  if(empty.length==0){$("#emp_room").html("沒有空房");}
  $("#rand_room").html(luckyRoom.join(", "));
      
  
},
// ------------------------
clear:function(){
  $("#empty_room").val("");
  for(var i=1;i<=5;i++){
    $('#room'+i).html("");   
  }
  $("#emp_room").html("");
  $("#rand_room").html("");
}
  }
});





// Outter function--------------------------
function check(arr1,arr2){
  if(typeof arr1=="number"){
    
    
    
      for(var i=0;i<arr2.length;i++){
         if(arr1==arr2[i]) 
           return true;
      }
      return false
    }
  
    for(var i=0; i<arr1.length; i++){
      
      for(var j=0; j<arr2.length; j++){
        console.log("arr1= "+arr1[i]+" ,arr2= "+arr2[j]);
          if(arr1[i]==arr2[j]){
            return true;
          }
      }
      
    }
  return false;
}
// ------------------------
function full(avr,emp,d){
  var count=0,range=0;
  
  for(var i=0;i<avr;i++){
    count=(d*avr+1)+i;
    if(emp.indexOf(count) != -1){
      range++;
    }
    if(range==avr){
      return true;
    } 
  }
  return false;
}
