import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, JoinColumn, OneToMany } from "typeorm";
import { Formulario } from "../formulario/formulario.entity";

@Entity('users') //este decorador para indicar que se convierta en una tabla 
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', length: 60, nullable: false})
  name: string;

  @Column({type: 'varchar', length: 60, nullable: false})
  apellido: string;

  @Column({type: 'varchar', length: 150, nullable: false})
  email: string;

  @Column({type: 'varchar', nullable: false})
  password: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

}