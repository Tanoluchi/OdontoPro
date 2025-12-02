import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import type { Paciente, Consulta, Tratamiento } from "./paciente.model.js";
import { v4 as uuid } from "uuid";

// Emular __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta a la DB
const dbPath = path.join(__dirname, "..", "data", "pacientes.json");

function readDB(): Paciente[] {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
}

function writeDB(pacientes: Paciente[]) {
  fs.writeFileSync(dbPath, JSON.stringify(pacientes, null, 2));
}

export const pacienteService = {
  getAll(): Paciente[] {
    return readDB();
  },

  getById(id: string): Paciente | undefined {
    return readDB().find(p => p.id === id);
  },

  create(data: Omit<Paciente, "id" | "consultas" | "tratamientos">): Paciente {
    const pacientes = readDB();

    const nuevo: Paciente = {
      id: uuid(),
      ...data,
      consultas: [],
      tratamientos: []
    };

    pacientes.push(nuevo);
    writeDB(pacientes);

    return nuevo;
  },

  update(id: string, changes: Partial<Paciente>): Paciente | null {
    const pacientes = readDB();
    const idx = pacientes.findIndex(p => p.id === id);
    if (idx === -1) return null;

    const actualizado: Paciente = {
      ...pacientes[idx],
      ...changes
    } as Paciente;

    pacientes[idx] = actualizado;
    writeDB(pacientes);

    return actualizado;
  },

  delete(id: string): Paciente | null {
    const pacientes = readDB();
    const idx = pacientes.findIndex(p => p.id === id);
    if (idx === -1) return null;

    const [deleted] = pacientes.splice(idx, 1);
    writeDB(pacientes);

    return deleted ?? null;
  },

  // CONSULTAS ---------------------------------------------
  addConsulta(pacienteId: string, data: Omit<Consulta, "id">): Consulta | null {
    const pacientes = readDB();
    const paciente = pacientes.find(p => p.id === pacienteId);
    if (!paciente) return null;

    const nueva: Consulta = { id: uuid(), ...data };
    paciente.consultas.push(nueva);
    writeDB(pacientes);
    return nueva;
  },

  updateConsulta(pacienteId: string, consultaId: string, changes: Partial<Consulta>): Consulta | null {
    const pacientes = readDB();
    const paciente = pacientes.find(p => p.id === pacienteId);
    if (!paciente) return null;

    const idx = paciente.consultas.findIndex(c => c.id === consultaId);
    if (idx === -1) return null;

    const actualizada: Consulta = {
      ...paciente.consultas[idx],
      ...changes
    } as Consulta;

    paciente.consultas[idx] = actualizada;
    writeDB(pacientes);

    return actualizada;
  },

  deleteConsulta(pacienteId: string, consultaId: string): Consulta | null {
    const pacientes = readDB();
    const paciente = pacientes.find(p => p.id === pacienteId);
    if (!paciente) return null;

    const idx = paciente.consultas.findIndex(c => c.id === consultaId);
    if (idx === -1) return null;

    const [deleted] = paciente.consultas.splice(idx, 1);
    writeDB(pacientes);

    return deleted ?? null;
  },

  // TRATAMIENTOS ------------------------------------------
  addTratamiento(pacienteId: string, data: Omit<Tratamiento, "id">): Tratamiento | null {
    const pacientes = readDB();
    const paciente = pacientes.find(p => p.id === pacienteId);
    if (!paciente) return null;

    const nuevo: Tratamiento = { id: uuid(), ...data };
    paciente.tratamientos.push(nuevo);
    writeDB(pacientes);

    return nuevo;
  },

  updateTratamiento(pacienteId: string, tratamientoId: string, changes: Partial<Tratamiento>): Tratamiento | null {
    const pacientes = readDB();
    const paciente = pacientes.find(p => p.id === pacienteId);
    if (!paciente) return null;

    const idx = paciente.tratamientos.findIndex(t => t.id === tratamientoId);
    if (idx === -1) return null;

    const actualizado: Tratamiento = {
      ...paciente.tratamientos[idx],
      ...changes
    } as Tratamiento;

    paciente.tratamientos[idx] = actualizado;
    writeDB(pacientes);

    return actualizado;
  },

  deleteTratamiento(pacienteId: string, tratamientoId: string): Tratamiento | null {
    const pacientes = readDB();
    const paciente = pacientes.find(p => p.id === pacienteId);
    if (!paciente) return null;

    const idx = paciente.tratamientos.findIndex(t => t.id === tratamientoId);
    if (idx === -1) return null;

    const [deleted] = paciente.tratamientos.splice(idx, 1);
    writeDB(pacientes);

    return deleted ?? null;
  }
};
