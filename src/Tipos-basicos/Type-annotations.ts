// Tipos basicos //
let nome: string = 'Marx'
let idade: number = 23
let adulto: boolean = true
let simbolo: symbol = Symbol('qualquer symbol')
//let big: bigint = 10n

//Arrays
let arrayDeNumeros: Array<number> = [1, 2, 3]
let arrayDeNumeros2: number[] = [1, 2, 3]
let arrayDeStrigns: Array<string> = ['a', 'b']
let arrayDeStrigns2: string[] = ['a', 'b']

// Tipo tuple
const dadosCliente1: [number, string] = [1, 'Luiz'];
const dadosCliente2: [number, string, string] = [1, 'Luiz', 'Carlos'];
const dadosCliente3: [number, string, string?] = [1, 'Luiz'];
const dadosCliente4: [number, string, ...string[]] = [1, 'Luiz', 'Miranda'];

// Tipo readonly array
const array1: readonly string[] = ['Luiz', 'Otavio']
const array2: ReadonlyArray<string> = ['Luiz', 'Otavio']

//Objetos
let pessoa: {nome: string, idade: number, adulto?: boolean} = {
    nome: 'Marx',
    idade: 23
}

//Funções
function soma(x: number, y:number): number {
    return x + y
}

const soma2: (x: number, y:number) => number = (x,y) => x + y

//Never
export function criaErro(): never{
    throw new Error("Error qualquer");
}

//Enum
enum Cores {
    VERMELHO, 
    AZUL,
    AMARELO,
}

console.log(Cores.VERMELHO); //Vai retornar 0 
console.log(Cores[0]); //Vai retornar VERMELHO

function escolhaACor(cor: Cores): void {
    console.log(Cores[cor]);
}

//Unknown
let x: unknown;
x = 100;
x = "Luix";
x = 900;
x = 10;
const y = 800;

if (typeof x === "number") console.log(x + y);

//Union types -> Uma função que pode receber mais de um tipo de variavel
function addOrConcat( a: number | string, b: number | string){
    if (typeof a === "number" && typeof b === "number") return a + b;
    return `${a}${b}`;
}

console.log(addOrConcat(10,20)); // Vai retornar 30
console.log(addOrConcat("10","20")); // Vai retornar 1020

//Type alias
type Idade = number;
type Pessoa = {
    nome: string;
    idade: Idade;// O tipo da idade vai ser number
    salario: number;
    corPreferida?: string;
}
type CorRGB = "Vermelho" | "Verde" | "Azul";
type CorCMYK = "Ciano" | "Magenta" | "Amarelo" | "Preto";
type CorPreferida = CorRGB | CorCMYK; // O CorPreferida vai ser a junção dos tipos da CorRGB e CorCMYK

//Intersection Types
type TemNome = { nome: string };
type TemSobrenome = { sobrenome: string };
type TemIdade = { idade: number };
type PessoA = TemNome & TemSobrenome & TemIdade;

const Eu: PessoA = {
    nome: "Luiz",
    sobrenome: "Miranda",
    idade: 30,
}
