import { Router } from "express";
import { pacienteController } from "./paciente.controller.js";


const router = Router();

router.get("/", pacienteController.getAll);
router.get("/:id", pacienteController.getById);
router.post("/", pacienteController.create);
router.put("/:id", pacienteController.update);
router.delete("/:id", pacienteController.delete);

// Consultas
router.post("/:id/consultas", pacienteController.addConsulta);
router.put("/:id/consultas/:consultaId", pacienteController.updateConsulta);
router.delete("/:id/consultas/:consultaId", pacienteController.deleteConsulta);

// Tratamientos
router.post("/:id/tratamientos", pacienteController.addTratamiento);
router.put("/:id/tratamientos/:tratamientoId", pacienteController.updateTratamiento);
router.delete("/:id/tratamientos/:tratamientoId", pacienteController.deleteTratamiento);

export default router;
