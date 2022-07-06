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
console.log(operatorChosen)

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
btnEqual.addEventListener('click',clearNumbers);

function recordOperatorPress(e){
    operatorChosen = e.target.textContent;
    console.log(operatorChosen);
    if (firstNumberAdded != '' && secondNumberAdded != ''){
        let result = operate(firstNumberAdded,secondNumberAdded,operatorChosen)
        inputBar.textContent = result;
        firstNumberAdded = result;
        secondNumberAdded = '';
    
    }

}

function checkInfinity(resultValue){
    if (resultValue== Infinity){
        inputBar.textContent = "Are you trying to break math?"
    } else {
        inputBar.textContent = resultValue;
    }
}

function recordEqualPress(e){
    inputBar.textContent = inputBar.textContent + e.target.textContent;
    let result = operate(firstNumberAdded,secondNumberAdded,operatorChosen);
    inputBar.textContent = result;
    firstNumberAdded = result;
    secondNumberAdded = '';

}

function recordNumberPress(e){
    if (operatorChosen == null){
        firstNumberAdded = firstNumberAdded + e.target.textContent;
        inputBar.textContent = firstNumberAdded;
    } else {
        secondNumberAdded = secondNumberAdded + e.target.textContent;
        inputBar.textContent = secondNumberAdded;

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

function clear(){
    firstNumberAdded = '';
    secondNumberAdded = '';
}
