import { useParams } from 'react-router-dom';

export default function MovieDetails() {
  const { movieName } = useParams();

  return (
    <div>
      <h1>Movie Details</h1>
      <p>Movie Name: {decodeURIComponent(movieName)}</p>
      {/* Add more details about the movie here */}
    </div>
  );
}