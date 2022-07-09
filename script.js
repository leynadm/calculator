// Global variables to store DOM elements to manipulate;
let numberKeys = document.querySelectorAll(".number")
let operatorKeys = document.querySelectorAll(".operator")
let inputBar = document.querySelector(".input-bar")
let btnC = document.querySelector("#clear");
let btnEqual = document.querySelector("#equal");

// Global variables to store the numbers we want to calculate;
let firstNumberAdded = '';
let secondNumberAdded = '';
let resultNumbers;
let operatorChosen;
let previousOperator;
console.log(firstNumberAdded);
console.log(secondNumberAdded);
// Add event listener to the operator keys
for (let i = 0; i < operatorKeys.length; i++){
    operatorKeys[i].addEventListener('click',recordOperatorPress,false)
}

// Add event listener to the number keys
for (let i = 0; i < numberKeys.length; i++){
    numberKeys[i].addEventListener('click',recordNumberPress,false)
}

// Add unique event listener to the equal key
btnEqual.addEventListener('click',recordEqualPress);

// Add unique event listener to the clear key
btnC.addEventListener('click',clearNumbers);

function recordNumberPress(e){

    if (firstNumberAdded == ''){
        if (firstNumberAdded != isFinite(resultNumbers)){
            firstNumberAdded = 0;
        }
        firstNumberAdded = firstNumberAdded + e.target.textContent;
        inputBar.textContent = firstNumberAdded;
        console.log('first number: ' + firstNumberAdded);
    } else {
        secondNumberAdded = secondNumberAdded + e.target.textContent;
        inputBar.textContent = secondNumberAdded;
        console.log('second number: ' + secondNumberAdded);
    }
}

function recordOperatorPress(e){
    
    operatorChosen = e.target.textContent;

    if (firstNumberAdded != '' && secondNumberAdded != '' && previousOperator != null){
        let result = operate(firstNumberAdded,secondNumberAdded,previousOperator)    
        displayResult(result);
        console.log('logging result now: '+ result);
        firstNumberAdded = result;
        secondNumberAdded = '';
        
    } else if (firstNumberAdded != '' && secondNumberAdded != '') {
        
        let result = operate(firstNumberAdded,secondNumberAdded,operatorChosen)
        displayResult(result)
        console.log('logging result now: '+ result);
        firstNumberAdded = result;
        secondNumberAdded = '';
        operatorChosen = '';
    
    }

    previousOperator = operatorChosen;
}


function displayResult(resultValue){
    if (isFinite(resultValue)){
        inputBar.textContent = resultValue;
    } else {
        inputBar.textContent = "Don't break math...?"

    }
}

function recordEqualPress(e){
    if (firstNumberAdded != '' && secondNumberAdded != ''){
    inputBar.textContent = inputBar.textContent + e.target.textContent;
    let result = operate(firstNumberAdded,secondNumberAdded,operatorChosen);
    displayResult(result);
    firstNumberAdded = result;
    secondNumberAdded = '';
}
}
    
function operate (firstNumber, secondNumber, operator){

    let result;
    console.log(operator)
    if (operator == "+"){
        result = addition(firstNumber,secondNumber);
        return result;
    } else if(operator == "-"){
        result = subtraction(firstNumber,secondNumber);
            return result;
    } else if (operator == "*"){
        result = multiplication(firstNumber,secondNumber);
            return result;
    } else if (operator == "/"){
        result = division(firstNumber,secondNumber);
            return result;
    }
}

function addition(a,b){
    let result = parseInt(a)+parseInt(b);
    return result;
}

function subtraction(a,b){
    let result = parseInt(a)-parseInt(b);
    return result;
}

function multiplication(a,b){
    let result = parseInt(a)*parseInt(b);
    return result;
}

function division(a,b){
    let result = parseInt(a) / parseInt(b);
    console.log('division result: ' + result)
    return result;
}


function clearNumbers(){
    firstNumberAdded = '';
    secondNumberAdded = '';
    inputBar.textContent = 0;
}
