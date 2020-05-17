import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { estado } from './../../shared/entity-estado.num';
import { User } from "../user/user.entity";
import { Cliente } from "../cliente/cliente.entity";

@Entity('formularios')
export class Formulario extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', length: 60})
  web: string;

  @Column({type: 'varchar', length: 20})
  compra_moneda: string;
  
  @Column({type: 'float'})
  comision_prove: number;
  
  @Column({type: 'float'})
  comision_vendedor: number;

  @Column({type: 'float'})
  valor_comision_prove: number;

  @Column({type: 'float'})
  valor_comision_vendedor: number;

  @Column({type: 'float'})
  criptomoneda: number;
  
  @Column({type: 'varchar', length: 20,})
  tipo_criptomoneda: string;
  
  @Column({type: 'float'})
  importe_compra: number;
  
  @Column({type: 'varchar'})
  fecha_compra: string;
  
  @Column({type: 'timestamp'})
  fecha: Date;
  
  @Column({type: 'float'})
  dolar: number;

  // v: venta, p:presupuesto
  @Column({type: 'varchar', length: 1, default: estado.PRESUPUESTO}) 
  estado: string;

  @Column({type: 'float'})
  costo_criptomoneda_p: number;

  @Column({type: 'float'})
  costo_criptomoneda_v: number;

  @Column({type: 'float'})
  ganancia_criptomoneda: number;

  // un formulario pertenece a un usuario (relacion muchos a uno)
  @ManyToOne( () => User, user=> user.formularios, {
    nullable: false,
  } )
  user:User;

  // un formulario pertenece a un cliente (relacion muchos a uno)
  @ManyToOne( () => Cliente, cliente=> cliente.formularios, {
    nullable: false,
  } )
  cliente: Cliente;

}