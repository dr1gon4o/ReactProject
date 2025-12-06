import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarWidget() {
  return (
    <div className="p-3 border border-success rounded" style={{ width: "280px" }}>
      <h6 className="text-success">Workout Calendar</h6>
      <Calendar />
    </div>
  );
}
