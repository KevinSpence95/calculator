// // let string1 = "123456"
// // let string2 = "78910"
// // string1.concat(string2)
// // console.log(string1.concat(string2))

// let test1 = ['-','1','2','5']
// test1 = test1.join("")
// console.log(test1)

// let test = ['-','1','2','5','+','-','7','5']
// console.log(eval(test.join("")))
// console.log(test)
// //console.log(test[test1.length])

// test = test.slice(0,test1.length+1).concat('-').concat(test.slice(test1.length+1))
// console.log(test)

// test = test.slice(0,test1.length+1).concat(test.slice(test1.length+2))
// console.log(test)

// if('-0' == '+0') {
//     console.log('yep')
// }

const nums = ['-','1','2','-','-','1','2'];
console.log(eval(nums.join("")));

// let equationArr = ['-'];
// console.log(equationArr.join(''));

// let test ='hello';
// test= '-'.concat(test);
// console.log(test)
// test = test.slice(1)
// console.log(test)