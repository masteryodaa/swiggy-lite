import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  const { status, statusText } = error;
  console.log(status, statusText)

  return (
    <div className="error">
      <h1>Error {status}</h1>
      <p>
         {statusText}
      </p>
    </div>
  );
};

export default Error;
