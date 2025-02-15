# Memorial Benedito Antônio

Este é um projeto em memória de Benedito Antônio Carneiro Rodrigues, criado para preservar e compartilhar memórias, fotos e histórias de sua vida.

## Tecnologias Utilizadas

- React + TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (Banco de dados e Storage)
- Shadcn/ui (Componentes)
- React Query
- Vite

## Funcionalidades

- Galeria de fotos
- Compartilhamento de memórias
- Upload de imagens
- Interface responsiva e moderna
- Animações suaves
- Armazenamento em nuvem

## Como Executar

1. Clone o repositório
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_KEY=sua_chave_do_supabase
```

4. Execute o projeto
```bash
npm run dev
```

## Estrutura do Projeto

```
src/
  ├── components/      # Componentes React
  ├── integrations/    # Integrações (Supabase)
  ├── lib/            # Utilitários e configurações
  ├── styles/         # Estilos globais
  └── App.tsx         # Componente principal
```

## Contribuindo

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.