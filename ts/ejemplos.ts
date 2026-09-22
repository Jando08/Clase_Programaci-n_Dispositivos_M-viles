function printStatusCode(code: string | number) {
  console.log(`My status code is ${code}.`)
}

printStatusCode(404);
printStatusCode('404');

// FUNCIONES EN TYPESCRIPT
function printHello(): void {
  console.log('Hello!');
}

printHello();

function multiply(a: number, b: number) {
  return a * b;
}

multiply(5, 6);

// CASTING
let x: unknown = 'hello';

console.log((x as string).length);

let y: unknown = 'hello2';
console.log((<string>y).length);

// CLASSES
class Person {
  // name is a private member variable
  public constructor(private name: string) {}

  public getName(): string {
    return this.name;
  }
}

const person = new Person("Jane");
console.log(person.getName());

interface Shape {
  getArea: () => number;
}

class Rectangle implements Shape {
  public constructor(protected readonly width: number, protected readonly height: number) {}

  public getArea(): number {
    return this.width * this.height;
  }
}

//BASIC GENERICS
class NamedValue<T> {
  private _value: T | undefined;

  constructor(private name: string) {}

  public setValue(value: T) {
    this._value = value;
  }

  public getValue(): T | undefined {
    return this._value;
  }

  public toString(): string {
    return `${this.name}: ${this._value}`;
  }
}

let value = new NamedValue<number>('myNumber');
value.setValue(10);
console.log(value.toString()); // myNumber: 10

// UTILITY TYPES
interface Point {
  x: number;
  y: number;
}

let pointPart: Partial<Point> = {}; // `Partial` allows x and y to be optional
pointPart.x = 10;

interface Car {
  make: string;
  model: string;
  mileage?: number;
}

let myCar: Required<Car> = {
  make: 'Ford',
  model: 'Focus',
  mileage: 12000 // `Required` forces mileage to be defined
};

// Recordes un atajo para definir un tipo de objeto con un tipo de clave y un tipo de valor específicos.
const nameAgeMap: Record<string, number> = {
  'Alice': 21,
  'Bob': 25
};

// Omit elimina claves de un tipo de objeto.
interface User {
  name: string;
  age: number;
  location?: string;
}

const bobOmit: Omit<User, 'age' | 'location'> = {
  name: 'Bob'
  // `Omit` has removed age and location from the type and they can't be defined here
};

// Pick elimina todas las claves excepto las especificadas de un tipo de objeto.
interface User {
  name: string;
  age: number;
  location?: string;
}

const bobPick: Pick<User, 'name'> = {
  name: 'Bob'
  // `Pick` has only kept name, so age and location were removed from the type and they can't be defined here
};

// Exclude elimina tipos de una unión.
type Primitive = string | number | boolean
const excluded: Exclude<Primitive, string> = true; // a string cannot be used here since Exclude removed it from the type.

// ReturnType extrae el tipo de retorno de un tipo de función.
type PointGenerator = () => { x: number; y: number; };
const pointReturn: ReturnType<PointGenerator> = {
  x: 10,
  y: 20
};

// Parameters extrae los tipos de parámetros de un tipo de función como una matriz.
type PointPrinter = (p: { x: number; y: number; }) => void;
const pointParams: Parameters<PointPrinter>[0] = {
  x: 10,
  y: 20
};

// Readonly se utiliza para crear un nuevo tipo donde todas las propiedades son de solo lectura, lo que significa que no se pueden modificar una vez que se les asigna un valor.
interface User {
  name: string;
  age: number;
}
const readonlyPerson: Readonly<User> = {
  name: "Dylan",
  age: 35,
};
// readonlyPerson.name = 'Israel'; // error TS2540: Cannot assign to 'name' because it is a read-only property.

// KEYOF

// keyof es una palabra clave en TypeScript que se utiliza para extraer el tipo de clave de un tipo de objeto.
interface User {
  name: string;
  age: number;
}
// `keyof User` here creates a union type of "name" and "age", other strings will not be allowed
function printPersonProperty(person: User, property: keyof User) {
  console.log(`Printing person property ${property}: "${person[property]}"`);
}
let somePerson = {
  name: "Max",
  age: 27
};
printPersonProperty(somePerson, "name"); // Printing person property name: "Max"

// keyof También se puede utilizar con firmas de índice para extraer el tipo de índice.
type StringMap = { [key: string]: unknown };
// `keyof StringMap` resolves to `string` here
function createStringPair(property: keyof StringMap, value: string): StringMap {
  return { [property]: value };
}

// NULL & UNDEFINED

// null y undefined son tipos primitivos y pueden usarse como otros tipos, comostring .
let maybeValue: string | undefined | null = null;
maybeValue = 'hello';
maybeValue = undefined;

let array: number[] = [1, 2, 3];
let firstNumber = array[0]; // with `noUncheckedIndexedAccess` this has the type `number | undefined`

// DEFINITELY TYPED
// npm install --save-dev @types/jquery

// 5.x UPDATES

// Template Literal Types Ahora nos permite crear tipos más precisos utilizando literales de plantilla.
type Color = "red" | "green" | "blue";
type HexColor<T extends Color> = `#${string}`;

// Usage:
let myColor: HexColor<"blue"> = "#0000FF";

// Index Signature Labels nos permite etiquetar firmas de índice utilizando nombres de propiedades calculados.
type DynamicObject = { [key: `dynamic_${string}`]: string };

// Usage:
let obj: DynamicObject = { dynamic_key: "value" };

// CONFIGURACION DE TYPESCRIPT
// El tsconfig.json archivo es el corazón de cada proyecto TypeScript.
// {
//   "compilerOptions": {
//     "target": "es6",
//     "module": "commonjs"
//   },
//   "include": ["src/**/*"]
// }
//
// {
//   "compilerOptions": {
//     "target": "es2020",
//     "module": "esnext",
//     "strict": true,
//     "baseUrl": ".",
//     "paths": {
//       "@app/*": ["src/app/*"]
//     },
//     "outDir": "dist",
//     "esModuleInterop": true
//   },
//   "include": ["src"],
//   "exclude": ["node_modules", "dist"]
// }

// para generar un archivo de configuracion se usa
// tsc --init

//TYPESCRIPT WITH REACT

// Create a new React + TypeScript app with Vite:
//npm create vite@latest my-app -- --template react-ts
//cd my-app
//npm install
//npm run dev

// Los ejemplos de abajo son JSX/TSX y solo compilan en un archivo .tsx
// dentro de un proyecto que tenga React instalado.

// Component Typing
// Greeting.tsx
// type GreetingProps = {
//   name: string;
//   age?: number;
// };
//
// export function Greeting({ name, age }: GreetingProps) {
//   return (
//     <div>
//       <h2>Hello, {name}!</h2>
//       {age !== undefined && <p>You are {age} years old</p>}
//     </div>
//   );
// }
//
// // Common Patterns
// // Input change
// function NameInput() {
//   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
//     console.log(e.target.value);
//   }
//   return <input onChange={handleChange} />;
// }
//
// // Button click
// function SaveButton() {
//   function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
//     e.preventDefault();
//   }
//   return <button onClick={handleClick}>Save</button>;
// }
//
// // Typing State with useState
// const [count, setCount] = React.useState<number>(0);
// const [status, setStatus] = React.useState<'idle' | 'loading' | 'error'>('idle');
//
// type User = { id: string; name: string };
// const [user, setUser] = React.useState<User | null>(null);
//
// // Minimal Context and Custom Hook
// type Theme = 'light' | 'dark';
// const ThemeContext = React.createContext<{ theme: Theme; toggle(): void } | null>(null);
//
// function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const [theme, setTheme] = React.useState<Theme>('light');
//   const value = { theme, toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light')) };
//   return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
// }
//
// function useTheme() {
//   const ctx = React.useContext(ThemeContext);
//   if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
//   return ctx;
// }

// TOOLING

// Linting with ESLint
// Install ESLint and the official TypeScript plugin/parser so ESLint can understand TypeScript syntax and rules.

// # Install ESLint with TypeScript support
//npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

// Configuration
//This configuration enables recommended ESLint rules for TypeScript, connects ESLint to your tsconfig for type-aware linting, and tweaks a few common rules.
// .eslintrc.json
// {
//   "root": true,
//   "parser": "@typescript-eslint/parser",
//   "plugins": ["@typescript-eslint"],
//   "extends": [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:@typescript-eslint/recommended-requiring-type-checking"
//   ],
//   "parserOptions": {
//     "project": "./tsconfig.json",
//     "ecmaVersion": 2020,
//     "sourceType": "module"
//   },
//   "rules": {
//     "@typescript-eslint/explicit-function-return-type": "warn",
//     "@typescript-eslint/no-explicit-any": "warn",
//     "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
//   }
// }

// NPM Scripts
//Add scripts to run linting and a type-only check.

//Use lint:fix to auto-fix simple issues.
// package.json
// {
//   "scripts": {
//     "lint": "eslint . --ext .ts,.tsx",
//     "lint:fix": "eslint . --ext .ts,.tsx --fix",
//     "type-check": "tsc --noEmit"
//   }
// }

//Code Formatting with Prettier
//Prettier enforces a consistent code style across your team.

//Combine it with ESLint to avoid formatting-related lint errors.

//Installation
//Install Prettier plus ESLint plugins that disable conflicting rules and surface formatting issues via ESLint.

// ADVANCED TYPES
// Basic Mapped Type
// Transform every property of an object type into a new type using a single template.
// Convert all properties to boolean
type Flags<T> = {
  [K in keyof T]: boolean;
};

interface Account {
  id: number;
  name: string;
  email: string;
}

type AccountFlags = Flags<Account>;
// Equivalent to:
// {
//   id: boolean;
//   name: boolean;
//   email: boolean;
// }

// Mapped Type Modifiers
// Add or remove property modifiers like readonly and ? across all keys.
// Make all properties optional
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type OptionalTodo = {
  [K in keyof Todo]?: Todo[K];
};

// Remove 'readonly' and '?' modifiers
type Concrete<T> = {
  -readonly [K in keyof T]-?: T[K];
};

// Add 'readonly' and 'required' to all properties
type ReadonlyRequired<T> = {
  +readonly [K in keyof T]-?: T[K];
};

// Key Remapping: Rename or filter keys while mapping using as, string helpers, and conditional checks.
// Add prefix to all property names
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<Account>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
// }

// Filter out properties
type MethodsOnly<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

// Conditional Types: Conditional types allow you to define types that depend on a condition.

//Basic Conditional Types: Select between types based on a condition checked at the type level.
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;    // true
type B = IsString<number>;    // false
type C = IsString<'hello'>;    // true
type D = IsString<string | number>; // boolean

// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type Numbers = ArrayElement<number[]>; // number

// Infer Keyword: Capture a part of a type within a conditional type by introducing a new type variable with infer.
// Get return type of a function
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// Get parameter types as a tuple
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

// Get constructor parameter types
type MyConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

// Get instance type from a constructor
type MyInstanceType<T extends new (...args: any) => any> =
  T extends new (...args: any) => infer R ? R : any;

//Distributed Conditional Types: Understand how conditionals distribute over unions versus when they are wrapped to prevent distribution.  
// Without distribution
type ToArrayNonDist<T> = T extends any ? T[] : never;
type StrOrNumArr = ToArrayNonDist<string | number>; // (string | number)[]

// With distribution
type ToArray<T> = [T] extends [any] ? T[] : never;
type StrOrNumArr2 = ToArray<string | number>; // string[] | number[]

// Filter out non-string types
type FilterStrings<T> = T extends string ? T : never;
type Letters = FilterStrings<'a' | 'b' | 1 | 2 | 'c'>; // 'a' | 'b' | 'c'

// Template Literal Types: Template literal types allow you to build types using template literal syntax.

//Basic Template Literal Types: Constrain strings to specific patterns using template literals and unions.
type Greeting = `Hello, ${string}`;

const validGreeting: Greeting = 'Hello, World!';
// const invalidGreeting: Greeting = 'Hi there!'; // Error

// With unions
type ColorName = 'red' | 'green' | 'blue';
type Size = 'small' | 'medium' | 'large';

type Style = `${ColorName}-${Size}`;
// 'red-small' | 'red-medium' | 'red-large' |
// 'green-small' | 'green-medium' | 'green-large' |
// 'blue-small' | 'blue-medium' | 'blue-large'

//String Manipulation Types: Apply built-in helpers to transform string literal types (uppercasing, capitalizing, etc.).
// Built-in string manipulation types
type T1 = Uppercase<'hello'>;  // 'HELLO'
type T2 = Lowercase<'WORLD'>;  // 'world'
type T3 = Capitalize<'typescript'>;  // 'Typescript'
type T4 = Uncapitalize<'TypeScript'>;  // 'typeScript'

// Create an event handler type
type EventType = 'click' | 'change' | 'keydown';
type EventHandler = `on${Capitalize<EventType>}`;
// 'onClick' | 'onChange' | 'onKeydown'

// Advanced Patterns: Compose templates with inference and key remapping to extract metadata and generate APIs.
// Extract route parameters
type ExtractRouteParams<T> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<`${Rest}`>]: string }
    : T extends `${string}:${infer Param}`
    ? { [K in Param]: string }
    : {};

type Params = ExtractRouteParams<'/users/:userId/posts/:postId'>;
// { userId: string; postId: string; }

// Create a type-safe event emitter
type EventMap = {
  click: { x: number; y: number };
  change: string;
  keydown: { key: string; code: number };
};

type EventHandlers = {
  [K in keyof EventMap as `on${Capitalize<K>}`]: (event: EventMap[K]) => void;
};

// TYPE GUARDS

// typeof Type Guards
//The typeof operator is a built-in type guard that checks the type of a primitive value at runtime.

//It's particularly useful for narrowing primitive types like strings, numbers, booleans, etc.

//Basic Usage: Use typeof checks to narrow primitive unions inside conditional branches.
// Simple type guard with typeof
function formatValue(value: string | number): string {
  if (typeof value === 'string') {
    // TypeScript knows value is string here
    return value.trim().toUpperCase();
  } else {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
}

// Example usage
const result1 = formatValue('  hello  ');  // "HELLO"
const result2 = formatValue(42.1234);      // "42.12"

// The instanceof operator checks if an object is an instance of a specific class or constructor function.

//It's useful for narrowing types with custom classes or built-in objects.

//Class-based Type Guarding: Narrow unions of class instances by checking the constructor with instanceof.
class Bird {
  fly() {
    console.log("Flying...");
   }
}

class Fish {
  swim() {
    console.log("Swimming...");
   }
}

function move(animal: Bird | Fish) {
  if (animal instanceof Bird) {
    // TypeScript knows animal is Bird here
    animal.fly();
  } else {
    // TypeScript knows animal is Fish here
    animal.swim();
  }
}

//Type Predicate Functions: Return a predicate like value is Type so TypeScript narrows on the true branch.
interface Automobile {
  make: string;
  model: string;
  year: number;
  type: "automobile";
}

interface Motorcycle {
  make: string;
  model: string;
  year: number;
  type: "sport" | "cruiser";
}

// Type predicate function
function isCar(vehicle: Automobile | Motorcycle): vehicle is Automobile {
  return (vehicle as Motorcycle).type === undefined;
}

function displayVehicleInfo(vehicle: Automobile | Motorcycle) {
  console.log(`Make: ${vehicle.make}, Model: ${vehicle.model}, Year: ${vehicle.year}`);

  if (isCar(vehicle)) {
    // TypeScript knows vehicle is Car here
    console.log("This is a car");
  } else {
    // TypeScript knows vehicle is Motorcycle here
    console.log(`This is a ${vehicle.type} motorcycle`);
  }
}

// Basic Discriminated Union: Use a shared literal property (like kind) to switch and narrow to the exact variant.
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type GeoShape = Circle | Square;

function calculateArea(shape: GeoShape) {
  switch (shape.kind) {
    case "circle":
      // TypeScript knows shape is Circle here
      return Math.PI * shape.radius ** 2;
    case "square":
      // TypeScript knows shape is Square here
      return shape.sideLength ** 2;
  }
}

// The in operator checks for the existence of a property on an object.
interface Dog {
  bark(): void;
}

interface Cat {
  meow(): void;
}

function makeSound(animal: Dog | Cat) {
  if ("bark" in animal) {
    // TypeScript knows animal is Dog here
    animal.bark();
  } else {
    // TypeScript knows animal is Cat here
    animal.meow();
  }
}

// Type assertion functions are a special kind of type guard that can throw an error if the type assertion fails.
// Type assertion function
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string');
  }
}

// Type assertion function with custom error
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

// Usage
function processInput(input: unknown) {
  assertIsString(input);
  // input is now typed as string
  console.log(input.toUpperCase());
}

// With custom error
function processNumber(value: unknown): number {
  assert(typeof value === 'number', 'Value must be a number');
  // value is now typed as number
  return value * 2;
}

// ============================================================
// CONDITIONAL TYPES — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================

// Los tipos condicionales permiten crear tipos que dependen de otros tipos,
// como un if-else a nivel de tipos.
// Sintaxis: T extends U ? X : Y
// "si el tipo T es asignable a U, usa X; si no, usa Y"

// --- 1. Sintaxis básica ---
// (IsString ya lo vimos arriba; aquí los ejemplos de la página)
type Result1 = IsString<string>;   // true
type Result2 = IsString<number>;   // false
type Result3 = IsString<"hello">;  // true (los literales extienden a su tipo base)

let strCheck: IsString<string>;    // strCheck tiene tipo 'true'
let numCheck: IsString<number>;    // numCheck tiene tipo 'false'

// --- 2. Tipos condicionales con uniones (distributivos) ---
// Un condicional aplicado a una unión se distribuye sobre cada miembro.
type WsToArray<T> = T extends any ? T[] : never;
// ToArray<string | number> -> ToArray<string> | ToArray<number> -> string[] | number[]
type WsStringOrNumberArray = WsToArray<string | number>; // string[] | number[]

// Extraer tipos específicos de una unión
type WsExtractString<T> = T extends string ? T : never;
type WsStringsOnly = WsExtractString<string | number | boolean | "hello">; // string | "hello"

// --- 3. Inferencia con infer ---
// Extraer el tipo de retorno de una función (con el built-in ReturnType)
function greetW3() { return "Hello, world!"; }
function getNumberW3() { return 42; }

type WsGreetReturnType = ReturnType<typeof greetW3>;    // string
type WsNumberReturnType = ReturnType<typeof getNumberW3>; // number

// Extraer el tipo de elemento de un array (equivale a ArrayElement de arriba)
type WsElementType<T> = T extends (infer U)[] ? U : never;
type WsNumberArrayElement = WsElementType<number[]>; // number
type WsStringArrayElement = WsElementType<string[]>; // string

// --- 4. Tipos condicionales integrados (built-in) ---
// Extract<T, U>: toma de T solo los tipos asignables a U
type WsOnlyStrings = Extract<string | number | boolean, string>; // string
// Exclude<T, U>: quita de T los tipos asignables a U
type WsNoStrings = Exclude<string | number | boolean, string>;   // number | boolean
// NonNullable<T>: quita null y undefined
type WsNotNull = NonNullable<string | null | undefined>;         // string
// Parameters<T>: tipos de parámetros de una función
type WsParams = Parameters<(a: string, b: number) => void>;      // [string, number]
// ReturnType<T>: tipo de retorno de una función
type WsReturn = ReturnType<() => string>;                        // string

// --- 5. Tipos condicionales recursivos ---
// Desenvolver Promises anidadas
type UnwrapPromise<T> = T extends Promise<infer U> ? UnwrapPromise<U> : T;
type WsA = UnwrapPromise<Promise<string>>;            // string
type WsB = UnwrapPromise<Promise<Promise<number>>>;   // number
type WsC = UnwrapPromise<boolean>;                    // boolean

// --- 6. Cadenas if-else a nivel de tipo ---
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "function" :
  "object";

type WsT0 = TypeName<string>;        // "string"
type WsT1 = TypeName<42>;            // "number"
type WsT2 = TypeName<true>;          // "boolean"
type WsT3 = TypeName<() => void>;    // "function"
type WsT4 = TypeName<Date[]>;        // "object"

// --- 7. Caso práctico: función que devuelve un tipo distinto según la entrada ---
function processValue<T>(value: T): T extends string
  ? string
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : never {
  if (typeof value === "string") {
    return value.toUpperCase() as any; // as any necesario por limitaciones del compilador
  } else if (typeof value === "number") {
    return (value * 2) as any;
  } else if (typeof value === "boolean") {
    return (!value) as any;
  } else {
    throw new Error("Unsupported type");
  }
}

const WsStringResult = processValue("hello"); // Retorna "HELLO" (type: string)
const WsNumberResult = processValue(10);      // Retorna 20 (type: number)
const WsBoolResult = processValue(true);      // Retorna false (type: boolean)

// ============================================================
// MAPPED TYPES — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================

// Los mapped types permiten crear nuevos tipos transformando las propiedades
// de tipos existentes.
// Sintaxis básica: { [P in K]: T }
//   P = nombre de la propiedad que se itera
//   K = unión de nombres de propiedad sobre los que iterar
//   T = tipo resultante de cada propiedad

// --- 1. Sintaxis básica de un mapped type ---
interface Employee {
  name: string;
  age: number;
  email: string;
}

// Hacer todas las propiedades opcionales
type PartialEmployee = {
  [P in keyof Employee]?: Employee[P];
};

// Uso
const partialEmployee: PartialEmployee = {
  name: "John"
  // age y email son opcionales
};

// Hacer todas las propiedades de solo lectura
type ReadonlyEmployee = {
  readonly [P in keyof Employee]: Employee[P];
};

// Uso
const readonlyEmployee: ReadonlyEmployee = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};
// readonlyEmployee.age = 31; // Error: Cannot assign to 'age' because it is a read-only property

// --- 2. Mapped types integrados (built-in) ---
interface Member {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Partial<T> - Hace todas las propiedades opcionales
type PartialMember = Partial<Member>;
// Equivale a: { id?: number; name?: string; email?: string; isAdmin?: boolean; }

// Required<T> - Hace todas las propiedades obligatorias
type RequiredMember = Required<Partial<Member>>;
// Equivale a: { id: number; name: string; email: string; isAdmin: boolean; }

// Readonly<T> - Hace todas las propiedades de solo lectura
type ReadonlyMember = Readonly<Member>;
// Equivale a: { readonly id: number; readonly name: string; ... }

// Pick<T, K> - Crea un tipo con un subconjunto de propiedades de T
type MemberCredentials = Pick<Member, "email" | "id">;
// Equivale a: { email: string; id: number; }

// Omit<T, K> - Crea un tipo quitando las propiedades indicadas de T
type PublicMember = Omit<Member, "id" | "isAdmin">;
// Equivale a: { name: string; email: string; }

// Record<K, T> - Crea un tipo con claves y tipos de valor especificados
type MemberRoles = Record<"admin" | "user" | "guest", string>;
// Equivale a: { admin: string; user: string; guest: string; }

// --- 3. Creando mapped types personalizados ---
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// Convertir todas las propiedades a tipo string
type StringifyProperties<T> = {
  [P in keyof T]: string;
};

type StringProduct = StringifyProperties<Product>;
// Equivale a: { id: string; name: string; price: string; inStock: string; }

// Añadir funciones de validación para cada propiedad
type Validator<T> = {
  [P in keyof T]: (value: T[P]) => boolean;
};

const productValidator: Validator<Product> = {
  id: (id) => id > 0,
  name: (name) => name.length > 0,
  price: (price) => price >= 0,
  inStock: (inStock) => typeof inStock === "boolean"
};

// --- 4. Modificando los modificadores de las propiedades ---
interface Configuration {
  readonly apiKey: string;
  readonly apiUrl: string;
  timeout?: number;
  retries?: number;
}

// Quitar el modificador readonly de todas las propiedades
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type MutableConfig = Mutable<Configuration>;
// Equivale a: { apiKey: string; apiUrl: string; timeout?: number; retries?: number; }

// Hacer obligatorias todas las propiedades opcionales
type RequiredProps<T> = {
  [P in keyof T]-?: T[P];
};

type RequiredConfig = RequiredProps<Configuration>;
// Equivale a: { readonly apiKey: string; readonly apiUrl: string; timeout: number; retries: number; }

// --- 5. Mapped types avanzados combinados con conditional types ---
interface ApiResponse {
  data: unknown;
  status: number;
  message: string;
  timestamp: number;
}

// Convertir cada propiedad numérica a un string con formato
type FormattedResponse<T> = {
  [P in keyof T]: T[P] extends number ? string : T[P];
};

type FormattedApiResponse = FormattedResponse<ApiResponse>;
// Equivale a: { data: unknown; status: string; message: string; timestamp: string; }

// Filtrar solo las propiedades de tipo string (usando key remapping con `as`)
type StringPropsOnly<T> = {
  [P in keyof T as T[P] extends string ? P : never]: T[P];
};

type ApiResponseStringProps = StringPropsOnly<ApiResponse>;
// Equivale a: { message: string; }

// ============================================================
// TYPE INFERENCE — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================

// Type inference es la capacidad de TypeScript de determinar automáticamente
// los tipos de variables, retornos de funciones y expresiones según su uso,
// sin necesidad de anotaciones explícitas.

// --- 1. Inferencia básica de tipos ---
let personName = "Alice";     // inferido como string
let age = 30;           // inferido como number
let isActive = true;    // inferido como boolean
let numList = [1, 2, 3]; // inferido como number[]
let mixed = [1, "two", true]; // inferido como (string | number | boolean)[]

personName.toUpperCase();    // Funciona porque personName es string
age.toFixed(2);        // Funciona porque age es number
// personName.toFixed(2);    // Error: Property 'toFixed' does not exist on type 'string'

// --- 2. Inferencia del tipo de retorno de funciones ---
function greet(personName: string) {
  return `Hello, ${personName}!`;  // tipo de retorno inferido como string
}

function addNumbers(a: number, b: number) {
  return a + b;              // tipo de retorno inferido como number
}

function getValue(key: string) {
  if (key === "name") {
    return "Alice";          // string
  } else {
    return 42;               // number
  }
}                            // tipo de retorno inferido como string | number

let greeting = greet("Bob");   // inferido como string
let sum = addNumbers(5, 3);    // inferido como number
let inferredValue = getValue("age"); // inferido como string | number

// --- 3. Contextual typing (tipado contextual) ---
// El tipo del parámetro del callback se infiere del contexto del método de array
const nameList = ["Alice", "Bob", "Charlie"];

// El parámetro se infiere como string
nameList.forEach(n => {
  console.log(n.toUpperCase());
});

// El parámetro es string y el retorno se infiere como number
const nameLengths = nameList.map(n => {
  return n.length;
});
// nameLengths es inferido como number[]

// Los tipos de parámetros en event handlers también se infieren
document.addEventListener("click", (event: MouseEvent) => {
  // 'event' se infiere/anota como MouseEvent
  console.log(event.clientX, event.clientY);
});

// --- 4. Inferencia en object literals ---
const userObject = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  active: true,
  details: {
    age: 30,
    address: {
      city: "New York",
      country: "USA"
    }
  }
};

console.log(userObject.name.toUpperCase());
console.log(userObject.details.age.toFixed(0));
console.log(userObject.details.address.city.toLowerCase());

// Type errors would be caught
// console.log(userObject.age); // Error
// console.log(userObject.details.name); // Error
// console.log(userObject.details.address.zip); // Error

// --- 5. Const assertions ---
let widenedName = "Alice";  // tipo: string (widening)

const nameConst = "Alice" as const; // tipo: "Alice" (literal)

const userConst = {
  id: 1,
  name: "Alice",
  roles: ["admin", "user"] as const // tupla readonly
} as const;
// userConst.name = "Bob"; // Error: Cannot assign to 'name' because it is a read-only property

// --- 6. Type guards y control flow analysis ---
function processValueNarrow(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // el tipo se estrecha a string aquí
  } else {
    console.log(value.toFixed(2));    // el tipo se estrecha a number aquí
  }
}

// Uniones discriminadas (reutilizando Circle, Square y GeoShape de arriba)
function area(shape: GeoShape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
  }
}

// --- 7. Buenas prácticas ---
// 1. Dejar que TS infiera tipos simples
let messageText = "Hello"; // Bien: no hace falta anotación explícita

// 2. Anotar explícitamente los parámetros de funciones
function formatName(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`;
}

// 3. Añadir anotación de retorno en funciones complejas
function processData(input: string[]): { count: number; items: string[] } {
  return {
    count: input.length,
    items: input.map(item => item.trim())
  };
}

// 4. Usar anotaciones explícitas para arrays/objetos vacíos
const emptyArray: string[] = []; // sin anotación se inferiría como any[]
const configOptions: Record<string, unknown> = {}; // sin anotación se inferiría como {}

// 5. Usar type assertions cuando TS no puede inferir correctamente
const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;

// 6. Buenas prácticas de rendimiento: tipos explícitos en valores complejos
const emptyItems: Array<{ id: number; name: string }> = [];
const appConfig: {
  apiUrl: string;
  retries: number;
  timeout: number;
} = {
  apiUrl: "https://api.example.com",
  retries: 3,
  timeout: 5000
};

