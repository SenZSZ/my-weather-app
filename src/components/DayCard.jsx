import { conditionIcon } from "../lib/weatherIcons";

// Typical Malaysian dry-to-hot range used only to place the min/max bar —
// not a hard clamp, just gives the reader a sense of scale at a glance.
const SCALE_MIN = 20;
const SCALE_MAX = 36;

function pct(temp) {
  const clamped = Math.min(SCALE_MAX, Math.max(SCALE_MIN, temp));
  return ((clamped - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100;
}

export default function DayCard({ data, isLoading, selectedDay, setSelectedDay }) {
  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
          Fetching records
        </p>
        <p className="font-mono text-sm text-ink-soft">
          station_log.query() —<span className="animate-pulse">_</span>
        </p>
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
          No records on file
        </p>
        <p className="font-mono text-sm text-ink-soft">
          station_log.query() → 0 rows
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="px-1 pb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
        {data.length}-Day Log
      </p>

      {data.map((day, index) => {
        const weekday = day.date
          ? new Date(day.date).toLocaleDateString("en-MY", { weekday: "short" })
          : "—";
        const dayNum = day.date ? new Date(day.date).getDate() : index + 1;
        const month = day.date
          ? new Date(day.date).toLocaleDateString("en-MY", { month: "short" })
          : "";

        const isSelected = selectedDay && selectedDay.date === day.date;
        const Icon = conditionIcon(day.summary_forecast, "afternoon");

        const min = Number(day.min_temp);
        const max = Number(day.max_temp);
        const hasRange = !Number.isNaN(min) && !Number.isNaN(max);

        return (
          <button
            key={day.date || index}
            type="button"
            onClick={() => setSelectedDay(day)}
            className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left outline-offset-2 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 ${
              isSelected
                ? "border-ink bg-ink text-white focus-visible:outline-amber"
                : "border-line bg-surface text-ink hover:border-teal/50 hover:bg-teal-soft/40 focus-visible:outline-teal"
            }`}
          >
            <div
              className={`flex w-12 shrink-0 flex-col items-center border-r pr-3 font-mono ${
                isSelected ? "border-white/15" : "border-line"
              }`}
            >
              <span
                className={`text-[9px] uppercase tracking-wider ${isSelected ? "text-mist" : "text-ink-faint"}`}
              >
                {weekday}
              </span>
              <span className="text-lg font-semibold leading-tight">{dayNum}</span>
              <span
                className={`text-[9px] uppercase tracking-wider ${isSelected ? "text-mist" : "text-ink-faint"}`}
              >
                {month}
              </span>
            </div>

            <Icon
              className={`h-5 w-5 shrink-0 ${isSelected ? "text-white" : "text-teal"}`}
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {day.summary_forecast || "No summary available"}
              </p>
              {hasRange && (
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`font-mono text-[11px] ${isSelected ? "text-mist" : "text-ink-faint"}`}
                  >
                    {min}°
                  </span>
                  <div
                    className={`relative h-1 flex-1 overflow-hidden rounded-full ${
                      isSelected ? "bg-white/15" : "bg-line"
                    }`}
                  >
                    <div
                      className={`absolute h-full rounded-full ${isSelected ? "bg-amber" : "bg-amber"}`}
                      style={{
                        left: `${pct(min)}%`,
                        width: `${Math.max(pct(max) - pct(min), 4)}%`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-[11px] font-semibold">
                    {max}°
                  </span>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
