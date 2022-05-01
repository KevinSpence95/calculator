//minimize input length to 10, if answer > 9,999,999,999 or < -9,99,999,999 display ERROR
//cant press zero or an operator first (upon load or after a clear), this only goes for the first operand
//if two operators are pressed in a row the most recent replaces the previous in the equation array
//cant have more than one decimal in either operand

//pressing sign (-) .... unshift a - onto the current operand and shift it back off the current operand if pressed again
//if (-) is pressed anytime before OR directly after an operator is pressed, modify first operand
//if (-) is pressed after an operator and a second operand has been declared (1-9 or .) (NOT 0)
//if equals is pressed after inputing a number just display that number

//hitting = solves the equation array, or evaluates a single operand as itself
//hitting any operator after an operator and 2 operands have been input into the equation array should evaluate the expression and set it to the value of the first operand

//clear will empty the equation display and set the display to 0

//get rid of any unneccessary 0's (e.g 056 is just 56)

let equationArr = [];
let firstOperand = false;
let firstOperandArr = [];
let secondOperand = false;
let secondOperandArr = [];
let operatorPresent = false;
let savedOP;
let lastEqualsSolve;
let calcDisplay = document.querySelector(".calcDisplay p");

const zeroThruNine = ["0","1","2","3","4","5","6","7","8","9"];
const oneThruNine = ["1","2","3","4","5","6","7","8","9"];
const operators = ['/','*','-','+'];

function display(str) { 
    calcDisplay.textContent = str;
}

function processInput(char) {

    if (firstOperand === false && secondOperand === false) { //initial condition where niether operand exists (although 0 is displayed by default)
        if (char === '') {toggleSign()}
        if (char === '.') { //if "." is pressed, push "0" then "." to the equationArr and firstOperandArr, display firstOperandArr
            equationArr.push('0');
            equationArr.push('.');
            firstOperand = true;
            firstOperandArr = [...equationArr];
            display(firstOperandArr.join(""));
        }
        if (oneThruNine.includes(char)) { //if zero is pressed do nothing since it is already displayed initially, if "1-9" is pressed, push the value to the equationArr and firstOperandArr, display firstOperandArr
            equationArr.push(char)
            firstOperand = true;
            firstOperandArr = [...equationArr];
            display(firstOperandArr.join(""));
        }
        if (char === '-') {
            //address this case toggleSign()?
        }
        if (operators.includes(char) && calcDisplay.nodeValue !== "0") {  //allows us to use the previous result from hitting the = button if the next key that is pressed is an operator
            equationArr = lastEqualsSolve.split("");
            firstOperandArr = [...equationArr];
            firstOperand = true;
            equationArr.push(char);
        }        
    } 

    else if (firstOperand === true && secondOperand === false) { //once the firstOperator exists (a "." or a "1-9" has been pressed, or if the firstOperand has been set to the lastResult, this condition will fire on the next processInput
        if (zeroThruNine.includes(char)) { // FIX
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
            
            // before
            // equationArr.push(char);    
            // firstOperandArr = [...equationArr];
        }
        if (char === '') {toggleSign()}
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
            secondOperand = true;
            secondOperandArr = equationArr.slice(-1);
            display(secondOperandArr.join(""));
        }

        if (secondOperand === false) {
            display(firstOperandArr.join(""));
        }
        
    }

    else if (firstOperand === true && secondOperand === true) {
        if (zeroThruNine.includes(char)) { //FIX
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
        if (char === '') {toggleSign()}
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
}

function displayResult(newOp) {
    if (newOp) {
        let nextOp = equationArr.pop();
        let result;
        if (firstOperand && secondOperand) {result = eval(equationArr.join("")).toString()}
        if (secondOperand === false) {result = firstOperandArr.join("")}
        display(result);
        clear(false);
        firstOperandArr = result.split("");
        firstOperand = true;
        equationArr = result.split("");
        equationArr.push(nextOp);
    }
    else {
        let result;
        if (firstOperand && secondOperand) {result = eval(equationArr.join("")).toString()}
        if (secondOperand === false) {result = firstOperandArr.join("")}
        display(result);
        lastEqualsSolve = result;
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
    if (displayZero) {display('0')}
}

function toggleSign(){
    //multiply current operand displayed by -1 and redispay it
    //shift "-" to the beginning of the equationArray (if the second operand doesnt exist yet)
    //if the second operand does exist, insert "-" after the operator in the equationArr and onto the beginning of secondOperand
}

//BUG: am able to enter multiple zeros in a row immediated after an operator, which breaks things
// if zero is pressed first after an operator, any successive value (0-9) will replace the zero, if "." is pressed thats ok 

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
    processInput('');
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