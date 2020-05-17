import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

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

}