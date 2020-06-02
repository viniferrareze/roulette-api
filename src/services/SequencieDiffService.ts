interface RequestDTO {
   situations: string;
   sequenciesDif: string;
}

export default class SequencieDiffService {
   public sequenciesDif: string[];

   public sequenciesEquals: string[];

   constructor() {
      this.sequenciesDif = [];
      this.sequenciesEquals = [];
   }

   public execute(situationPrevius: string[], situations: string[]): void {
      for (let index = 0; index < situationPrevius.length; index++) {
         // posição 3 do array sempre é referente a duzia, e quando for duzia devo atualizar as duzias diferentes
         if (index === 3) {
            if (situationPrevius[index] === situations[index]) {
               this.sequenciesEquals.push(situations[index]);
            }

            const duziaAtual = situations[index];

            for (let duzia = 7; duzia <= 9; duzia++) {
               if (Number(duziaAtual) !== duzia) {
                  this.sequenciesDif.push(String(duzia));
               }
            }

            continue;
         }

         if (index === 4) {
            if (situationPrevius[index] === situations[index]) {
               this.sequenciesEquals.push(situations[index]);
            }

            const colunaAtual = situations[index];

            for (let coluna = 10; coluna <= 12; coluna++) {
               if (Number(colunaAtual) !== coluna) {
                  this.sequenciesDif.push(String(coluna));
               }
            }

            continue;
         }

         if (situationPrevius[index] !== situations[index]) {
            this.sequenciesDif.push(situationPrevius[index]);
         } else {
            this.sequenciesEquals.push(situationPrevius[index]);
         }
      }
   }
}
