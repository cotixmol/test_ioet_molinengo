const EmployeeClass = require("./class.js");
let Employee = EmployeeClass.Employee;

const daysOfWeek = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]

const bringEmployee = (employeeId) => {
    try{
        const employeesArray = Employee.employeesArray;
        const employeeArray = employeesArray.filter((elm) => elm.id === parseInt(employeeId))
        return employeeArray
    }catch{
        console.log("La clase Employee no fue importada correctamente")
    }
}
const checkIds = (employeeOneArray,employeeTwoArray) =>{
    try{
        const areTheSame = ((employeeOneArray[0].id) === (employeeTwoArray[0].id));
        const isEmptyArray = (employeeOneArray == false || employeeTwoArray == false); 
        
        if(areTheSame && isEmptyArray){
            console.log("Ingresar id de empleados validos");
            return false;
    
        }else if(areTheSame){
            console.log("No se puede comparar a la misma persona");
            return false;
    
        }else if(isEmptyArray){
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
    
        const areTimesLenghtCorrect = (employeeOneStartTime.length===5 && employeeOneEndTime.length===5 && employeeTwoStartTime.length===5 && employeeTwoEndTime.length===5);
        const areTimeLimitCorrectFirstCondition = (employeeOneStartTime<"23:59" && employeeTwoStartTime<"23:59" && employeeOneEndTime<"23:59" && employeeTwoEndTime<"23:59");
        const areTimeLimitCorrectSecondCondition = (employeeOneStartTime>"00:00" && employeeTwoStartTime>"00:00" && employeeOneEndTime>"00:00" && employeeTwoEndTime>"00:00");
        const areMinutesFormatCorrect = (employeeOneStartTime.slice(3,5)<"59" && employeeTwoStartTime.slice(3,5)<"59" && employeeOneEndTime.slice(3,5)<"59" && employeeTwoEndTime.slice(3,5)<"59");
        const areStartEndTimeLogicOne = (employeeOneEndTime>employeeOneStartTime)
        const areStartEndTimeLogicTwo = (employeeTwoEndTime>employeeTwoStartTime)
    
        if (areTimesLenghtCorrect &&
            areTimeLimitCorrectFirstCondition &&
            areTimeLimitCorrectSecondCondition &&
            areStartEndTimeLogicOne &&
            areStartEndTimeLogicTwo &&
            areMinutesFormatCorrect){

            const times = [employeeOneStartTime,employeeOneEndTime,employeeTwoStartTime,employeeTwoEndTime]
            return times
        }else{
            console.log("Hay errores en las horas de ingreso y de salida en la instanciación de la clase Employee")
            throw new Error;
        }
    }catch{
        console.log("Error en la estructura horaria de la instanciación de la clase Employee")
    }
}
const compareDays = (employeeOneArray,employeeTwoArray) =>{
    const daysMatched = new Object();
    const areIdsChecked = checkIds(employeeOneArray,employeeTwoArray)
    
    if (areIdsChecked){
        try{
            for (let day of daysOfWeek){
                const areNotInOffice = employeeOneArray[0][day] == false || employeeTwoArray[0][day] == false;
                if (areNotInOffice){
                continue;
                }
                const times = checkTimes (employeeOneArray,employeeTwoArray,day)
                daysMatched[day]=times;
            }
            return daysMatched  
        }catch{
            console.log("Algun dato horario en la instanciación de la clase Employee esta formateado erroneamente")
        }
    }else{
        console.log("Error en la introducción de id")
    }
}
const compareTimes = (daysMatched) =>{
    let ocurrences = Object.keys(daysMatched).length;
    for (let day of daysOfWeek){

        if (daysMatched[day] === undefined){
        continue
        }
        let employeeOneStartTime = daysMatched[day][0]
        let employeeOneEndTime = daysMatched[day][1]
        let employeeTwoStartTime = daysMatched[day][2]
        let employeeTwoEndTime = daysMatched[day][3]
            
        if (employeeOneEndTime>=employeeTwoStartTime && employeeTwoEndTime>=employeeOneStartTime){
        continue
        }
        ocurrences-=1;
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
        console.log(`COINCIDENCIAS EN LA OFICINA ENTRE ID ${employeeOne[0].id}: ${employeeOne[0].name} y ID ${employeeTwo[0].id}: ${employeeTwo[0].name}: ${ocurrences} COINCIDENCIAS`);
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
    checkIds,
    compareDays,
    compareTimetable,
    compareAllTimetable,
    getInfo
}