//Algoritmo que cuidará das rotas

import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import Cadastro from '../../../.history/Frontend/src/pages/Register_20250814072448';

export function Routes() {
    return (
        <BrowserRouter>
            {/*Pagina de registro*/}
            <RouterRoutes>
                <Route path="/register" element={<Cadastro />} />
            </RouterRoutes>
        </BrowserRouter>
    )
}