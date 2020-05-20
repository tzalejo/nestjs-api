import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { FormularioRepository } from './formulario.repository';
import { BuscarFormularioDto, ModificarFormularioDto, LeerFormularioDto, CrearFormularioDto } from './dtos';
import { Formulario } from './formulario.entity';
import { plainToClass } from 'class-transformer';
import { estado } from './../../shared/entity-estado.num';

@Injectable()
export class FormularioService {
  constructor(
    private readonly _formularioRepository: FormularioRepository,
  ){}
  
  async getBuscarFormulario(buscarFormularioDto: BuscarFormularioDto): Promise<LeerFormularioDto[]> {
    if(!buscarFormularioDto) {
      const formulariosFiltrado: Formulario[] =  await this._formularioRepository.find();
      return formulariosFiltrado.map((formulario: Formulario) => plainToClass(LeerFormularioDto, formulario));
    }
    const formulariosFiltrado: Formulario[] = await this._formularioRepository.find({where: buscarFormularioDto});
    // casteo todo los elementode del formulario
    return formulariosFiltrado.map((formulario: Formulario) => plainToClass(LeerFormularioDto, formulario));

  }

  async update(
    formularioId: number, 
    formulario: Partial<ModificarFormularioDto>
  ): Promise<LeerFormularioDto>{
    if(!formularioId) throw new BadRequestException('Error en los parametros');
    const formularioExiste: Formulario = await this._formularioRepository.findOne(formularioId);
    if(!formularioExiste) throw new NotFoundException('El formulario no existe ');
    //acutalizo
    formularioExiste.web = formulario.web.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase()); // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.compra_moneda = formulario.compra_moneda.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase()); // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.comision_prove = formulario.comision_prove; // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.comision_vendedor = formulario.comision_vendedor; // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.valor_comision_prove = formulario.valor_comision_prove; // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.valor_comision_vendedor = formulario.valor_comision_vendedor;
    formularioExiste.criptomoneda = formulario.criptomoneda; // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.tipo_criptomoneda = formulario.tipo_criptomoneda.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase()); // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.importe_compra = formulario.importe_compra; // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.fecha_compra = formulario.fecha_compra;
    formularioExiste.fecha = formulario.fecha;
    formularioExiste.dolar = formulario.dolar;
    formularioExiste.estado = formulario.estado.toUpperCase(); // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.costo_criptomoneda_p = formulario.costo_criptomoneda_p; // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.costo_criptomoneda_v = formulario.costo_criptomoneda_v; // eslint-disable-next-line @typescript-eslint/camelcase
    formularioExiste.ganancia_criptomoneda = formulario.ganancia_criptomoneda;
    formularioExiste.cliente = formulario.cliente;
    formularioExiste.proveedor = formulario.proveedor;
    // Guardo
    const formularioModificado = await this._formularioRepository.save(formularioExiste);
    return plainToClass(LeerFormularioDto, formularioModificado);
  }

  async crear(formulario: Partial<CrearFormularioDto>): Promise<LeerFormularioDto> {
    if(!formulario) throw new BadRequestException('Es necesario el formulario');
    // modifico los valores
    formulario.estado = formulario.estado.toUpperCase();
    // convierto la primera letra en mayuscula
    formulario.web = formulario.web.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());
    // eslint-disable-next-line @typescript-eslint/camelcase
    formulario.compra_moneda = formulario.compra_moneda.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());
    // eslint-disable-next-line @typescript-eslint/camelcase
    formulario.tipo_criptomoneda = formulario.tipo_criptomoneda.toLowerCase().replace(/\b[a-z]/g, letter => letter.toUpperCase());

    const formularioNuevo: Formulario = await this._formularioRepository.save(formulario);
    return plainToClass(LeerFormularioDto, formularioNuevo);
  }

  async delete(formularioId: number): Promise<void>{
    if(!formularioId) throw new BadRequestException('Error en los parametros');
    const formularioExiste: Formulario = await this._formularioRepository.findOne(formularioId);
    // si formulario es de una venta, devuelvo un error 
    if(formularioExiste.estado === estado.VENTA) throw new ConflictException('El formulario ya fue vendido, no se puede eliminar.');
    await this._formularioRepository.delete(formularioId);
  }

  
}
