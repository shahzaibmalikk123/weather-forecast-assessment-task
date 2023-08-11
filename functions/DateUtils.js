export const extractDateAndTime = (datetimeStr) => {
    if (!datetimeStr) {
      return { date: '', time: '' };
    }
    const [date, time] = datetimeStr.split(' ');
    const parsedDate = new Date(date);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = parsedDate.toLocaleDateString('en-US', options);
    return { date: formattedDate, time };
  };
  