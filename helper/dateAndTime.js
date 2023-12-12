const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date * 1000).toLocaleDateString('en-US', options);
}
  
//   const timestamp = 1702382158; // Replace this with your timestamp
//   const formattedDate = formatDate(timestamp);
//   console.log(formattedDate); // Output: "5, June 2024"
  

const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(date * 1000).toLocaleTimeString('en-US', options);
}
  
  
//   const formattedTime = formatTime(timestamp);
//   console.log(formattedTime); // Output: "05:35 PM"
  
module.exports = {
    formatDate: formatDate,
    formatTime: formatTime
}