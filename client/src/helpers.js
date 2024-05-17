
export function formatDate(date) {
    date = new Date(date).toLocaleString('en-US', { timeZone: 'UTC' });
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

export function sortDates(a, b) {
    if (a.date > b.date) return -1;
    else if (a.date < b.date) return 1;
    else return 0;
}
