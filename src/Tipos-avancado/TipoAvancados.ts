// TYPE GUARD -> As vezes uma type não vai ter um mesmo componente de outra type, e usando o type guard é possivel resolver esse problema
// checando se o componente existe no type 
type Pessoa = { nome: string};
type Animal = { cor: string};
type PessoaOuAnimal = Pessoa | Animal;

export class Aluno implements Pessoa {
    constructor(public nome: string){}
}

function mostraNome(obj: PessoaOuAnimal) {
    if ("nome" in obj) console.log(obj.nome);
}

// KEYOF E TYPEOF
type CoresObj = typeof coresObj;
type CoresChaves = keyof CoresObj;

const coresObj = {
    vermelho: "red",
    verde: "green",
    azul: "blue",
}

function traduzirCor(cor: CoresChaves, cores: typeof coresObj) {
    return cores[cor];
}

// CHAVES DE TIPO
type Veiculo = {
    marca: string;
    ano: number;
};

type Car = {
    brand: Veiculo["marca"];
    year: Veiculo["ano"];
    name: string;
};

const carro: Car = {
    brand: "ford",
    year: 2020,
    name: "Nome",
}

// THIS POLIMORFICO -> É possivel chamar em cadeias
export class Calculadora {
    constructor(public numero: number) {}

    add(n: number): this{
        this.numero += n;
        return this;
    }

    sub(n: number): this{
        this.numero -= n;
        return this;
    }

    div(n: number): this{
        this.numero /= n;
        return this;
    }

    mul(n: number): this{
        this.numero *= n;
        return this;
    }
}

export class SubCalculadora extends Calculadora {
    pow(n : number): this {
        this.numero **= n;
        return this;
    }
}

const calculadora = new SubCalculadora(10);
calculadora.add(5).mul(2).div(2).sub(5).pow(2);

// Builder
export class RequestBuilder {
    private method: "get" | "post" | null = null;
    private url: string | null = null;

    setMethod(method: "get" | "post"): this {
        this.method = method;
        return this;
    }

    setUrl(url: string): this {
        this.url = url;
        return this;
    }

    send(): void{
        console.log(`Enviando dados via ${this.method} para ${this.url}`);
    }
}

const request = new RequestBuilder();
request.setUrl("http://www.google.com").setMethod("post").send();

// OVERLOAD DE FUNÇÕES -> Vai verificar os casos de variaveis que podem ser mandadas para as funções
type Adder = {
    (x: number): number;
    (x: number, y: number): number;
    (...arg: number[]): number;
};

const adder: Adder = (x: number, y?: number, ...args: number[]) => {
    if (args.length > 0) return args.reduce((s, v) => s + v,0) + x + (y || 0);
    return x + ( y || 0 );
};