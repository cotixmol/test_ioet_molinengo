<h1>Test Ioet Constancio Molinengo</h1>

<h2>Show the amount of times two employees match in office.</h2>

<h2>Content Table</h2>

<p>1. <a href=#introduction>Introduction</a></p>
<p>2. <a href=#data-structure>Data Structure</a></p>
<p>3. <a href=#node>Node.js Project</a></p>
<p>4. <a href=#app>Application Execution</a></p>
<p>5. <a href=#test>Jest testing</a></p>
<p>6. <a href=#code>App Code: technical design of functions</a></p>

<h2 name="introduction">Introduction</h2>

It was requested by the recruiting team from <strong>Ioet</strong> to develop an application able to identify the number of times two employees share the same time gap in an office over an entire week.

<h2 name="data-structure">Data Structure</h2>

<p>The data structure for this program is set by using a Class named "Employee". </p>
<p>This class itself is defined ,instantiated and exported as a module in the file "ioet.js".</p>

<p>Every instantiation of the Employee class asigns an object to an employee variable.</p>
<p>After instantiating every employee, we push each of these objects to a static array named "employeesArray" that is defined inside the class Employee.</p> 
<p>The push is made by a static method of the class named "addEmployee()" that takes the employee object created as a parameter. The method also adds an "id" to each push, changing the "id" in each push.</p>

<p>The structure of "employeesArray", once pushed every employee object it is as follows:</p>

```
[
	{
	id:"1",
	name: "RENE",
	monday: "10:00-12:00",
	tuesday: "10:00-12:00",
	wednesday: "",
	thursday: "01:00-03:00",
	friday: "",
	saturday: "14:00-18:00",
	sunday: "20:00-21:00"
	},
	{...},
	{...},
]
```

<p>Each instantiation of the "Employee" class must be done as it follows:</p>

`new Employee ("name",{day:"HH:MM-HH:MM",day:"HH:MM-HH:MM",...,...})`

<p>This instantiation contains different parameters applied to the class constructor. <strong>The only mandatory parameter is "name"</strong>. Setting all days and times is not mandatory. <strong>If the user do not define a specific day, by default, the value of that day is and empty string.</strong></p>

<h3>The values and key:values for the instantiation of the class.</h3>

<ul>
	<li><strong>name</strong>: "string"</li>
	<li><strong>monday</strong>: "string"</li>
	<li><strong>tuesday</strong>: "string"</li>
	<li><strong>wednesday</strong>: "string"</li>
	<li><strong>thursday</strong>: "string"</li>
	<li><strong>friday</strong>: "string"</li>
	<li><strong>saturday</strong>: "string"</li>
	<li><strong>sunday</strong>: "string"</li>
</ul>

<h3>Rules for formatting the values in the Employee class instantiation</h3>

<p>The <strong>name value</strong> must be equal to a string.
The <strong>day:time</strong> pairs must be formatted as it follows.</p>

`day:"HH:MM-HH:MM"`

<ol>
<li>The day key is one of the seven days of the week in lowercase.</li>
<li>The first "HH:MM" is the starting time for the current employee in the current day.</li>
<li>The second "HH:MM" is the ending time for the current employee in the current day.</li>
<li>Between each "HH:MM" there must be a "-".</li>
<li>For example: monday: "10:00-18:00" means the employee works from 10am to 6pm on Monday.</li>
<li>For overnight duties the maximum time is 23:59 and the minimum time is 00:00.</li>
</ol>

<h3>Any mistake of these rules in the class instantiation will lead to unexpected results.</h3>

<h2 name="node">Node.js Project</h2>
The project is written in Javascript language over a Node.js LTS enviroment (v. 16.16.0) and using npm (v. 8.19.2).

<h3>Install dependencies and devDependencies.</h3>

In the project directory there is a "package.json" file where the dependencies used in the application are listed. These are:

<ul>
	<li><strong>run-func: 3.0.0:</strong> To execute a particular function in via console.</li>
	<li><strong>jest: 29.2.1:</strong> Unit testing library.</li>
</ul>

<p>Install them by the following commands in the project directory:</p>

`npm install`

`npm install run-func`

`npm install --save-dev jest`

<h2 name="app">Application Execution</h2>
<h3>The app runs by design three diferente commands on the project directory.</h3>

`npm run getinfo` : Shows on the console an array of the names and the id's.

`npm run compare <id1> <id2>` : Shows a message indicating the number of times both employees are in the office at the same time. Example: `npm run compare 1 3`

`npm run compareall` : Show all the possible pair-combination of all employees instantiated and the amount of times they share time in the office.

<h2 name="test">Jest Testing</h2>

Jest library (v. 29.2.1) is used to run <strong>unit testing</strong>. The code is develop on the file located in "/test/ioet.test.js".
The syntax and functions for the Jest library can be found here:
https://jestjs.io/docs/getting-started

<h3>Function being tested</h3>

In this file we import the functions tested from "ioet.js" as a module name "testFunctions". The test consist of the following 5 unit tests.

<ul>
	<li><strong>bringEmployee</strong> function returns Array-Object</li>
	<li><strong>bringEmployee</strong>  function returns empty array</li>
	<li><strong>checkNames</strong> returns true or false if employeeOne and employeeTwo are valid or not</li>
	<li><strong>compareDays</strong> returns day that employees matched</li>
	<li><strong>compareTimetable</strong> returns what expected</li>
</ul>

The test can be run using the command in the project directory:
`npm test` : run the 5 test in the file.

<h2 name="code">App Code: technical design of functions</h2>
    
In the main directory of the project there is a file called "ioet.js". In that file are the 9 functions that run this application. These functions are:

<details>
    <summary><h3>1) bringEmployee(employeeName)</h3></summary>
    <p>This function takes as an argument the name of an employee. From there, uses the <strong>FileSystem module native from Node.js</strong> to synchronously read "employees.txt" and asign it to a variable called employeesFile.</p>
    <p>From there the app uses the <strong>JSON.parse( ) method</strong> to convert the variable employeesFile into an array and assign it to a variable call employeesArray.
    <p>Next, the function uses the <strong>array.filter( ) method</strong> to return from employeesArray the element whose name value is equal to the argument's one and assign it to a variable called employeeArray. <strong>This last variable is returned from the function</strong> if everything works as expected.</p>
    <p>Finally, all the functionality detailed above is inside a <strong>try...catch block</strong> to catch the only possible error; which is a ReferenceError if the file name is wrong or missing.</p>
</details>

<details>
    <summary><h3>2) compareDays(employeeOneArray,employeeTwoArray)</h3></summary>
    <p>This function uses as parameters two arrays each returned from an execution of function 1.</p>
    <p>Firstly, new create a empty object using <strong>new Object( ) instantiation</strong> and we asign it to a variable called <strong>daysMatched</strong>, which the app will use to save the days and times two employees matches.</p>
    <p>Then, we use the function number 3, which returns true or false whether the arrays are correct or not and asign that <strong>boolean value the variable namesChecked.</strong><p>
    <p>If the value of namesChecked is true, it the the app starts to enter values to the variable called daysMatched. It does this by executing a <strong>for loop</strong> which iterates through <strong>the days of an array called daysOfWeek</strong> defined at the beginning of the code.</p> 
    <p>Inside the iteration, there's an if-else condition which does the next:</p>
    <ol>
        <li>If <strong>any of the two arguments of the function returns falsy values in the object key "day"</strong>, it means on that day, one of the employees do not have time schedule at office. Making imposible for them to coincide. Then the iteration jumps to other day.</li>
        <li>If both have time schedules thay day, both have truthy values and the iteration runs the else block. 
        <li>Inside the <strong>else block</strong>, there's function 4, which checks whether the schedule time format is correct for both employees and returns an <strong>Array of time values that is assigned to the variable times</strong>.</li>
        <li>Finally we insert inside the <strong>daysMatched object</strong> a key:value pair, being <strong>key=day and value=times.</strong> At the end of the iteration this object contains the days both employees were at office and their entry and exit time (Array returned from function 4).</li>
    </ol>
    <p>After the iteration is finished, the function <strong>returns the object DaysMatched</strong>
    <p>Also there is in this function <strong>error handlers if the time schedule are wrong formated in "employees.txt"</strong> and <strong>log messages if the function 3 returns false (meaning the user wrote the names incorrectly)</p>    
</details>

<details>
 <summary><h3>3) checkNames(employeeOneArray,employeeTwoArray)</h3></summary>
    <p>The function takes as argument two arrays with the object of each employee.</p>
    <p>Inside the function has <strong>two conditions the arrays must fullfil:</strong>.</p>
    <p>The first <strong>transforms each array into a string using the JSON.stringify( ) method</strong> and compare if they are equals. If they do, it means the user tried to compare the same person. <strong>Boolean assigned to the variable conditionA.</strong></p>
    <p>The second <strong>checks if one or both arrays are falsy.</strong> If one array is falsy it means that the person name is not listed in "employees.txt", therefore it does not exist. <strong>Boolean assigned to the variable conditionA.</strong></p>
    <p>Finally the function check whether the boolean variables asigned to the conditions are true or false. From there, it logs different error messages and returns false boolean values. The value returned is <strong>true only when both conditions are false.</strong></p>
</details>
<details>
    <summary><h3>4) checkTimes(employeeOneArray,employeeTwoArray,day)</h3></summary>
    <p>This function is inside the iteration of function 2. Takes three arguments, the arrays from each employee and the day corresponding to the iterating process inside function 2.</p>
    <p>The whole function 4 is a <strong>try...catch block</strong>. By getting inside the value of the object key "day" in each employee array we <strong>receive a string with the format "HH:MM-HH:MM".</strong> To get each hour in the format "HH:MM" the app uses the <strong>string.split() method</strong>. From there we have the possibility to extract four time strings that will be assign the to <strong>employeeOneStartTime, employeeOneEndTime, employeeTwoStartTime and employeeTwoEndTime.</strong></p>
    <p>The conditions that are tested for this four variables are:</p>
    <ul>
        <li>The lenght of the string es equal to 5 ("HH:MM").</li>
        <li>The string value is not greater than "23:59".<strong> Sidenote: This strings representing hours behaves well in greater-less comparison</strong></li>
        <li>The end time of any employee is greater and the start time.</li>
    </ul>
    <p>If both conditions are fullfil for the four variables, it <strong>returns the variables as an array. Assign it to a variable call times and return it from the function.</strong></p> If any of the conditions is false, a message is log indicating the error, and a error is thrown to stop the execution of the app by the use of future try...catch blocks.</p>
</details>

<details>
    <summary><h3>5) compareTimes(daysMatches)</h3></summary>
    <p>This function uses as argument the return of function 2. Let's remember daysMatched from function 2 is an object with the following structure:</p>

```
{
  day: [ employeeOneStartTime, employeeOneEndTime, employeeTwoStartTime, employeeTwoEndTime ],
  ...,
  ...
}
```

<p>Given the fact that the maximum amount of ocurrences between two employees is equal to the amount of days they coincided. We start <strong>asigning the length value of the object to a variable call ocurrences.</strong></p>
<p>Then the application uses a for loop using the array daysOfWeek iterating each "day" to analyse if there is a key equal to "day". <strong>If the key exists, the app asign each element from the value array to 4 singles variables called employeeOneStartTime, employeeOneEndTime, employeeTwoStartTime and employeeTwoEndTime.</strong></p>
<p><strong>HOW TO KNOW IF TWO TIMES SCHEDULES ARE OVER EACH OTHER</strong></p>
<p>To prove two employees share the same time in a job two conditions must be true: </p>
<ul>
    <li><strong>The end time of employee 1 must be greater or equal to the start time of employee 2</strong></li>
    <li><strong>The end time of employee 2 must be greater or equal to the start time of employee 1</strong></li>
</ul>
<p>We declare these two conditions <strong>inside an if...else block.</strong> using the variables asigned above. <strong>If both variables are true</strong>, it means they work at the same time that day and the app does nothing. <strong>If any of them or both are false</strong>, it means that day the did not see each other at work, and the function reduce the number of ocurrences by 1.</p>
<p>The function does this for every day in the daysOfWeek array, and <strong>return the ocurrences variable.</strong></p>
</details>

<details>
    <summary><h3>6) compareTimetable(employeeNameOne,employeeNameTwo)</h3></summary>

<p>This function contains a <strong>try...catch block</strong> in charge of running the above explained functions as shown:</p>

```
    const employeeOne = bringEmployee(employeeNameOne.toUpperCase());
    const employeeTwo = bringEmployee(employeeNameTwo.toUpperCase())
    const daysMatched = compareDays(employeeOne,employeeTwo);
    const ocurrences = compareTimes(daysMatched);
```

<p> If everything works as intended it <strong>displays a log message with the time of ocurrences between two employees selected.</strong></p>

<details>
    <summary></summary>
</details>
<h3>7) compareAllTimetable( )</h3>
<p>This is the first function of the application that takes no arguments. It is in charge of showing all the possible combination of two employees and the amount of times they share office in a week. It is an extension of function 6.</p>
<p>Inside a <strong>try...catch block</strong> the function start by using function 8 in charge of returning an array with all the names from the "employees.txt" file and asigning it to a <strong>variable called employeesNamesArray.</strong></p>
<p>Once we have that variable the function will use it as argument of function 9, which returns and array of all the possible pair combinations of the employees and <strong>asign that array to the variable pairOfNamesArray. This array has the following structure:</strong></p>

```
[
  'RENE ASTRID',
  'RENE ANDRES',
  'RENE CONSTANCIO',
  '...',
  '...'
]
```

<p>This array is used in a <strong>for loop</strong> which uses the two names of each element and the lenght of the array to contruct the for structure. Inside the for loop <strong>the function extract the two names of each element using string.split() method</strong>. Finally, the function works in the exact same way as function 6 logging on the console the number of ocurrences for each pair.</p>
</details>

<details>
    <summary><h3>8) getAllNames( )</h3></summary>

<p>This function uses the <strong>FileSystem module native from Node.js</strong> to synchronously read "employees.txt" and asign it to a variable called employeesFile</p>
<p>From there the app uses the <strong>JSON.parse( ) method</strong> to convert the variable employeesFile into an array and assign it to a variable call employeesArray.
<p>Next, by the <strong>array.map( ) method</strong> we generate a new array with the names of all the employees and <strong>assign it to a variable called employeesNamesArray.</strong> This last variable is returned from the function.</p>  
<p>Finally, all the functionality detailed above is inside a <strong>try...catch block</strong> to catch the only possible error; which is a ReferenceError if the file name is wrong or missing.</p>
</details>

<details>
    <summary><h3>9) getPairOfNames(employeesNamesArray)</h3></summary>

<p>This function takes as an argument the array returned from function 8 and return <strong>an array with all the possible pair combinations</strong>.</p>
<p>In plain words this function takes the first name of and array and concat next to it the names that follow it. Then it takes the second name and concat only the ones that follow it and so on. For example:</p>

```
array = ["CONSTANCIO","JULIA","PEDRO","LUIS"]
NewArray = ["CONSTANCIO JULIA",
            "CONSTANCIO PEDRO",
            "CONSTANCIO PEDRO
            "JULIA PEDRO",
            "JULIA LUIS",
            "PEDRO LUIS"]
```

<p><strong>The logic of this function is best explained step by step</strong></p>

```
const pairOfNamesArray = [].concat(...employeesNamesArray.map(
    (elm, index) => employeesNamesArray.slice(index+1).map(
        (elm2) => elm + ' ' + elm2 )));
```

<ol>
    <li>pairOfNamesArray is and array filled with elements generated as <strong>"elm + ' ' + elm2"</strong></li>
    <li><strong>elm and elm2</strong> are the elements iterated by the first and the second <strong>.map( ) method</strong></li>
    <li><strong>elm</strong> is the element from the ...employeesNameArray.map( ) method</li>
    <li><strong>elm2</strong> is the element from the .employeesNamesArray.slice(index+1).map( ) method</li>
    <li><strong>The first .map( )</strong> uses the first element and iterates over the second map, but the array used in the second map does not contain the first element.</li>
    <li><strong>The first .map( )</strong> generates <strong>"elm + ' ' + elm2"</strong> and the .concat method outside insert it into the array.</li>
    <li><strong>The second .map( )</strong> iterates <strong>elm2</strong> and the .concat( ) is repeated until the second .map( ) ends.</li>
    <li><strong>The first .map( )</strong> repeats step 5 with the the next element in the ...employeesNameArray. And the <strong>second .map( )</strong> iterates over the elements who follow it as explain in step 6 and 7.</li>
    <li>This process is repeated until the first .map( ) reaches the last element inside ...employeesNameArray and the second .map( )has nothing else to iterate through.</li>
</ol>
</details>
    
<h3>End of documentation</h3>
<h1>Constancio Molinengo</h1>
