import React from 'react';
import axios from 'axios';
import Router from 'next/router';

import Table from 'components/Table/Table';

const ApplicationsList = ({ page, pageSize }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Business Name',
        accessor: 'businessName'
      },
      {
        Header: 'Submission',
        accessor: 'applicationDate',
        Cell: ({ value }) => new Date(value).toLocaleString()
      },
      {
        Header: 'Status',
        accessor: 'status'
      }
    ],
    []
  );

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    setLoading(true);
    Router.push(
      '/admin',
      { pathname: '/admin', query: { page: pageIndex, pageSize } },
      { shallow: true }
    );
    axios
      .get(`/api/applications?page=${pageIndex + 1}&pageSize=${pageSize}`)
      .then(({ data }) => {
        setData(data.applications);
        setPageCount(data.pagination.totalPages);
        setLoading(false);
      });
  }, []);

  return (
    <Table
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
      initialPage={page}
      initialPageSize={pageSize}
    />
  );
};

export default ApplicationsList;
