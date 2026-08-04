import TopNav from "./components/TopNav";
import DayCard from "./components/DayCard";
import DayDetailsComponent from "./components/DayDetailsComponent";
import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState("");
  const [forecast, setForecast] = useState(null); // Array shape initialization
  const [warning, setWarning] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  // Reset details panel selection view when user switches to a different state
  useEffect(() => {
    setSelectedDay(null);
    setWarning("");
  }, [state]);

  useEffect(() => {
    if (state) {
      fetch(
        `https://api.data.gov.my/weather/forecast?filter=${state}@location__location_name&sort=date`,
      )
        .then((response) => response.json())
        .then((data) => {
          setForecast(data);
          // Auto-select the first timeline node day card item if data returns successfully
          if (Array.isArray(data) && data.length > 0) {
            setSelectedDay(data[0]);
          }
        })
        .catch((error) => {
          console.error("Fetch failure error metric:", error);
          setWarning("Error fetching weather data. Please try again later.");
        });
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.18),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#eef6ff_45%,_#f8fafc_100%)] text-slate-800 flex flex-col font-sans">
      <TopNav setState={setState} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start p-4 md:p-8">
        {warning && (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50/90 px-4 py-3 text-sm font-semibold text-rose-700 shadow-sm">
            <span className="mr-2">⚠️</span>
            {warning}
          </div>
        )}

        {!state ? (
          <div className="flex min-h-[440px] flex-1 flex-col items-center justify-center rounded-[28px] border border-slate-200/80 bg-white/80 p-8 text-center shadow-[0_20px_70px_-30px_rgba(15,23,42,0.35)] backdrop-blur">
            <span className="mb-3 text-5xl">🗺️</span>
            <p className="max-w-xl text-lg font-semibold tracking-wide text-slate-600">
              No State Selected. Please choose a Malaysian region from the top
              menu to explore the forecast.
            </p>
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-6 items-stretch md:grid-cols-[1.05fr_1.95fr]">
            <div className="overflow-y-auto rounded-[24px] border border-slate-200/70 bg-white/80 p-3 shadow-[0_20px_70px_-35px_rgba(2,132,199,0.45)] backdrop-blur md:h-[620px] md:max-h-[620px]">
              <DayCard
                data={forecast}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            </div>

            <div className="h-[480px] md:h-[620px]">
              <DayDetailsComponent selectedDay={selectedDay} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
