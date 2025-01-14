import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-red-800 fa-4x mb-4" size={64} />
      <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5">Ova stranica ne postoji. Vratite se na početnu stranicu</p>
      <Link
        to="/"
        className="text-white bg-red-500 hover:bg-red-700 rounded-md px-3 py-2 mt-4"
      >
        Vrati se
      </Link>
    </section>
  );
}

export default NotFoundPage;