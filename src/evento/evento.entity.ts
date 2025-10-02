export class EventoEntity{
    id: string;
    nome: string;    
    horario: string;
    dia: string;
    endereco: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    constructor(id: string,nome: string,horario: string,dia: string,
        endereco: string,complemento: string,bairro: string,
        cidade: string,estado: string,cep: string){
        this.id = id;
        this.nome = nome;       
        this.horario = horario;
        this.dia = dia;
        this.endereco = endereco;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
    }
}   