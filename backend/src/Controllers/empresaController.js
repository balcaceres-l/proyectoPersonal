// backend/src/Controllers/empresaController.js
import * as empresaService from '../Services/empresaService.js';

export const getEmpresaPorId = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        console.log('Obteniendo empresa:', id);
        
        const empresa = await empresaService.obtenerEmpresaPorId(id);
        
        console.log('Empresa encontrada');
        res.status(200).json(empresa);
        
    } catch (err) {
        console.error('Error en getEmpresaPorId:', err);
        next(err);
    }
};

export const getEmpresaDelUsuario = async (req, res, next) => {
    try {
        const { idUsuario } = req.params; 
        
        console.log('Obteniendo empresa del usuario:', idUsuario);
        
        const empresa = await empresaService.obtenerEmpresaPorUsuario(idUsuario);
        
        console.log('Empresa del usuario encontrada');
        res.status(200).json(empresa);
        
    } catch (err) {
        console.error('Error en getEmpresaDelUsuario:', err);
        next(err);
    }
};

export const getEmpresasPublicas = async (req, res, next) => {
    try {
        const { nombre } = req.query; 
        const empresas = await empresaService.obtenerEmpresasConValoracion(nombre);
        res.status(200).json(empresas);
    } catch (err) {
        next(err);
    }
};

export const getBuscarEmpresas = async (req, res, next) => {
    try {
        const { nombre } = req.query;
        
        if (!nombre) {
            const error = new Error("Debes proporcionar un nombre para buscar");
            error.statusCode = 400;
            throw error;
        }
        
        console.log('🔍 Buscando empresas:', nombre);
        
        const empresas = await empresaService.buscarEmpresasPorNombre(nombre);
        
        console.log(`✅ ${empresas.length} empresas encontradas`);
        res.status(200).json(empresas);
        
    } catch (err) {
        console.error('Error en getBuscarEmpresas:', err);
        next(err);
    }
};

export const postCrearEmpresa = async (req, res, next) => {
    try {
        const { nombre, direccion, descripcion, redesSociales } = req.body;
        
        if (!nombre || nombre.trim() === '') {
            const error = new Error("El nombre de la empresa es obligatorio");
            error.statusCode = 400;
            throw error;
        }

        const nuevaEmpresa = await empresaService.crearEmpresa(
            nombre, direccion, descripcion, redesSociales
        );
        res.status(201).json({
            empresa: nuevaEmpresa
        });
        
    } catch (err) {
        next(err);
    }
};

export const putActualizarEmpresa = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        console.log('Actualizando empresa:', id);
        console.log(' Body recibido:', Object.keys(req.body));

        let datosActualizados = { ...req.body };
        delete datosActualizados.idempresa;

        if (datosActualizados.nombre !== undefined) {
            if (!datosActualizados.nombre || datosActualizados.nombre.trim() === '') {
                const error = new Error("El nombre no puede estar vacío");
                error.statusCode = 400;
                throw error;
            }
        }

        Object.keys(datosActualizados).forEach(key => {
            if (datosActualizados[key] === '' || 
                datosActualizados[key] === 'null' || 
                datosActualizados[key] === 'undefined') {
                datosActualizados[key] = null;
            }
        });

        console.log(' Datos a guardar:', datosActualizados);
        const empresaActualizada = await empresaService.actualizarEmpresa(id, datosActualizados);

        if (!empresaActualizada) {
            const error = new Error("Empresa no encontrada");
            error.statusCode = 404;
            throw error;
        }

        console.log('Empresa actualizada exitosamente');
        res.status(200).json(empresaActualizada);
        
    } catch (err) {
        console.error('Error en putActualizarEmpresa:', err);
        next(err);
    }
};

export const deleteEmpresa = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        console.log('Eliminando empresa:', id);

        const eliminado = await empresaService.eliminarEmpresa(id);
        if (!eliminado) {
            const error = new Error("Empresa no encontrada");
            error.statusCode = 404;
            throw error;
        }

        console.log('Empresa eliminada exitosamente');
        res.status(200).json({ 
            message: "Empresa eliminada exitosamente",
            success: true 
        });
        
    } catch (err) {
        console.error('Error en deleteEmpresa:', err);
        next(err);
    }
};