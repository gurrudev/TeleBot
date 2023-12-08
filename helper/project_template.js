// Function to generate a project_template template
const generateProjectTemplate = (data) => {
    return `
        *${data.title}*
        \n\n_${data.description}_
        \n\nUse /${data.command} to ${data.action}.
    `;
}

module.exports = generateProjectTemplate