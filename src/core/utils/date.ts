export function convertTimestampToDate(timestamp: number): string {
    // Convert Unix timestamp to milliseconds
    const milliseconds = timestamp * 1000;

    // Create a new Date object
    const dateObject = new Date(milliseconds);

    // Get the month and date
    const month = dateObject.toLocaleString('default', { month: 'long' });
    const date = dateObject.getDate();

    // Format the result as "Month Date"
    const formattedDate = `${month} ${date}`;

    return formattedDate;
}

