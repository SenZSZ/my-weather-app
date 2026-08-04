export default function DayCard({ data, selectedDay, setSelectedDay }) {
  // Safe-guard layout container execution context
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <p className="p-4 text-center text-sm font-medium text-slate-400">
        Loading weather records list...
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {data.map((day, index) => {
        // Safe data calculation formatting string values
        const displayDate = day.date
          ? new Date(day.date).toLocaleDateString("en-MY", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })
          : `Day ${index + 1}`;

        // Check active node selection boundaries mapping tracking
        const isSelected = selectedDay && selectedDay.date === day.date;

        return (
          <div
            key={day.date || index}
            onClick={() => setSelectedDay(day)}
            className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all duration-200 ${
              isSelected
                ? "border-sky-500 bg-sky-600 text-white shadow-[0_16px_35px_-20px_rgba(2,132,199,0.75)]"
                : "border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50"
            }`}
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div
                className={`h-2.5 w-2.5 rounded-full ${
                  isSelected ? "bg-white/90" : "bg-sky-400"
                }`}
              />
              <div className="flex min-w-0 flex-col">
                <span
                  className={`text-sm font-bold ${isSelected ? "text-white" : "text-slate-800"}`}
                >
                  {displayDate}
                </span>
                <span
                  className={`mt-1 truncate text-xs ${isSelected ? "text-sky-100 opacity-90" : "text-slate-500"}`}
                >
                  {day.summary_forecast || "Click to see details"}
                </span>
              </div>
            </div>

            <span
              className={`ml-2 text-base font-bold transition-transform duration-200 ${
                isSelected ? "translate-x-0.5 text-white" : "text-slate-400"
              }`}
            >
              →
            </span>
          </div>
        );
      })}
    </div>
  );
}
