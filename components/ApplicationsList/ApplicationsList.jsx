import React from 'react';
import axios from 'axios';

import Table from 'components/Table/Table';

const ApplicationsList = () => {
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
    />
  );
};

export default ApplicationsList;
