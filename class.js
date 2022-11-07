class Employee {
    constructor(name,{monday = "",tuesday = "",wednesday = "",thursday = "",friday = "",saturday = "",sunday= ""}={}){
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
    static addEmployee(array){
        for (let elm of array){
            Employee.id++;
            Employee.employeesArray.push({id:Employee.id,...elm});
        }
    }
}

const employee1 = new Employee("CONSTANCIO",{monday:"12:00-14:30",wednesday:"18:00-23:00",thursday:"17:00-21:00",saturday:"10:00-15:00"})
const employee2 = new Employee("JULIA",{sunday:"10:30-14:00",thursday:"10:00-19:00",friday:"12:00-17:30"})
const employee3 = new Employee("MARIANO",{monday:"10:30-15:00",thursday:"20:00-23:00",wednesday:"17:00-22:00",friday:"10:00-18:00",saturday:"10:00-19:00"})
const employee4 = new Employee("JUAN CRUZ",{sunday:"10:00-17:00",thursday:"16:00-20:00",friday:"12:00-18:00",saturday:"10:00-13:00"})
const employee5 = new Employee("TOMAS",{monday:"15:00-20:00",wednesday:"10:00-18:00",thursday:"09:00-13:00",saturday:"15:00-19:00"})
const employee6 = new Employee("MANUEL",{sunday:"17:00-20:00",thursday:"18:00-22:00",friday:"10:00-16:00",saturday:"08:00-12:00"})


Employee.addEmployee([  employee1,
                        employee2,
                        employee3,
                        employee4,
                        employee5,
                        employee6
                    ])

module.exports = {
    Employee: Employee
}