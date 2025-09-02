export type Game = { id: number; name: string; inStock: boolean };

const randomBoolean70 = () => Math.random() < 0.7;

export const fetchGames = (): Promise<Game[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomBoolean70()) {
        resolve([
          { id: 1, name: "Mario",          inStock: true  },
          { id: 2, name: "Crash Bandicoot", inStock: true  },
          { id: 3, name: "Mega Man",       inStock: false },
          { id: 4, name: "Pokemon",        inStock: true  },
          { id: 5, name: "Sonic",          inStock: false },
          { id: 6, name: "Rayman",         inStock: true  },
          { id: 7, name: "Donkey Kong",    inStock: true  },
        ]);
      } else {
        reject(new Error("Games could not be fetched"));
      }
    }, 1000);
  });