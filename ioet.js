const EmployeeClass = require("./class.js");
let Employee = EmployeeClass.Employee;

const daysOfWeek = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]

const bringEmployee = (employeeId) => {
    try{
        const employeesArray = Employee.employeesArray;
        const employeeArray = employeesArray.filter((elm) => elm.id === parseInt(employeeId))
        return employeeArray
    }catch(ReferenceError){
        console.log("La clase Employee no fue importada correctamente")
    }
}
const checkNames = (employeeOneArray,employeeTwoArray) =>{
    try{
        const conditionA = ((employeeOneArray[0].id) === (employeeTwoArray[0].id));
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
    }catch{
        console.log("Hubo un error al revisar los nombres")
        return false
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
        const conditionE = (employeeOneEndTime>employeeOneStartTime)
        const conditionF = (employeeTwoEndTime>employeeTwoStartTime)
    
        if (conditionA && conditionB && conditionC && conditionD && conditionE & conditionF){
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
            let employeeOneStartTime = daysMatched[day][0]
            let employeeOneEndTime = daysMatched[day][1]
            let employeeTwoStartTime = daysMatched[day][2]
            let employeeTwoEndTime = daysMatched[day][3]
            
            if (employeeOneEndTime>=employeeTwoStartTime && employeeTwoEndTime>=employeeOneStartTime){
            }else{
                ocurrences-=1;
            }
        }
    }
    return ocurrences
}
const getPairOfIds = (employeesIdsArray) => {
    const pairOfIdsArray = [].concat(...employeesIdsArray.map( (elm, index) => 
        employeesIdsArray.slice(index+1).map((elm2) => 
            elm + ' ' + elm2 )));
    return pairOfIdsArray
}
const getAllIds = () => {
    try{
        const employeesArray = Employee.employeesArray;
        const employeesIdArray = employeesArray.map((elm) => elm.id)
        return employeesIdArray; 
    }catch(ReferenceError){
        console.log("Hubo un error en la configuracion de la clase Employees")
    }
}

const getInfo = () => {
    try{
        const employeesArray = Employee.employeesArray;
        const employeesInfoArray = []
        for (let i=0;i<employeesArray.length;i++){
            let infoEmployee = (`ID ${employeesArray[i].id}: ${employeesArray[i].name}`)
            employeesInfoArray.push(infoEmployee)
        }
    return(employeesInfoArray)

    }catch(ReferenceError){
        console.log("Hubo un error en la configuracion de la clase Employees")
    }
}
const compareTimetable = (employeeIdOne,employeeIdTwo) =>{
    try{
        const employeeOne = bringEmployee(employeeIdOne);
        const employeeTwo = bringEmployee(employeeIdTwo)
        const daysMatched = compareDays(employeeOne,employeeTwo);
        const ocurrences = compareTimes(daysMatched);
        console.log(`COINCIDENCIAS EN LA OFICINA ENTRE ID ${employeeOne[0].id}: ${employeeOne[0].name} y ID ${employeeTwo[0].id}: ${employeeTwo[0].name}: ${ocurrences}`);
        return "FIN"

    }catch(error){
        console.log("El programa no pudo seguir corriendo debido a un error.\n");
        return "ERROR"
    }
}
const compareAllTimetable = () =>{
    try{
        const employeesIdsArray = getAllIds()
        const pairOfIdsArray = getPairOfIds(employeesIdsArray)

        for (let i=0;i<pairOfIdsArray.length;i++){

            const IdOne = (pairOfIdsArray[i].split(" "))[0]
            const IdTwo = (pairOfIdsArray[i].split(" "))[1]

            const employeeOne = bringEmployee(IdOne)
            const employeeTwo = bringEmployee(IdTwo)
            const daysMatched = compareDays(employeeOne,employeeTwo);
            const ocurrences = compareTimes(daysMatched);
            console.log(`${ocurrences} COINCIDENCIAS:       ID ${employeeOne[0].id}: ${employeeOne[0].name} y ID ${employeeTwo[0].id}: ${employeeTwo[0].name}`)
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
    compareTimetable,
    compareAllTimetable,
    getInfo
}