import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Formulario } from "../formulario/formulario.entity";

@Entity('clientes')
export class Cliente extends BaseEntity{
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column({ type: 'integer', nullable: true })
  DNI: number;

  @Column({ type: 'varchar', length: 60, nullable: true  })
  nombre: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  apellido: string;

  @Column({ type: 'varchar', length: 60, nullable: true  })
  telefono: string;

  @Column({ type: 'varchar',  length: 150, nullable: true  })
  email: string;

  // un cliente tiene muchos formularios (relacion uno a muchos)
  @OneToMany(() => Formulario, formulario => formulario.cliente,{
    eager: true,
    nullable: false,
  })
  formularios: Formulario[];

}