const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
  {
    type: "input",
    name: "managerID",
    message: "What is your ID number?",
  },
  {
    type: "input",
    name: "managerName",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is your email address?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your office number?",
  },
  {
    type: "input",
    name: "numEngineers",
    message: "How many engineers do you have on your team?",
  },
  {
    type: "input",
    name: "numInterns",
    message: "How many interns do you have on your team?",
  },
  {
    type: "input",
    name: "id",
    message: "What is the employee's ID number?",
  },
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the employee's email address?",
  },
  {
    type: "input",
    name: "github",
    message: "What is the employee's GitHub username?",
  },
  {
    type: "input",
    name: "school",
    message: "What is the employee's school?",
  },
];
const employees = [];
function init() {
  managerPrompt();
  async function managerPrompt() {
    try {
      const managerQs = questions.slice(0, 6);
      const answers = await inquirer.prompt(managerQs);
      const managerID = parseInt(answers.managerID);
      const officeNumber = parseInt(answers.officeNumber);
      if (isNaN(managerID)) {
        throw new Error("Please enter a valid ID number.");
      }
      if (answers.managerEmail === "") {
        throw new Error("Please enter a valid email.");
      }
      if (answers.managerName === "") {
        throw new Error("Please enter a valid name.");
      }
      if (isNaN(officeNumber)) {
        throw new Error("Please enter a valid ID number.");
      }
      const manager = new Manager(
        answers.managerName,
        managerID,
        answers.managerEmail,
        officeNumber
      );
      employees.push(manager);
      if (answers.numEngineers > 0) {
        await engineersPrompt(answers.numEngineers);
      }
      if (answers.numInterns > 0) {
        await internsPrompt(answers.numInterns);
      }
      console.log(employees);
      const html = render(employees);
      fs.writeFile(outputPath, html, (err) => {
        if (err) throw err;
      });
    } catch (err) {
      throw err;
    }
  }
  async function engineersPrompt(numEngineers) {
    try {
      const engineerQs = questions.slice(6, 10);
      for (let i = 0; i < numEngineers; i++) {
        const answers = await inquirer.prompt(engineerQs);
        const id = parseInt(answers.id);
        if (isNaN(id)) {
          throw new Error("Please enter a valid ID number.");
        }
        if (answers.email === "") {
          throw new Error("Please enter a valid email.");
        }
        if (answers.name === "") {
          throw new Error("Please enter a valid name.");
        }
        if (answers.github === "") {
          throw new Error("Please enter a valid GitHub username.");
        }
        const engineer = new Engineer(
          answers.name,
          id,
          answers.email,
          answers.github
        );
        employees.push(engineer);
      }
    } catch (err) {
      throw err;
    }
  }
  async function internsPrompt(numInterns) {
    try {
      const internQs = questions.slice(6);
      internQs.splice(3, 1);
      for (let i = 0; i < numInterns; i++) {
        const answers = await inquirer.prompt(internQs);
        const id = parseInt(answers.id);
        if (isNaN(id)) {
          throw new Error("Please enter a valid ID number.");
        }
        if (answers.email === "") {
          throw new Error("Please enter a valid email.");
        }
        if (answers.name === "") {
          throw new Error("Please enter a valid name.");
        }
        if (answers.github === "") {
          throw new Error("Please enter a valid GitHub username.");
        }
        const intern = new Intern(
          answers.name,
          id,
          answers.email,
          answers.school
        );
        employees.push(intern);
      }
    } catch (err) {
      throw err;
    }
  }
}

init();
