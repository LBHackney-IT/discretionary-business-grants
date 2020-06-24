import { useState, useEffect, useMemo, useCallback } from 'react';
import Router from 'next/router';

import Table from 'components/Table/Table';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { BasicSelect } from 'components/Form';
import { fetchApplications } from 'utils/api/applications';

import { APPLICATION_STATE, TYPE_OF_BUSINESS } from 'lib/dbMapping';

const ApplicationsList = ({ page, pageSize, sort, status, businessType }) => {
  const columns = useMemo(
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
  const [filters, setFilters] = useState({ status, businessType });
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const checkFilter = JSON.stringify(filters);
  useEffect(() => {
    fetchData(filters);
  }, [checkFilter]);

  const setValues = useCallback(state => setFilters({ ...filters, ...state }));

  const fetchData = useCallback(
    async ({ pageSize, pageIndex, sortBy, ...otherFilters }) => {
      if (isNaN(pageSize)) {
        return;
      }
      setLoading(true);
      const query = {
        page: pageIndex + 1,
        pageSize,
        sort: sortBy && `${sortBy.desc ? '-' : '+'}${sortBy.id}`,
        ...otherFilters
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
        const { applications, pagination } = await fetchApplications(query);
        setData(applications);
        setPageCount(pagination.totalPages);
        setLoading(false);
      } catch (e) {
        setError(e.response.data);
      }
    },
    []
  );
  return !error ? (
    <>
      <BasicSelect
        options={APPLICATION_STATE}
        label="Filter by Status:"
        value={filters.status}
        onChange={status => setValues({ status })}
      />
      <BasicSelect
        options={TYPE_OF_BUSINESS}
        label="Filter by Type of Business:"
        value={filters.businessType}
        onChange={businessType => setValues({ businessType })}
      />
      <Table
        columns={columns}
        data={data}
        fetchData={setValues}
        loading={loading}
        pageCount={pageCount}
        initialPage={page}
        initialPageSize={pageSize}
        initialSortBy={sort ? sort : '+applicationDate'}
      />
    </>
  ) : (
    <ErrorMessage text={error} />
  );
};

export default ApplicationsList;
