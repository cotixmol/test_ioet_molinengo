const testFunctions = require("../ioet")

//To test, make sure both names are in the file employees.txt.
const employeeId1 = 1
const employeeId2 = 2

const notEmployeeId1 = 10000000000000
const notEmployeeId2 = 10000000000001

const employeeId1Array = testFunctions.bringEmployee(employeeId1);
const employeeId2Array = testFunctions.bringEmployee(employeeId2);
const notEmployeeId1Array = testFunctions.bringEmployee(notEmployeeId1);
const notEmployeeId2Array = testFunctions.bringEmployee(notEmployeeId2);
const employeeEmpty = [];

test("bringEmployee function returns Array-Object", ()=>{
    const employeeObj = testFunctions.bringEmployee(employeeId1);
    expect(employeeObj[0].id).toEqual(employeeId1)
});
test("bringEmployee function returns empty array", ()=>{
    const employeeEmpty = testFunctions.bringEmployee();
    expect(employeeEmpty).toEqual([]);
});
test("checkNames returns true or false if employeeOne and employeeTwo are valid or not", ()=>{
    expect(testFunctions.checkIds(employeeEmpty,employeeEmpty)).toBe(false);
    expect(testFunctions.checkIds(employeeEmpty,employeeId1Array)).toBe(false);

    expect(testFunctions.checkIds(employeeId1Array,employeeEmpty)).toBe(false);
    expect(testFunctions.checkIds(employeeId1Array,employeeId1Array)).toBe(false);

    expect(testFunctions.checkIds(employeeId1Array,notEmployeeId2Array)).toBe(false);
    expect(testFunctions.checkIds(false,false)).toBe(false);

    expect(testFunctions.checkIds(employeeId1Array,employeeId2Array)).toBe(true)

});
test("compareDays returns day that employees matched",()=>{
    expect(testFunctions.compareDays(employeeId1Array,employeeId2Array)).toBeTruthy();
    expect(testFunctions.compareDays(notEmployeeId1Array,notEmployeeId2Array)).toEqual(undefined);
})
test("compareTimetable returns what expected",()=>{
    const result = testFunctions.compareTimetable(employeeId1,employeeId2)
    expect(result).toBe("FIN");
    const notResult = testFunctions.compareTimetable(notEmployeeId1,notEmployeeId2)
    expect(notResult).toBe("ERROR");
})


