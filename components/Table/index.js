const classNames = (className, extraClassNames = '') => {
  return [className, extraClassNames].join(' ');
};

const TableTitle = ({ title }) => (
  <caption className="govuk-table__caption">{title}</caption>
);

const TableHead = ({ children }) => (
  <thead className="govuk-table__head">{children}</thead>
);

const TableBody = ({ children }) => (
  <tbody className="govuk-table__body">{children}</tbody>
);

const TableRow = ({ children, className }) => (
  <tr className={classNames('govuk-table__row', className)}>{children}</tr>
);

const TableHeader = ({ children, className, scope }) => (
  <th scope={scope} className={classNames('govuk-table__header', className)}>
    {children}
  </th>
);

const TableData = ({ children, className }) => (
  <td className={classNames('govuk-table__cell', className)}>{children}</td>
);

const Table = ({ children, className }) => (
  <table className={classNames('govuk-table', className)}>{children}</table>
);

export default Table;
export { TableTitle, TableHead, TableBody, TableRow, TableHeader, TableData };
