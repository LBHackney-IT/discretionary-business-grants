const Result = props => {
  return (
    <>
      <h2>Result:</h2>
      <pre>{JSON.stringify(props.formData, null, 2)}</pre>
    </>
  );
};

export default Result;
