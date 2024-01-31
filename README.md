<div class="markdown prose w-full break-words dark:prose-invert dark">
  <h1>Arquivo principal: server.js</h1>
  <p>Este arquivo contém o código do servidor Socket.io que é responsável por gerenciar as conexões
    e comunicações de chat em tempo real entre clientes.</p>
  <h2>Instalação e Configuração</h2>
  <p>Antes de executar o servidor, é necessário instalar o pacote Socket.io e suas dependências:</p>
  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>bash</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">npm install socket.io e logo dar npm start
</code></div></div></pre>
  <p>A porta padrão para o servidor é 3001, mas pode ser alterada conforme necessário. No exemplo
    abaixo, o servidor está configurado para ouvir na porta 3001 e permitir conexões somente de
    origem "<a href="http://localhost:3000" target="_new">http://localhost:3000</a>" com os métodos
    GET e POST.</p>
  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>javascript</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-javascript"><span class="hljs-keyword">const</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">'socket.io'</span>)(<span class="hljs-number">3001</span>, {
  <span class="hljs-attr">cors</span>: {
    <span class="hljs-attr">origin</span>: <span class="hljs-string">'http://localhost:3000'</span>,
    <span class="hljs-attr">methods</span>: [<span class="hljs-string">'GET'</span>, <span class="hljs-string">'POST'</span>],
  },
});
</code></div></div></pre>
  <h2>Gerenciamento de Conexões</h2>
  <p>O servidor Socket.io é notificado sempre que um novo cliente estabelece uma conexão. O servidor
    registra o ID do socket do cliente e imprime uma mensagem de registro no console. Quando um
    cliente se desconecta, o servidor também é notificado e exibe uma mensagem de desconexão no
    console.</p>
  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>javascript</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-javascript">io.<span class="hljs-title function_">on</span>(<span class="hljs-string">'connection'</span>, <span class="hljs-function">(<span class="hljs-params">socket</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Nova conexão estabelecida: <span class="hljs-subst">${socket.id}</span>`</span>);

  socket.<span class="hljs-title function_">on</span>(<span class="hljs-string">'disconnect'</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Conexão encerrada: <span class="hljs-subst">${socket.id}</span>`</span>);
  });
});
</code></div></div></pre>
  <h2>Gerenciamento de Mensagens</h2>
  <p>Quando um cliente envia uma mensagem através do socket, o servidor recebe a mensagem e imprime
    uma mensagem no console com o conteúdo da mensagem e o ID do socket do cliente que a enviou. Em
    seguida, o servidor emite a mensagem para todos os clientes conectados.</p>
  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>javascript</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-javascript">socket.<span class="hljs-title function_">on</span>(<span class="hljs-string">'chat message'</span>, <span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Nova mensagem recebida: <span class="hljs-subst">${msg}</span> <span class="hljs-subst">${socket.id}</span>`</span>);
  <span class="hljs-keyword">var</span> x = [msg,socket.<span class="hljs-property">id</span>]
  io.<span class="hljs-title function_">emit</span>(<span class="hljs-string">'chat message'</span>, x);
});
</code></div></div></pre>
  <h2>Iniciando o Servidor</h2>
  <p>O servidor Socket.io é iniciado na porta definida anteriormente e uma mensagem de log é exibida
    no console para indicar que o servidor está escutando na porta especificada.</p>
  <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>javascript</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-javascript"><span class="hljs-keyword">const</span> port = <span class="hljs-number">4000</span>;
io.<span class="hljs-title function_">listen</span>(port);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">`Servidor Socket.io escutando na porta <span class="hljs-subst">${port}</span>`</span>);
</code></div></div></pre>
</div>
