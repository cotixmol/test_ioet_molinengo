const daysOfWeek = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]

const fs = require("fs")

const bringEmployee = (name) => {
    try{
        const employeesFile = fs.readFileSync("./employees.txt","utf-8")
        const employeesArray = JSON.parse(employeesFile)
        const employeeObj = employeesArray.filter((elm) => elm.name === name)
        return employeeObj
    }catch(ReferenceError){
        console.log("El Archivo 'employees.txt' no fue encontrado en el directorio local")
    }

}

const compareDays = (employeeOne,employeeTwo) =>{
    const daysMatched = new Object();
    try{
        for (let day of daysOfWeek){
            if (employeeOne[0][day] === "" || employeeTwo[0][day] === ""){}
            else{
                const employeeOneStartTime = (employeeOne[0][day].split("-"))[0];
                const employeeOneEndTime = (employeeOne[0][day].split("-"))[1];
                const employeeTwoStartTime = (employeeTwo[0][day].split("-"))[0];
                const employeeTwoEndTime = (employeeTwo[0][day].split("-"))[1]
    
                const conditionA = (employeeOneStartTime.length===5 && employeeOneStartTime<"23:59");
                const conditionB = (employeeOneEndTime.length===5 && employeeOneEndTime<"23:59");
                const conditionC = (employeeTwoStartTime.length===5 && employeeTwoStartTime<"23:59");
                const conditionD = (employeeTwoEndTime.length===5 && employeeTwoEndTime<"23:59");
    
                if (conditionA && conditionB && conditionC && conditionD){
                    daysMatched[day]=[employeeOneStartTime,employeeOneEndTime,employeeTwoStartTime,employeeTwoEndTime]
                }
            }
        }
        return daysMatched    
    }catch{
        console.log("Algun dato horario en el archivo .txt esta formateado erroneamente")
    }
}

const compareHoursMinutes = (daysMatched) =>{
    let ocurrences = Object.keys(daysMatched).length;
    for (let day of daysOfWeek){

        if (daysMatched[day] === undefined){}
        else{
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

const getAllNames = () => {
    const employeesFile = fs.readFileSync("./employees.txt","utf-8")
    const employeesArray = JSON.parse(employeesFile)
    const employeesNamesArray = employeesArray.map((elm) => elm.name)
    return employeesNamesArray;  
}

const getPairOfNames = (employeesNamesArray) => {
    const pairOfNamesArray = [].concat(...employeesNamesArray.map(
        (elm, index) => employeesNamesArray.slice(index+1).map(
             (elm2) => elm + ' ' + elm2 )));
    return pairOfNamesArray
}


const compareAllTimetable = () =>{
    try{

        const employeesNamesArray = getAllNames()
        const pairOfNamesArray = getPairOfNames(employeesNamesArray)

        for (let i=0;i<pairOfNamesArray.length;i++){

            const nameOne = (pairOfNamesArray[i].split(" "))[0]
            const nameTwo = (pairOfNamesArray[i].split(" "))[1]

            const employeeOne = bringEmployee(nameOne)
            const employeeTwo = bringEmployee(nameTwo)
        
            const daysMatched = compareDays(employeeOne,employeeTwo);
        
            const ocurrences = compareHoursMinutes(daysMatched);
            
            console.log(`${ocurrences} COINCIDENCIAS:       ${nameOne} y ${nameTwo}`)
        }

    }catch(error){
        console.log("El programa no pudo seguir corriendo debido a un error.")
    }
}


module.exports = {compareAllTimetable}



// Instalar node@latest LTS
// Correr en consola
// npx run-func ioet.js compareTimetable nombre1 nombre2


