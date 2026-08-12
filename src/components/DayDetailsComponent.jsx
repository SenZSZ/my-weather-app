import IsobarDivider from "./IsobarDivider";
import { conditionIcon } from "../lib/weatherIcons";

const PERIODS = [
  { key: "morning_forecast", label: "Pagi", en: "Morning", window: "06–12", period: "morning" },
  { key: "afternoon_forecast", label: "Petang", en: "Afternoon", window: "12–18", period: "afternoon" },
  { key: "night_forecast", label: "Malam", en: "Night", window: "18–06", period: "night" },
];

export default function DayDetailsComponent({ selectedDay }) {
  if (!selectedDay) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line bg-surface/60 p-12 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink-faint">
          No record selected
        </p>
        <p className="max-w-sm text-sm font-medium text-ink-soft">
          Choose a day from the log on the left to inspect its full reading.
        </p>
      </div>
    );
  }

  const {
    location,
    date,
    morning_forecast,
    afternoon_forecast,
    night_forecast,
    summary_forecast,
    summary_when,
    min_temp,
    max_temp,
  } = selectedDay;

  const forecastByKey = { morning_forecast, afternoon_forecast, night_forecast };

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-MY", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Unknown date";

  const HeroIcon = conditionIcon(summary_forecast, "afternoon");

  return (
    <div className="flex h-full w-full flex-col rounded-lg border border-line bg-surface p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {location?.location_name || "Unknown location"}
          </h2>
          <p className="mt-1 font-mono text-xs text-ink-soft">{formattedDate}</p>
        </div>
        <span className="shrink-0 rounded-md border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          {location?.location_id || "N/A"}
        </span>
      </div>

      <IsobarDivider className="my-5 text-line" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
            {max_temp}°
          </span>
          <span className="text-xl text-ink-faint">/{min_temp}°</span>
        </div>

        <div className="flex items-start gap-3 border-t border-line pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <HeroIcon className="mt-0.5 h-7 w-7 shrink-0 text-teal" />
          <div>
            <p className="text-base font-semibold leading-snug text-ink">
              {summary_forecast || "No summary available"}
            </p>
            {summary_when && (
              <p className="mt-0.5 font-mono text-xs uppercase tracking-wide text-ink-faint">
                Expected {summary_when.toLowerCase()}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex-1">
        <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
          Forecast Windows
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PERIODS.map(({ key, label, en, window, period }) => {
            const text = forecastByKey[key];
            const PeriodIcon = conditionIcon(text, period);
            return (
              <div
                key={key}
                className="flex flex-col gap-2 rounded-lg border border-line bg-paper/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                    {label} · {en}
                  </span>
                  <PeriodIcon className="h-4 w-4 text-teal" />
                </div>
                <span className="font-mono text-[10px] text-ink-faint">
                  {window}
                </span>
                <p className="text-sm font-medium leading-relaxed text-ink">
                  {text || "No record"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
