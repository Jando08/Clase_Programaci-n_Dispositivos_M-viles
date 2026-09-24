/// <reference lib="es2018.asynciterable" />
/// <reference lib="es2018.asyncgenerator" />
/// <reference lib="es2020.promise" />

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

// ============================================================
// NAMESPACES — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================

// Los namespaces (antes "internal modules") organizan código y evitan
// conflictos de nombres creando un contenedor para funcionalidad relacionada.
// Nota: los proyectos modernos usan ES modules (import/export); los namespaces
// sirven para código legacy, librerías globales o merging de declaraciones.

// --- 1. Sintaxis básica de un namespace ---
namespace Validation {
  // Todo lo de dentro pertenece al namespace Validation

  // Se exporta lo que se quiere usar fuera del namespace
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  // Esto es privado del namespace (no exportado)
  const lettersRegexp = /^[A-Za-z]+$/;

  // Clase exportada - disponible fuera del namespace
  export class LettersValidator implements StringValidator {
    isValid(s: string): boolean {
      return lettersRegexp.test(s);
    }
  }

  // Otra clase exportada
  export class ZipCodeValidator implements StringValidator {
    isValid(s: string): boolean {
      return /^[0-9]+$/.test(s) && s.length === 5;
    }
  }
}

// Usando los miembros del namespace
let letterValidator = new Validation.LettersValidator();
let zipCodeValidator = new Validation.ZipCodeValidator();

console.log(letterValidator.isValid("Hello"));     // true
console.log(letterValidator.isValid("Hello123"));  // false

console.log(zipCodeValidator.isValid("12345"));    // true
console.log(zipCodeValidator.isValid("1234"));     // false - longitud incorrecta

// --- 2. Namespaces anidados ---
namespace App {
  export namespace Utils {
    export function log(msg: string): void {
      console.log(`[LOG]: ${msg}`);
    }

    export function error(msg: string): void {
      console.error(`[ERROR]: ${msg}`);
    }
  }

  export namespace Models {
    export interface User {
      id: number;
      name: string;
      email: string;
    }

    export class UserService {
      getUser(id: number): User {
        return { id, name: "John Doe", email: "john@example.com" };
      }
    }
  }
}

// Usando namespaces anidados
App.Utils.log("Application starting");

const userService = new App.Models.UserService();
const userInstance = userService.getUser(1);

App.Utils.log(`User loaded: ${userInstance.name}`);

// Esto sería un error de tipos en TypeScript
// App.log("directly accessing log"); // Error - log no es miembro directo de App

// --- 3. Alias de namespaces ---
namespace VeryLongNamespace {
  export namespace DeeplyNested {
    export namespace Components {
      export class Button {
        display(): void {
          console.log("Button displayed");
        }
      }
      export class TextField {
        display(): void {
          console.log("TextField displayed");
        }
      }
    }
  }
}

// Sin alias - muy verboso
const button1 = new VeryLongNamespace.DeeplyNested.Components.Button();
button1.display();

// Con alias de namespace
import Components = VeryLongNamespace.DeeplyNested.Components;
const button2 = new Components.Button();
button2.display();

// Con alias de miembro específico
import nsButton = VeryLongNamespace.DeeplyNested.Components.Button;
const button3 = new nsButton();
button3.display();

// --- 4. Namespaces en varios archivos (concepto) ---
// Se pueden dividir usando comentarios de referencia y combinarse al compilar:
//
// // validators.ts
// namespace Validation {
//   export interface StringValidator {
//     isValid(s: string): boolean;
//   }
// }
//
// // letters-validator.ts
// /// <reference path="validators.ts" />
// namespace Validation {
//   const lettersRegexp = /^[A-Za-z]+$/;
//   export class LettersValidator implements StringValidator {
//     isValid(s: string): boolean {
//       return lettersRegexp.test(s);
//     }
//   }
// }
//
// // zipcode-validator.ts
// /// <reference path="validators.ts" />
// namespace Validation {
//   const zipCodeRegexp = /^[0-9]+$/;
//   export class ZipCodeValidator implements StringValidator {
//     isValid(s: string): boolean {
//       return zipCodeRegexp.test(s) && s.length === 5;
//     }
//   }
// }
//
// // Compilar todo a un solo archivo:
// // tsc --outFile sample.js main.ts

// --- 5. Namespaces vs ES modules ---
// Modules: enfoque preferido en apps modernas (import/export, tree-shaking).
// Namespaces: útiles para libs globales, código legacy y declaration merging.
// Mejores prácticas:
//  - Usar nombres de jerárquicos y significativos
//  - Exportar solo lo necesario
//  - No crear más de 2-3 niveles de anidamiento
//  - Preferir modules en proyectos nuevos

// --- 6. Patrones avanzados: augmentación con declare namespace ---
// Los nombres del ejemplo requieren @types/express (por eso va comentado el uso)
declare namespace Express {
  interface Request {
    user?: { id: number; name: string };
  }
  interface Response {
    json(data: any): void;
  }
}

// Más tarde, se puede aumentar el namespace (por ejemplo en un archivo .d.ts)
declare namespace Express {
  // Aumentar la interfaz Request con propiedades/métodos nuevos
  interface Request {
    requestTime?: number;
    log(message: string): void;
  }

  // Añadir nuevos tipos
  interface UserSession {
    userId: number;
    expires: Date;
  }
}

// Uso en la aplicación (requiere express):
// const app = express();
// app.use((req: Express.Request, res: Express.Response, next) => {
//   req.requestTime = Date.now();
//   req.log('Request started');
//   next();
// });

// --- 7. Namespaces con genéricos ---
namespace DataStorage {
  export interface Repository<T> {
    getAll(): T[];
    getById(id: number): T | undefined;
    add(item: T): void;
    update(id: number, item: T): boolean;
    delete(id: number): boolean;
  }

  // Implementación concreta
  export class InMemoryRepository<T> implements Repository<T> {
    private items: T[] = [];

    getAll(): T[] {
      return [...this.items];
    }

    getById(id: number): T | undefined {
      return this.items[id];
    }

    add(item: T): void {
      this.items.push(item);
    }

    update(id: number, item: T): boolean {
      if (id >= 0 && id < this.items.length) {
        this.items[id] = item;
        return true;
      }
      return false;
    }

    delete(id: number): boolean {
      if (id >= 0 && id < this.items.length) {
        this.items.splice(id, 1);
        return true;
      }
      return false;
    }
  }
}

// Uso (interface propia para no chocar con User ya existente en este archivo)
interface RepositoryUser {
  id: number;
  name: string;
  email: string;
}

const userRepo = new DataStorage.InMemoryRepository<RepositoryUser>();
userRepo.add({ id: 1, name: 'John Doe', email: 'john@example.com' });
const allUsers = userRepo.getAll();

// --- 8. Migrando de namespaces a modules (concepto) ---
// Antes, con namespaces:
// namespace MyApp {
//   export namespace Services {
//     export class UserService {
//       getUser(id: number) { /* ... */ }
//     }
//   }
// }
//
// Después, con ES modules:
// // services/UserService.ts
// export class UserService {
//   getUser(id: number) { /* ... */ }
// }
//
// // app.ts
// import { UserService } from './services/UserService';
// const userService = new UserService();
//
// Pasos: convertir cada namespace en un archivo módulo, reemplazar export
// por exports de ES modules, actualizar imports y usar "module": "ESNext".

// ============================================================
// INDEX SIGNATURES — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================

// Las index signatures definen tipos para objetos con nombres de propiedad
// dinámicos: permiten tipar el acceso por corchetes `obj[key]` aunque no se
// conozcan los nombres exactos de las propiedades de antemano.
// Sintaxis básica: [key: tipo_de_clave]: tipo_de_valor

// --- 1. Index signatures de tipo string ---
// Objeto con claves string y valores string
interface StringDictionary {
  [key: string]: string;
}

// Creando un objeto que cumple el tipo
const nameDict: StringDictionary = {
  firstName: "Alice",
  lastName: "Smith",
  "100": "One Hundred"
};

// Accediendo a propiedades
console.log(nameDict["firstName"]); // "Alice"
console.log(nameDict["lastName"]);  // "Smith"
console.log(nameDict["100"]);       // "One Hundred"

// Añadiendo propiedades dinámicamente
nameDict["age"] = "30";

// Esto causaría un error
// nameDict["age"] = 30; // Error: Type 'number' is not assignable to type 'string'

// --- 2. Index signatures de tipo number ---
interface NumberDictionary {
  [index: number]: any;
}

const scores: NumberDictionary = {
  0: "Zero",
  1: 100,
  2: true
};

console.log(scores[0]); // "Zero"
console.log(scores[1]); // 100
console.log(scores[2]); // true

// Añadiendo un objeto complejo
scores[3] = { passed: true };

// Nota: en JS todas las claves de objeto se guardan como string, incluso las
// numéricas. TS distingue number/string para atrapar errores lógicos.

// --- 3. Tipos de propiedad mixtos ---
// Combinar index signatures con propiedades explícitas
interface UserInfo {
  name: string;  // Propiedad requerida con nombre específico
  age: number;   // Propiedad requerida con nombre específico
  [key: string]: string | number; // El resto deben ser string o number
}

const userInfoObj: UserInfo = {
  name: "Alice",        // Requerida
  age: 30,              // Requerida
  address: "123 Main St", // Opcional
  zipCode: 12345        // Opcional
};

// Esto causaría un error
// const invalidUser: UserInfo = {
//   name: "Bob",
//   age: "thirty", // Error: no es number
//   isAdmin: true  // Error: boolean no asignable a string | number
// };

// Importante: al combinar, los tipos explícitos deben ser asignables al tipo
// del valor de la index signature.

// --- 4. Index signatures de solo lectura ---
interface ReadOnlyStringArray {
  readonly [index: number]: string;
}

const roNames: ReadOnlyStringArray = ["Alice", "Bob", "Charlie"];

console.log(roNames[0]); // "Alice"

// Esto causaría un error
// roNames[0] = "Andrew"; // Error: only permits reading

// --- 5. Ejemplo real: manejo de respuestas de API ---
// Tipo para respuestas con claves dinámicas
interface TypedApiResponse<T> {
  data: {
    [resourceType: string]: T[]; // p. ej. { "users": ApiUser[], "posts": Post[] }
  };
  meta: {
    page: number;
    total: number;
    [key: string]: any; // Permite metadatos adicionales
  };
}

// Uso con una API de usuarios (interface propia para no chocar con User)
interface ApiUser {
  id: number;
  name: string;
  email: string;
}

// Mock de respuesta de API
const apiResponse: TypedApiResponse<ApiUser> = {
  data: {
    users: [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" }
    ]
  },
  meta: {
    page: 1,
    total: 2,
    timestamp: "2023-01-01T00:00:00Z"
  }
};

// Accediendo a los datos
const apiUsers = apiResponse.data.users;
console.log(apiUsers[0].name); // "Alice"

// --- 6. Buenas prácticas y errores comunes ---
// Hacer: usar index signatures en colecciones con claves dinámicas.
// Hacer: combinar con propiedades explícitas para campos conocidos.
// Hacer: mantener los tipos de valor específicos (evitar `any`).
// Hacer: usar readonly cuando no se necesite mutación.
// No hacer: usar index signatures cuando las claves son conocidas (interfaces fijas).
// No hacer: olvidar que TODAS las propiedades deben cumplir el tipo del índice.

// Conflicto de nombres de propiedades
// interface ConflictingTypes {
//   [key: string]: number;
//   name: string; // Error: no asignable al tipo de índice 'number'
// }

// Versión corregida
interface FixedTypes {
  [key: string]: number | string;
  name: string;  // OK
  age: number;   // OK
}

// --- 7. Index signatures vs Record<K, T> ---
// Index signature: para claves flexibles/dinámicas y mezcla con otras propiedades
interface StringIndexMap {
  [key: string]: string;
}

// Record: para mapeos simples y concisos
type StringRecord = Record<string, string>;

// ============================================================
// DECLARATION MERGING — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================

// El declaration merging permite combinar varias declaraciones con el mismo
// nombre en una sola definición. Sirve para construir tipos de forma
// incremental, extender librerías de terceros y organizar interfaces grandes.
// (Renombré Person/Validation/processValue/user para no chocar con los existentes)

// --- 1. Merging de interfaces ---
// Primera declaración
interface Customer {
  name: string;
  age: number;
}

// Segunda declaración con el mismo nombre
interface Customer {
  address: string;
  email: string;
}

// TS las fusiona en:
// interface Customer {
//   name: string;
//   age: number;
//   address: string;
//   email: string;
// }

const customerObj: Customer = {
  name: "John",
  age: 30,
  address: "123 Main St",
  email: "john@example.com"
};

console.log(customerObj);

// --- 2. Function overloads (sobrecarga de funciones) ---
// Declaraciones de sobrecarga
function processOverloaded(value: string): string;
function processOverloaded(value: number): number;
function processOverloaded(value: boolean): boolean;

// Implementación que maneja todas las sobrecargas (la más general)
function processOverloaded(value: string | number | boolean): string | number | boolean {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value * 2;
  } else {
    return !value;
  }
}

// Usando la función con distintos tipos
console.log(processOverloaded("hello")); // "HELLO"
console.log(processOverloaded(10));      // 20
console.log(processOverloaded(true));    // false

// --- 3. Merging de namespaces ---
namespace MergedValidation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }
}

namespace MergedValidation {
  export interface NumberValidator {
    isValid(n: number): boolean;
  }

  export class ZipCodeValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.length === 5 && /^\d+$/.test(s);
    }
  }
}

// Después del merge:
// namespace MergedValidation {
//   export interface StringValidator { isValid(s: string): boolean; }
//   export interface NumberValidator { isValid(n: number): boolean; }
//   export class ZipCodeValidator implements StringValidator { ... }
// }

// Usando el namespace fusionado
const zipValidator = new MergedValidation.ZipCodeValidator();

console.log(zipValidator.isValid("12345")); // true
console.log(zipValidator.isValid("1234"));  // false
console.log(zipValidator.isValid("abcde")); // false

// --- 4. Merging de clase e interfaz ---
// Declaración de interfaz
interface Cart {
  calculateTotal(): number;
}

// Declaración de clase con el mismo nombre
class Cart {
  items: { name: string; price: number }[] = [];

  addItem(name: string, price: number): void {
    this.items.push({ name, price });
  }

  // Debe implementar el método de la interfaz
  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

// Usando la clase e interfaz fusionadas
const cart = new Cart();
cart.addItem("Book", 15.99);
cart.addItem("Coffee Mug", 8.99);

console.log(`Total: $${cart.calculateTotal().toFixed(2)}`);

// --- 5. Merging de enums ---
// Primera parte del enum
enum Direction {
  North,
  South
}

// Segunda parte del enum
enum Direction {
  East = 2,
  West = 3
}

// Después del merge:
// enum Direction {
//   North = 0,
//   South = 1,
//   East = 2,
//   West = 3
// }

console.log(Direction.North); // 0
console.log(Direction.South); // 1
console.log(Direction.East);  // 2
console.log(Direction.West);  // 3

// También se puede acceder por valor (reverse mapping)
console.log(Direction[0]); // "North"
console.log(Direction[2]); // "East"

// --- 6. Module augmentation ---
// Definición original de la "librería" (simulando una librería de terceros)
declare namespace LibraryModule {
  export interface User {
    id: number;
    name: string;
  }
  export function getUser(id: number): User;
}

// Aumentando con funcionalidad adicional (tu código)
declare namespace LibraryModule {
  // Nueva interfaz
  export interface UserPreferences {
    theme: string;
    notifications: boolean;
  }

  // Nueva propiedad en la interfaz existente
  export interface User {
    preferences?: UserPreferences;
  }

  // Nueva función
  export function getUserPreferences(userId: number): UserPreferences;
}

// Usando el módulo aumentado
const libUser = LibraryModule.getUser(123);
console.log(libUser.preferences?.theme);

const userPrefs = LibraryModule.getUserPreferences(123);
console.log(userPrefs.notifications);

// --- Buenas prácticas ---
// El orden importa en las sobrecargas: la implementación debe ser la más general.
// Los miembros no-función deben ser compatibles (tipos idénticos o compatibles).
// En conflictos, la última declaración gana.
// Clases con miembros private/protected no pueden fusionar si difieren de tipo.
// Solo lo exportado es visible fuera del namespace tras el merge.

// ============================================================
// ASYNC PROGRAMMING — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================

// TypeScript mejora la programación asíncrona de JS con tipado estático.
// Promise<T>: T es el tipo del valor resuelto.
//   Promise<void> -> Promises que no devuelven valor
//   Promise<never> -> Promises que nunca se resuelven

// --- 1. Promises tipadas en TypeScript ---
// Crear una Promise tipada que resuelve a string
const fetchGreeting = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve("Hello, TypeScript!");
      } else {
        reject(new Error("Failed to fetch greeting"));
      }
    }, 1000);
  });
};

// Usando la Promise con inferencia de tipos
fetchGreeting()
  .then((greeting) => {
    // TypeScript sabe que greeting es string
    console.log(greeting.toUpperCase());
  })
  .catch((error: Error) => {
    console.error("Error:", error.message);
  });

// Estados de la Promise:
// pending -> fulfilled (con valor T)   // caso de éxito
// pending -> rejected (con razón any)  // caso de error

// --- 2. Async/Await con TypeScript ---
// Tipos de la "API"
interface AsyncUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// Función que devuelve una Promise de array de AsyncUser
async function fetchUsers(): Promise<AsyncUser[]> {
  console.log('Fetching users...');
  // Simulación de llamada a API
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' }
  ];
}

// Función async para procesar usuarios
async function processUsers() {
  try {
    // TypeScript sabe que users es AsyncUser[]
    const users = await fetchUsers();
    console.log(`Fetched ${users.length} users`);

    // Acceso a propiedades con type-safe
    const adminEmails = users
      .filter(user => user.role === 'admin')
      .map(user => user.email);

    console.log('Admin emails:', adminEmails);
    return users;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to process users:', error.message);
    } else {
      console.error('An unknown error occurred');
    }
    throw error; // Re-lanzar para que el llamador lo maneje
  }
}

// Ejecutar la función async
processUsers()
  .then(users => console.log('Processing complete'))
  .catch(err => console.error('Processing failed:', err));

// Todas las funciones async devuelven una Promise.
// async function getString(): string { } // Error: debe devolver Promise
// async function getString(): Promise<string> { } // Correcto

// --- 3. Ejecución en paralelo con Promise.all ---
interface ShopProduct {
  id: number;
  name: string;
  price: number;
}

async function fetchProduct(id: number): Promise<ShopProduct> {
  console.log(`Fetching product ${id}...`);
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
  return { id, name: `Product ${id}`, price: Math.floor(Math.random() * 100) };
}

async function fetchMultipleProducts() {
  try {
    // Inicia todas las peticiones en paralelo
    const [product1, product2, product3] = await Promise.all([
      fetchProduct(1),
      fetchProduct(2),
      fetchProduct(3)
    ]);

    const total = [product1, product2, product3]
      .reduce((sum, product) => sum + product.price, 0);
    console.log(`Total price: $${total.toFixed(2)}`);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

fetchMultipleProducts();

// --- 4. Tipar callbacks para operaciones asíncronas ---
// Tipo para el callback
type FetchCallback = (error: Error | null, data?: string) => void;

// Función que recibe un callback tipado
function fetchDataWithCallback(url: string, callback: FetchCallback): void {
  // Simular operación asíncrona
  setTimeout(() => {
    try {
      // Simular respuesta exitosa
      callback(null, "Response data");
    } catch (error) {
      callback(error instanceof Error ? error : new Error('Unknown error'));
    }
  }, 1000);
}

// Usando la función callback
fetchDataWithCallback('https://api.example.com', (error, data) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }

  // TypeScript sabe que data es string (o undefined)
  if (data) {
    console.log(data.toUpperCase());
  }
});

// --- 5. Combinaciones de Promises ---
// Promise.all() -> espera a que todas resuelvan (falla rápido si alguna rechaza)
// Promise.race() -> devuelve la primera en resolverse
// Promise.allSettled() -> espera a que todas se establezcan (éxito o fallo)
// Promise.any() -> devuelve la primera cumplida

// Promise.all - ejecución en paralelo
const fetchUser = (id: number): Promise<{ id: number; name: string }> =>
  Promise.resolve({ id, name: `User ${id}` });

const fetchPosts = (userId: number): Promise<Array<{ id: number; title: string }>> =>
  Promise.resolve([
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' }
  ]);

const fetchStats = (userId: number): Promise<{ views: number; likes: number }> =>
  Promise.resolve({ views: 100, likes: 25 });

// Ejecutar todas en paralelo
async function loadUserDashboard(userId: number) {
  try {
    const [user, posts, stats] = await Promise.all([
      fetchUser(userId),
      fetchPosts(userId),
      fetchStats(userId)
    ]);

    // TypeScript conoce los tipos de user, posts y stats
    console.log(`User: ${user.name}`);
    console.log(`Posts: ${posts.length}`);
    console.log(`Likes: ${stats.likes}`);

    return { user, posts, stats };
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    throw error;
  }
}

// Ejecutar con un ID de usuario
loadUserDashboard(1);

// Promise.race - la primera en resolverse (útil para timeouts)
const timeoutFn = (ms: number): Promise<never> =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  );

// Llamada a API simulada con timeout
async function fetchUserDataTimed<T>(
  promise: Promise<T>,
  timeoutMs: number = 5000
): Promise<T> {
  return Promise.race([
    promise,
    timeoutFn(timeoutMs).then(() => {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }),
  ]);
}

async function fetchUserTimed() {
  try {
    const response = await fetchUserDataTimed(
      fetch('https://api.example.com/user/1'),
      3000 // timeout de 3 segundos
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', (error as Error).message);
    throw error;
  }
}

// Promise.allSettled - manejar todos los resultados (éxito o fallo)
const fetchData = async (id: number) => {
  // Fallar aleatoriamente algunas peticiones
  if (Math.random() > 0.7) {
    throw new Error(`Failed to fetch data for ID ${id}`);
  }
  return { id, data: `Data for ${id}` };
};

// Procesar varios elementos con manejo de errores individual
async function processBatch(ids: number[]) {
  const promises = ids.map(id =>
    fetchData(id)
      .then(value => ({ status: 'fulfilled' as const, value }))
      .catch(reason => ({ status: 'rejected' as const, reason }))
  );

  // Esperar a que todas terminen
  const results = await Promise.allSettled(promises);

  // Procesar resultados
  const successful = results
    .filter((result): result is PromiseFulfilledResult<{ status: 'fulfilled', value: any }> =>
      result.status === 'fulfilled' &&
      result.value.status === 'fulfilled'
    )
    .map(r => r.value.value);

  const failed = results
    .filter((result): result is PromiseRejectedResult |
      PromiseFulfilledResult<{ status: 'rejected', reason: any }> => {
      if (result.status === 'rejected') return true;
      return result.value.status === 'rejected';
    });

  console.log(`Successfully processed: ${successful.length}`);
  console.log(`Failed: ${failed.length}`);

  return { successful, failed };
}

// Procesar un lote de IDs
processBatch([1, 2, 3, 4, 5]);

// --- 6. Manejo de errores en código asíncrono ---
// Clases de error personalizadas para mejor manejo de errores
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    (Error as any).captureStackTrace?.(this, this.constructor);
  }
}

// Tipos de error específicos
class NetworkError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'NETWORK_ERROR', details);
  }
}

class ValidationError extends AppError {
  constructor(
    public readonly field: string,
    message: string
  ) {
    super(message, 'VALIDATION_ERROR', { field });
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string | number) {
    super(
      `${resource} with ID ${id} not found`,
      'NOT_FOUND',
      { resource, id }
    );
  }
}

// Ejemplo de uso
async function fetchUserDataChecked(userId: string): Promise<{ id: string; name: string }> {
  try {
    // Simular llamada a API
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundError('User', userId);
      } else if (response.status >= 500) {
        throw new NetworkError('Server error', { status: response.status });
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const data = await response.json();

    // Validar la respuesta
    if (!data.name) {
      throw new ValidationError('name', 'Name is required');
    }

    return data;
  } catch (error) {
    if (error instanceof AppError) {
      // Ya es uno de nuestros errores personalizados
      throw error;
    }
    // Envolver errores inesperados
    throw new AppError(
      'Failed to fetch user data',
      'UNEXPECTED_ERROR',
      { cause: error }
    );
  }
}

// Manejo de errores en la aplicación
async function displayUserProfile(userId: string) {
  try {
    const user = await fetchUserDataChecked(userId);
    console.log('User profile:', user);
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error('Network issue:', error.message);
    } else if (error instanceof ValidationError) {
      console.error('Validation failed:', error.message);
    } else if (error instanceof NotFoundError) {
      console.error('Not found:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Ejecutar con datos de ejemplo
displayUserProfile('123');

// --- 7. Iteración asíncrona con TypeScript ---
// Función generadora asíncrona
async function* generateNumbers(): AsyncGenerator<number, void, unknown> {
  let i = 0;
  while (i < 5) {
    // Simular operación asíncrona
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i++;
  }
}

// Usando el generador asíncrono
async function consumeNumbers() {
  for await (const num of generateNumbers()) {
    // TypeScript sabe que num es number
    console.log(num * 2);
  }
}

consumeNumbers();

// ============================================================
// DECORATORS — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================
// Los decoradores permiten añadir metadatos y modificar clases y sus miembros
// en tiempo de diseño. Se usan mucho en Angular (components, services, modules)
// y NestJS (controllers, providers, routes).
//
// IMPORTANTE: los decoradores requieren "experimentalDecorators": true en
// tsconfig.json (ya creado en esta carpeta). Como la línea de comandos con
// archivos explícitos IGNORA el tsconfig, ahora se compila con:  npx tsc --noEmit
//
// Tipos de decoradores y dónde se aplican:
//   - Class Decorator     -> clases            -> (constructor: Function) => void
//   - Method Decorator    -> métodos           -> (target, propertyKey, descriptor) => void
//   - Property Decorator  -> propiedades       -> (target, propertyKey) => void
//   - Parameter Decorator -> parámetros        -> (target, propertyKey, parameterIndex) => void

// --- 1. Class Decorators ---
// Se aplican al constructor de la clase y se ejecutan cuando la clase se
// DECLARA, no cuando se crean instancias. Pueden observar, modificar o
// reemplazar la definición de la clase.

// Decorador simple que registra cuándo se define una clase
function logClass(constructor: Function) {
  console.log(`Class ${constructor.name} was defined at ${new Date().toISOString()}`);
}

@logClass
class LoggedUserService {
  getUsers() {
    return ['Alice', 'Bob', 'Charlie'];
  }
}
// Salida al cargar el archivo: "Class LoggedUserService was defined at [timestamp]"

// Decorador con modificación del constructor: añade una propiedad versión
// y envuelve el constructor para loguear la creación de instancias
function versioned(version: string) {
  return function (constructor: Function) {
    constructor.prototype.version = version;

    const original = constructor as any;
    const newConstructor: any = function (this: any, ...args: any[]) {
      console.log(`Creating instance of ${original.name} v${version}`);
      return new original(...args);
    };

    // Copia el prototipo para que instanceof siga funcionando
    newConstructor.prototype = original.prototype;
    return newConstructor;
  };
}

@versioned('1.0.0')
class ApiClient {
  fetchData() {
    console.log('Fetching data...');
  }
}

const apiClient = new ApiClient();
console.log((apiClient as any).version); // 1.0.0
apiClient.fetchData();

// Decorador "sealed": impide añadir nuevas propiedades a la clase
function sealed(constructor: Function) {
  console.log(`Sealing ${constructor.name}...`);
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class GreeterSealed {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return `Hello, ${this.greeting}`;
  }
}

// Puntos clave de los class decorators:
//   - Se ejecutan al DECLARAR la clase, no al crear instancias.
//   - Reciben el constructor como único parámetro.
//   - Pueden devolver un nuevo constructor que reemplace a la clase original.
//   - Se ejecutan de abajo hacia arriba (el decorador más interno primero).

// --- 2. Method Decorators ---
// Se aplican a definiciones de métodos y reciben 3 parámetros:
//   1) target: prototipo de la clase (o constructor para métodos estáticos)
//   2) propertyKey: nombre del método
//   3) descriptor: PropertyDescriptor del método

// Decorador que mide y loguea el tiempo de ejecución de un método
function measureTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (this: any, ...args: any[]) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const end = performance.now();
    console.log(`${propertyKey} executed in ${(end - start).toFixed(2)}ms`);
    return result;
  };
  return descriptor;
}

class DataProcessor {
  @measureTime
  processData(data: number[]): number[] {
    for (let i = 0; i < 1000000; i++) { /* simula procesamiento */ }
    return data.map(x => x * 2);
  }
}

const processor = new DataProcessor();
processor.processData([1, 2, 3, 4, 5]);

// Decorador de autorización por roles (control de acceso basado en roles)
type UserRole = 'admin' | 'editor' | 'viewer';

const currentUser = {
  id: 1,
  name: 'John Doe',
  roles: ['viewer'] as UserRole[]
};

// Factoría de decoradores para control de acceso por roles
function AllowedRoles(...allowedRoles: UserRole[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: any, ...args: any[]) {
      const hasPermission = allowedRoles.some(role =>
        currentUser.roles.includes(role)
      );
      if (!hasPermission) {
        throw new Error(
          `User ${currentUser.name} is not authorized to call ${propertyKey}`
        );
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

class DocumentService {
  @AllowedRoles('admin', 'editor')
  deleteDocument(id: string) {
    console.log(`Document ${id} deleted`);
  }
  @AllowedRoles('admin', 'editor', 'viewer')
  viewDocument(id: string) {
    console.log(`Viewing document ${id}`);
  }
}

const docService = new DocumentService();
try {
  docService.viewDocument('doc123'); // Un viewer sí puede ver
  docService.deleteDocument('doc123'); // Un viewer NO puede borrar -> lanza error
} catch (error: any) {
  console.error(error.message);
}
currentUser.roles = ['admin'];
docService.deleteDocument('doc123'); // Ahora sí puede borrar

// Decorador que avisa de deprecación de un método
function deprecated(message: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: any, ...args: any[]) {
      console.warn(`Warning: ${propertyKey} is deprecated. ${message}`);
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}

class PaymentServiceWarn {
  @deprecated('Use processPaymentV2 instead')
  processPayment(amount: number, currency: string) {
    console.log(`Processing payment of ${amount} ${currency}`);
  }

  processPaymentV2(amount: number, currency: string) {
    console.log(`Processing payment v2 of ${amount} ${currency}`);
  }
}

const payment = new PaymentServiceWarn();
payment.processPayment(100, 'USD'); // Muestra el warning de deprecación
payment.processPaymentV2(100, 'USD'); // Sin warning

// Puntos clave de los method decorators:
//   - Se ejecutan al DEFINIR el método, no al llamarlo.
//   - Pueden envolver el método con lógica adicional (logging, validación, autorización).
//   - Deben devolver el descriptor o undefined si no lo modifican.

// --- 3. Property Decorators ---
// Se aplican a propiedades y reciben 2 parámetros: target y propertyKey.
// Para modificar el comportamiento hay que usar Object.defineProperty.

// Decorador que formatea un string automáticamente al asignarlo
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    let value: string;
    const getter = () => value;
    const setter = (newVal: string) => {
      value = formatString.replace('{}', newVal);
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}

class GreeterFormatted {
  @format('Hello, {}!')
  greeting: string;
}

const greeterFormatted = new GreeterFormatted();
greeterFormatted.greeting = 'World';
console.log(greeterFormatted.greeting); // Hello, World!

// Decorador que loguea el acceso y los cambios de una propiedad
function logProperty(target: any, propertyKey: string) {
  let value: any;
  const getter = function () {
    console.log(`Getting ${propertyKey}: ${value}`);
    return value;
  };

  const setter = function (newVal: any) {
    console.log(`Setting ${propertyKey} from ${value} to ${newVal}`);
    value = newVal;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class StoreProduct {
  @logProperty
  name: string;
  @logProperty
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

const storeProduct = new StoreProduct('Laptop', 999.99);
storeProduct.price = 899.99; // Setting price from 999.99 to 899.99
console.log(storeProduct.name); // Getting name: Laptop

// Decorador que obliga a que una propiedad tenga valor
function required(target: any, propertyKey: string) {
  let value: any;

  const getter = function () {
    if (value === undefined) {
      throw new Error(`Property ${propertyKey} is required`);
    }
    return value;
  };

  const setter = function (newVal: any) {
    value = newVal;
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class RegisteredUser {
  @required
  username: string;
  @required
  email: string;
  age?: number;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }
}

const user1 = new RegisteredUser('johndoe', 'john@example.com'); // Funciona
// const user2 = new RegisteredUser(undefined, 'test@example.com'); // Error: Property username is required

// Puntos clave de los property decorators:
//   - Se ejecutan al DEFINIR la propiedad, no al accederla.
//   - No reciben property descriptor (a diferencia de los method decorators).
//   - Para modificar acceso/valor se usa Object.defineProperty.

// --- 4. Parameter Decorators ---
// Se aplican a parámetros y reciben target, propertyKey y parameterIndex.
// Normalmente se combinan con un method decorator para validar parámetros.
// (Adaptado: usamos un Map en vez de Reflect metadata para no depender de la
// librería reflect-metadata)

const validations = new Map<string, Array<{ index: number; type: 'string' | 'number' | 'boolean' }>>();

function validateParam(type: 'string' | 'number' | 'boolean') {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const key = String(propertyKey);
    const list = validations.get(key) || [];
    list.push({ index: parameterIndex, type });
    validations.set(key, list);
  };
}

function validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (this: any, ...args: any[]) {
    const list = validations.get(String(propertyKey)) || [];

    for (const validation of list) {
      const { index, type } = validation;
      const param = args[index];
      let isValid = false;

      switch (type) {
        case 'string':
          isValid = typeof param === 'string' && param.length > 0;
          break;
        case 'number':
          isValid = typeof param === 'number' && !isNaN(param);
          break;
        case 'boolean':
          isValid = typeof param === 'boolean';
      }

      if (!isValid) {
        throw new Error(`Parameter at index ${index} failed ${type} validation`);
      }
    }

    return originalMethod.apply(this, args);
  };
  return descriptor;
}

class ValidatedUserService {
  @validate
  createUser(
    @validateParam('string') name: string,
    @validateParam('number') age: number,
    @validateParam('boolean') isActive: boolean
  ) {
    console.log(`Creating user: ${name}, ${age}, ${isActive}`);
  }
}

const validatedService = new ValidatedUserService();
validatedService.createUser('John', 30, true); // Funciona
// validatedService.createUser('', 30, true); // Error: Parameter at index 0 failed string validation

// --- 5. Decorator Factories (orden de evaluación) ---
// Al aplicar varios decoradores, el orden es:
//   1) Se evalúan los parámetros, luego métodos/accesores/propiedades (por miembro).
//   2) Se aplican los class decorators.
// Dentro de un mismo miembro, las factorías se EVALÚAN de arriba hacia abajo
// (first() luego second()) pero se APLICAN de abajo hacia arriba (second() luego first()).

function first() {
  console.log('first(): factory evaluated');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('first(): called');
  };
}

function second() {
  console.log('second(): factory evaluated');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('second(): called');
  };
}

class ExampleClass {
  @first()
  @second()
  method() {}
}
// Salida:
// second(): factory evaluated
// first(): factory evaluated
// first(): called
// second(): called

// Factoría configurable: decorador de logging con nivel personalizable
function logWithConfig(config: { level: 'log' | 'warn' | 'error', message?: string }) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: any, ...args: any[]) {
      const { level = 'log', message = 'Executing method' } = config;
      console[level](`${message}: ${propertyKey}`, { arguments: args });
      const result = originalMethod.apply(this, args);
      console[level](`${propertyKey} completed`);
      return result;
    };
    return descriptor;
  };
}

class PaymentServiceLog {
  @logWithConfig({ level: 'log', message: 'Processing payment' })
  processPayment(amount: number) {
    console.log(`Processing payment of $${amount}`);
  }
}

// --- 6. Ejemplo real: controlador de API con decoradores ---
// Simula el estilo de NestJS/Express declarando rutas con decoradores
const ROUTES: any[] = [];

function Controller(prefix: string = '') {
  return function (constructor: Function) {
    constructor.prototype.prefix = prefix;
  };
}

function Get(path: string = '') {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    ROUTES.push({
      method: 'get',
      path,
      handler: descriptor.value,
      target: target.constructor
    });
  };
}

@Controller('/users')
class UserController {
  @Get('/')
  getAllUsers() {
    return { users: [{ id: 1, name: 'John' }] };
  }

  @Get('/:id')
  getUserById(id: string) {
    return { id, name: 'John' };
  }
}

// Simula el registro de las rutas
function registerRoutes() {
  ROUTES.forEach(route => {
    const prefix = route.target.prototype.prefix || '';
    console.log(`Registered ${route.method.toUpperCase()} ${prefix}${route.path}`);
  });
}

registerRoutes();
// Salida:
// Registered GET /users
// Registered GET /users/:id

// --- 7. Buenas prácticas (resumen) ---
//   - Mantener cada decorador con una sola responsabilidad.
//   - Documentar qué hacen y sus efectos secundarios.
//   - Usar factorías para hacerlos configurables y reutilizables.
//   - Cuidar el rendimiento (los decoradores añaden overhead en runtime).
//   - Aprovechar el sistema de tipos de TypeScript cuando sea posible.
//   - Manejar errores dentro de los decoradores.
//   - Escribir tests unitarios para los decoradores.
//   - Usar reflect-metadata solo si necesitas metadatos en runtime.

// --- 8. Errores comunes (resumen) ---
//   - Olvidar habilitar experimentalDecorators en tsconfig.json.
//   - Usar mal la firma del decorador (cada tipo tiene una firma específica).
//   - El orden de evaluación es de abajo hacia arriba por declaración.
//   - Los property decorators corren antes de que se inicialicen las propiedades.
//   - Olvidar importar reflect-metadata al usar metadatos de decoradores.
//   - Compatibilidad: los decoradores requieren transpilación para navegadores viejos.

// Ejemplo simple de property decorator (readonly)
function readonlyDecorator(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    writable: false
  });
}

class DecoratedPerson {
  @readonlyDecorator
  name = "John";
}

// Ejemplo simple de parameter decorator
function logParameter(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter in ${propertyKey} at index ${parameterIndex}`);
}

class Demo {
  greet(@logParameter message: string) {
    return message;
  }
}

// ============================================================
// JSDOC (TYPESCRIPT EN PROYECTOS JS) — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================
// JSDoc + TypeScript permite añadir chequeo de tipos a archivos JavaScript
// SIN convertirlos a .ts. Es perfecto para migraciones graduales o cuando
// quieres seguridad de tipos en un proyecto de JavaScript.
// Para activarlo:
//   1) Crear tsconfig.json
//   2) Poner "checkJs": true, o bien "// @ts-check" al inicio de cada .js
// (En ejemplos.ts — que YA es un .ts — los @param no tipan los parámetros
// automáticamente, así que aquí las funciones llevan además el tipo explícito
// de TypeScript. En un .js con // @ts-check el tipo lo daría solo el JSDoc.)

// --- 1. Empezando: JSDoc para seguridad de tipos ---
/**
 * Suma dos números.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function jsAdd(a: number, b: number) {
  return a + b;
}
jsAdd(2, 3); // OK

// --- 2. Objetos e interfaces ---

// Tipos de objeto según estilo de JSDoc
/**
 * @param {{ firstName: string, lastName: string, age?: number }} person
 */
function greetJs(person: { firstName: string; lastName: string; age?: number }) {
  return `Hello, ${person.firstName} ${person.lastName}`;
}
greetJs({ firstName: 'John', lastName: 'Doe' }); // OK
// greetJs({ firstName: 'Jane' }); // Error: falta 'lastName'

// @typedef para tipos complejos
/**
 * @typedef {Object} JSDocUser
 * @property {number} id - El ID del usuario
 * @property {string} username - El nombre de usuario
 * @property {string} [email] - Email opcional
 * @property {('admin'|'user'|'guest')} role - Rol del usuario
 * @property {() => string} getFullName - Método que devuelve el nombre completo
 */

/** @type {JSDocUser} */
const jsDocUser = {
  id: 1,
  username: 'johndoe',
  role: 'admin',
  getFullName() {
    return 'John Doe';
  }
};

// TypeScript da autocompletado para las propiedades de JSDocUser
console.log(jsDocUser.role);

// Extendiendo tipos con intersecciones
/** @typedef {{ x: number, y: number }} JSDocPoint */
/**
 * @typedef {JSDocPoint & { z: number }} JSDocPoint3D
 */
/** @type {JSDocPoint3D} */
const point3d = { x: 1, y: 2, z: 3 };
// const point2d = { x: 1, y: 2 }; // En modo strict daría Error: 'z' es obligatoria

// --- 3. Tipos de funciones ---

// Declaración de función
/**
 * Calcula el área de un rectángulo
 * @param {number} width - El ancho del rectángulo
 * @param {number} height - El alto del rectángulo
 * @returns {number} El área calculada
 */
function jsCalculateArea(width: number, height: number) {
  return width * height;
}
const areaJs = jsCalculateArea(10, 20);

// Expresiones de función y callbacks
/**
 * @callback StringProcessor
 * @param {string} input
 * @returns {string}
 */
/**
 * @type {StringProcessor}
 */
const toUpperJs = (str: string) => str.toUpperCase();

/**
 * @param {string[]} strings
 * @param {StringProcessor} processor
 * @returns {string[]}
 */
function processStringsJs(strings: string[], processor: (input: string) => string) {
  return strings.map(processor);
}

const processedStrings = processStringsJs(['hello', 'world'], toUpperJs);
// processedStrings será ['HELLO', 'WORLD']

// Sobrecargas de función con JSDoc
/**
 * @overload
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
/**
 * @overload
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
/**
 * @param {string | number} a
 * @param {string | number} b
 * @returns {string | number}
 */
function addJs(a: any, b: any): any {
  if (typeof a === 'string' || typeof b === 'string') {
    return String(a) + String(b);
  }
  return a + b;
}
const strResult = addJs('Hello, ', 'World!'); // string
const numResult = addJs(10, 20); // number

// --- 4. Tipos avanzados ---

// Uniones e intersecciones
/** @typedef {{ name: string, age: number }} JSDocPerson */
/** @typedef {JSDocPerson & { employeeId: string }} JSDocEmployee */
/** @typedef {JSDocPerson | { guestId: string, visitDate: Date }} JSDocVisitor */

/** @type {JSDocEmployee} */
const employeeJs = {
  name: 'Alice',
  age: 30,
  employeeId: 'E123'
};

/** @type {JSDocVisitor} */
const guestJs = {
  guestId: 'G456',
  visitDate: new Date()
};

/**
 * @param {JSDocVisitor} visitor
 * @returns {string}
 */
function getVisitorIdJs(visitor: { name: string; age: number } | { guestId: string; visitDate: Date }) {
  if ('guestId' in visitor) {
    return visitor.guestId; // TypeScript sabe que es un guest
  }
  return visitor.name; // TypeScript sabe que es una Person
}

// Tipos mapeados y condicionales
/** @template T @typedef {[K in keyof T]: T[K] extends Function ? K : never}[keyof T] MethodNames */
/** @template T @typedef {{ [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] }} Getters */

/** @type {Getters<{ name: string, age: number }> } */
const jsUserGetters = {
  getName: () => 'John',
  getAge: () => 30
};

// TypeScript obliga a que los valores devueltos coincidan con el tipo
const getterName = jsUserGetters.getName(); // string
const getterAge = jsUserGetters.getAge(); // number

// --- 5. Importar tipos (desde archivos .js) ---
// Importar tipos desde archivos TypeScript:
//   /** @typedef {import('./types').User} User */
// Importar tipos desde node_modules:
//   /** @typedef {import('express').Request} ExpressRequest */
// Importar renombrando:
//   /** @typedef {import('./api').default as ApiClient} ApiClient */
//
// Crear archivos de declaración (types.d.ts) para librerías sin tipos:
// // types.d.ts
// declare module 'my-module' {
//   export interface Config {
//     apiKey: string;
//     timeout?: number;
//     retries?: number;
//   }
//   export function initialize(config: Config): void;
//   export function fetchData<T = any>(url: string): Promise<T>;
// }
//
// Y usarlo luego en el archivo JavaScript:
// /** @type {import('my-module').Config} */
// const config = { apiKey: '12345', timeout: 5000 };
// import { initialize } from 'my-module';
// initialize(config);

// --- 6. Buenas prácticas (resumen) ---
//   - Activa // @ts-check al inicio de los archivos donde quieras chequeo.
//   - Usa @typedef para tipos que se repiten en varios lugares.
//   - Documenta todos los parámetros y el tipo de retorno de las funciones.
//   - Usa @template para funciones y tipos genéricos.
//   - Crea archivos .d.ts para librerías de terceros sin tipos.
//   - Prefiere @ts-expect-error sobre @ts-ignore cuando esperas un error.

// --- 7. Errores comunes (resumen) ---
//   - Olvidar // @ts-check: sin ello no hay chequeo de tipos.
//   - Sintaxis de JSDoc incorrecta: un solo typo desactiva el chequeo.
//   - Conflictos de tipos entre orígenes distintos.
//   - Problemas de inferencia: a veces TS no infiere los tipos correctamente.
//   - Rendimiento: archivos JS grandes con tipos complejos ralentizan el chequeo.

// --- Conclusión ---
// JSDoc + TypeScript da seguridad de tipos a proyectos JavaScript sin migrarlos.
// Útil para: migrar gradualmente a TS, proyectos JS existentes, entornos sin
// soporte para .ts, y documentar código JS con información de tipos.
// Para proyectos nuevos o migraciones completas es mejor usar archivos .ts.

// ============================================================
// MIGRATION (MIGRAR DE JS A TS) — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================
// Migrar de JavaScript a TypeScript mejora el mantenimiento y la experiencia
// de desarrollo. La guía cubre: preparación, configuración, enfoques de
// migración, paso a paso y retos comunes.

// --- 1. Fase de preparación ---
// Antes de empezar:
//   - Identifica el tamaño y la complejidad de tu código.
//   - Documenta el proceso de build y las dependencias.
//   - Revisa si ya existen definiciones de tipos (.d.ts).
//   - Identifica rutas críticas que necesiten atención especial.
//
// Usar control de versiones:
//   git checkout -b typescript-migration
//   git add .
//   git commit -m "Pre-TypeScript migration state"

// --- 2. Configuración ---
// Instalar TypeScript como dependencia de desarrollo:
//   npm install --save-dev typescript @types/node
//
// tsconfig.json inicial recomendado (ver el real en tsconfig.json de esta
// carpeta, aquí solo se muestra el de la guía):
// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "module": "commonjs",
//     "strict": true,
//     "esModuleInterop": true,
//     "skipLibCheck": true,
//     "forceConsistentCasingInFileNames": true,
//     "outDir": "./dist",
//     "rootDir": "./src"
//   },
//   "include": ["src/**/*"],
//   "exclude": ["node_modules"]
// }

// --- 3. Enfoques de migración ---
// Migración gradual: un archivo a la vez dejando el resto en JS.
//   { "compilerOptions": { "allowJs": true, "checkJs": true } }
//   -> Ideal para codebases grandes, mínima interrupción.
//
// Migración de golpe: renombrar todos los .js a .ts y corregir errores.
//   find src -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;
//   -> Ideal para proyectos pequeños o nuevos.
//
// NOTA: para proyectos grandes se recomienda el enfoque gradual.

// --- 4. Paso a paso ---
// 4.1 Configuración recomendada (con chequeo de JS):
// {
//   "compilerOptions": {
//     "target": "ES2020",
//     "module": "commonjs",
//     "strict": true,
//     "esModuleInterop": true,
//     "skipLibCheck": true,
//     "forceConsistentCasingInFileNames": true,
//     "outDir": "./dist",
//     "rootDir": "./src",
//     "allowJs": true,
//     "checkJs": true,
//     "noEmit": true
//   },
//   "include": ["src/**/*"],
//   "exclude": ["node_modules", "dist"]
// }

// 4.2 Activar el chequeo de tipos en archivos JS con // @ts-check (ver sección
// JSDOC de este archivo). Descartar errores puntuales con // @ts-ignore.
//
// // @ts-check
// /** @type {string} */
// const nombre = 'John';
// nombre = 42; // Error: Type '42' is not assignable to type 'string'

// 4.3 Renombrar archivos .js a .ts (empezar por los no críticos):
//   mv src/utils/helpers.js src/utils/helpers.ts
//   find src/utils -name "*.js" -exec sh -c 'mv "$0" "${0%.js}.ts"' {} \;

// 4.4 Añadir anotaciones de tipos gradualmente.
// Antes (solo JS):
//   function add(a, b) {
//     return a + b;
//   }
// Después (con tipos):
function migAdd(a: number, b: number): number {
  return a + b;
}

// Con una interfaz:
interface MigrationUser {
  id: number;
  name: string;
  email?: string;
}

function migGetUser(id: number): MigrationUser {
  return { id, name: 'John Doe' };
}

// 4.5 Actualizar scripts de build y test en package.json:
// {
//   "scripts": {
//     "build": "tsc",
//     "dev": "tsc --watch",
//     "test": "jest"
//   }
// }
// (Ajustar también la configuración de tests para archivos .ts.)

// --- 5. Herramientas de migración ---
//   ts-migrate  -> npx ts-migrate-full .   (Airbnb)
//   TypeStat    -> npx typestat
//   @types      -> npm install --save-dev @types/react @types/node
//                  (typescriptlang.org/dt/search para buscar tipos)

// --- 6. Buenas prácticas ---
// 6.1 Empezar poco a poco: utilidades y componentes no-UI primero, un archivo
//     a la vez, y commit tras cada paso exitoso.
// 6.2 Aprovechar las características de TypeScript:
// Inferencia de tipos:
const migName = 'John'; // TypeScript infiere 'string'
const migAge = 30; // TypeScript infiere 'number'

// Tipos unión para flexibilidad:
type MigStatus = 'active' | 'inactive' | 'pending';

// Type guards para chequeos en runtime:
function isString(value: any): value is string {
  return typeof value === 'string';
}

// 6.3 Librerías de terceros: instalar paquetes @types, crear archivos .d.ts
//     para las que no tengan tipos, y usar declare module para extensiones.

// --- 7. Retos comunes y soluciones ---
// 7.1 Propiedades dinámicas (objetos usados como diccionarios).
// Problema: añadir propiedades a un objeto vacío da error.
//   const migUser = {};
//   migUser.name = 'John'; // Error: Property 'name' does not exist
// Solución 1: index signature
interface DynamicUser {
  [key: string]: any;
}
const migUser: DynamicUser = {};
migUser.name = 'John'; // OK

// Solución 2: type assertion
const migUser2 = {} as { name: string };
migUser2.name = 'John'; // OK

// 7.2 El contexto `this` en callbacks.
// Problema: dentro de setTimeout un function() normal pierde `this`.
//   class Counter {
//     count = 0;
//     increment() {
//       setTimeout(function() {
//         this.count++; // Error: 'this' no está disponible
//       }, 1000);
//     }
//   }
// Solución 1: arrow function (this léxico).
// Solución 2: bind(this) con anotación de `this`.
class Counter {
  count = 0;
  incrementArrow() {
    setTimeout(() => {
      this.count++; // 'this' es el del contexto léxico
    }, 1000);
  }
  incrementBound() {
    setTimeout(function (this: Counter) {
      this.count++;
    }.bind(this), 1000);
  }
}

// --- Conclusión ---
// Migrar de JS a TS es una inversión que vale la pena. Puntos clave:
//   - Empieza con un buen tsconfig.json.
//   - Usa allowJs + checkJs para una migración gradual.
//   - Aprovecha el sistema de tipos para detectar errores temprano.
//   - Actualiza builds y tests para soportar TypeScript.
//   - Resuelve los problemas comunes con los patrones vistos.
// La migración es un proceso, no un evento: tener un codebase mixto durante
// la transición es normal. Lo importante es seguir avanzando con calidad.

// ============================================================
// ERROR HANDLING (MANEJO DE ERRORES) — W3SCHOOLS (RESUMEN + EJEMPLOS)
// ============================================================
// Un manejo robusto de errores es clave para apps TypeScript fiables.
// (Nota: ya existen AppError/NetworkError/ValidationError/NotFoundError en la
// sección ASYNC, así que aquí se añaden FormValidationError, DbError y HttpError.)

// --- 1. Bloque básico try/catch ---
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

try {
  const result = divide(10, 0);
  console.log(result);
} catch (error: unknown) {
  // En TypeScript 4.0+ la variable del catch es de tipo `unknown`.
  // Siempre hay que reducir el tipo antes de acceder a propiedades:
  if (error instanceof Error) {
    console.error('An error occurred:', error.message);
  }
}

// (La versión con `error.message` directo da error porque `error` es `unknown`:
//   try { } catch (error) {
//     console.log(error.message); // Error: Property 'message' does not exist on type 'unknown'
//   })

// --- 2. Clases de error personalizadas ---
// Extender la clase Error para crear errores específicos del dominio.
class FormValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'FormValidationError';
    // Restaurar la cadena de prototipos
    Object.setPrototypeOf(this, FormValidationError.prototype);
  }
}

class DbError extends Error {
  constructor(message: string, public code: number) {
    super(message);
    this.name = 'DbError';
    Object.setPrototypeOf(this, DbError.prototype);
  }
}

// Uso
function validateUser(user: any) {
  if (!user.name) {
    throw new FormValidationError('Name is required', 'name');
  }
  if (!user.email.includes('@')) {
    throw new FormValidationError('Invalid email format', 'email');
  }
}

// --- 3. Type guards para errores ---
// Predicados de tipo para trabajar con seguridad con errores de distinto tipo.
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
}

function isFormValidationError(error: unknown): error is FormValidationError {
  return error instanceof FormValidationError;
}

// Uso en un catch
try {
  validateUser({});
} catch (error: unknown) {
  if (isFormValidationError(error)) {
    console.error(`Validation error in ${error.field}: ${error.message}`);
  } else if (isErrorWithMessage(error)) {
    console.error('An error occurred:', error.message);
  } else {
    console.error('An unknown error occurred');
  }
}

// Patrón de aserción de tipos
function assertIsError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw new Error('Caught value is not an Error instance');
  }
}

try {
  divide(1, 0);
} catch (error) {
  assertIsError(error);
  console.error(error.message); // TypeScript ya sabe que error es Error
}

// --- 4. Manejo de errores en código asíncrono ---
interface ErrorHandlingUser {
  id: number;
  name: string;
  email: string;
}

// async/await + try/catch
async function fetchUserHandled(userId: number): Promise<ErrorHandlingUser> {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as ErrorHandlingUser;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch user:', error.message);
    }
    throw error; // Re-lanzar para que quien llame pueda manejarlo
  }
}

// Promise.catch() para manejar errores
function fetchUserPostsHandled(userId: number): Promise<any> {
  return fetch(`/api/users/${userId}/posts`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Failed to fetch posts:', error);
      return []; // Fallback: devolver un array vacío
    });
}

// Rechazos de promesas sin manejar (siempre manejarlos):
//   // Mal: rechazo sin manejar
//   fetchData().then(data => console.log(data));
//   // Bien: manejar éxito y error
//   fetchData()
//     .then(data => console.log('Success:', data))
//     .catch(error => console.error('Error:', error));
//   // O con void para errores ignorados a propósito
//   void fetchData().catch(console.error);

// --- 5. Error boundaries en React (solo HTML/JSX) ---
// Componente ErrorBoundary para capturar errores en árboles de componentes:
//
// import React, { Component, ErrorInfo, ReactNode } from 'react';
//
// interface ErrorBoundaryProps {
//   children: ReactNode;
//   fallback?: ReactNode;
// }
// interface ErrorBoundaryState {
//   hasError: boolean;
//   error?: Error;
// }
//
// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   public state: ErrorBoundaryState = { hasError: false };
//
//   public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
//     return { hasError: true, error };
//   }
//
//   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     console.error('Uncaught error:', error, errorInfo);
//     // Enviar a un servicio de reporte de errores
//   }
//
//   public render() {
//     if (this.state.hasError) {
//       return this.props.fallback || (
//         <div className="error-boundary">
//           <h2>Something went wrong</h2>
//           <p>{this.state.error?.message}</p>
//           <button onClick={() => this.setState({ hasError: false })}>
//             Try again
//           </button>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }
//
// // Uso
// function App() {
//   return (
//     <ErrorBoundary fallback={<div>Oops! Something broke.</div>}>
//       <MyComponent />
//     </ErrorBoundary>
//   );
// }

// --- 6. Buenas prácticas ---
// 6.1 Manejar siempre los errores: nunca dejar los catch vacíos.
//   // Mal: fallo silencioso
//   try { /* ... */ } catch { /* vacío */ }
//   // Bien: al menos loguear el error
//   try { /* ... */ } catch (error) {
//     console.error('Operation failed:', error);
//   }

// 6.2 Usar tipos de error específicos para distintos escenarios.
class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'HttpError';
  }
}
// (FormValidationError ya se definió arriba.)

// 6.3 Manejar cada error donde se tenga contexto para recuperarse.
// En una capa de acceso a datos:
async function getUserHandled(id: string): Promise<ErrorHandlingUser> {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) {
    throw new HttpError(response.status, 'Failed to fetch user');
  }
  return response.json();
}

// En una capa de UI (aquí con console en vez de setUser/showError para que
// compile sin React):
async function loadUserHandled() {
  try {
    const user = await getUserHandled('123');
    console.log('User loaded:', user);
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.status === 404) {
        console.error('User not found');
      } else {
        console.error('Network error. Please try again later.');
      }
    } else {
      console.error('An unexpected error occurred');
    }
  }
}

// --- 7. Errores comunes ---
// 7.1 No manejar rechazos de promesas:
//   // Mal: rechazo sin manejar
//   fetchData();
//   // Bien: manejar el rechazo
//   fetchData().catch(console.error);
//
// 7.2 Capturar sin reducir el tipo (en TS 4.0+ el error es `unknown`):
//   // Bien: reducir el tipo
//   try { /* ... */ } catch (error) {
//     if (error instanceof Error) {
//       console.log(error.message); // OK
//     }
//   }
//
// 7.3 Tragarse los errores sin manejarlos:
//   // Mal: el error se ignora silenciosamente
//   function saveDataSilent(data: any) {
//     try {
//       database.save(data);
//     } catch { /* Ignorar */ }
//   }
//   // Mejor: loguear el error y/o avisar al usuario
//   function saveDataLogged(data: any) {
//     try {
//       database.save(data);
//     } catch (error) {
//       console.error('Failed to save data:', error);
//     }
//   }

// --- Resumen ---
// Un buen manejo de errores en TypeScript implica:
//   - Usar try/catch para código síncrono.
//   - Manejar rechazos de promesas con .catch() o try/catch con async/await.
//   - Crear clases de error personalizadas para errores del dominio.
//   - Usar type guards para trabajar con objetos de error de forma segura.
//   - Manejar los errores en el nivel adecuado de la aplicación.
//   - Dar mensajes de error útiles a los usuarios.

