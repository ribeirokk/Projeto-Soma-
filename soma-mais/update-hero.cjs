const fs=require('node:fs'),path=require('node:path');
const file=path.join(__dirname,'app.js');let s=fs.readFileSync(file,'utf8');
const start=s.indexOf('<section class="hero">'),end=s.indexOf('</section>',start)+10;
if(start<0||end<10)throw Error('Hero não encontrado');
const hero='<section class="hero"><div class="hero-center"><h1>Como posso te ajudar a economizar?</h1><div class="mascot-stage float">${mascot}</div></div><div class="choices"><a href="#/plano" class="choice"><b aria-hidden="true">◎</b><span>Quero realizar um plano</span></a><a href="#/oficina" class="choice"><b aria-hidden="true">✦</b><span>Quero escolher melhor</span></a><a href="#/quizzes" class="choice"><b aria-hidden="true">?</b><span>Quero testar o que sei</span></a></div></section>';
s=s.slice(0,start)+hero+s.slice(end);fs.writeFileSync(file,s,'utf8');
