import { useEffect } from 'react';
import Router from 'next/router';
import { useTable, useSortBy, usePagination } from 'react-table';

const Table = ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  initialPage = 1,
  initialPageSize = 10,
  initialSortBy
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy }
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: parseInt(initialPage - 1, 10),
        pageSize: parseInt(initialPageSize, 10),
        sortBy: initialSortBy && [
          { id: initialSortBy.slice(1), desc: initialSortBy[0] === '-' }
        ]
      },
      manualSortBy: true,
      manualPagination: true,
      pageCount: controlledPageCount,
      disableMultiSort: true
    },
    useSortBy,
    usePagination
  );
  useEffect(() => {
    fetchData({ pageIndex, pageSize, sortBy: sortBy[0] });
  }, [fetchData, pageIndex, pageSize, sortBy[0]]);
  return (
    <>
      <table className="govuk-table" {...getTableProps()}>
        <caption className="govuk-table__caption">Applications</caption>
        <thead className="govuk-table__head">
          {headerGroups.map(headerGroup => (
            <tr
              className="govuk-table__row"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map(column => (
                <th
                  scope="col"
                  className="govuk-table__header"
                  {...column.getHeaderProps()}
                >
                  <span {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="govuk-table__body" {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr
                className="govuk-table__row lbh-table__row--data"
                {...row.getRowProps()}
                onClick={() =>
                  Router.push(
                    '/admin/applications/[clientGeneratedId]',
                    `/admin/applications/${row.original.clientGeneratedId}`
                  )
                }
              >
                {row.cells.map(cell => {
                  return (
                    <td className="govuk-table__cell" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          <tr className="govuk-table__row">
            {loading ? (
              <td className="govuk-table__cell" colSpan="10000">
                Loading...
              </td>
            ) : (
              <td className="govuk-table__cell" colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
