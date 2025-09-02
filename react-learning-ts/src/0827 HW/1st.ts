/* =========================
   EXERCISE 1
   Deep clone vs Shallow clone
   a. Explain how changing values in a shallow copied object will reflect changes in the original object
   b. How to do shallow clone
   c. How to do deep clone
========================= */

type GameDepartment = { name: string };
type GameEmployee = {
  id: number;
  name: string;
  department: GameDepartment;
};

const gameEmployee1: GameEmployee = {
  id: 1,
  name: "Andrew",
  department: { name: "energy" },
};

// Shallow clone
const shallow1 = { ...gameEmployee1 };
shallow1.department.name = "vehicle";
console.log("Original after shallow clone change:", gameEmployee1.department.name);
// Expected: "vehicle"

// Deep clone
const deep1 = structuredClone(gameEmployee1);
deep1.department.name = "energy-storage";
console.log("Original after deep clone change:", gameEmployee1.department.name);
// Expected: "vehicle"

/* =========================
   EXERCISE 2
   Remove duplicate gameEmployees (same id) 
   and sort by id in ascending order
========================= */


const gameEmployee2: (GameEmployee | null)[] = [
  { id: 1, name: "Andrew", department: { name: "energy" } },
  { id: 2, name: "Lucas",  department: { name: "energy" } },
  { id: 1, name: "Andrew", department: { name: "energy" } }, // duplicate
  { id: 3, name: "Seven",  department: { name: "vehicle" } },
];

function dedupeAndSortById(list: (GameEmployee | null)[]): GameEmployee[] {
  const seen = new Set<number>();
  const out: GameEmployee[] = [];
  for (const item of list) {
    if (!item) continue;
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  out.sort((a, b) => a.id - b.id);
  return out;
}

const result = dedupeAndSortById(gameEmployee2);
console.log(result);

/* ===== Expected Output =====
[
  { id: 1, name: "Andrew", department: { name: "energy" } },
  { id: 2, name: "Lucas",  department: { name: "energy" } },
  { id: 3, name: "Seven",  department: { name: "vehicle" } }
]
============================== */





/* =========================
   EXERCISE 3
   Given an object containing sensitive information and a list of keys,
   mask the sensitive data with asterisks ('*') matching the string length
========================= */

type GameEmployee3 = {
  id: number;
  name: string;
  email: string;
  ssn: string;
  department: { name: string };
};

const gameEmployee: GameEmployee3 = {
  id: 1,
  name: "Andrew",
  email: "andrew@tesla.com",
  ssn: "123-45-6789",
  department: { name: "energy" },
};

function maskSensitive<T extends Record<string, any>>(
  obj: T,
  keys: (keyof T)[]
): T {
  const cloned = structuredClone(obj) as T;
  for (const key of keys) {
    const val = cloned[key];
    if (typeof val === "string") {
      (cloned as any)[key] = "*".repeat(val.length);
    } else if (val != null && typeof val === "object") {
      (cloned as any)[key] = maskDeep(val);
    }
  }
  return cloned;
}

function maskDeep(value: any): any {
  if (value == null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(maskDeep);
  const out: any = {};
  for (const k of Object.keys(value)) {
    const v = value[k];
    out[k] =
      typeof v === "string" ? "*".repeat(v.length) : maskDeep(v);
  }
  return out;
}

const masked = maskSensitive(gameEmployee, ["email", "ssn", "department"]);
console.log(masked);

/* ===== Expected Output =====
{
  id: 1,
  name: "Andrew",
  email: "****************",
  ssn: "***********",
  department: { name: "******" }
}
============================== */

/* =========================
   EXERCISE 4
   - Create a function that returns "allowedClient" as a promise
   - Create a function that returns "sensitiveKeys" as a promise
   - Create a function that:
       1) fetches both via those functions
       2) takes the masking function from EXERCISE 3 as a callback
   Output -> { id: 1, password: '***', secret: '***' }
========================= */
{
  type AllowedClient = { id: number; password: string; secret: string };

  const getAllowedClient = (): Promise<AllowedClient> =>
    Promise.resolve({ id: 1, password: "123", secret: "abcd" });

  const getSensitiveKeys = (): Promise<(keyof AllowedClient)[]> =>
    Promise.resolve(["password", "secret"]);

  function maskSensitive<T extends Record<string, any>>(
    obj: T,
    keys: (keyof T)[]
  ): T {
    const cloned = structuredClone(obj) as T;
    for (const key of keys) {
      const val = cloned[key];
      if (typeof val === "string") {
        (cloned as any)[key] = "*".repeat(val.length);
      } else if (val != null && typeof val === "object") {
        (cloned as any)[key] = maskDeep(val);
      }
    }
    return cloned;
  }

  function maskDeep(value: any): any {
    if (value == null || typeof value !== "object") return value;
    if (Array.isArray(value)) return value.map(maskDeep);
    const out: any = {};
    for (const k of Object.keys(value)) {
      const v = (value as any)[k];
      out[k] = typeof v === "string" ? "*".repeat(v.length) : maskDeep(v);
    }
    return out;
  }

  async function runExercise4(
    maskFn: <T extends Record<string, any>>(
      obj: T,
      keys: (keyof T)[]
    ) => T
  ) {
    const [client, keys] = await Promise.all([
      getAllowedClient(),
      getSensitiveKeys(),
    ]);
    return maskFn(client, keys);
  }

  (async () => {
    const result = await runExercise4(maskSensitive);
    console.log(result);
  })();

  /* ===== Expected Output =====
  { id: 1, password: '***', secret: '****' }
  ============================== */
}

