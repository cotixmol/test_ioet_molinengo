<h1>Test Ioet Constancio Molinengo</h1>

<h1>Show the amount of times employees match at office.</h1>

<h2>Introduction</h2>
It was requested by the recruiting team from <strong>Ioet</strong> to develop an application able to identify the number of times two persons share the same time in an office in a week.

<h2>Data Structure</h2>
The data from the employees and for use in this project are located in a .txt file named "employees.txt" in the main directory of the project. The structure of this file is an array filled with different objects, each representing an employee, and organized as follows:

```
[
  {
    "id":"1",
    "name": "RENE",
    "monday": "10:00-12:00",
    "tuesday": "10:00-12:00",
    "wednesday": "",
    "thursday": "01:00-03:00",
    "friday": "",
    "saturday": "14:00-18:00",
    "sunday": "20:00-21:00"
  },
  {...},
  {...},
]

```

<u>The structure MUST contain this different keys and values:</u>

<ul>
    <li><strong>"id"</strong>: "string"</li>    
    <li><strong>"name"</strong>: "string"</li>
    <li><strong>"monday"</strong>: "string"</li>
    <li><strong>"tuesday"</strong>: "string"</li>
    <li><strong>"wednesday"</strong>: "string"</li>
    <li><strong>"thursday"</strong>: "string"</li>
    <li><strong>"friday"</strong>: "string"</li>
    <li><strong>"saturday"</strong>: "string"</li>
    <li><strong>"sunday"</strong>: "string"</li>
</ul>

<u>Rules for formatting data structure:</u>

<ul>
    <li> The "id" value must be equal to a numeric string. These identify each object starting from 1 to infinite. </li>
    <li> The "name" value must be equal to a string written in UPPER CASE</li>
    <li> The value refering de 7 days of the week must be structure as this:</li>
        <ol>
            <li> Must be a string with this structure: "HH:MM-HH:MM". H refers to hour, M to minute. </li>
            <li> The first "HH:MM" is the starting time for the current employee at the current day. </li>
            <li> The second "HH:MM" is the ending time for the current employee at the current day. </li>
            <li> For example: "monday": "10:00-18:00" means the employee works from 10am to 6pm.</li>
            <li> For overmidnight duties the maximum time is 23:59 and the minimum time is 00:00.</li>
        </ol>
</ul>

<strong>Any mistake in the employees.txt file structure will lead to unexpected results.</strong>

<h2>Node.js Project</h2>

The project is written in Javascript language over a Node.js LTS enviroment (v. 16.16.0) and using npm (v. 8.19.2).

<p><u>Install dependencies and devDependencies.</u></p>
In the project directory is a "package.json" file where all the dependencies are listed. At the current project there's the following:
<ul>
    <li><strong>run-func: 3.0.0:</strong> To execute a particular function in via console.</li>
    <li><strong>jest: 29.2.1:</strong> Unit testing library.</li>
</ul>
   
<p>Install by the following commands in the project directory:</p>

`npm install`, `npm install run-func` and `npm install --save-dev jest`
