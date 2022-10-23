const { bringEmployee, checkNames } = require("../ioet.js");

const employeeName1 = "CONSTANCIO"
const employeeName2 = "JULIA"

const notEmployeeName1 = "NOTEXISTINGNAME1"
const notEmployeeName2 = "NOTEXISTINGNAME2"

test("bringEmployee function returns Array-Object", ()=>{
    const employeeObj = bringEmployee(employeeName1);
    expect(employeeObj[0].name).toEqual(employeeName1)
});

test("bringEmployee function returns empty array", ()=>{
    const employeeEmpty = bringEmployee();
    expect(employeeEmpty).toEqual([]);
});

test("checkNames returns true or false employeeOne and employeeTwo are valid or not", ()=>{
    const employeeName1Array = bringEmployee(employeeName1);
    const employeeName2Array = bringEmployee(employeeName2);
    const notEmployeeName1Array = bringEmployee(notEmployeeName1);
    const notEmployeeName2Array = bringEmployee(notEmployeeName2);
    const employeeEmpty = [];

    expect(checkNames(employeeEmpty,employeeEmpty)).toBe(false);
    expect(checkNames(employeeEmpty,employeeName1Array)).toBe(false);

    expect(checkNames(employeeName1Array,employeeEmpty)).toBe(false);
    expect(checkNames(employeeName1Array,employeeName1Array)).toBe(false);

    expect(checkNames(notEmployeeName1Array,notEmployeeName2Array)).toBe(false);
    expect(checkNames(false,false)).toBe(false);

    expect(checkNames(employeeName1Array,employeeName2Array)).toBe(true)

})