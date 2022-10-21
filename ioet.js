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

const compareTimetable = (nameOne,nameTwo) =>{
    try{
        const nameOneUpper = nameOne.toUpperCase()
        const nameTwoUpper = nameTwo.toUpperCase()

        const employeeOne = bringEmployee(nameOneUpper)
        const employeeTwo = bringEmployee(nameTwoUpper)
    
        const daysMatched = compareDays(employeeOne,employeeTwo);
    
        const ocurrences = compareHoursMinutes(daysMatched);
        
        console.log(`LA CANTIDAD DE ENCUENTROS ENTRE ${nameOneUpper} y ${nameTwoUpper} EN LA OFICINA SON: ${ocurrences}`)
    }catch(error){
        console.log("El programa no pudo correr debido a un error.")
    }
}

module.exports = {compareTimetable}


// Instalar node@latest LTS
// Correr en consola
// npx run-func ioet.js compareTimetable nombre1 nombre2


