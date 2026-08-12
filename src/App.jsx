import TopNav from "./components/TopNav";
import DayCard from "./components/DayCard";
import DayDetailsComponent from "./components/DayDetailsComponent";
import IsobarDivider from "./components/IsobarDivider";
import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState("");
  const [forecast, setForecast] = useState(null); // Array shape initialization
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);

  // Reset details panel selection view when user switches to a different state
  useEffect(() => {
    setSelectedDay(null);
    setWarning("");
  }, [state]);

  useEffect(() => {
    if (state) {
      // Clear the previous station's log immediately so a slow response
      // can't leave a stale, mismatched day list on screen while it loads.
      setForecast(null);
      setIsLoading(true);
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
        })
        .finally(() => setIsLoading(false));
    }
  }, [state]);

  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <TopNav setState={setState} />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start p-4 md:p-8">
        {warning && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red/30 bg-red-soft px-4 py-3 text-sm font-medium text-red">
            <span className="font-mono text-xs uppercase tracking-widest">
              Alert
            </span>
            <span className="text-ink">{warning}</span>
          </div>
        )}

        {!state ? (
          <div className="flex min-h-[440px] flex-1 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-surface/60 p-8 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-faint">
              Station idle
            </p>
            <p className="max-w-md text-lg font-medium text-ink-soft">
              Select a state from the station menu above to load its
              forecast log.
            </p>
            <IsobarDivider className="mt-2 h-3 w-40 text-line" />
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-6 items-stretch md:grid-cols-[1.05fr_1.95fr]">
            <div className="overflow-y-auto rounded-lg border border-line bg-surface/60 p-3 md:h-[620px] md:max-h-[620px]">
              <DayCard
                data={forecast}
                isLoading={isLoading}
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
