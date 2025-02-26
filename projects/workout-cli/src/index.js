import { Command } from 'commander';
import inquirer from 'inquirer';
import { fetchExercises } from './fetchWorkouts.js';
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const muscles = JSON.parse(fs.readFileSync(path.join(__dirname, 'muscles.json')));
const equipment = JSON.parse(fs.readFileSync(path.join(__dirname, 'equipment.json')));

 
const DIFFICULTY_LEVELS = {
    beginner: {
      name: '🏋️ Beginner',
      params: {
        sets: 3,
        repRange: [12, 15],
        rest: 90,
        focus: 'Full-body endurance',
        tips: ['Focus on form', 'Controlled tempo']
      }
    }, 
    intermediate: {
      name: '💪 Intermediate',
      params: {
        sets: 4,
        repRange: [8, 12],
        rest: 60,
        focus: 'Muscle growth',
        tips: ['Push to failure', '1s pause at contraction']
      }
    },
    advanced: {
      name: '🔥 Advanced',
      params: {
        sets: 5,
        repRange: [5, 8],
        rest: 120,
        focus: 'Strength building',
        tips: ['Progressive overload', 'Supersets'],
        supersets: true,
        warmupSets: 2
      }
    }
  };

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
            message: 'Choose training intensity:',
            choices: Object.entries(DIFFICULTY_LEVELS).map(([key, level]) => ({
                name: `${level.name} (${level.params.focus})`,
                value: { key, ...level.params },
            }))
        }
    ]);

    const exercises = await fetchExercises(answers.muscle, answers.equipment);
    displayWorkout(answers, exercises);
};
 
// Move displayWorkout outside of generateWorkout
const displayWorkout = (options, exercises) => {
    const { difficulty } = options;
    const [minReps, maxReps] = difficulty.repRange;
     
    console.log(chalk.blue.bold(`\n🔧 ${muscles[options.muscle]} Workout (${equipment[options.equipment]})`)); 
    console.log(chalk.blue.bold(`🏋️ Training Plan: ${DIFFICULTY_LEVELS[difficulty.key].name}`));
    console.log(chalk.blue('-'.repeat(50)));
    
    console.log(chalk.yellow(`\n📊 Workout Parameters:`));
    console.log(chalk.white(`Sets: ${difficulty.sets}`));
    console.log(chalk.white(`Reps: ${minReps}-${maxReps}`));
    console.log(chalk.white(`Rest: ${difficulty.rest}s between sets`));
    
    if (difficulty.warmupSets) {
        console.log(chalk.yellow(`\n🔥 Warmup: ${difficulty.warmupSets} light sets`));
    }

    console.log(chalk.blue.bold(`\n💪 Exercise Plan:`));
    exercises.forEach((exercise, index) => {
        console.log(chalk.white.bold(`\n${index + 1}. ${exercise.name}`));
        console.log(chalk.white(`   ${difficulty.sets} sets of ${minReps}-${maxReps} reps`));
        
        if (difficulty.supersets && index % 2 === 0) {
            console.log(chalk.magenta('   ➕ Superset with next exercise'));
        }
    });

    console.log(chalk.yellow.bold(`\n💡 Pro Tips:`));
    DIFFICULTY_LEVELS[difficulty.key].params.tips.forEach((tip, i) => {
        console.log(chalk.white(`   ${i + 1}. ${tip}`));
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