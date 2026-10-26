/* Navigation context and completion actions, shared by all activities. */
function guidedMode(){return state.navigationMode==='guided'}
function setNavigationMode(mode){state.navigationMode=mode;save()}
function completionActions(isQuiz=false){const guided=guidedMode();return `<div class="completion-actions"><a class="trail-cta" href="#/${guided?'jornada':isQuiz?'quizzes':'explorar'}">${guided?'Continuar na montanha':isQuiz?'Escolher outro quiz':'Explorar outra atividade'} <span aria-hidden="true">&rarr;</span></a>${isQuiz?'<button id="retryquiz" class="ghost">Praticar este quiz novamente</button>':''}</div>`}
function exerciseCompletion(id){const route=location.hash.slice(2);if(route!==id)return;const target=document.querySelector({oficina:'#shopfeedback',plano:'#planresult',encontro:'#picnicfeedback'}[id]);if(!target)return;document.querySelector('#completion-next')?.remove();target.insertAdjacentHTML('afterend',`<div id="completion-next" class="completion-panel" role="region" aria-label="Próximo passo"><strong>Etapa concluída!</strong><p>Sua descoberta está salva. ${trailScore()} pontos no caminho.</p>${completionActions()}</div>`);document.querySelector('#completion-next .trail-cta')?.focus({preventScroll:true});document.querySelector('#completion-next')?.scrollIntoView({block:'nearest',behavior:'auto'})}
const flowComplete=complete;
complete=function(id){flowComplete(id);if(['oficina','plano','encontro'].includes(id))exerciseCompletion(id)};
const flowQuizPage=quizpage;
quizpage=function(id){let html=flowQuizPage(id);if(quiz?.id===id&&quiz.index>=4)html=html.replace(/<div class="actions">[\s\S]*?<\/div>/,completionActions(true));return html};
const flowShell=shell;
shell=function(title,desc,body){return flowShell(title,desc,body).replace(/<a class="back"[^>]*>[\s\S]*?<\/a>/,`<a class="back" href="#/${guidedMode()?'jornada':'explorar'}">&larr; ${guidedMode()?'Voltar à montanha':'Voltar à exploração'}</a>`)};
const homeIcons=[`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2 20 7-12 4 7 3-5 6 10H2ZM9 8V2m0 0h7l-2 2 2 2H9"/></svg>`,`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/></svg>`];
const flowHome=home;
home=function(){let i=0;return flowHome().replace(/<b aria-hidden="true">[\s\S]*?<\/b>/g,()=>'<b aria-hidden="true">'+homeIcons[i++%2]+'</b>')};
const flowRender=render;
render=function(){const route=location.hash.slice(2)||'';if(route==='jornada'||route.startsWith('trilha/'))setNavigationMode('guided');else if(route==='explorar'||route==='quizzes')setNavigationMode('free');flowRender();document.querySelector('#trail-return')?.remove();
 const step=trailSteps.findIndex(s=>s[3]===route);
 if(guidedMode()&&step>0&&step<8){document.querySelector('.wrap .back')?.insertAdjacentHTML('afterend',`<div class="activity-context"><span class="tag">MINHA TRILHA &middot; ETAPA ${step+1} DE 8</span><span>${trailScore()} pontos</span></div>`)}
 document.querySelectorAll('.skill-results a').forEach(a=>a.addEventListener('click',()=>setNavigationMode('free')));
};
render();
