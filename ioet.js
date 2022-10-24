const fs = require("fs")
const daysOfWeek = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]

const bringEmployee = (employeeName) => {
    try{
        const employeesFile = fs.readFileSync("./employees.txt","utf-8")
        const employeesArray = JSON.parse(employeesFile)
        const employeeArray = employeesArray.filter((elm) => elm.name === employeeName)
        return employeeArray
    }catch(ReferenceError){
        console.log("El Archivo 'employees.txt' no fue encontrado en el directorio local")
    }
}
const checkNames = (employeeOneArray,employeeTwoArray) =>{

    const conditionA = (JSON.stringify(employeeOneArray) === JSON.stringify(employeeTwoArray));
    const conditionB = (employeeOneArray == false || employeeTwoArray == false); 
    
    if(conditionA && conditionB){
        console.log("Ingresar nombres de empleados validos");
        return false;

    }else if(conditionA){
        console.log("No se puede comparar a la misma persona");
        return false;

    }else if(conditionB){
        console.log("Una o ambas personas no existen");
        return false;

    }else{
        return true;
    }
}
const checkTimes = (employeeOneArray,employeeTwoArray,day) =>{    
    try{
        const employeeOneStartTime = (employeeOneArray[0][day].split("-"))[0];
        const employeeOneEndTime = (employeeOneArray[0][day].split("-"))[1];
        const employeeTwoStartTime = (employeeTwoArray[0][day].split("-"))[0];
        const employeeTwoEndTime = (employeeTwoArray[0][day].split("-"))[1]    
    
        const conditionA = (employeeOneStartTime.length===5 && employeeOneStartTime<"23:59");
        const conditionB = (employeeOneEndTime.length===5 && employeeOneEndTime<"23:59");
        const conditionC = (employeeTwoStartTime.length===5 && employeeTwoStartTime<"23:59");
        const conditionD = (employeeTwoEndTime.length===5 && employeeTwoEndTime<"23:59");
    
        if (conditionA && conditionB && conditionC && conditionD){
            const times = [employeeOneStartTime,employeeOneEndTime,employeeTwoStartTime,employeeTwoEndTime]
            return times
        }else{
            console.log("Hay errores en las horas de ingreso y de salida en el archivo employees.txt")
            throw new Error;
        }
    }catch{
        console.log("Error en la estructura horario del archivo employees.txt")
    }
}
const compareDays = (employeeOneArray,employeeTwoArray) =>{
    const daysMatched = new Object();
    const namesChecked = checkNames(employeeOneArray,employeeTwoArray)
    
    if (namesChecked){
        try{
            for (let day of daysOfWeek){
                if (employeeOneArray[0][day] == false || employeeTwoArray[0][day] == false){
                }else{
                    const times = checkTimes (employeeOneArray,employeeTwoArray,day)
                    daysMatched[day]=times;
                }
            }
            return daysMatched  
        }catch{
            console.log("Algun dato horario en el archivo .txt esta formateado erroneamente")
        }
    }else{
        console.log("Error en la introducción de nombres")
    }
}
const compareTimes = (daysMatched) =>{
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
const getPairOfNames = (employeesNamesArray) => {
    const pairOfNamesArray = [].concat(...employeesNamesArray.map( (elm, index) => 
        employeesNamesArray.slice(index+1).map((elm2) => 
            elm + ' ' + elm2 )));
    return pairOfNamesArray
}

const getAllNames = () => {
    try{
        const employeesFile = fs.readFileSync("./employees.txt","utf-8")
        const employeesArray = JSON.parse(employeesFile)
        const employeesNamesArray = employeesArray.map((elm) => elm.name)
        return employeesNamesArray; 
    }catch(ReferenceError){
        console.log("El Archivo 'employees.txt' no fue encontrado en el directorio local")
    }
}
const compareTimetable = (employeeNameOne,employeeNameTwo) =>{
    try{
        const employeeOne = bringEmployee(employeeNameOne.toUpperCase());
        const employeeTwo = bringEmployee(employeeNameTwo.toUpperCase())
        const daysMatched = compareDays(employeeOne,employeeTwo);
        const ocurrences = compareTimes(daysMatched);
        console.log(`COINCIDENCIAS EN LA OFICINA ENTRE ${nameOne.toUpperCase()} y ${nameTwo.toUpperCase()}: ${ocurrences}`);
        return "FIN"

    }catch(error){
        console.log("El programa no pudo seguir corriendo debido a un error.\n");
        return "ERROR"
    }
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
            const ocurrences = compareTimes(daysMatched);
            console.log(`${ocurrences} COINCIDENCIAS:       ${nameOne} y ${nameTwo}`)
        }
        console.log("FIN")

    }catch(error){
        console.log("El programa no pudo seguir corriendo debido a un error.")
    }
}

module.exports = {
    bringEmployee,
    checkNames, 
    compareDays,
    compareAllTimetable, 
    compareTimetable, 
    getAllNames
}

