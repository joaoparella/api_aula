import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { GeneroService } from "../genero.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class GeneroValidator implements ValidatorConstraintInterface {
    constructor(private generoService: GeneroService) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const validaGenero = await this.generoService.BuscaGenero(value);
        return validaGenero;
    }
}


export const GeneroExistente = (opcoesValidacao: ValidationOptions) => {
    return (objeto: Object, propriedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: GeneroValidator
        });
    }
}