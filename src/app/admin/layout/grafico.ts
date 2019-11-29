export class Dato{
    id: number;
    data: number;

    constructor(id: number){
        this.id=id;
    }
}
export class Serie{
    private dati:Dato[]=[];
    private label: string=null;
    constructor(name : string){
        this.label = name;
    };
    private generateId(): number{
        let id = Math.random()*1000000;
        return this.findDato(id)==null ? id: this.generateId();
    }
    private findDato(id:number): Dato{
        let index = this.dati.findIndex(dato=>{
            return dato.id===id;
        });
        return index >= 0 ? this.dati[index]: null;
    }
    getLabel(): string{
        return this.label;
    }
    createDato(): Dato{
        return new Dato(this.generateId());
    }
    addDato(d:Dato): void{
        this.dati.push(d);
    }
    removeDato(d:Dato): void{
        let index=this.dati.findIndex(dato=>{
            return dato.id===d.id;
        });
        if (index>=0){
            this.dati=this.dati.splice(index,1);
        }
    }

    createDataset() : any {
        let dataValues : Array<Number> = new Array();
        this.dati.forEach(d => {
            dataValues.push(d.data);
        });

        return {
            data : dataValues,
            label : this.label
        };
    }
}
export class Grafico{
    private series : Serie[] = [];
    private xAxis : string[] = [];


    createSerie(name : string) : Serie {
        if(this.getIndex(name) >= 0)
            return null;

        let s : Serie = new Serie(name);
        this.series.push(s);
        return s;
    }
    getSerie(name : string) {
        let i = this.getIndex(name);
        if(i >= 0)
            return this.series[i];
        else
            return null;
    }
    addXValue(xValue : string) {
        let index = this.xAxis.findIndex(v => {
            return xValue === v;
        });
        if(index < 0)
            this.xAxis.push(xValue);
    }
    getXAxis() : Array<any> {
        return this.xAxis;
    }


    private getIndex(name : string) : number {
        let index = this.series.findIndex(s => {
            return s.getLabel() === name;
        });

        return index;
    }

    createDataset() : Array<any> {
        let a : Array<any> = new Array();
        this.series.forEach(s => {
            a.push(s.createDataset())
        })
        console.log(a);
        return a;
    }
}
