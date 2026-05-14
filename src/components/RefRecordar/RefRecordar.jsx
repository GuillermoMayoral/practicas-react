import { useRef, useState } from "react";

function RefRecordar() {
    // 1. EL POST-IT ETERNO (useRef)
    const recordatorioRef = useRef('Escribe algo aquí...');

    // 2. LA VARIABLE VOLÁTIL (Variable normal)
    // eslint-disable-next-line react-hooks/immutability
    let variableNormal = "Soy una variable normal";

    // 3. EL ESTADO - Nuestro motor de renderizado
    const [cuenta, setCuenta] = useState(0);

    // Esta función solo sirve para forzar a React a redibujar la pantalla
    const forzarRender = () => setCuenta(prev => prev + 1);

    const manejarCambioRef = (e) => {
        recordatorioRef.current = e.target.value;
    };

    const manejarCambioNormal = (e) => {
        // eslint-disable-next-line react-hooks/immutability
        variableNormal = e.target.value;
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>
                <h2>Ciclo de Renderizado: {cuenta}</h2>
                <button onClick={forzarRender}>🔄 Forzar Re-render General</button>
            </div>

            <hr />

            {/* SECCIÓN 1: LA REF */}
            <div style={{ border: '2px solid blue', padding: '15px', marginBottom: '10px' }}>
                <h3>1. Post-it con Ref (Persistente)</h3>
                <input type="text" onChange={manejarCambioRef} placeholder="Escribe algo..." />
                {/* Al hacer clic, forzamos render para ver si la Ref guardó el valor */}
                <button onClick={forzarRender}>💾 Guardar y Actualizar Pantalla</button>

                <p>Valor en Memoria: <span style={{ color: 'blue' }}>{recordatorioRef.current}</span></p>
                <small>✅ Sobrevive porque la Ref está fuera del ciclo de limpieza.</small>
            </div>

            {/* SECCIÓN 2: LA VARIABLE NORMAL */}
            <div style={{ border: '2px solid red', padding: '15px' }}>
                <h3>2. Variable Local (Se resetea)</h3>
                <input type="text" onChange={manejarCambioNormal} placeholder="Escribe algo..." />
                {/* Al hacer clic, forzamos render... y aquí verás la tragedia */}
                <button onClick={forzarRender}>💾 Guardar y Actualizar Pantalla</button>

                <p>Valor en Memoria: <span style={{ color: 'red' }}>{variableNormal}</span></p>
                <small>❌ Se borra porque al redibujar, la variable se vuelve a crear.</small>
            </div>
        </div>
    );
}

export default RefRecordar;