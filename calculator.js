//cant press zero or an operator first (upon load or after a clear), this only goes for the first operand
//if two operators are pressed in a row the most recent replaces the previous in the equation array
//cant have more than one decimal in either operand

//pressing sign (-) .... unshift a - onto the current operand and shift it back off the current operand if pressed again
//if (-) is pressed anytime before OR directly after an operator is pressed, modify first operand
//if (-) is pressed after an operator and a second operand has been declared (1-9 or .) (NOT 0)
//if equals is pressed after inputing a number just display that number

//hitting = solves the equation array, or evaluates a single operand as itself, or recalls the last result if = pressed repeatedly
//hitting any operator after an operator and 2 operands have been input into the equation array should evaluate the expression and set it to the value of the first operand

//clear will empty the equation display and (optionally) set the display to 0

//get rid of any unneccessary 0's in both operands (e.g 056 is just 56)




let equationArr = [];
let firstOperand = false;
let firstOperandArr = [];
let secondOperand = false;
let secondOperandArr = [];
let operatorPresent = false;
let savedOP;
let lastEqualsSolve = "0";
let calcDisplay = document.querySelector(".calcDisplay p");

const zeroThruNine = ["0","1","2","3","4","5","6","7","8","9"];
const oneThruNine = ["1","2","3","4","5","6","7","8","9"];
const operators = ['/','*','-','+'];

function statusUpdate() {
    alert(
    `        equationArr:  [${equationArr}]

     firstOperand exists:  ${firstOperand}
         firstOperandArr:  [${firstOperandArr}]

    secondOperand exists:  ${secondOperand}
        secondOperandArr:  [${secondOperandArr}]

        operator Present?  ${operatorPresent}
    `);
}

function convertToNumber(input) {
    if(typeof input === "number") {return input}
    if(typeof input === "string") {return input.indexOf(".") === -1 ? parseInt(input) : parseFloat(input)}
    if(typeof input === "object" && input.length !== "undefined"){return input.indexOf(".") === -1 ? parseInt(input.join("")) : parseFloat(input.join(""))}
}

function display(str) { 
    calcDisplay.textContent = str;
}

function processInput(char) {

    if (firstOperand === false && secondOperand === false) { //initial condition where niether operand exists (although 0 is displayed by default)
        if (char === '.') { //if "." is pressed, push "0" then "." to the equationArr and firstOperandArr, display firstOperandArr
            equationArr.push('0');
            equationArr.push('.');
            firstOperand = true;
            firstOperandArr = [...equationArr];
            display(firstOperandArr.join(""));
        }
        else if (oneThruNine.includes(char)) { //if zero is pressed do nothing since it is already displayed initially, if "1-9" is pressed, push the value to the equationArr and firstOperandArr, display firstOperandArr
            equationArr.push(char)
            firstOperand = true;
            firstOperandArr = [...equationArr];
            display(firstOperandArr.join(""));
        }
        else if (char === '$') {
            if (lastEqualsSolve !== '0' && lastEqualsSolve > 0) {
                lastEqualsSolve = '-'.concat(lastEqualsSolve);
                firstOperand = true;
                firstOperandArr = lastEqualsSolve.split('');
                equationArr = [...firstOperandArr]
                display(firstOperandArr.join(''));
            }
            else if (lastEqualsSolve !== '0' && lastEqualsSolve < 0) {
                lastEqualsSolve = lastEqualsSolve.slice(1);
                firstOperand = true;
                firstOperandArr = lastEqualsSolve.split('');
                equationArr = [...firstOperandArr]
                display(firstOperandArr.join(''));
            }
        }
        if (operators.includes(char) && calcDisplay.childNodes[0].nodeValue !== "0") {  //allows us to use the previous result from hitting the = button if the next key pressed is an operator
            equationArr = lastEqualsSolve.split("");
            firstOperandArr = [...equationArr];
            firstOperand = true;
            equationArr.push(char);
            operatorPresent = true; 
        }      
    } 

    else if (firstOperand === true && secondOperand === false) { //once the firstOperator exists (a "." or a "1-9" has been pressed, or if the firstOperand has been set to the lastResult, this condition will fire on the next processInput
        
        if (zeroThruNine.includes(char)) {
            if (operatorPresent) { 
                equationArr.push(char);
                secondOperand = true;
                secondOperandArr.push(char);
                display(secondOperandArr.join(""));
            }
            else {
                equationArr.push(char);    
                firstOperandArr = [...equationArr];
            }
        }
        if (char === '$') {
            if (equationArr[0] !== '-') {
                equationArr.unshift("-");
                firstOperandArr.unshift("-");
                display(firstOperandArr.join(""));
            }
            else if (equationArr[0] === '-') {
                equationArr.shift();
                firstOperandArr.shift();
                display(firstOperandArr.join(""));
            }
        }
        if (char === '.') {
            if (operatorPresent) {
                equationArr.push('0');
                equationArr.push('.');
                secondOperandArr = [...equationArr].slice(-2);
                secondOperand = true;
                display(secondOperandArr.join(""));
            }
            else if (!firstOperandArr.includes('.') && operatorPresent === false) {
                equationArr.push(char);
                firstOperandArr = [...equationArr];
            }
        }
        if (operators.includes(char)) { 
            if (operators.includes(equationArr[equationArr.length-1])) { 
                equationArr[equationArr.length-1] = char;  
            }
            else { 
                equationArr.push(char);
            }
            firstOperandArr = equationArr.slice(0,-1);
            operatorPresent = true;
        }

        if (operators.includes(equationArr[equationArr.length-2])) {
            if(!firstOperandArr.includes('-')) {
            secondOperand = true;
            secondOperandArr = equationArr.slice(-1);
            display(secondOperandArr.join(""));
            }
        }
        if (secondOperand === false) {
            display(firstOperandArr.join(""));
        }
    }

    else if (firstOperand === true && secondOperand === true) {
        if (zeroThruNine.includes(char)) {
            if ((secondOperandArr[0] === '0' && secondOperandArr.length === 1) || (secondOperandArr[0] === '-' && secondOperandArr[1] === '0' && secondOperandArr.length === 2)) {
                equationArr[equationArr.length-1] = char;
                secondOperandArr[secondOperandArr.length-1] = char;
            }
            else {
                equationArr.push(char);
                secondOperandArr.push(char);
            }
            display(secondOperandArr.join(""));
        }
        if (char === '$') { 
            if (secondOperandArr[0] !== '-') { //insert '-' into equation array after operator
                let indexOfOperator = firstOperandArr.length;
                equationArr = equationArr.slice(0,indexOfOperator+1).concat('-').concat(equationArr.slice(indexOfOperator+1));
                secondOperandArr.unshift("-");
                display(secondOperandArr.join(""));
            }
            else if (secondOperandArr[0] === '-') { //remove the '-' from the equationArr after operator
                let indexOfOp = firstOperandArr.length;
                equationArr = equationArr.slice(0,indexOfOp+1).concat(equationArr.slice(indexOfOp+2))
                secondOperandArr.shift();
                display(secondOperandArr.join(""));
            }
        }
        if (char === '.') {    
          if (!secondOperandArr.includes(".")) {
            equationArr.push(char);
            secondOperandArr.push(char);
            display(secondOperandArr.join(""));
          }
        }
        if (operators.includes(char)) {
            equationArr.push(char);
            displayResult(true); 
        }
    }
    //statusUpdate();  
}

function displayResult(newOp) {
    let result;
    if (newOp) {
        let nextOp = equationArr.pop();
        if (firstOperand && secondOperand) {
            if (equationArr[firstOperandArr.length] === '-') {
                result = convertToNumber(firstOperandArr) - convertToNumber(secondOperandArr);
            }
            else {result = eval(equationArr.join("")).toString()}
        }
        if (secondOperand === false) {result = firstOperandArr.join("")}
        display(result);
        clear(false);
        firstOperandArr = result.split("");
        firstOperand = true;
        equationArr = result.split("");
        equationArr.push(nextOp);
        operatorPresent = true;
    }
    else {  
        if (firstOperand && secondOperand) {
            if (equationArr[firstOperandArr.length] === '-') {
                result = convertToNumber(firstOperandArr) - convertToNumber(secondOperandArr);
            }
            else {result = eval(equationArr.join("")).toString()}
        }  
        if (firstOperand && !secondOperand) {result = firstOperandArr.join("")}
        if (!firstOperand && !secondOperand) {result = lastEqualsSolve}
        lastEqualsSolve = result;
        display(result);
        clear(false);
    }
}

function clear(displayZero) {
    equationArr = [];
    firstOperand = false;
    firstOperandArr = [];
    secondOperand = false;
    secondOperandArr = [];
    operatorPresent = false;
    if (displayZero) {
        display('0');
        lastEqualsSolve = '0';
    }
}

$(".seven").click(function(){
    processInput('7');
});
$(".eight").click(function(){
    processInput('8');
});
$(".nine").click(function(){
    processInput('9');
});
$(".divide").click(function(){
    processInput('/');
});
$(".four").click(function(){
    processInput('4');
});
$(".five").click(function(){
    processInput('5');
});
$(".six").click(function(){
    processInput('6');
});
$(".multiply").click(function(){
    processInput('*');
});
$(".one").click(function(){
    processInput('1');
});
$(".two").click(function(){
    processInput('2');
});
$(".three").click(function(){
    processInput('3');
});
$(".subtract").click(function(){
    processInput('-');
});
$(".zero").click(function(){
    processInput('0');
});
$(".decimal").click(function(){
    processInput('.');
});
$(".sign").click(function(){
    processInput('$');
});
$(".add").click(function(){
    processInput('+');
});
$(".equals").click(function(){
    displayResult(false);
});
$(".clear").click(function(){
    clear(true);
});