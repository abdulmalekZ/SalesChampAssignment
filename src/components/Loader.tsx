import { Spinner } from "reactstrap";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <Spinner>Loading...</Spinner>
    </div>
  );
};

export default Loader;
