export interface IJwtPayload {
  id: number;
  name: string;
  apellido: string;
  email: string;
  ait?: Date; // fecha de expiracion..es opcional.
}