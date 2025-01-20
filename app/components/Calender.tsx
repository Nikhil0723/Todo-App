import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarWithTime = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div>
      <h2>Select Date and Time</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15} // Interval in minutes
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="Choose a date and time"
      />
      {selectedDate && (
        <div>
          <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
          <p>Selected Time: {selectedDate.toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarWithTime;
