import {SlashCommandBuilder} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("math")
    .setDescription("complete arithmetic operations")
    .addSubcommand(subcommand => subcommand
        .setName("add")
        .setDescription("add 2 numbers")
        .addNumberOption(option => option
            .setName("num1")
            .setDescription("first number")
            .setRequired(true))
        .addNumberOption(option => option
            .setName("num2")
            .setDescription("second number")
            .setRequired(true)))
    .addSubcommand(subcommand => subcommand
        .setName("sub")
        .setDescription("subtract 2 numbers")
        .addNumberOption(option => option
            .setName("num1")
            .setDescription("first number")
            .setRequired(true))
        .addNumberOption(option => option
            .setName("num2")
            .setDescription("second number")
            .setRequired(true)))
    .addSubcommand(subcommand => subcommand
        .setName("mul")
        .setDescription("multiply 2 numbers")
        .addNumberOption(option => option
            .setName("num1")
            .setDescription("first number")
            .setRequired(true))
        .addNumberOption(option => option
            .setName("num2")
            .setDescription("second number")
            .setRequired(true)))
    .addSubcommand(subcommand => subcommand
        .setName("div")
        .setDescription("divide 2 numbers")
        .addNumberOption(option => option
            .setName("num1")
            .setDescription("first number")
            .setRequired(true))
        .addNumberOption(option => option
            .setName("num2")
            .setDescription("second number")
            .setRequired(true)))
    .addSubcommand(subcommand => subcommand
        .setName("mod")
        .setDescription("find modulo of 2 numbers")
        .addNumberOption(option => option
            .setName("num1")
            .setDescription("first number")
            .setRequired(true))
        .addNumberOption(option => option
            .setName("num2")
            .setDescription("second number")
            .setRequired(true)))
    .addSubcommand(subcommand => subcommand
        .setName("pow")
        .setDescription("find power of inputted number")
        .addNumberOption(option => option
            .setName("num1")
            .setDescription("first number")
            .setRequired(true))
        .addNumberOption(option => option
            .setName("num2")
            .setDescription("second number")
            .setRequired(true)))
            
export async function execute(interaction) {
    if (interaction.commandName === "math") {
        if (interaction.options.getSubcommand() === "add") {
            const num1 = interaction.options.getNumber("num1");
            const num2 = interaction.options.getNumber("num2");
            await interaction.editReply(`${num1} + ${num2} = ${num1 + num2}`);
        } else if (interaction.options.getSubcommand() === "sub") {
            const num1 = interaction.options.getNumber("num1");
            const num2 = interaction.options.getNumber("num2");
            await interaction.editReply(`${num1} - ${num2} = ${num1 - num2}`);
        } else if (interaction.options.getSubcommand() === "mul") {
            const num1 = interaction.options.getNumber("num1");
            const num2 = interaction.options.getNumber("num2");
            await interaction.editReply(`${num1} * ${num2} = ${num1 * num2}`);
        } else if (interaction.options.getSubcommand() === "div") {
            const num1 = interaction.options.getNumber("num1");
            const num2 = interaction.options.getNumber("num2");
            await interaction.editReply(`${num1} / ${num2} = ${num1 / num2}`);
        } else if (interaction.options.getSubcommand() === "mod") {
            const num1 = interaction.options.getNumber("num1");
            const num2 = interaction.options.getNumber("num2");
            await interaction.editReply(`${num1} mod ${num2} = ${num1 % num2}`);
        } else if (interaction.options.getSubcommand() === "pow") {
            const num1 = interaction.options.getNumber("num1");
            const num2 = interaction.options.getNumber("num2");
            await interaction.editReply(`${num1} ^ ${num2} = ${num1 ** num2}`);
        } 
    }
}        
