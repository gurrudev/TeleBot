//   const date = 1702382158; // Replace this with your timestamp

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date * 1000).toLocaleDateString('en-US', options);
}
  
const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date * 1000).toLocaleTimeString('en-US', options);
}
  
module.exports = {
    formatDate: formatDate,
    formatTime: formatTime
}