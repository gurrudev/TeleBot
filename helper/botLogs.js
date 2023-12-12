const botlogs = (message_id, from, text, bot_response, date, formattedDate, formattedTime) => {
    const log = {
        message_id: message_id,
        from: from,
        text: text,
        bot_response: bot_response,
        date: date,
        formattedDate: formattedDate,
        formattedTime: formattedTime
    }

    return log
}

module.exports = botlogs