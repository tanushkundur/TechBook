import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <section className="max-w-xl m-auto text-center py-10">
      <h2 className="text-2xl font-semibold mb-5">Payment Successful!</h2>
      <p className="text-lg mb-10">Thank you for your purchase.</p>
      <button
        onClick={handleGoHome}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Go to Home
      </button>
    </section>
  );
};
