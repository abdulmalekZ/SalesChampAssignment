import { IoAlertCircleOutline } from "react-icons/io5";

const ErrorView: React.FC = () => {
  return (
    <section className="errorSection">
      <IoAlertCircleOutline />
      <p>Error, please try again</p>
    </section>
  );
};

export default ErrorView;
