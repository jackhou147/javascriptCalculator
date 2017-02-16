$(document).ready(function(){
   var $divTop = $("#divTop");
   var $divBot = $("#divBot");
   var $AC = $("#AC");
   var $num = $(".num");
   var $dot = $("#dot");
   var $operator = $(".operator").not("#equal"); 
   var $equalBtn = $("#equal");
   var $multiply = $("#multiply");
   var numDotExp = /[0.9]\./;
   var operExp = /\*|\/|\-|\+|\=|✕/;
   var numOperNum = /[0-9]*[0-9]/;
   var botMulExp = /✕/;
    
   //AC btn function
   $AC.click(function(){
        $divTop.css("visibility", "hidden");
        $divTop.html('0');
        $divBot.html('0');
    })
   
   //num btns function
   $num.click(function(){
       var screenNum = $divBot.html();
       var thisNumber = this.innerHTML;
       //////////number on screen//////////////
       if(screenNum == 0 && screenNum.indexOf(".")==-1){ //when 0 and no dot
           $divBot.html(thisNumber);
           $divTop.html(thisNumber);
           $divTop.css("visibility","visible");
       }else{               //when not 0
               if(screenNum.length >= 22 || screenNum == "DIGIT LIMIT MET"){  //when over max length or digit limit met
                   $divTop.css("visibility","hidden");
                   $divBot.html("DIGIT LIMIT MET");
                   return;
               }else if(operExp.test($divBot.html())){ //when operator sign is on screen
                   if(numDotExp.test($divBot.html())){ //when numDot pattern exists
                       $divTop.append(thisNumber);
                       $divBot.append(thisNumber);
                   }else{  //when numDot pattern doesn't exist
                       $divBot.html(thisNumber);
                       $divTop.append(thisNumber);
                   }

               } else{  //when operator sign is not on screen
                   $divTop.append(thisNumber);
                   $divBot.append(thisNumber);
               }
       }
       ////////////\number on screen/////////
       
       
   })
   
   //dot btn function
   $dot.click(function(){
       //check if there's already a dot 
       var regEx = /\./;
       function checkDot(){
           return regEx.test($divBot.html());
       }
       if(!checkDot()){  //when no dot
           if(operExp.test($divBot.html())){ //when operator on screen
               $divBot.html("0"+this.innerHTML);
               $divTop.append("0"+this.innerHTML);
           }else{ //when no operator on screen
               $divBot.append(this.innerHTML);
               $divTop.append(this.innerHTML);
               $divTop.css("visibility","visible");
           }
           
       }
   })
   
   //operator btns function
   $operator.click(function(){
       var $topHtml = $divTop.html();
       var thisSign = $(this).html();
       var testOper = operExp.test($divTop.html()); //check if operating sign already on screen
       if(!testOper){ //when no operating sign on screen
           if($(this).is($multiply)){ //if multiply sign is clicked
               $divTop.append("*");
               $divBot.html("&#10005;");
           }else{    //if other signs are clicked
               $divTop.append(thisSign);
               $divBot.html(thisSign);
           }
       }else if(testOper){ //when operating sign on screen
           //alert("on");
           var lastChar = $topHtml[$topHtml.length-1];
           if(Number(lastChar)+1){ //if last character is a number
               if(thisSign=="/"||thisSign=="-"||thisSign=="+"||thisSign=="="){ //not multiple sign
                   $divTop.append(thisSign);
                   $divBot.html(thisSign);
               }else{ //multiply sign
                   $divTop.append("*");
                   $divBot.html("&#10005;");
               }
           }else{  //if last character is not a number
               $divBot.html(thisSign);
               var divTophtml = $topHtml.replace(/.$/,thisSign).replace(botMulExp,"*");
               $divTop.html(divTophtml);
           }
        }
       })
   
   //equal btn function
   $equalBtn.click(function(){
       var equation = $divTop.html();
       var answer = eval(equation);
       $divBot.html(answer);
       $divTop.append("=").append(answer);
       $operator.one("click",function(){
           if($(this).is("#multiply")){
               $divTop.html(answer+"*");
           }else{
               $divTop.html(answer + this.innerHTML);
           }
       })
       
   })
   
   
   })

   
   
   
   
    
   
