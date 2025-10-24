# Simulador de Atendimento Suporte (Netlify)

Interface moderna em tons de azul + função serverless que chama a OpenAI via variável de ambiente `OPENAI_API_KEY` (sem expor a chave no frontend).

## Passo a passo rápido
1. Suba este projeto para um repositório no GitHub.
2. No Netlify: **Add new site → Import an existing project**.
   - Publish directory: `.`
   - Functions directory: `functions`
3. Em **Site settings → Build & deploy → Environment → Environment variables**, crie:
   - Key: `OPENAI_API_KEY`
   - Value: sua chave completa da OpenAI
4. Vá em **Deploys → Trigger deploy → Deploy site**.
5. Abra o site e teste.

### Teste via terminal
```bash
curl -s -X POST "https://SEU-SITE.netlify.app/.netlify/functions/chat" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4-turbo","messages":[{"role":"user","content":"Teste"}],"temperature":0.7}'
```

### Rodar local
- `npm i -g netlify-cli`
- `.env` com `OPENAI_API_KEY=sk-...`
- `netlify login` e `netlify dev`
- Acesse `http://localhost:8888`

> Nunca commite o `.env`.
