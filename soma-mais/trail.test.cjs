const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const nodes=new Map();const storage={};
function node(id){if(!nodes.has(id))nodes.set(id,{value:'',style:{},classList:{add(){},toggle(){}},addEventListener(e,f){this[e]=f},setAttribute(){},removeAttribute(){},focus(){},close(){},showModal(){},insertAdjacentHTML(_,s){this.innerHTML+=s}});return nodes.get(id)}
const ctx=vm.createContext({document:{querySelector:node,querySelectorAll:()=>[],body:{classList:{toggle(){}}}},location:{hash:''},window:{addEventListener(){},scrollTo(){}},localStorage:{getItem(k){return storage[k]||null},setItem(k,v){storage[k]=v}},setTimeout(){},console});
const run=s=>vm.runInContext(s,ctx);
run(fs.readFileSync(__dirname+'/app.js','utf8'));run(fs.readFileSync(__dirname+'/trail.js','utf8'));
assert.equal(run('trailScore()'),0);assert.equal(run('trailOpen(1)'),false);
run("state.trail.before=[true,false,true];save()");assert.equal(run('trailOpen(1)'),true);
run("quiz=null;complete('oficina');complete('oficina')");assert.equal(run('trailScore()'),10);assert.equal(run('trailOpen(2)'),true);
run("quiz={id:'troco',correct:3};complete('troco');quiz.correct=4;complete('troco')");assert.equal(run('trailScore()'),23);
run("complete('plano');quiz={id:'escolhas',correct:4};complete('escolhas');complete('encontro');quiz={id:'propaganda',correct:4};complete('propaganda')");assert.equal(run('trailOpen(7)'),true);
run("state.trail.after=[true,true,false];awardTrail('final',2);save()");assert.equal(run('trailScore()'),83);assert.equal(run('trailOpen(8)'),true);assert.match(run('summit()'),/83 de 85/);
assert.equal(JSON.parse(storage['soma-journey-v1']).trail.after.length,3);
run("state={done:['plano'],motion:false};migrateTrail()");assert.equal(run('trailScore()'),10);assert.equal(run('trailOpen(2)'),false);
for(const route of ['jornada','explorar','trilha/inicio','trilha/final','trilha/topo','oficina','quiz/troco']){run('location.hash='+JSON.stringify('#/'+route)+';render()');assert.ok(node('#main').innerHTML.length>100)}
node('#erase').onclick();assert.equal(run('trailScore()'),0);assert.equal(run('state.done.length'),0);assert.equal(run('assessment'),null);
console.log('OK: gates, free exploration, unique awards, first quiz score, legacy migration, persisted results, route rendering and reset.');
