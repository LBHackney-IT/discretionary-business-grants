const format = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

const DueDate = ({ dateTime }) => (
  <time dateTime={dateTime}>{format.format(new Date(dateTime))}</time>
);

export default DueDate;
