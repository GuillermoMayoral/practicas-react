import React from "react";
import { createContext } from "react";

export const TranslationContext = createContext();

export const translations = {
    en: {
        greeting: 'Hello ',
    },
    ru: {
        greeting: 'Привет, !',
    },
    es: {
        greeting: 'Hola, !',
    },
};
