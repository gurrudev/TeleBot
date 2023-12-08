// Function to generate a project_template template
const generateProjectTemplate = (data) => {
    return `
        *${data.title}*
        \n\n*Description:*\n_${data.description}_
        \n\n*💻 Teck Stack:*\n${data.teck_stack}
        \n\n*🚀 Live:* _${data.live_link}_
        \n📁 *Source Code:* _${data.source_code_link}_
    `;
}

module.exports = generateProjectTemplate