import inquirer from 'inquirer';
import { CreateToDo} from './commands.js';

async function start() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Task', 'Edit Task', 'Close Task', 'List Tasks', 'Delete Task', 'Exit'],
        },
    ]);

    switch (answers.action) {
        case 'Add Task':
            await addTask();
            break;
        case 'Edit Task':
            await editTask();
            break;
        case 'Close Task':
            await closeTask();
            break;
        case 'List Tasks':
            await listTasks();
            break;
        case 'Delete Task':
            await deleteTask();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
            break;
    }

    start();
}

async function addTask() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter task title:' },
        { type: 'input', name: 'description', message: 'Enter task description:' },
        { type: 'input', name: 'dueDate', message: 'Enter due date (YYYY-MM-DD HH:MM):' }
    ]);
    CreateToDo(answers.title, answers.description, answers.dueDate);
}

// create func

// list func

// delete func

// edit func 


start();