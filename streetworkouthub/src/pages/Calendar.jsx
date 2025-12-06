import CalendarWidget from "../components/CalendarWidget";

export default function Calendar() {
  return (
    <div className="mx-auto col-md-5 text-center fade-in">
      <h2 className="text-center text-neon mb-4">My Sporty Calendar</h2>

      <div className="d-flex justify-content-center">
        <CalendarWidget />
      </div>
    </div>
  );
}