const jogador_um = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const jogador_dois = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rolarDados(){
    return Math.floor(Math.random() * 6) + 1;
}

async function sortear_bloco() {
    let random = Math.random()
    let resultado;

    switch (true) {
        case random < 0.33:
            resultado = "RETA"
            break;
        case random < 0.66:
            resultado = "CURVA"
            break; 
        default:
            resultado = "CONFRONTO";
    }

    return resultado
}

async function logRollResult(personagemNome, bloco, numeroDado, atributo) {
    console.log(`${personagemNome} 🎲 rolou um dado de ${bloco} ${numeroDado} + ${atributo} = ${numeroDado + atributo}`)
    
}

async function motor_de_corrida(personagem_um, personagem_dois) {
    for(let contador = 1; contador <= 5; contador++) {
        console.log(`🏁 Rodada ${contador}`);

        // sorteia bloco de forma aleatória
        let bloco = await sortear_bloco()
        console.log(`Bloco: ${bloco}`)

         // roda os dados de forma aleatória 
         let numeroDadoUm = await rolarDados();
         let numeroDadoDois = await rolarDados();
 
         // teste de habilidade 
         let testeDeHabilidadeUm = 0;
         let testeDeHabilidadeDois = 0;
 
         if(bloco === "RETA") {
             testeDeHabilidadeUm = numeroDadoUm + personagem_um.VELOCIDADE;
             testeDeHabilidadeDois = numeroDadoDois + personagem_dois.VELOCIDADE;
 
             await logRollResult(personagem_um.NOME, "velocidade", numeroDadoUm, personagem_um.VELOCIDADE)
             await logRollResult(personagem_dois.NOME, "velocidade", numeroDadoDois, personagem_dois.VELOCIDADE)
         } 
         if(bloco === "CURVA") {
             testeDeHabilidadeUm = numeroDadoUm + personagem_um.MANOBRABILIDADE;
             testeDeHabilidadeDois = numeroDadoDois + personagem_dois.MANOBRABILIDADE;
 
             await logRollResult(personagem_um.NOME, "manobrabilidade", numeroDadoUm, personagem_um.MANOBRABILIDADE)
             await logRollResult(personagem_dois.NOME, "manobrabilidade", numeroDadoDois, personagem_dois.MANOBRABILIDADE)
         } 
         if(bloco === "CONFRONTO") {
            let powerResultUm = numeroDadoUm + personagem_um.PODER;
            let powerResultDois = numeroDadoDois + personagem_dois.PODER;

            console.log(`${personagem_um.NOME} confrontou ${personagem_dois.NOME}! 🥊`)

            await logRollResult(personagem_um.NOME, "poder", numeroDadoUm, personagem_um.PODER)
            await logRollResult(personagem_dois.NOME, "poder", numeroDadoDois, personagem_dois.PODER)

            if(powerResultUm > powerResultDois && personagem_dois.PONTOS > 0) {
                console.log(`${personagem_um.NOME} venceu o confronto! ${personagem_dois.NOME} perdeu 1 ponto.`)
                    personagem_dois.PONTOS--;
                
            }

            if(powerResultDois > powerResultUm && personagem_um.PONTOS > 0) {
                console.log(`${personagem_dois.NOME} venceu o confronto! ${personagem_um.NOME} perdeu 1 ponto.`)
                    personagem_um.PONTOS--;
                
            }

            if(powerResultDois === powerResultUm) {
                console.log("Confronto empatado! Nenhum ponto foi perdido.")
            }
         } 

         //verifica o vencedor 
         if(testeDeHabilidadeUm > testeDeHabilidadeDois) {
            console.log(`${personagem_um.NOME} marcou 1 ponto!`);
            personagem_um.PONTOS++
         } else if (testeDeHabilidadeDois > testeDeHabilidadeUm) {
            console.log(`${personagem_dois.NOME} marcou 1 ponto!`);
            personagem_dois.PONTOS++
         }
    }

       

}

async function declararvencedor(personagem_um, personagem_dois){
    console.log("Resultado final: ")
    console.log(`${personagem_um.NOME}: ${personagem_um.PONTOS} ponto(s)`)
    console.log(`${personagem_dois.NOME}: ${personagem_dois.PONTOS} ponto(s)`)

    if (personagem_um.PONTOS > personagem_dois.PONTOS){
        console.log(`\n ${personagem_um.NOME} venceu a corrida! Parabéns pela vitória! 🏆`)
    } else if(personagem_dois.PONTOS > personagem_um.PONTOS) {
        console.log(`\n ${personagem_dois.NOME} venceu a corrida! Parabéns pela vitória! 🏆`)
    } else {
        console.log("A corrida terminou em empate!")
    }
}

(async function main() {
    console.log(
        `🏎️🚨 Corrida entre ${jogador_um.NOME} e ${jogador_dois.NOME} começando... \n`
    );

   await motor_de_corrida(jogador_um, jogador_dois);
   await declararvencedor(jogador_um, jogador_dois);
})();



