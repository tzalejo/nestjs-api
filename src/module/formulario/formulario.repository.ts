import { Repository, EntityRepository } from "typeorm";
import { Formulario } from "./formulario.entity";

@EntityRepository(Formulario)
export class FormularioRepository extends Repository<Formulario> {}