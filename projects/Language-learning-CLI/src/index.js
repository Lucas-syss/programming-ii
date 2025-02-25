import { Command } from 'commander';
import inquirer from 'inquirer';
import { fetchExercises } from './fetchWorkouts.js';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const muscles = JSON.parse(fs.readFileSync(path.join(__dirname, 'muscles.json')));
const equipment = JSON.parse(fs.readFileSync(path.join(__dirname, 'equipment.json')));

const muscleChoices = Object.entries(muscles).map(([id, name]) => ({
    name: name,
    value: id
}));

const equipmentChoices = Object.entries(equipment).map(([id, name]) => ({
    name: name,
    value: id
}));

const program = new Command();

// Main menu function
const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: '🏋️♂️ Workout CLI - Main Menu',
        choices: [
            { name: '💪 Generate New Workout', value: 'generate' },
            { name: '❓ Help', value: 'help' },
            { name: '🚪 Exit', value: 'exit' }
        ]
    });

    switch (action) {
        case 'generate':
            await generateWorkout();
            break;
        case 'help':
            showHelp();
            break;
        case 'exit':
            console.log(chalk.yellow('\nGoodbye! Stay strong! 💪'));
            process.exit(0);
    }

    // Return to menu after action completes
    await mainMenu();
};

// Help information
const showHelp = () => {
    console.log(chalk.yellow.bold('\nWorkout CLI Help:'));
    console.log(`
  This tool helps you generate personalized workout routines using the wger API.
  
  ${chalk.green('Generate New Workout')} - Create a custom workout plan
  ${chalk.green('Help')}                 - Show this help information
  ${chalk.green('Exit')}                 - Quit the application
  
  The workouts include:
  - Smart rep/set recommendations
  - Progressive overload planning
  - Equipment-specific exercises
  `);
};

// Existing workout generation logic
const generateWorkout = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'muscle',
            message: 'Select muscle group:',
            choices: muscleChoices
        },
        {
            type: 'list',
            name: 'equipment',
            message: 'Select equipment:',
            choices: equipmentChoices
        },
        {
            type: 'list',
            name: 'difficulty',
            message: 'Choose workout intensity:',
            choices: [
                { name: '🏋️ Beginner (3 exercises)', value: 3 },
                { name: '💪 Intermediate (5 exercises)', value: 5 },
                { name: '🔥 Advanced (7 exercises)', value: 7 }
            ]
        }
    ]);

    const exercises = await fetchExercises(answers.muscle, answers.equipment);
    displayWorkout(answers, exercises.slice(0, answers.difficulty));
};

// Existing display logic
const displayWorkout = (options, exercises) => {
    console.log(
        chalk.blue.bold(`\n🔧 ${muscles[options.muscle]} Workout (${equipment[options.equipment]})`) +
        chalk.gray(` [${options.difficulty} exercises]`)
    );
    console.log(chalk.blue('-'.repeat(40)));

    exercises.forEach((exercise, index) => {
        const reps = index < 2 ? 12 - (index * 2) : 8;
        console.log(chalk.white(`${index + 1}. ${exercise.name} (3 sets of ${reps} reps)`));
    });
};

// Configure commander
program
    .name('workout-cli')
    .description('A CLI tool for generating workout routines')
    .version('1.0.0')
    .action(mainMenu); // Default action is the menu

// Keep existing generate command for direct access
program
    .command('generate')
    .description('Start interactive workout builder')
    .action(async () => {
        await generateWorkout();
        await mainMenu();
    });

program.parse(process.argv);