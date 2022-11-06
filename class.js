class Employee {
    constructor(name,{monday = "",tuesday = "",wednesday = "",thursday = "",friday = "",saturday = "",sunday= ""}){
        this.name=name;
        this.monday=monday;
        this.tuesday=tuesday;
        this.wednesday=wednesday;
        this.thursday=thursday;
        this.friday=friday;
        this.saturday=saturday;
        this.sunday=sunday;

    }
    
    static id = 0;
    static employeesArray = [];
    static addEmployee(objects){
        for (let object of objects){
            Employee.id++;
            Employee.employeesArray.push({id:Employee.id,...object});
        }
    }
}

const employee1 = new Employee("JULIAN",{monday:"13:00-20:00",wednesday:"20:00-21:00",friday:"10:00-15:00"})
const employee2 = new Employee("MARIANA",{monday:"15:00-22:00",thursday:"10:00-19:00",friday:"10:00-14:30"})
const employee3 = new Employee("PEDRO",{monday:"15:00-22:00",thursday:"10:00-19:00",friday:"10:00-14:30"})
const employee4 = new Employee("MARIA",{monday:"15:00-22:00",thursday:"10:00-19:00",friday:"10:00-14:30"})
const employee5 = new Employee("TITI",{monday:"15:00-22:00",thursday:"10:00-19:00",friday:"10:00-14:30"})



Employee.addEmployee([employee1,employee2,employee3,employee4,employee5])

module.exports = {
    Employee: Employee
}