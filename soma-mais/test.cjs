const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const nodes=new Map();function node(id){if(!nodes.has(id))nodes.set(id,{value:id==='#contribution'?'5':'',style:{},classList:{add(){},toggle(){}},addEventListener(e,f){this[e]=f},setAttribute(){},focus(){},close(){},showModal(){}});return nodes.get(id)}
const ctx=vm.createContext({console,document:{querySelector:node,querySelectorAll:()=>[],body:{classList:{toggle(){}}}},location:{hash:''},window:{addEventListener(){},scrollTo(){}},localStorage:{getItem(){return null},setItem(){}},setTimeout(){}});
vm.runInContext(fs.readFileSync(__dirname+'/app.js','utf8'),ctx);
function run(s){return vm.runInContext(s,ctx)}
assert.equal(run('quizzes.length'),3);assert.equal(run('quizzes.every(q=>q.questions.length===4&&q.questions.every(x=>x[2]>=0&&x[2]<x[1].length&&x[3].length>10))'),true);
run("location.hash='#/oficina';basket=[0,1,2];render()");node('#finishshop').click();assert.match(node('#shopfeedback').textContent,/Sobram/);assert.equal(run("state.done.includes('oficina')"),true);
run('basket=[0,1,3,4,5];render()');node('#finishshop').click();assert.match(node('#shopfeedback').textContent,/Passou/);
run("location.hash='#/plano';render()");node('#reserve').value='20';node('#goal').value='60';node('#contribution').value='5';node('#reserve').oninput();assert.match(node('#planresult').textContent,/8 rodadas/);assert.match(node('#available').textContent,/10/);node('#contribution').value='0';node('#contribution').oninput();assert.match(node('#planresult').textContent,/Sem novas/);
run("location.hash='#/encontro';render()");node('#drink').value='5';node('#food').value='12';node('#play').value='15';node('#finishpicnic').click();assert.match(node('#budget').textContent,/30/);node('#finishpicnic').click();assert.match(node('#picnicfeedback').textContent,/Passou/);node('#play').value='0';node('#finishpicnic').click();assert.equal(run("state.done.includes('encontro')"),true);
run("complete('encontro');complete('encontro')");assert.equal(run("state.done.filter(x=>x==='encontro').length"),1);
console.log('OK: estrutura de 12 questões, orçamento válido/inválido, plano e contribuição zero, revisão do encontro e progresso sem duplicação.');
