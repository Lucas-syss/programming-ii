import fs from "node:fs";
import path from "node:path";
import ToDo from "./todo.js";
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const tasksFilePath = path.join(__dirname, 'tasks.json');
function readTasksFromFile() {
    try {
        const data = fs.readFileSync(tasksFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function saveTasksToFile(tasks) {
    try {
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    } catch (err) {
        console.error("Error saving tasks:", err);
    }
}

let tasks = readTasksFromFile();
/**
 * @param {string} title
 * @param {string} description
 * @param {Date} dueDate
 */
 function CreateToDo(title, description, dueDate) {
    const newToDo = new ToDo(title, description, dueDate);
    tasks.push(newToDo);
    saveTasksToFile(tasks);
    console.log(`Task created: ${title}`);
}

/**
 * @param {number} id
 * @param {ToDo} newToDo
 */
 function EditToDo(id, newToDo) {
    const taskIndex = tasks.findIndex((task) => task.getId() === id);
    if (taskIndex === -1) {
        console.log("Task not found.");
        return;
    }

    const task = tasks[taskIndex];
    task.setTitle(newToDo.getTitle());
    task.setDescription(newToDo.getDescription());
    task.setDueDate(newToDo.getDueDate());
    saveTasksToFile(tasks);
    console.log(`Task ${id} has been updated.`);
}

 function CloseToDo(id) {
    const taskIndex = tasks.findIndex((task) => task.getId() === id);
    if (taskIndex === -1) {
        console.log("Task not found.");
        return;
    }

    const task = tasks[taskIndex];
    task.complete();
    saveTasksToFile(tasks);
    console.log(`Task ${id} is marked as completed.`);
}

 function DeleteToDo(id) {
    const taskIndex = tasks.findIndex((task) => task.getId() === id);
    if (taskIndex === -1) {
        console.log("Task not found.");
        return;
    }

    tasks.splice(taskIndex, 1);
    saveTasksToFile(tasks);
    console.log(`Task ${id} has been deleted.`);
}

 function ListToDo(includeClosed) {
    tasks = readTasksFromFile();
    const filteredTasks = tasks.filter((task) =>
        includeClosed || task.getDateCompleted() === null
    );
    filteredTasks.forEach((task) => {
        console.log(
            `ID: ${task.getId()}, Title: ${task.getTitle()}, Due: ${task.getDueDate()}`,
        );
        if (task.getDateCompleted()) {
            console.log(`Completed on: ${task.getDateCompleted()}`);
        }
        console.log("---");
    });
}

export { CreateToDo, EditToDo, CloseToDo, DeleteToDo, ListToDo };
