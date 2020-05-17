import { Repository, EntityRepository } from "typeorm";
import { Proveedor } from "./proveedor.entity";

@EntityRepository(Proveedor) 
export class ProveedorRepository extends Repository<Proveedor>{}