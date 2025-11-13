// backend/src/Routes/empresaRoute.js
import { Router } from "express";
import * as empresaController from "../Controllers/empresaController.js"; // Nota: Cambié a empresaController.js (sin 's' al final)
import { 
    createEmpresaValidators, 
    updateEmpresaValidators, 
    idEmpresaValidator,
    runValidations 
} from "../Middleware/validator.js";

const router = Router();

router.get('/', empresaController.getEmpresasPublicas);

router.get('/', empresaController.getBuscarEmpresas);

router.get('/:id', 
    runValidations(idEmpresaValidator),
    empresaController.getEmpresaPorId
);

router.get('/usuario/:idUsuario', 
    runValidations(idEmpresaValidator), // Asumiendo que valida idUsuario
    empresaController.getEmpresaDelUsuario
);

router.post('/', 
    runValidations(createEmpresaValidators),
    empresaController.postCrearEmpresa
);

router.put('/:id', 
    runValidations(updateEmpresaValidators),
    empresaController.putActualizarEmpresa
);

router.delete('/:id', 
    runValidations(idEmpresaValidator), 
    empresaController.deleteEmpresa
);

export default router;