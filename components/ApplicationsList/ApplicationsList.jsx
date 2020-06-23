import React from 'react';
import axios from 'axios';
import Router from 'next/router';

import Table from 'components/Table/Table';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

const ApplicationsList = ({ page, pageSize, sort }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Business Name',
        accessor: 'businessName'
      },
      {
        Header: 'Application Id',
        accessor: 'clientGeneratedId',
        disableSortBy: true
      },
      {
        Header: 'Submission',
        accessor: 'applicationDate',
        Cell: ({ value }) => new Date(value).toLocaleString()
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableSortBy: true
      }
    ],
    []
  );

  const [error, setError] = React.useState();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);

  const fetchData = React.useCallback(
    async ({ pageSize, pageIndex, sortBy }) => {
      setLoading(true);
      const query = {
        page: pageIndex + 1,
        pageSize,
        sort: sortBy && `${sortBy.desc ? '-' : '+'}${sortBy.id}`
      };
      Router.push(
        '/admin',
        {
          pathname: '/admin',
          query
        },
        { shallow: true }
      );
      try {
        const { data } = await axios.get('/api/applications', {
          params: query
        });
        setData(data.applications);
        setPageCount(data.pagination.totalPages);
        setLoading(false);
      } catch (e) {
        setError(e.response.data);
      }
    },
    []
  );
  return !error ? (
    <Table
      columns={columns}
      data={data}
      fetchData={fetchData}
      loading={loading}
      pageCount={pageCount}
      initialPage={page}
      initialPageSize={pageSize}
      initialSortBy={sort ? sort : '+applicationDate'}
    />
  ) : (
    <ErrorMessage text={error} />
  );
};

export default ApplicationsList;
