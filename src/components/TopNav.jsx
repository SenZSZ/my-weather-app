import IsobarDivider from "./IsobarDivider";

const STATES = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Pulau Pinang",
  "Perak",
  "Perlis",
  "Selangor",
  "Terengganu",
  "Sabah",
  "Sarawak",
  "W.P. Kuala Lumpur",
  "W.P. Labuan",
  "W.P. Putrajaya",
];

const today = new Date().toLocaleDateString("en-MY", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function TopNav({ setState }) {
  return (
    <header className="bg-ink text-paper">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-2xl font-bold tracking-tight text-white">
            CUACA<span className="text-teal">·</span>MY
          </h1>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-mist sm:block">
            National Forecast Network
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
              Station
            </span>
            <div className="relative">
              <select
                defaultValue=""
                name="state"
                onChange={(e) => setState(e.target.value)}
                className="w-56 cursor-pointer appearance-none rounded-md border border-white/15 bg-white/5 py-2 pl-3 pr-9 text-sm font-medium text-white outline-none transition-colors duration-150 hover:border-white/30 focus:border-teal focus:bg-white/10"
              >
                <option className="text-ink" value="" disabled hidden>
                  Select a state
                </option>
                {STATES.map((name) => (
                  <option className="text-ink" key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-mist">
                ▾
              </span>
            </div>
          </label>

          <div className="hidden flex-col gap-1 border-l border-white/10 pl-6 md:flex">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
              Reading Taken
            </span>
            <span className="font-mono text-sm text-white">{today}</span>
          </div>
        </div>
      </div>
      <IsobarDivider className="text-teal/70" />
    </header>
  );
}

export default TopNav;
