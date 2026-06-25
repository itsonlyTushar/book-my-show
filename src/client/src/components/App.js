import React, { useEffect, useState } from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import { movies, seats, slots } from "./data";
import { PiSpinnerLight } from "react-icons/pi";

const App = () => {
  const [selectMovie, setSelectMovie] = useState(() => {
    return localStorage.getItem("movie") || "";
  });
  const [time, setTime] = useState(() => {
    return localStorage.getItem("slot") || "";
  });

  const [seat, setSeat] = useState(() => {
    const savedSeats = localStorage.getItem("seats");

    if (savedSeats) return JSON.parse(savedSeats);

    return {
      A1: 0,
      A2: 0,
      A3: 0,
      A4: 0,
      D1: 0,
      D2: 0,
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [bookingDetails, setBookingDetails] = useState(null);

  // Handle the booking logic from 1st end-point 
  const handleBooking = async (e) => {
    e.preventDefault();

    const totalSeats = Object.values(seat).reduce(
      (sum, count) => sum + count,
      0,
    );

    if (!selectMovie || !time || totalSeats === 0) {
      alert("Please select a movies");
      return;
    }

    if (totalSeats > 10) {
      alert("you cannot book more than 10 seats at time");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie: selectMovie,
          slot: time,
          seats: seat,
        }),
      });

      if (response.status === 200) {
        const data = await response.json()
        setBookingDetails(data.data)
        alert("Booking is Created Sucessfully");

        // clearing the selections
        setSelectMovie("");
        setTime("");
        setSeat({
          A1: 0,
          A2: 0,
          A3: 0,
          A4: 0,
          D1: 0,
          D2: 0,
        });

        // resetting the local storage
        (localStorage.removeItem("movie"),
          localStorage.removeItem("slot"),
          localStorage.removeItem("seats"));
      } else {
        alert("Booking failed");
      }
    } catch (err) {
      console.error("error during boooking", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle the fetching logic from 2nd end-point
  const fetchLastBooking = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/booking");
      setBookingDetails(await response.json());
    } catch (err) {
      console.error("Error fetching booking details", err);
    } finally {
      setIsLoading(false);
    }
  };

  // persisting selections in local storage
  useEffect(() => {
    localStorage.setItem("movie", selectMovie);
  }, [selectMovie]);

  useEffect(() => {
    localStorage.setItem("slot", time);
  }, [time]);

  useEffect(() => {
    localStorage.setItem("seats", JSON.stringify(seat));
  }, [seat]);

  useEffect(() => {
    fetchLastBooking();
  }, []);

  return (
    <>
      <div className="booking-box">
        <h1>Book My Show</h1>

        {/* To Display movies  */}
        <section className="grid-box">
          {/* BOX1  */}
          <div>
            <div className="movie-row">
              <h3>Select A Movie</h3>
              {movies.map((movie, index) => (
                <div
                  onClick={() => setSelectMovie(movie)}
                  key={index}
                  className={`movie-column ${selectMovie === movie ? "movie-column-selected" : ""}`}
                >
                  {movie}
                </div>
              ))}
            </div>

            {/* To Display slots  */}
            <div className="slot-row">
              <h3>Select Time Slot</h3>
              {slots.map((slot, index) => (
                <div
                  onClick={() => setTime(slot)}
                  className={`slot-column ${time === slot ? "slot-column-selected" : ""}`}
                  key={index}
                >
                  {slot}
                </div>
              ))}
            </div>

            {/* To Display Seats  */}
            <div className="seat-row">
              <h3>Select Seats</h3>
              {seats.map((seatName) => (
                <div className="seat-column" key={seatName}>
                  <h4>Type {seatName}</h4>
                  <input
                    onChange={(e) =>
                      setSeat({
                        ...seat,
                        [seatName]: Number(e.target.value),
                      })
                    }
                    id={`seat-${seatName}`}
                    type="number"
                    min="0"
                    max="10"
                    value={seat[seatName] || 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BOX2  */}
          <div className="display-booking">
            <h3>Last Booking Details</h3>
            {isLoading ? (
              <PiSpinnerLight className="loading" />
            ) : !bookingDetails || bookingDetails.message ? (
              <span>no previous booking found</span>
            ) : (
              <div>
                <p>
                  <strong>Movie:</strong> {bookingDetails.movie}
                </p>
                <p>
                  <strong>Slot:</strong> {bookingDetails.slot}
                </p>
                <p className="display-seats">
                  <strong>Seats:</strong>{" "}
                  {Object.entries(bookingDetails.seats)
                    .map(([name, count]) => (
                      <span key={name} className="seat-badge">
                        {name}: {count}
                      </span>
                    ))}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Booking Button  */}
        <div className="book-button">
          <button disabled={isSubmitting} onClick={handleBooking}>
            {isSubmitting ? <PiSpinnerLight className="loading" /> : "Book Now"}
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
