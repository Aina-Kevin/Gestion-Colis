function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800">
        Dashboard
      </h2>

      <p className="mt-2 text-slate-600">
        Bienvenue dans l'application de gestion des colis.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Itinéraires
          </p>
          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Voitures
          </p>
          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Envois
          </p>
          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Réceptions
          </p>
          <p className="mt-2 text-3xl font-bold">
            0
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;