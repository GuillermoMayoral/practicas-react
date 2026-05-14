import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Profile from "./Profile/Profile"
import Dashboard from "./Dashboard/Dashboard"
import NavBar from "./NavBar/NavBar";

import Profile1 from './Profile/Profile1/Profile1';
import Profile2 from './Profile/Profile2/Profile2';

import PageNotFound from './PageNotfound/PageNotFound';

import ReactDatos from './ReactDatos/ReactDatos';
import ThemeSelect from './ReactDatos/ThemeSelect/ThemeSelect';
import ThemeIcon from './ReactDatos/ThemeIcon/ThemeIcon';

import UserPrincipal from './ReactDatos/User/User';

import { translations, TranslationContext } from './ReactDatos/Context/TranslationContext';

//Importando componente para ejemplificar useRef
import RefRecordar from './RefRecordar/RefRecordar';

function App() {

  //Funcion para ThemeSelect 
  const [theme, setTheme] = useState('day');

  function handleThemeChange(e) {
    setTheme(e.target.value);
  }
  //Termina Funcion para ThemeSelect
  //Funcion para Levantar estado de User
  const [user, setUser] = useState('');

  function handleUserChange(nuevoNombre) {
    setUser(nuevoNombre);
  }

  if (user == '') {
    setUser(prompt("Por favor, ingresa tu nombre:"))
  }

  const [lang, setLang] = useState('es');

  function handleLangChange(e) {
    setLang(e.target.value);
  }


  return (
    <div className={theme}>
      < NavBar user={user} />
      <TranslationContext.Provider value={translations[lang]}>
        <Routes>
          <Route path="/" element={<Dashboard user={user} onChange={handleLangChange} />} />
          <Route path="/profile" element={<Profile />} >
            <Route path="profile1" element={<Profile1 />} />
            <Route path="profile2" element={<Profile2 />} />
          </Route>
          <Route path="/react-datos" element={<ReactDatos />}>
            <Route path='ThemeSelect' element={<ThemeSelect theme={theme} onChange={handleThemeChange} />} />
            <Route path='ThemeIcon' element={<ThemeIcon theme={theme} />} />
          </Route>
          <Route path="/user" element={<UserPrincipal user={user} onUserChange={handleUserChange} />} />
          <Route path="refRecordar" element={<RefRecordar />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </TranslationContext.Provider>
    </div>
  )
}

export default App
