export default function DayDetailsComponent({ selectedDay }) {
  if (!selectedDay) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-white/80 p-12 text-center shadow-[0_20px_70px_-35px_rgba(15,23,42,0.25)] backdrop-blur">
        <p className="max-w-sm text-base font-medium text-slate-500">
          Select a day tracking item from the sidebar to inspect granular
          metrics.
        </p>
      </div>
    );
  }

  // Destruction tracking object payload map mapping keys safely
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

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-MY", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Unknown Timeline Date";

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[24px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_70px_-35px_rgba(2,132,199,0.4)] backdrop-blur">
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-800">
            {location?.location_name || "Unknown Location"}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-400">
            {formattedDate}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-slate-500">
          ID: {location?.location_id || "N/A"}
        </span>
      </div>

      <div className="my-4 grid flex-1 grid-cols-1 items-center gap-4 sm:grid-cols-2">
        <div className="flex h-full flex-col justify-center rounded-2xl border border-orange-100 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-orange-600">
            Temperature Readings
          </span>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-4xl font-black tracking-tighter text-slate-800">
              {max_temp}°C
            </span>
            <span className="text-xs font-bold text-slate-400">
              Min limit: {min_temp}°C
            </span>
          </div>
        </div>

        <div className="flex h-full flex-col justify-center rounded-2xl border border-sky-100 bg-sky-50 p-4">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-sky-700">
            Overall Condition Summary
          </span>
          <p className="mt-2 text-base font-bold leading-snug text-slate-800">
            {summary_forecast}
          </p>
          {summary_when && (
            <p className="mt-1 text-xs font-semibold text-sky-600 opacity-90">
              Expected around the {summary_when.toLowerCase()} window.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <h3 className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.35em] text-slate-400">
          Granular Timeline Windows
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              ☀️ Morning
            </span>
            <p className="mt-0.5 text-xs font-bold leading-relaxed text-slate-700">
              {morning_forecast || "No forecast records"}
            </p>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              🌤️ Afternoon
            </span>
            <p className="mt-0.5 text-xs font-bold leading-relaxed text-slate-700">
              {afternoon_forecast || "No forecast records"}
            </p>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
              🌙 Night
            </span>
            <p className="mt-0.5 text-xs font-bold leading-relaxed text-slate-700">
              {night_forecast || "No forecast records"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
