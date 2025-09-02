import { useEffect, useMemo, useState } from "react";
import { fetchGames} from "./fetchGames";
import type { Game } from "./fetchGames";

import "./App.css";

type EditState = { id: number; name: string; inStock: boolean } | null;

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<EditState>(null);

  useEffect(() => {
    let mounted = true;
    fetchGames()
      .then((data) => mounted && setGames(data))
      .catch((e) => mounted && setError(e.message ?? "Error"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const onEdit = (g: Game) =>
    setEditing({ id: g.id, name: g.name, inStock: g.inStock });

  const onChangeName = (val: string) =>
    setEditing((s) => (s ? { ...s, name: val } : s));

  const onChangeStock = (val: boolean) =>
    setEditing((s) => (s ? { ...s, inStock: val } : s));

  const onSave = () => {
    if (!editing) return;
    setGames((arr) =>
      arr.map((g) => (g.id === editing.id ? { ...g, ...editing } : g))
    );
    setEditing(null);
  };

  const status = (g: Game) => (g.inStock ? "In Stock" : "Out of Stock");

  const content = useMemo(() => {
    if (loading) return <div className="hint">Loading…</div>;
    if (error)   return <div className="error">⚠ {error}</div>;

    return (
      <div className="grid">
        {games.map((g) => {
          const isEditing = editing?.id === g.id;
          return (
            <div key={g.id} className="card">
              {!isEditing ? (
                <>
                  <div className="name">{g.name}</div>
                  <div className={`badge ${g.inStock ? "ok" : "no"}`}>
                    {status(g)}
                  </div>
                  <button className="btn" onClick={() => onEdit(g)}>
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <input
                    className="input"
                    value={editing.name}
                    onChange={(e) => onChangeName(e.target.value)}
                  />
                  <label className="check">
                    <input
                      type="checkbox"
                      checked={editing.inStock}
                      onChange={(e) => onChangeStock(e.target.checked)}
                    />
                    <span>In stock</span>
                  </label>
                  <button className="btn primary" onClick={onSave}>
                    Save
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }, [loading, error, games, editing]);

  return (
    <main className="wrap">
      <h1>Games</h1>
      {content}
    </main>
  );
}
