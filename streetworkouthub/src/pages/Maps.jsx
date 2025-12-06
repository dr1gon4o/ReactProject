import MapsWidget from "../components/MapsWidget";

export default function Maps() {
  return (
    <div className="mx-auto col-md-5 text-center fade-in">
      <h2 className="text-center text-neon mb-4">My Sporty Maps</h2>

      <div className="d-flex justify-content-center">
        <MapsWidget />
      </div>
    </div>
  );
}