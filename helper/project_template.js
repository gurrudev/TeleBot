// Function to generate a project_template template
const generateProjectTemplate = (data) => {
    return `
        *${data.title}*
        \n\nDescription:\n_${data.description}_
        \n\nTeck Stack:\n${data.command} to ${data.action}.
    `;
}

module.exports = generateProjectTemplate