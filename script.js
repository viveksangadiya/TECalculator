let buttons=document.querySelectorAll(".button")
let display=document.getElementById("display")

for(let x=0;x<buttons.length;x++){
    buttons[x].addEventListener("click",(e)=>{
        if (e.target.value == "=") {
            //debugger
            display.innerHTML = evaluate(display.innerHTML);
        }
        else if (e.target.value == "c") {
            display.innerHTML = " ";
        }
        else if (e.target.value == "d") {
            let result = display.innerHTML;
            display.innerHTML = result.slice(0, result.length - 1);
        }
        else {
            display.innerHTML += e.target.value;
        }
    })
}

let values=[];
let operators=[];
function evaluate(expression){
     for(var i=0;i<expression.length;i++){
        let char=expression[i];
        if(isNumber(char)){
           let number=0;
           while(isNumber(char)){
              number=number*10 + parseInt(char);
              i++;
              if(i < expression.length){
                char=expression[i];
              }
              else{
                break;
              }
           }
           i--;

            values.push(number);
        }
        else if(char=='('){
           operators.push(char);
        }
        else if(char==')'){
            while(operators[operators.length-1] != '('){
                let result=calculate();
                values.push(result);
            }
            operators.pop();
        }
        else if(isOperator(char)){
            while(values.length!=0 && precedence(char) < precedence(operators[operators.length-1]) ){
                let result=calculate();
                values.push(result);
            }
            operators.push(char);
        }
    }
    while(operators.length !=0){
        let result=calculate();
        values.push(result);
    }
    return values[0];
}

function isNumber(val){
    return val==='0'|| val==='1' || val==='2' || val==='3' || val==='4' || val==='5' ||val==='6' || val==='7' || val==='8' || val==='9';
}

function isOperator(op){
   return op==='+' || op==='-' || op==='*' || op==='/';
}

function calculate(){
    let a=values.pop();
    let b=values.pop();
    let o=operators.pop();
    switch(o){
        case '+':
            return a+b;
        case '-':
            return b-a;
        case '*':
            return a*b;
        case '/':
            if(a==0){
                return 0;
            }
           return b/a;
    }
    return 0;
}

function precedence(op){
    switch(op){
        case '-':
            return 0;
        case '+':
            return 1;
        case '*':
            return 2;
        case '/':
            return 3;
        default:
            return -1;
    }
}