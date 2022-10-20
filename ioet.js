const daysOfWeek = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]

const fs = require("fs")

const bringUser = (name) => {
    const employees = fs.readFileSync("./employees.txt","utf-8")
    const employeesArray = JSON.parse(employees)
    const employee = employeesArray.filter((elm) => elm.name === name)
    return employee
}

const compareDays = (employeeOne,employeeTwo) =>{
    const daysMatched = new Object();
    for (let day of daysOfWeek){
        if (employeeOne[0][day] === "" || employeeTwo[0][day] === ""){
        }
        else{
            const employeeOneStartTime = employeeOne[0][day].slice(0,5);
            const employeeOneEndTime = employeeOne[0][day].slice(6);
            const employeeTwoStartTime = employeeTwo[0][day].slice(0,5);
            const employeeTwoEndTime = employeeTwo[0][day].slice(6)
            
            daysMatched[day]=[employeeOneStartTime,employeeOneEndTime,employeeTwoStartTime,employeeTwoEndTime]
        }
    }
    return daysMatched
}

const compareHoursMinutes = (daysMatched) =>{
    let ocurrences = Object.keys(daysMatched).length;
    for (let day of daysOfWeek){

        if (daysMatched[day] === undefined){
        }else{
            employeeOneStartTime = daysMatched[day][0]
            employeeOneEndTime = daysMatched[day][1]
            employeeTwoStartTime = daysMatched[day][2]
            employeeTwoEndTime = daysMatched[day][3]
            
            if (employeeOneEndTime>=employeeTwoStartTime && employeeTwoEndTime>=employeeOneStartTime){
            }else{
                ocurrences-=1;
            }
        }
    }
    return ocurrences
}

const compareTimetable = (name1,name2) =>{
    const employeeOne = bringUser(name1)
    const employeeTwo = bringUser(name2)
    const daysMatched = compareDays(employeeOne,employeeTwo);
    const ocurrences = compareHoursMinutes(daysMatched);
    
    console.log(`La cantidad de veces que se encuentran en la oficina ${name1} y ${name2} son: ${ocurrences}`)
}

module.exports = {compareTimetable}

// Correr en consola.
// npx run-func ioet.js compareTimetable nombre1 nombre2


