import type { Request, Response } from "express";
import { pacienteService } from "./paciente.service.js";

export const pacienteController = {
  // --------------------------------------------------------
  // GET /pacientes
  // --------------------------------------------------------
  getAll(req: Request, res: Response) {
    const pacientes = pacienteService.getAll();
    return res.json(pacientes);
  },

  // --------------------------------------------------------
  // GET /pacientes/:id
  // --------------------------------------------------------
  getById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Falta el parámetro ID" });
    }

    const paciente = pacienteService.getById(id);

    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    return res.json(paciente);
  },

  // --------------------------------------------------------
  // POST /pacientes
  // --------------------------------------------------------
  create(req: Request, res: Response) {
    const data = req.body;

    const nuevo = pacienteService.create(data);
    return res.status(201).json(nuevo);
  },

  // --------------------------------------------------------
  // PUT /pacientes/:id
  // --------------------------------------------------------
  update(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Falta parámetro ID" });
    }

    const changes = req.body;

    const actualizado = pacienteService.update(id, changes);

    if (!actualizado) {
      return res.status(404).json({ message: "Paciente no encontrado o no se pudo actualizar" });
    }

    return res.json(actualizado);
  },

  // --------------------------------------------------------
  // DELETE /pacientes/:id
  // --------------------------------------------------------
  delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Falta parámetro ID" });
    }

    const eliminado = pacienteService.delete(id);

    if (!eliminado) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    return res.json({ message: "Paciente eliminado", eliminado });
  },

  // --------------------------------------------------------
  // CONSULTAS
  // --------------------------------------------------------
  addConsulta(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Falta parámetro ID" });
    }

    const nueva = pacienteService.addConsulta(id, req.body);

    if (!nueva) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    return res.status(201).json(nueva);
  },

  updateConsulta(req: Request, res: Response) {
    const { id, consultaId } = req.params;

    if (!id || !consultaId) {
      return res.status(400).json({ message: "Faltan parámetros (id o consultaId)" });
    }

    const actualizada = pacienteService.updateConsulta(id, consultaId, req.body);

    if (!actualizada) {
      return res.status(404).json({ message: "Consulta no encontrada" });
    }

    return res.json(actualizada);
  },

  deleteConsulta(req: Request, res: Response) {
    const { id, consultaId } = req.params;

    if (!id || !consultaId) {
      return res.status(400).json({ message: "Faltan parámetros (id o consultaId)" });
    }

    const eliminada = pacienteService.deleteConsulta(id, consultaId);

    if (!eliminada) {
      return res.status(404).json({ message: "Consulta no encontrada" });
    }

    return res.json({ message: "Consulta eliminada", eliminada });
  },

  // --------------------------------------------------------
  // TRATAMIENTOS
  // --------------------------------------------------------
  addTratamiento(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Falta parámetro ID" });
    }

    const nuevo = pacienteService.addTratamiento(id, req.body);

    if (!nuevo) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    return res.status(201).json(nuevo);
  },

  updateTratamiento(req: Request, res: Response) {
    const { id, tratamientoId } = req.params;

    if (!id || !tratamientoId) {
      return res.status(400).json({ message: "Faltan parámetros (id o tratamientoId)" });
    }

    const actualizado = pacienteService.updateTratamiento(id, tratamientoId, req.body);

    if (!actualizado) {
      return res.status(404).json({ message: "Tratamiento no encontrado" });
    }

    return res.json(actualizado);
  },

  deleteTratamiento(req: Request, res: Response) {
    const { id, tratamientoId } = req.params;

    if (!id || !tratamientoId) {
      return res.status(400).json({ message: "Faltan parámetros (id o tratamientoId)" });
    }

    const eliminado = pacienteService.deleteTratamiento(id, tratamientoId);

    if (!eliminado) {
      return res.status(404).json({ message: "Tratamiento no encontrado" });
    }

    return res.json({ message: "Tratamiento eliminado", eliminado });
  },
};
