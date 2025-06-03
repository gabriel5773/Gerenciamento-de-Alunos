const API_URL = 'http://leoproti.com.br:8004/alunos';

const form = document.getElementById('form-aluno');
const tabela = document.getElementById('tabela-alunos');

async function carregarAlunos() {
  const resposta = await fetch(API_URL);
  const alunos = await resposta.json();

  tabela.innerHTML = '';
  alunos.forEach(aluno => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${aluno.id}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.turma}</td>
      <td>${aluno.matricula}</td>
      <td>
        <button class="btn btn-sm btn-primary btn-editar" data-id="${aluno.id}">Editar</button>
        <button class="excluir" onclick="excluirAluno(${aluno.id})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const curso = document.getElementById('curso').value;
  const turma = document.getElementById('turma').value;
  const matricula = document.getElementById('matricula').value;

  const aluno = { nome, curso, turma, matricula };

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno)
  });

  form.reset();
  carregarAlunos();
});

async function editarAluno(id) {
  const novoNome = prompt('Novo nome:');
  const novoCurso = prompt('Novo curso:');
  const novoMatricula = prompt('Novo matricula:');
  const novaTurma = prompt('Nova Turma:');
  if (!novoNome || !novoCurso || !novoMatricula || !novaTurma) return;

  const aluno = { nome: novoNome, curso: novoCurso, matricula: novoMatricula, turma: novaTurma  };

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno)
  });

  carregarAlunos();
}



async function excluirAluno(id) {
  if (!confirm('Tem certeza que deseja excluir este aluno?')) return;

  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  carregarAlunos();
}

carregarAlunos();


  
// Evento para envio do formulário de edição
document.getElementById('form-editar-aluno').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const id = document.getElementById('editar-id').value;
    const nome = document.getElementById('editar-nome').value;
    const curso = document.getElementById('editar-curso').value;
    const turma = document.getElementById('editar-turma').value;
    const matricula = document.getElementById('editar-matricula').value;
  
    try {
      const response = await fetch(`http://leoproti.com.br:8004/alunos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, curso, turma, matricula })
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar aluno.');
      }
  
      // Fecha o modal com Bootstrap 5
      const modalElement = document.getElementById('modalEditarAluno');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
  
      // Atualiza tabela
      carregarAlunos();
  
      // Feedback visual (opcional)
      alert('Aluno atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao atualizar o aluno.');
    }
  });

  document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('btn-editar')) {
      const id = e.target.getAttribute('data-id');
  
      try {
        const response = await fetch(`http://leoproti.com.br:8004/alunos/${id}`);
        const aluno = await response.json();
  
        document.getElementById('editar-id').value = aluno.id;
        document.getElementById('editar-nome').value = aluno.nome;
        document.getElementById('editar-curso').value = aluno.curso;
        document.getElementById('editar-turma').value = aluno.turma;
        document.getElementById('editar-matricula').value = aluno.matricula;
  
        const modalElement = document.getElementById('modalEditarAluno');
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } catch (err) {
        alert("Erro ao carregar aluno.");
      }
    }
  });
  
  
