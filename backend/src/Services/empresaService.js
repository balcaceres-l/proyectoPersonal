// backend/src/Services/empresaService.js
import pool from '../Config/db.js'; 
export const obtenerEmpresaPorId = async (idempresa) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query(`
            SELECT 
                e.*,
                AVG(r.calificacion) AS valoracionPromedio,
                COUNT(r.idcalificacion) AS totalResenas
            FROM empresas e
            LEFT JOIN resena r ON e.idempresa = r.idempresa
            WHERE e.idempresa = ?
            GROUP BY e.idempresa
        `, [idempresa]);

        if (rows.length === 0) {
            const error = new Error("Empresa no encontrada");
            error.statusCode = 404;
            throw error;
        }

        return rows[0];
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
};

export const obtenerEmpresasConValoracion = async (nombre = '') => {
    let conn;
    try {
        conn = await pool.getConnection();
        let query = `
            SELECT 
                e.*,
                AVG(r.calificacion) AS valoracionPromedio,
                COUNT(r.idcalificacion) AS totalResenas
            FROM empresas e
            LEFT JOIN resena r ON e.idempresa = r.idempresa
        `;
        const params = [];

        if (nombre) {
            query += ' WHERE e.nombre LIKE ?';
            params.push(`%${nombre}%`);
        }

        query += ' GROUP BY e.idempresa';

        const [rows] = await conn.query(query, params);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
};

export const crearEmpresa = async (nombre, direccion, descripcion, redesSociales) => {
    let conn;
    try {
        conn = await pool.getConnection();

        // Verificar si ya existe
        const [existe] = await conn.query('SELECT * FROM empresas WHERE nombre = ?', [nombre]);
        if (existe) {
            const error = new Error("Ya existe una empresa con ese nombre");
            error.statusCode = 400;
            throw error;
        }

        // Insertar nueva empresa
        const result = await conn.query(
            'INSERT INTO empresas (nombre, direccion, descripcion, redesSociales) VALUES (?, ?, ?, ?)',
            [nombre, direccion, descripcion, redesSociales]
        );

        return {
            idempresa: result.insertId,
            nombre,
            direccion,
            descripcion,
            redesSociales,
        };
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
};

// Actualizar empresa (sin logo)
export const actualizarEmpresa = async (idempresa, datosActualizados) => {
    let conn;
    try {
        conn = await pool.getConnection();

        // Verificar si existe
        const [empresaActual] = await conn.query('SELECT * FROM empresas WHERE idempresa = ?', [idempresa]);
        if (!empresaActual) {
            const error = new Error("Empresa no encontrada");
            error.statusCode = 404;
            throw error;
        }

        // Verificar nombre único si se actualiza
        if (datosActualizados.nombre && datosActualizados.nombre !== empresaActual.nombre) {
            const [existeNombre] = await conn.query(
                'SELECT * FROM empresas WHERE nombre = ? AND idempresa != ?',
                [datosActualizados.nombre, idempresa]
            );
            if (existeNombre) {
                const error = new Error("Ya existe otra empresa con ese nombre");
                error.statusCode = 400;
                throw error;
            }
        }

        // Construir consulta de actualización
        const campos = [];
        const valores = [];
        for (const [key, value] of Object.entries(datosActualizados)) {
            campos.push(`${key} = ?`);
            valores.push(value);
        }

        if (campos.length === 0) return null;

        valores.push(idempresa);

        const query = `UPDATE empresas SET ${campos.join(', ')} WHERE idempresa = ?`;
        const result = await conn.query(query, valores);

        if (result.affectedRows === 0) return null;

        // Retornar empresa actualizada
        const [empresaActualizada] = await conn.query('SELECT * FROM empresas WHERE idempresa = ?', [idempresa]);
        return empresaActualizada;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
};

export const eliminarEmpresa = async (idempresa) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [empresa] = await conn.query('SELECT * FROM empresas WHERE idempresa = ?', [idempresa]);
        if (!empresa) {
            const error = new Error("Empresa no encontrada");
            error.statusCode = 404;
            throw error;
        }
        await conn.query('UPDATE usuario SET idempresa = NULL WHERE idempresa = ?', [idempresa]);

        // Eliminar empresa
        const result = await conn.query('DELETE FROM empresas WHERE idempresa = ?', [idempresa]);
        return result.affectedRows > 0;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
};

// Buscar empresas por nombre
export const buscarEmpresasPorNombre = async (nombre) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT * FROM empresas WHERE nombre LIKE ?', [`%${nombre}%`]);
        return rows;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
};

// Verificar si existe empresa
export const existeEmpresa = async (idempresa) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT 1 FROM empresas WHERE idempresa = ? LIMIT 1', [idempresa]);
        return rows.length > 0;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
};
export const obtenerEmpresaPorUsuario = async (idUsuario) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [usuario] = await conn.query('SELECT * FROM usuario WHERE idusuario = ?', [idUsuario]);
        if (!usuario) {
            const error = new Error("Usuario no encontrado");
            error.statusCode = 404;
            throw error;
        }

        if (!usuario.idempresa) {
            const error = new Error("El usuario no tiene empresa asociada");
            error.statusCode = 404;
            throw error;
        }

        // Obtener empresa
        const [empresa] = await conn.query('SELECT * FROM empresas WHERE idempresa = ?', [usuario.idempresa]);
        if (!empresa) {
            const error = new Error("Empresa no encontrada");
            error.statusCode = 404;
            throw error;
        }

        return empresa;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
};
