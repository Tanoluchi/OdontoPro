export interface Consulta {
  id: string;
  fecha: string;
  motivo: string;
  observaciones?: string;
}

export interface Tratamiento {
  id: string;
  nombre: string;
  descripcion?: string;
  costo?: number;
}

export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono?: string;
  email?: string;
  consultas: Consulta[];
  tratamientos: Tratamiento[];
}
