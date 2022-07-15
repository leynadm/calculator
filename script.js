// Global variables to store DOM elements to manipulate;
let numberKeys = document.querySelectorAll(".number")
let operatorKeys = document.querySelectorAll(".operator")
let inputBar = document.querySelector(".input-bar")
let btnC = document.querySelector("#clear");
let btnEqual = document.querySelector("#equal");
let btnFix = document.querySelector('#fix');

// Global variables to store the numbers we want to calculate;
let firstNumberAdded = '';
let secondNumberAdded = '';
let resultNumbers;
let operatorChosen;
let previousOperator;
let saveFirstNumber;
let temporaryNumber;



window.addEventListener('keydown', function(e){
    const key = document.querySelector(`div[data-key='${e.keyCode}']`);
    key.click();
});

for (let i = 0; i < operatorKeys.length; i++){
    operatorKeys[i].addEventListener('click',recordOperatorPress,false)
}

for (let i = 0; i < numberKeys.length; i++){
    numberKeys[i].addEventListener('click',recordNumberPress,false)
}

btnEqual.addEventListener('click',recordEqualPress);

btnC.addEventListener('click',clearNumbers);

btnFix.addEventListener('click',undoError);

function recordNumberPress(e){
    
    let numberPressed = e.currentTarget.textContent;
    
    if (operatorChosen == null){   

            if (checkDotStatus(numberPressed) == "ALREADY"){
                return;
            }
            if (firstNumberAdded.length > 17){
                return;
            }

        firstNumberAdded = firstNumberAdded + e.currentTarget.textContent;
        inputBar.textContent = firstNumberAdded;

    } else {

            if (checkDotStatus(numberPressed) == "ALREADY"){
                return;
            }
            if (secondNumberAdded.length > 17){
                return;
            }

        secondNumberAdded = secondNumberAdded + e.currentTarget.textContent;
        inputBar.textContent = secondNumberAdded;
    }
}

function checkDotStatus(keyPressed){

    let inputBarText = inputBar.textContent;
    if (keyPressed == "." && inputBarText.includes('.')){
        return "ALREADY";
    } else if (keyPressed == "." && inputBarText == ''){
        return "ALREADY";
    }
}

function recordOperatorPress(e){
    
    operatorChosen = e.target.textContent;
    if (firstNumberAdded != '' && secondNumberAdded != '' && previousOperator != null){
        let result = operate(firstNumberAdded,secondNumberAdded,previousOperator)    
        displayResult(result);
        firstNumberAdded = result;
        secondNumberAdded = '';
    } else if (firstNumberAdded != '' && secondNumberAdded != '') {
        let result = operate(firstNumberAdded,secondNumberAdded,operatorChosen)
        displayResult(result)
        firstNumberAdded = result;
        secondNumberAdded = '';
        operatorChosen = '';
    }
    previousOperator = operatorChosen;
}

function displayResult(resultValue){

    if (isFinite(resultValue)){
        inputBar.textContent = Math.round(resultValue*10000000)/10000000;
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

function clearNumbers(){
    firstNumberAdded = '';
    secondNumberAdded = '';
    inputBar.textContent = '';
    operatorChosen = null;
}

function undoError(e){

    let inputBarText = inputBar.textContent;
    
    if (inputBarText > 0){
    
        let inputBarTextString = inputBarText.toString().slice(0,inputBarText.toString().length -1);
    
        if (firstNumberAdded != '' && operatorChosen == null){
            firstNumberAdded = inputBarTextString;
            inputBar.textContent = inputBarTextString;
        } else if (secondNumberAdded != '' && operatorChosen != null){
            secondNumberAdded = inputBarTextString;
            inputBar.textContent = inputBarTextString;
        }
    }
}

function operate (firstNumber, secondNumber, operator){

    let result;
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
    let result = parseFloat(a)+parseFloat(b);
    return result;
}

function subtraction(a,b){
    let result = parseFloat(a)-parseFloat(b);
    return result;
}

function multiplication(a,b){
    let result = parseFloat(a)*parseFloat(b);
    return result;
}

function division(a,b){
    let result = parseFloat(a) / parseFloat(b);
    return result;
}