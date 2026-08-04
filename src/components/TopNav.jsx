function TopNav({ setState }) {
  return (
    <div className="border-b border-sky-200/60 bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 px-4 py-4 shadow-[0_10px_35px_-20px_rgba(3,105,161,0.8)] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-2xl shadow-sm backdrop-blur">
            🌤️
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white sm:text-2xl">
              Weather<span className="ml-1 font-light text-sky-100">App</span>
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-100/90">
              Malaysian forecasts
            </p>
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <select
            defaultValue=""
            name="state"
            onChange={(e) => setState(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-2xl border border-sky-200/80 bg-white/95 px-4 py-3 pr-11 text-sm font-semibold text-slate-700 shadow-inner outline-none transition-all duration-200 hover:bg-white focus:border-sky-500 focus:ring-4 focus:ring-sky-200"
          >
            <option value="" disabled hidden>
              Choose a state...
            </option>
            <option value="Johor">Johor</option>
            <option value="Kedah">Kedah</option>
            <option value="Kelantan">Kelantan</option>
            <option value="Melaka">Melaka</option>
            <option value="Negeri Sembilan">Negeri Sembilan</option>
            <option value="Pahang">Pahang</option>
            <option value="Pulau Pinang">Pulau Pinang</option>
            <option value="Perak">Perak</option>
            <option value="Perlis">Perlis</option>
            <option value="Selangor">Selangor</option>
            <option value="Terengganu">Terengganu</option>
            <option value="Sabah">Sabah</option>
            <option value="Sarawak">Sarawak</option>
            <option value="W.P. Kuala Lumpur">W.P. Kuala Lumpur</option>
            <option value="W.P. Labuan">W.P. Labuan</option>
            <option value="W.P. Putrajaya">W.P. Putrajaya</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500">
            ▼
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
