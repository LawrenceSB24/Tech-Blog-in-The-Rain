module.exports = {

    // Returns the date in MM/DD/YYY format for blog creation
    format_date: date => {
        return `${new Date(date).getMonth() + 1}
        /${new Date(date).getDate()}
        /${new Date(date).getFullYear()}`;
    },

    // Word count for blog posts, comments, etc.
    format_plural: (word, amount) => {
        if (amount !== 1) {
            return `${word}s`;
        }
        return word;
    }
}