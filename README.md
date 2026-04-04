Proyecto enfocado en documentar mi aprendizaje en react:

### Tema: Crear componente

### Recordar

### Notas

- para crear un proyecto **React**
  - (el “**.**” significa crea en esta carpeta, si quieres crear una carpeta pones nombre en lugar de punto)
  ```bash
  	#crea el proyecto en la ruta actual
  npm create vite@latest .

  	#crea la carpeta y dentro el proyecto
  npm create vite@latest nuevoProyecto
  ```
- Siguientes pasos en terminal:

  ```bash
  // Select React and Javascript when asked for framework and variant.
   √ Select a framework: » React
   √ Select a variant: » JavaScript
  ```

- Después instalamos dependencias:
  ```bash
  npm i
  ```
- Una ves creado
  - vamos al archivo `vite.config.json` para establecer el puerto 3000, ya que este es el puerto que utilizan los revisores de código.
    - en caso de requerir otro puerto ahi se puede cambiar
    ```jsx
    export default defineConfig({
      plugins: [react()],
      server: {
        port: 3000,
      },
    });
    ```
  -

---

# Dominar React

## Temas:

## 1. Fundamentos de React

- [x] Arquitectura de Componentes (Funcionales).
- [x] JSX (Sintaxis y reglas).
- [ ] **Props** (Paso de datos y `children`).
- [ ] Renderizado condicional y de listas (`map` y `keys`).
- [ ] Manejo de Eventos.

## 2. Hooks Básicos y Estado

- [ ] **useState**: Manejo de estado local.
- [ ] **useEffect**: Ciclo de vida y efectos secundarios.
- [ ] **useRef**: Acceso al DOM y persistencia de valores.
- [x] Levantamiento de estado (_Lifting State Up_).

## 3. Manejo de Formularios

- [ ] _Controlled vs Uncontrolled Components_.
- [ ] Validación de datos.
- [ ] Integración con librerías (ej. React Hook Form).

---

## 4. Hooks Avanzados y Optimización

- [ ] **useMemo** y **useCallback** (Memorización).
- [ ] **useReducer**: Gestión de estados complejos.
- [ ] **useLayoutEffect**.
- [ ] Custom Hooks (Creación de lógica reutilizable).
- [ ] `React.memo`.

---

## 5. Gestión de Estado Global

- [ ] **Context API**.
- [ ] Redux Toolkit o Zustand (Librerías externas).
- [ ] Patrones de _Store_ y _Actions_.

---

## 6. Navegación y Rutas

- [x] React Router (Configuración, `Link`, `Maps`).
- [ ] Rutas dinámicas y parámetros de URL (`useParams`).
- [ ] Protección de rutas (Private Routes).
- [ ] Lazy Loading y Code Splitting (`Suspense`).

---

## 7. Comunicación con APIs

- [ ] Consumo de datos con `fetch` o Axios.
- [ ] Manejo de estados de carga (_Loading_) y error.
- [ ] **TanStack Query** (React Query) para caché y sincronización.

---

## 8. Ecosistema y Herramientas Modernas

- [ ] Estilizado (Tailwind CSS, Styled Components o CSS Modules).
- [ ] Storybook (Documentación de componentes).
- [ ] Testing (Jest y React Testing Library).
- [ ] Frameworks basados en React (Next.js).

---

### Tema: **Crear y añadir context**

### Notas

- **Contexto** es una forma de pasar datos a través del árbol de componentes sin tener que pasar "props" manualmente en cada nivel.
  - Imagina que tienes una aplicación donde quieres mostrar el nombre del usuario en el encabezado, en el perfil y en el carrito de compras. Sin Contexto, tendrías que pasar esa información de padre a hijo, y de hijo a nieto, incluso a componentes que ni siquiera la necesitan solo para que llegue al destino final. A esto se le llama **Prop Drilling**.
- **¿Cómo funciona la idea del Contexto?**
  - Piensa en el Contexto como una **"estación de radio"**:
    - **El Provider (Emisor):** Envía la señal (los datos) a todos los que estén en su rango.
    - **El Consumer/useContext (Receptor):** Cualquier componente, sin importar qué tan profundo esté, puede "sintonizar" esa señal y obtener los datos directamente.
  - **Los 3 pasos para usar Context en React**
    1. **Crear el contexto**
       1. Se define fuera de los componentes.

       ```jsx
       const UserContext = React.createContext();
       ```

    2. **Proveer el contexto**
       1. Envuelves a los componentes que necesitan la información con el `Provider`.

          ```jsx
          <UserContext.Provider value={{ nombre: "Juan" }}>
            <AppPrincipal />
          </UserContext.Provider>
          ```
    3. **Consumir el contexto**
       1. Usas el hook `useContext` para extraer la información donde la necesites.

       ```jsx
       const { nombre } = useContext(UserContext);
       ```
- Ejemplo con proyecto
  - Creamos un componente dedicado llamado `TranslationContext`
    ```jsx
    // translationContext.js
    import { createContext } from "react";

    export const TranslationContext = createContext();

    export const translations = {
      en: {
        greeting: "Hello World",
      },
      ru: {
        greeting: "Привет, мир!",
      },
      es: {
        greeting: "Hola, !",
      },
    };
    ```
  - Ahora vamos a App e importamos `TranslationContext` y `translations`
    ```jsx
    import {
      translations,
      TranslationContext,
    } from "./ReactDatos/Context/TranslationContext";
    ```
  - Ahora lo que haremos es crear un useState que controle translations, a su ves vamos a envolver nuestro componente con TranslationContext
    - Como vemos en el ejemplo, el componente `Provider` tiene una propiedad llamada `value`. Aquí pasaremos los valores que se asignarán a todos los hijos.
    ```jsx
    function App() {
      //  estado responsable del idioma actual
      const [lang, setLang] = React.useState("en");

      return (
        // Utiliza los datos de las translations[lang] mediante Context.Provider
        <TranslationContext.Provider value={translations[lang]}>
          {/* El subárbol en el que se accederá a context */}
          <div className={theme}>
            <NavBar user={user} />
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/profile" element={<Profile />}>
                <Route path="profile1" element={<Profile1 />} />
                <Route path="profile2" element={<Profile2 />} />
              </Route>
            </Routes>
          </div>
        </TranslationContext.Provider>
      );
    }
    ```
  - Ahora, para poder utilizar realmente su valor en cualquiera de estos componentes, ese componente tendrá que "suscribirse" a los cambios del contexto.
    - Una vez suscrito, ese componente se volverá a renderizar cada vez que cambie el `value` del contexto.
    - Con los **componentes funcionales**, lo hacemos utilizando el hook `React.useContext()`, que devuelve el `value` del contexto que se pasó a las props de valor del proveedor.
  - Ahora los componentes dentro de `<TranslationContext.Provider value={translations[lang]}>` estarán habilitados para acceder al contexto, pero, para utilizarlo debemos ir al componente especifico donde lo usaremos y debemos suscribirlo de la siguiente forma:
    1. Importamos **useContext** y contexto(TranslationContext):
       1. `import { TranslationContext } from "../ReactDatos/Context/TranslationContext";`
       2. `import { useContext } from "react";`
    2. Creamos una variable al que le asignaremos este contexto con **useContext** para suscribirlo (en mi caso translation, pero puedes llamarla a tu gusto): `const translation = useContext(TranslationContext);`
    3. Ya solo queda insertarla insertarla en el Html: `{translation.greeting}`
  ```jsx
  import { Link } from "react-router-dom";
  	//paso 1 importar
  import { useContext } from "react";
  import { TranslationContext } from "../ReactDatos/Context/TranslationContext";

  function Dashboard(props) {
      // paso 2 suscribirse a TranslationContext
      const translation = useContext(TranslationContext);

      return (
          <>
              <h1>Practicas</h1>
  	            {//paso 3 insertamos el greeting al html}
              <h2>{translation.greeting} {props.user}</h2>
              <Link to="/profile">Ir a ver perfil (uso de Link y Outlet)</Link>
          </>
      );
  }

  export default Dashboard;
  ```
- **Errores comunes `useContext` y `React-Router`**
  - React-router es muy estricto al usar Routes y Route, cuando suamos componentes de forma normal, el provider de useContext puede abrazar los componentes deseados, pero en caso de Routes, este debe ir fuera sino genera error
  - Ejemplo de como lo posemos usar con insertado normal
    - en este caso si podemos poner el contexto envolviendo Dashboard y sera el unico componente con acceso al contexto
  ```jsx

  function App() {
    return (
      <div className={theme}>
          <TranslationContext.Provider value={translations[lang]}>
            <Dashboard user={user} />
          </TranslationContext.Provider>
          <ReactDatos />
          <UserPrincipal user={user} onUserChange={handleUserChange} />}
      </div>
    )
  }
  ```

  - Caso opuesto con React-router, que nos dara un error ya que `Routes` no acepta dentro nada que no sea un `Route`
  ```jsx

  function App() {
    return (
      <div className={theme}>
      <Routes>
  				    {//nos da error tener el contexto en Routes}
          <TranslationContext.Provider value={translations[lang]}>
            <Route path="/" element={<Dashboard user={user} />} />
          </TranslationContext.Provider>
          <Route path="/profile" element={<Profile />} >
            <Route path="profile1" element={<Profile1 />} />
            <Route path="profile2" element={<Profile2 />} />
          </Route>
        </Routes>
      </div>
    )
  }
  ```

  - La forma correcta es que el contexto siempre este fuera de Routes aunque envuelva todos los componentes:
    ```jsx

    function App() {
      return (
        <div className={theme}>
    	    {//No genera errores 🤩}
        <TranslationContext.Provider value={translations[lang]}>
    	    <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/profile" element={<Profile />} >
              <Route path="profile1" element={<Profile1 />} />
              <Route path="profile2" element={<Profile2 />} />
            </Route>
          </Routes>
         </TranslationContext.Provider>
        </div>
      )
    }
    ```
  -
-

---

### Tema: **Levantando el estado**

### Notas

- A veces, podemos necesitar pasar valores de estado a diferentes componentes. Por ejemplo, de un componente hijo a un componente padre. Esto se suele hacer moviendo el estado interno de un componente, y los métodos que tienen control sobre ese estado, más arriba en la jerarquía de componentes. Al hacerlo, estamos "levantando el estado".
  - Imaginemos que queremos que nuestra aplicación tenga un modo oscuro y un modo claro. Al activar el modo oscuro, tendremos que añadir la clase CSS apropiada al elemento más alto del DOM dentro de la aplicación.
  - Un componente sencillo para activar el modo claro u oscuro es algo así:
    ```jsx
    function ThemeSelect() {
      const [theme, setTheme] = React.useState("day");

      function handleChange(e) {
        setTheme(e.target.value);
      }

      return (
        <select onChange={handleChange} className={theme}>
          <option value="day">Día</option>
          <option value="night">Noche</option>
        </select>
      );
    }
    ```
  - El valor del tema seleccionado se almacena dentro de la variable de estado `theme` y se utiliza como clase CSS para el elemento `<select>`. Sin embargo, para cambiar los estilos CSS de cada elemento de la interfaz del usuario de la app, debemos asignar esta clase al elemento más alto del DOM. Este elemento suele estar en el componente raíz de la `App`:
    ```jsx
    function App() {
      return (
        <div>
          <h2>¡Bienvenido!</h2>
          <ThemeSelect />
        </div>
      );
    }
    ```
  - Para trabajar con la variable de estado `theme` en toda la aplicación, en lugar de solo en el componente `ThemeSelect`, debemos hacer lo siguiente:
    1. Mueve la función `handleChange()` de `ThemeSelect` a `App`.
    2. Mueve el hook `useState` donde definimos `theme` de `ThemeSelect` a `App`.
    3. Añade una propiedad onChange al componente `ThemeSelect` que hará referencia a la función `handleChange()`.
  - Ahora el código de `App` debería tener este aspecto:
    ```jsx
    function App() {
      const [theme, setTheme] = React.useState("day");

      function handleThemeChange(e) {
        setTheme(e.target.value);
      }

      return (
        <div className={theme}>
          <h2>¡Bienvenido!</h2>
          <ThemeSelect onChange={handleThemeChange} />
        </div>
      );
    }
    ```

    - Observemos que cuando trasladamos esta funcionalidad de estado al componente raíz de `App`, cambiamos el nombre de la función `handleChange()`. Dentro del componente `ThemeSelect`, la funcionalidad de este método es inmediatamente clara solo por el nombre de este método. Sin embargo, en un componente más general como `App`, el nombre `handleChange()` podría ser demasiado vago. Deberíamos nombrar esta función basándonos en lo que realmente hace, teniendo en cuenta también el contexto del componente en el que está escrita.
    - Ten en cuenta también que estamos creando una propiedad llamada `onChange`, y estamos pasando el método `handleThemeChange()`. Esto significa que podemos acceder al método `handleThemeChange()` desde dentro del componente `ThemeSelect` utilizando `props.onChange`.
  - En cuanto al componente `ThemeSelect` propiamente dicho, podemos simplificarlo de la siguiente forma:
    ```jsx
    function ThemeSelect(props) {
      return (
        <select onChange={props.onChange}>
          <option value="day">Día</option>
          <option value="night">Noche</option>
        </select>
      );
    }
    ```

    - Dentro del componente `ThemeSelect`, estamos asignando la propiedad `onChange` de la etiqueta `<select>` para que sea `props.onChange`. Esto no es en absoluto necesario, pero es conveniente y lógico.
- **Uso del estado en múltiples componentes**
  - También podemos levantar el estado cuando queremos utilizar los mismos datos en varios componentes. Imaginemos que queremos añadir un componente `ThemeIcon` que mostrará el icono correspondiente dependiendo de si el usuario ha activado el modo día o noche:
    ```jsx
    function ThemeIcon(props) {
      return <div className="icon">{props.theme === "day" ? "🔆" : "🌙"}</div>;
    }
    ```
  - Además, puede ser útil indicar el valor seleccionado actualmente en el menú desplegable al seleccionar entre las opciones disponibles:
    ```jsx
    function ThemeSelect(props) {
      return (
        <select onChange={props.onChange}>
          <option value="day">Day {props.theme === "day" && "✅"}</option>
          <option value="night">Night {props.theme === "night" && "✅"}</option>
        </select>
      );
    }
    ```
  - Ahora solo debemor ir a app para pasar el prop a ThemeSelect y ThemeIcon
    ```jsx
    import ReactDatos from './ReactDatos/ReactDatos';
    import ThemeSelect from './ReactDatos/ThemeSelect/ThemeSelect';
    import ThemeIcon from './ReactDatos/ThemeIcon/ThemeIcon';

    function App() {

      //Funcion para ThemeSelect
      const [theme, setTheme] = useState('day');

      function handleThemeChange(e) {
        setTheme(e.target.value);
      }
      //Termina Funcion para ThemeSelect

      return (
        <div className={theme}>
          <Routes>
            <Route path="/react-datos" element={<ReactDatos />}>
            {//ThemeSelect agregamos dos props, theme={theme} y onChange={handleThemeChange}}
              <Route path='ThemeSelect' element={<ThemeSelect theme={theme} onChange={handleThemeChange} />} />
              <Route path='ThemeIcon' element={<ThemeIcon theme={theme} />} />
            </Route>
          </Routes>
        </div>
      )
    }

    export default App

    ```
  - Y por ultimo no olvidemos agregar el Link en nuestra ruta ReactDatos
    ```jsx
    import { Link, Outlet } from "react-router-dom";

    function ReactDatos() {
      return (
        <>
          <h1>Ract Datos</h1>
          <h2>Practicas sobre el sprint 15 de react (React datos)</h2>
          <Link to="ThemeSelect">Levantando el estado(ThemeSelect)</Link>
          <Link to="ThemeIcon">Icono del estado levantado(ThemeIcon)</Link>
          <Outlet />
        </>
      );
    }

    export default ReactDatos;
    ```

---

### Tema: JSX (Sintaxis y reglas).

### Notas

- **JSX (JavaScript XML)**
  1. **Regla del Elemento Raíz Único.**
     - JSX debe devolver un **único elemento padre**. No puedes devolver dos etiquetas `<div>` hermanas sin un contenedor.
       - **¿Por qué?** Porque JSX se traduce a una función de JavaScript (`React.createElement`) que solo puede devolver un objeto.
       - **La solución (Fragments):** Si no quieres añadir nodos innecesarios al DOM, usa `<> ... </>`.
         ```jsx
         // ❌ Error: Dos elementos raíz
         function MyComponent() {
           return (
             <h1>Hola</h1>
             <p>Mundo</p>
           );
         }

         // ✅ Correcto: Usando un Fragment
         function MyComponent() {
           return (
             <>
               <h1>Hola</h1>
               <p>Mundo</p>
             </>
           );
         }
         ```
  2. **Cerrar todas las etiquetas.**
     - A diferencia del HTML tradicional, donde podías olvidar cerrar un `<br>` o un `<img>`, en JSX **todas** las etiquetas deben cerrarse de forma estricta.
       - Las etiquetas sin contenido deben ser **autocerradas**: `<img />`, `<br />`, `<input />`.
       - HTML
       ```xml
       <img src="logo.png">
       <input type="text">
       <br>
       ```

       - JSX
         ```xml
         <img src="logo.png" />
         <input type="text" />
         <br />
         ```
     - **Componentes Personalizados**
       - Cuando creas tus propios componentes en React, la regla es la misma. Si el componente no tiene "hijos" (texto o más etiquetas dentro), puedes cerrarlo en la misma línea.
       ```xml
       // Si no tiene contenido dentro:
       <MiBoton />

       // Si tiene contenido dentro, se usa apertura y cierre:
       <MiBoton>
         Hacer click aquí
       </MiBoton>
       ```
  3. **CamelCase para los Atributos.**
     - JSX utiliza la convención de nombres de JavaScript en lugar de los atributos de HTML.
       - `class` se convierte en **`className`** (porque `class` es una palabra reservada en JS).
       - `for` se convierte en **`htmlFor`**.
       - Atributos de evento como `onclick` pasan a ser **`onClick`**.
       - `tabindex` pasa a ser **`tabIndex`**.
  4. **JavaScript dentro de JSX (Las llaves `{}`)**
     - Para usar lógica de JavaScript (variables, funciones, operaciones matemáticas) dentro de tu marcado, debes envolverlas en llaves.
       ```jsx
       const carModel = "Golf MK7";

       return (
         <h1>Mi coche es un {carModel}</h1> // Renderiza: Mi coche es un Golf MK7
       );
       ```

       - **Nota:** Dentro de las llaves solo puedes poner **expresiones** (cosas que devuelven un valor). No puedes poner sentencias como un `if` o un `for` directamente; para eso usamos operadores ternarios o `map`.
  5. **Estilos en Línea (Objetos)**
     - En JSX, el atributo `style` no recibe un string, sino un **objeto de JavaScript**. Por eso verás la sintaxis de "doble llave" `{{ }}`.
       ```jsx
       // La primera llave es para entrar a JS, la segunda es el objeto
       <div
         style={{ color: "red", fontSize: "20px", backgroundColor: "black" }}
       >
         Este texto es rojo como tu Golf.
       </div>
       ```

       - _Las propiedades CSS que usan guion (background-color) se escriben en camelCase (backgroundColor)._
  6. **Comentarios en JSX**
     - Los comentarios también deben ir dentro de llaves y usar la sintaxis multilínea de JS.
       ```jsx
       {
         /* Esto es un comentario en JSX */
       }
       ```
     -
  7.
- ...

---

### Tema: React Router

### Notas - Código referencias Tripleten/practicas propias/react-practicas

- Para usar rutas de react necesitamos instalarlo

```jsx
npm install react-router-dom
```

- Despues en nuestro Main.jsx importamos el contenedor de nuestro router
  - Para importar necesitamos traer BrowserRouter de react-router-dom que acabamos de instalar
  ```jsx
  import { BrowserRouter } from "react-router-dom";
  ```

  - BrowserRouter tiene la funcion **habilitar el enrutamiento del lado del cliente** (client-side routing) en tu aplicación.
  - Debe envolver nuestro componente App:
  -
  ```jsx
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ```
- Debe quedar asi:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom"; //Importamos

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {" "}
      //envolvemos App
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

---

### Ya podemos empezar a trabajar en App y crear nuestras rutas

- Debemos importar dos componentes que tambien vienen con react-router-dom
  ```jsx
  import { Routes, Route } from "react-router-dom";
  ```

  - Routes nos permite nos permite crear una especie de lista/contenedor que iremos creando una por una con Route.
  - Se usa como podría ser un <ul> y un <li>
- Importamos nuestro componente como hariamos normalmente:
  ```jsx
  import Profile from "./Profile/Profile";
  ```

  - Utilizamos **Routes** para crear nuestro contenedor de rutas de la siguiente manera
    ```jsx
    function App() {
      return (
        <>
          <Routes></Routes>
        </>
      );
    }
    ```
  - Ahora creamos nuestra primera ruta a travez de nuestro componente **Route:**
    ```jsx
    <Routes>
      <Route path="/profile" element={<Profile />} />
    </Routes>
    ```

    - ¿Como funciona **Route**?
      - primero usamos la etiqueta para el componente Route
        ```jsx
        <Route />
        ```
      - dentro recibe dos props: path y element:
        - path: Se le asigna la dirección en la URL puede ser “/about”, “/profile” o “/” dependiendo la funcionalidad:
          ```jsx
          <Route path="/"/> //ruta principal: http://localhost:3000/

          <Route path="/profile"/> //ruta a Pefil: http://localhost:3000/profile

          <Route path="/about"/> //ruta a About: http://localhost:3000/about
          ```

          - Extra:`path="*"`
            - _: Si usas `path="_"`(un asterisco), esa ruta atrapará cualquier URL que no coincida con las anteriores. Es ideal para mostrar un componente de "Error 404".`<Route path="\*" element={<NotFound />} />`
        - element: Este recibe nuestro componente a importado entre llaves **{…}** y es lo que hara que la ruta dirija a nuestro componente y no a una pagina en blanco o erronea:
          - Recuerda que el componente a usar debe estar importado.
          ```jsx
          <Route element={<Dashboard />} /> //componente principal

          <Route element={<Profile />} /> //componente Perfil

          <Route element={<About />} /> //componente About
          ```
    - Ahora en conjunto ya podemos usar Route
      - **¡OJO, Route siempre lleva un path y un element**
      ```jsx
      <Routes>
        // La unión de ambos props define la ruta completa
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
      </Routes>
      ```

---

### Link y NavLink

- Ya vimos como crear nuestro contender de rutas y sus respectivas rutas, pero… ¿Cómo navegamos entre ellas?
- Para eso llega **Link** otro componente de react-router-dom
  - Primero vamos a la parte donde crearemos nuestro navegador de componentes o nav, en este ejemplo usaremos Dashboard
    ```jsx
    import { Link } from "react-router-dom";
    ```
  - Link vinene a ser el remplazo de <a> para crear navs y se usa de forma similar
    ```jsx
    <Link to="/ComponenteDeseado"> Este enlace te manda a un componente<Link />
    ```
  - Ya implementado lo veriamos de esta forma:
    ```jsx
    import { Link } from "react-router-dom";

    function Dashboard() {
      return (
        <>
          <Link to="/profile">Ir a ver perfil</Link>
          <Link to="/about">Acerca de nosotros</Link>
        </>
      );
    }

    export default Dashboard;
    ```

    - Cabe recalcar que **Link no recarga la pagina** sino que reemplaza un componente por otro.
- **NavLink**
  - NavLink cumple la funcion de ser nuestra barra de navegacion
    - Para implementarla se recomienda crear un componente exlusivo con la funvion de ser nuestro nav, en mi caso lo llamare NavBar:
      - dentro creamos la etiqueta <nav> para que proximamente envuelva nuestros NavLinks
      ```jsx
      function NavBar() {
        return (
          <>
            <nav></nav>
          </>
        );
      }

      export default NavBar;
      ```
    - importamos NavLink al igual que los demas componentes
      ```jsx
      import { NavLink } from "react-router-dom";
      ```
    - Ahora si podemos usar NavLink de forma parecida a Link
      ```jsx
      import { NavLink } from "react-router-dom";

      function NavBar() {
        return (
          <>
            <nav>
              <NavLink to="/">Inicio</NavLink>
              <NavLink to="/profile">Ver perfil</NavLink>
            </nav>
          </>
        );
      }

      export default NavBar;
      ```
  - Ya sabemos crear nuestro NavBar ahora vamos a importarlo
    - Lo normal es que vaya dentro de un Header para darle estilos pero en mi caso lo implemente directo en app para el ejemplo
  - Importamos como si fuera un componente (no usaremos routes).
    - El orden es importante ya que al estar fuera de Routes, siempre estará accesible ya que recordemos que link no cambia de pagina, sino que renderisa el componente en esa misma sección sin alterar lo que esta fuera de routes.
    ```jsx
    import "./App.css";
    import { Routes, Route } from "react-router-dom";
    import Profile from "./Profile/Profile";
    import Dashboard from "./Dashboard/Dashboard";
    import NavBar from "./NavBar/NavBar";

    function App() {
      return (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      );
    }

    export default App;
    ```

    - Ejemplo de por que funciona:
      - imagina que tenemos 3 cajas
        [ Nav Bar ] → caja 1
        **[ Routes**
        **(Route path=”/” = Hola estoy en el inicio)**
                     **] → caja 2**
        [ footer ] → caja 3
      Routes al ser un componente de react-router-dom, nos permite traer un componente seleccionado y que sustituya al anterior sin afectar el resto del dom
      [ Nav Bar ] → caja 1
      **[ Routes**
      **(Route path=”/OtraPagina” = Me cambiaron de lugar 😨)**
                   **] → caja 2**
      [ footer ] → caja 3
      Esto nos permite mantener elementos estáticos como navbar y footer y no tener que estarlos importando en todos los componenetes.
- **¿Que diferencia tiene NavLink de Link?**
  - La principal diferencia es que NavLink permite aplicar estilos dinámicos cuando la Url actual coincide con la ruta del enlace.
    - Es decir
      - Url es: localhost:3000/profile
      - Ruta de NavLink=”/profile”
        - Estilo activo 👍🏽
  - ¿Pero como lo creamos?
    - En el mismo componente donde cramos nuestro NavLink (En este caso el componente NavBar)necesitamos crear una Función para pasarla como propiedad un className a cada NavLink
    - Podemos poner el nombre que deseemos, yo usare customClassName
      ```jsx
      const customClassName = ({ isActive }) => {
        return "menu__link" + (isActive ? " menu__link_active" : "");
      }; // 👆 el espacio es importante para que no se peguen las clases
      ```
    - Vamos a demenusar esta funcion
      - {isActive}:
        - Internamente, `NavLink` llama a tu función y le pasa un objeto con mucha información.
        - Al poner `{ isActive }` entre llaves dentro de los paréntesis, estás haciendo **desestructuración**. Le estás diciendo: _"De todo el objeto que me pasas, solo me interesa la propiedad `isActive`"_.
          - `isActive` es un **booleano** (`true` o `false`).
      - La lógica del Operador Ternario:
        - En la línea: `(isActive ? " menu__link--active" : "")` estoy usando un condicional rápido:
          - **¿Es `true`?**: Añade el string `" menu__link--active"`.
            - (**Ojo**: es importante dejar un **espacio** al principio del string para que no se pegue con la clase anterior).
          - **¿Es `false`?**: Añade un string vacío `""`, dejando la clase original intacta.
    - Ahora pasamos esta funcion como propiedad a nuestro NavLink:
      ```jsx
      <NavLink className={customClassName} to="/">
        Inicio
      </NavLink>
      ```

      - Ya terminado se veria asi:
        ```jsx
        import { NavLink } from "react-router-dom";
        import "./NavBar.css";

        function NavBar() {
          const customClassName = ({ isActive }) => {
            return "menu__link" + (isActive ? " menu__link_active" : "");
          };

          return (
            <>
              <nav>
                <NavLink className={customClassName} to="/">
                  Inicio
                </NavLink>
                <NavLink className={customClassName} to="/profile">
                  Ver perfil
                </NavLink>
              </nav>
            </>
          );
        }

        export default NavBar;
        ```
      - y un ejemplo rapido de como puede funcionar el css:
        ```css
        .menu__link {
          color: black;
          margin: 10px;
        }

        .menu__link_active {
          color: gray;
          text-decoration: underline;
        }
        ```

        - menu\_\_link: estado basico
        - menu\_\_link_active: una forma de decir “estoy presionado”
  - **¿Por qué no usar `<a>`?**
    - Si usas `<a href="/profile">`, el navegador solicita la página entera al servidor, la pantalla "parpadea" (se pone blanca un segundo) y pierdes el estado de tu aplicación.
    - Con <Link> o <NavLink> React Router intercepta el click, cambia la URL y solo redibuja el componente necesario. **¡Es lo que hace que la app se sienta instantánea!**
- **Enrutamiento anidado.**
  - Usando Link nos permite concatenar Url para que se rendericen junto a un componente
    ```jsx
    <Link to="Profile1"> Perfil 1 <Link />
    			// 👆 omitimos el "/" para que se concatene a la Url donde se umporta este Link
    ```

    - es decir si nuestra ruta es **localhost:3000/profile**
    - con este link sera **localhost:3000/profile/profile1**
  - Ahora para visalizar este componente regresamos a App.jsx
    ```jsx
    import "./App.css";
    import { Routes, Route } from "react-router-dom";
    import Profile from "./Profile/Profile";
    import Dashboard from "./Dashboard/Dashboard";
    import NavBar from "./NavBar/NavBar";

    function App() {
      return (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      );
    }

    export default App;
    ```

    - En la ruta correspondiente al enrutamiento anidado(Profile) abriremos y cerraremos nuestro componente para poder anidar los componentes deseados
      ```jsx
      //antes
      <Route path="/profile" element={<Profile />} />

      //ahora preparado para anidar componentes
      <Route path="/profile" element={<Profile />}>
      </Route>
      ```
    - Ahora importamos los componentes deseados en App
      ```jsx
      import Profile1 from "./Profile/Profile1/Profile1";
      import Profile2 from "./Profile/Profile2/Profile2";
      ```
    - Dentro de profile anidaremos los componentes con un Route.
      ```jsx
      <Route path="/profile" element={<Profile />}>
        <Route path="profile1" element={<Profile1 />} />
        <Route path="profile2" element={<Profile2 />} />
      </Route>
      ```
  - **<Outlet />**
    - Por ultimo necesitamos importar el componente Outlet, es una especie de marcador que indica que en su ubicación se renderizara el contenido de sus rutas secundarias.
      - Regresando a profile e importamos outlet
        ```jsx
        import { Link, Outlet } from "react-router-dom";
        ```
      - Y lo usaremos donde queremos que se imprima el contenido de los componentes anidados
        - Podemos ponerlo donde deseemos.
      ```jsx
      import { Link, Outlet } from "react-router-dom";

      function Profile() {
        return (
          <>
            <h1>hola</h1>
            <ul>
              <li>
                <Link to="profile1">Perfil No. 1</Link>
              </li>
              <li>
                <Link to="profile2">Perfil No. 2</Link>
              </li>
            </ul>
            <Outlet />
          </>
        );
      }

      export default Profile;
      ```
- **UseNavigate() -** **Navegación programática**
  - `useNavigate` es un **hook** proporcionado por la librería **React Router** (a partir de la versión 6) que te permite navegar de forma **programática** dentro de tu aplicación.
  - A diferencia del componente `<Link>`, que requiere que el usuario haga clic en un enlace físico, `useNavigate` te da una función que puedes disparar dentro de la lógica de tu código (por ejemplo, después de que se complete una petición a una API o al hacer clic en un botón que ejecuta otras funciones).
  - ¿Cómo se utiliza?
    - Para usarlo, primero debes importar el hook de `react-router-dom` y luego ejecutarlo para obtener la función de navegación.
      ```jsx
      import { useNavigate } from "react-router-dom";
      ```
    - Creamos una variable y le asignamos useNavigate
      ```jsx
      const navigate = useNavigate();
      ```
    - Podemos usarlo como un boton que nos dirija a la ruta deseada mdeiante onClick y pasandole navigate que a la ves tendra la ruta como parametro:
    ```jsx
    <button onClick={() => navigate("/")}>Volver al inicio</button>
    ```

    - Otra de las formas de usarlo es como un boton de retroceso, al precionarlo nos mandara a una pestaña atras solo pasando un -1 como parametro a navigate
    ```jsx
    <button onClick={() => navigate(-1)}>Volver al atras</button>
    ```
  - **Funcionalidades principales**
    - **Navegación básica:** Simplemente pasas la ruta como un string: `Maps('/dashboard')`.
    - **Navegación relativa:** Puedes moverte hacia atrás o adelante en el historial usando números:
      - `Maps(-1)` para volver a la página anterior (como el botón "Atrás" del navegador).
      - `Maps(1)` para ir una página hacia adelante.
    - **Reemplazar la ruta actual:** Si no quieres que la página actual guarde un registro en el historial (útil en logins o redirecciones), puedes usar la opción `replace`:
      - `Maps('/login', { replace: true })`.
    - **Pasar información (state):** Puedes enviar datos a la siguiente ruta sin que aparezcan en la URL:
      - `Maps('/perfil', { state: { from: 'dashboard', userId: 123 } })`.
- **Crear una página 404**
  - Que pasasria si un usuario quiere ingresar a una parte de nuestra pagina que no exiaste?
    - que pusiera /pagina-que-no-existe?
    - La app seguiera funcionando pero no vera nada relevante o necesario para el, muchas veces esto no sucede a drede, sino por error ortografico, quizas puso /profle comiendose una letra.
  - Para solucionar esto crearemos un componenete llamada PageNotFound.
    ```jsx
    function PageNotFound() {
      return (
        <>
          <h1>Error 404</h1>
          <p>Pagina no encontrada</p>
        </>
      );
    }

    export default PageNotFound;
    ```

    - Ahora lo asiociamos a una rota como cualquier otro componente.
    - Lo importamos en app y con Route lo anexamos.
    - ¿Que cambia?
      ```jsx
      <Route path="*" element={<PageNotFound />} />
      ```

      - En el path usamos “\*” para decir que nos referimos a cualquier ruta que no coincida con las que ya tenemos,
    - Asi cada que el usuario se equivoque de ruta, le aparecera el mensaje de Pagina no encontrada y sabra que cometio un error.
-
-

---

## Repaso

- Tenemos los siguientes Componentes de react router
- BrowserRouter
  - El "cerebro" que debe envolver toda tu aplicación (normalmente en `main.jsx` o `index.js`) para activar el routing.
- Routes
  - Es el contenedor principal. Su trabajo es examinar la URL actual del navegador (por ejemplo, `misitio.com/perfil`) y buscar entre todas las opciones cuál coincide.
    - Tiene dos propiedades (props) fundamentales:
    1. **`path`**: La "dirección" en la URL (ej. `"/profile"`).
    2. **`element`**: El componente de React que quieres mostrar (ej. `<Profile />`).
- Route
  - Es una instrucción individual. Define un camino específico y qué debe pasar cuando el usuario llega ahí.
- Link
  - El sustituto de la etiqueta `<a>`. Permite navegar sin recargar la página.
- NavLink
  - Igual que `Link`, pero sabe si está "activo", ideal para menús de navegación (puedes ponerle estilos especiales al enlace seleccionado).
- Maps
  - Se usa para redirecciones forzadas (por ejemplo, si un usuario no está logueado, lo mandas a `/login`).
- Hooks (Lógica y Datos)
  - Estos se usan dentro de tus componentes funcionales:
    - **`useNavigate`**: Es una función que te permite mover al usuario programáticamente.
      > _Ejemplo: Después de que alguien hace clic en "Enviar Formulario", lo mandas a la página de "Gracias"._
    - **`useParams`**: Superútil para rutas dinámicas. Si tu ruta es `/perfil/:id`, este hook te dice cuál es ese `id`.
    - **`useLocation`**: Te da información sobre la URL actual (la ruta, los parámetros de búsqueda, etc.).
- Ejemplo de cómo se verían juntos
  - Así es como podrías expandir tu archivo `App.jsx` para que sea funcional:
  ```jsx
  import { Routes, Route, Link, useNavigate } from "react-router-dom";

  function App() {
    const navigate = useNavigate();

    return (
      <div>
        <nav>
          {/* Usamos Link en lugar de <a href="..."> */}
          <Link to="/">Inicio</Link>
          <Link to="/profile">Perfil</Link>
        </nav>

        <button onClick={() => navigate(-1)}>Volver Atrás</button>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {/* Ruta para manejar errores 404 */}
          <Route path="*" element={<h1>404 - No encontrado</h1>} />
        </Routes>
      </div>
    );
  }
  ```

---

### Tema: 1. Fundamentos de React

### Recordar

### Notas

- **Arquitectura de Componentes (Funcionales).**
  - **¿Qué es un Componente Funcional?**
    - En términos simples, un componente funcional es una **función de JavaScript** que devuelve elementos de React (escritos en JSX). Su objetivo es describir cómo debe verse una parte de la interfaz en función de los datos que recibe.
      ```jsx
      function Saludo() {
        return <h1>Hola, bienvenido a mi app</h1>;
      }
      ```
  - **El Principio de Responsabilidad Única**
    - Un error común al empezar es crear componentes gigantes. La arquitectura ideal sigue la regla de: **"Un componente, una tarea"**.
      - **Componente de Presentación:** Solo se encarga de mostrar datos (ej. un botón, una tarjeta de usuario).
      - **Componente de Contenedor:** Se encarga de la lógica o de agrupar otros componentes (ej. un formulario, una lista de productos).
  - **Composición de Componentes**
    - La arquitectura de React es **jerárquica**. Los componentes se anidan unos dentro de otros para formar interfaces complejas. Esto permite que el código sea mantenible y fácil de depurar.
    - Ejemplo de Estructura:
    Imagina una aplicación de lista de tareas:
    - `App` (Componente Raíz)
      - `Header`
      - `TodoForm` (Input y Botón)
      - `TodoList` (Contenedor de los items)
        - `TodoItem` (Cada tarea individual)
  - **Reutilización y Modularidad**
    - La gran ventaja es que puedes definir un componente una vez y usarlo en cualquier parte de tu aplicación, o incluso en otros proyectos, simplemente exportándolo e importándolo.
      ```jsx
      // Boton.js
      export function Boton(props) {
        return <button className="btn-primario">{props.texto}</button>;
      }

      // App.js
      import { Boton } from "./Boton";

      function App() {
        return (
          <div>
            <Boton texto="Guardar" />
            <Boton texto="Cancelar" />
          </div>
        );
      }
      ```
  - Conceptos Clave a Retener:
    1. **Declarativo:** Tú describes _qué_ quieres ver, React se encarga de actualizar el DOM por ti.
    2. **Independencia:** Un cambio en un componente no debería romper el resto de la aplicación si la arquitectura es limpia.
    3. **Hooks:** Aunque los veremos más adelante, recuerda que los componentes funcionales usan _Hooks_ (como `useState`) para manejar su lógica interna.
  - **Extras:**
    - ¿Qué es un Componente de Bajo Nivel (Hoja)?
      - En la arquitectura de software, visualizamos la aplicación como un **árbol genealógico**.
        - **Componentes Raíz/Contenedores:** Están en la parte superior (ej. `App`, `Dashboard`). Controlan la lógica y el estado.
        - **Componentes Hoja (Leaf Components):** Son los que están al final de las ramas. No tienen hijos propios. Son los elementos más básicos de tu interfaz.
      - **Características de un componente hoja:**
        - **Son "Tontos":** No saben nada de la base de datos ni de la lógica de negocio.
        - **Altamente Reutilizables:** Un componente `Boton` o `Input` es una "hoja". Puedes usar el mismo botón en el Login y en el Perfil.
        - **Puros:** Reciben datos por `props` y pintan algo. Si les das la misma prop, siempre se ven igual.
    - **Composición y `props.children`**
      - La **Composición** es la capacidad de React para que un componente "envuelva" a otros, tratándolos como contenido dinámico.
      - El problema que resuelve
        - Imagina que creas un componente `Modal`. Si no usas composición, tendrías que crear un `ModalLogin`, un `ModalRegistro` y un `ModalError`. ¡Mucho código repetido!
      - La solución: `props.children`
        - `children` es una prop especial que React pasa automáticamente a todos los componentes. Representa **todo lo que escribas entre las etiquetas de apertura y cierre** del componente.
      - Ejemplo Práctico: El componente "Contenedor"
        - Creamos un componente `CajaDecorada` que solo pone un borde dorado:
        ```jsx
        // Componente que usa composición
        const CajaDecorada = ({ children }) => {
          return (
            <div style={{ border: "5px solid gold", padding: "20px" }}>
              {children} {/* Aquí se inyectará lo que pongas dentro */}
            </div>
          );
        };

        // Uso del componente
        function App() {
          return (
            <CajaDecorada>
              <h1>Este es el hijo</h1>
              <p>Puedo meter cualquier cosa aquí dentro.</p>
              <button>Soy un botón dentro de la caja</button>
            </CajaDecorada>
          );
        }
        ```
- **JSX (Sintaxis y reglas).**
- **Props (Paso de datos y `children`).**
- **Renderizado condicional y de listas (`map` y `keys`).**
- **Manejo de Eventos.**

---

### Tema: Algunos Synthetic Event

### Recordar

### Notas

- Los **Synthetic Events** se categorizan según el tipo de interacción. Los más comunes divididos por su "familia" son:
- **1. Eventos de Formulario (Los más usados)**
  - Además de `onChange`, estos son vitales para manejar datos:
    - **`onSubmit`**: Se usa en la etiqueta `<form>`. Es mejor que un botón con `onClick` porque detecta cuando el usuario presiona "Enter".
    - **`onInput`**: Muy similar a `onChange`, pero en React se prefiere `onChange` por consistencia.
    - **`onFocus` / `onBlur`**: Se disparan cuando entras o sales de un campo (útil para validaciones).
- **2. Eventos de Ratón (Mouse Events)**
  - Controlan cómo el usuario mueve el puntero:
    - **`onMouseEnter` / `onMouseLeave`**: Ideales para efectos de "hover" (cuando pasas el ratón por encima).
    - **`onMouseDown` / `onMouseUp`**: Detectan el momento exacto en que se presiona o suelta el botón del ratón.
    - **`onMouseMove`**: Se dispara cada vez que el ratón se mueve un píxel (cuidado con el rendimiento aquí).
- **3. Eventos de Teclado**
  - Para juegos o atajos de teclado:
    - **`onKeyDown`**: Se dispara cuando presionas la tecla.
    - **`onKeyUp`**: Se dispara cuando sueltas la tecla.
    - **`onKeyPress`**: (Obsoleto en estándares modernos, se prefiere `onKeyDown`).
- **4. Eventos de Portapapeles**
  - **`onCopy`**, **`onCut`**, **`onPaste`**: Muy útiles si quieres evitar que alguien pegue texto en un campo de contraseña o para dar formato automático al copiar.
- **Resumen:**
  | **Categoría**      | **Eventos Populares**                                      |
  | ------------------ | ---------------------------------------------------------- |
  | **Teclado**        | `onKeyDown`, `onKeyUp`                                     |
  | **Enfoque**        | `onFocus`, `onBlur`                                        |
  | **Formulario**     | `onChange`, `onInput`, `onInvalid`, `onSubmit`             |
  | **Ratón**          | `onClick`, `onDoubleClick`, `onDrag`, `onDrop`, `onScroll` |
  | **Táctil (Móvil)** | `onTouchStart`, `onTouchMove`, `onTouchEnd`                |
  | **Imagen**         | `onLoad`, `onError`                                        |

---

### Tema: onClick vs onChange

### Recordar

### Notas

- **`onClick`**:
  - Se dispara cuando el usuario hace clic en un elemento (comúnmente botones o enlaces).
- **`onChange`**:
  - Se dispara cada vez que el valor de un elemento de formulario cambia (como un `<input>`, `<select>` o `<textarea>`).
- **Diferencias importantes**
  | Característica    | **`onClick`**                                | **`onChange`**                                                     |
  | ----------------- | -------------------------------------------- | ------------------------------------------------------------------ |
  | Uso principal     | Ejecutar una acción (enviar, borrar, abrir). | Capturar la entrada de datos del usuario.                          |
  | Cuándo ocurre     | Al presionar y soltar el mouse.              | Cada vez que el usuario escribe una tecla o selecciona una opción. |
  | Información clave | `event.target` (el elemento clicado).        | `event.target.value` (el texto o valor nuevo).                     |
- **⚠️ Una distinción vital en React vs HTML**
  - En el HTML "puro" (Vanilla JS), el evento `onchange` solo se dispara cuando el usuario **deja de interactuar** con el elemento (por ejemplo, cuando escribes en un input y haces clic fuera de él).
  - Sin embargo, **en React, `onChange` es inmediato**. Se dispara con cada pulsación de tecla. Esto es lo que nos permite tener "componentes controlados", donde el estado de React y lo que ves en pantalla están perfectamente sincronizados en tiempo real.
  ###

---

### Tema: Synthetic Event

### Recordar

### Notas

- **¿Qué es un Synthetic Event?**
  - React no usa los eventos del navegador directamente, sino que los envuelve en una "capa" propia por razones de rendimiento y compatibilidad entre distintos navegadores, para asegurar que funcionen de la misma manera en todos ellos (Chrome, Safari, Firefox, Edge, etc.).
- **Características claves:**
  - **Consistencia Multi-Navegador**
    - Un `SyntheticEvent` tiene las mismas propiedades independientemente del navegador. No necesitas preguntar si existe `e.target` o `e.srcElement`.
  - **Acceso al Evento Nativo**
    - Si por alguna razón técnica necesitas el evento original que disparó el navegador, puedes acceder a él mediante la propiedad `nativeEvent`:
      ```jsx
      function handleClick(e) {
        console.log(e.nativeEvent); // El evento real del navegador
      }
      ```
    - ¿Qué es un **nativeEvent**?
      - El `nativeEvent` es una propiedad dentro del objeto **SyntheticEvent** de React que contiene el **evento original del navegador.**
      - Cuando interactúas con un elemento (haces clic, escribes, etc.), el navegador genera un evento nativo (como un `PointerEvent` o un `KeyboardEvent`). React intercepta ese evento y lo envuelve en su propia "capa" (el SyntheticEvent). `nativeEvent` es, literalmente, el objeto original que el navegador creó antes de que React lo procesara.
      - **¿Por qué existe?**
        - Aunque el SyntheticEvent de React cubre el 99% de los casos de uso, a veces necesitas información muy específica que solo el navegador proporciona o que React no ha normalizado.
      - Ejemplo de uso:
        ```jsx
        function handleOnClick(e) {
          console.log("Evento de React:", e); // SyntheticBaseEvent
          console.log("Evento Real del Navegador:", e.nativeEvent); // PointerEvent o MouseEvent

          // Ejemplo: Acceder al timestamp real del sistema
          console.log("Tiempo exacto:", e.nativeEvent.timeStamp);
        }
        ```
  - **Event Pooling (Nota histórica)**
    - **Importante:** Antes de React 17, los SyntheticEvents se "reciclaban" por rendimiento. Esto significaba que no podías acceder al evento de forma asíncrona (dentro de un `setTimeout`, por ejemplo) porque el objeto se limpiaba. **A partir de React 17, esto ya no sucede** y los eventos ya no se reutilizan, haciendo el código más intuitivo.
- ,
- ,

---
