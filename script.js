class LogoLink {
    constructor() {
        this.link = document.querySelector('.logo-link');
        this.image = this.link?.querySelector('img');
    }

    init() {
        if (!this.link) return;

        this.link.addEventListener('mouseenter', () => {
            if (!this.image) return;
            this.image.style.transform = 'translateY(-2px) rotate(-2deg)';
        });

        this.link.addEventListener('mouseleave', () => {
            if (!this.image) return;
            this.image.style.transform = '';
        });
    }
}

class InicioLink {
    constructor() {
        this.link = document.querySelector('a[href="index.html#introducao"]');
        this.introduction = document.querySelector('#introducao');
    }

    init() {
        if (!this.link || !this.introduction) return;

        this.link.addEventListener('click', (event) => {
            event.preventDefault();
            history.replaceState(null, '', '#introducao');
            this.introduction.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

class LGPDSimulator {
    constructor() {
        this.form = document.querySelector('#simulator-form');
        this.result = document.querySelector('#simulator-result');
        this.resultList = document.querySelector('#result-list');
        this.score = document.querySelector('#simulator-score');
        this.resetButton = document.querySelector('#reset-simulator');
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.evaluate();
        });

        this.resetButton?.addEventListener('click', () => {
            this.form.reset();
            this.result.hidden = true;
            this.resultList.innerHTML = '';
            this.form.querySelector('input')?.focus();
        });
    }

    evaluate() {
        const answers = {
            cadastro: { value: 'c', title: 'Cadastro em aplicativo', selected: 'Solicitar apenas os dados necessários' },
            camera: { value: 'b', title: 'Uso da câmera', selected: 'Informar a finalidade antes da coleta' },
            vazamento: { value: 'a', title: 'Suspeita de vazamento', selected: 'Contem o incidente e faça a comunicação adequada' }
        };

        let correct = 0;
        const feedback = [];

        Object.entries(answers).forEach(([name, answer]) => {
            const selected = this.form.elements[name]?.value;
            const isCorrect = selected === answer.value;

            if (isCorrect) correct += 1;

            feedback.push(`
                <li class="${isCorrect ? 'is-correct' : 'is-incorrect'}">
                    <strong>${answer.title}</strong>
                    <span>${isCorrect ? 'Resposta correta.' : `A melhor opção é: ${answer.selected}.`}</span>
                </li>
            `);
        });

        this.score.textContent = `${correct} de 3 decisões corretas`;
        this.resultList.innerHTML = feedback.join('');
        this.result.hidden = false;
        saveProgress('conectalgpd.simulator.last', {
            score: correct,
            total: Object.keys(answers).length,
            completedAt: new Date().toISOString()
        });
        this.result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

class QuizSimulator {
    constructor() {
        this.form = document.querySelector('#quiz-form');
        this.result = document.querySelector('#quiz-result');
        this.score = document.querySelector('#quiz-score');
        this.message = document.querySelector('#quiz-message');
        this.feedback = document.querySelector('#quiz-feedback');
        this.retry = document.querySelector('#quiz-retry');

        this.questions = [
            { name: 'q1', answer: 'a', title: 'Significado da LGPD', explanation: 'LGPD significa Lei Geral de Proteção de Dados.' },
            { name: 'q2', answer: 'b', title: 'Objetivo da lei', explanation: 'A lei protege direitos fundamentais de liberdade e privacidade e regula o tratamento de dados pessoais.' },
            { name: 'q3', answer: 'a', title: 'Dado pessoal', explanation: 'CPF associado a uma pessoa identifica ou pode identificar um titular.' },
            { name: 'q4', answer: 'c', title: 'Dado sensível', explanation: 'Dados referentes à saúde são dados pessoais sensíveis.' },
            { name: 'q5', answer: 'b', title: 'Anonimização', explanation: 'A identificação não deve ser possível por meios técnicos razoáveis disponíveis.' },
            { name: 'q6', answer: 'c', title: 'Princípio da necessidade', explanation: 'O tratamento deve se limitar ao mínimo necessário para a finalidade.' },
            { name: 'q7', answer: 'b', title: 'Hipóteses legais', explanation: 'Consentimento é uma das hipóteses legais, mas não a única.' },
            { name: 'q8', answer: 'b', title: 'Direito de correção', explanation: 'O titular pode solicitar a correção de dados incompletos, inexatos ou desatualizados.' },
            { name: 'q9', answer: 'a', title: 'Controlador', explanation: 'O controlador toma as decisões referentes às finalidades e aos meios do tratamento.' },
            { name: 'q10', answer: 'b', title: 'Operador', explanation: 'O operador trata dados em nome do controlador, observando suas instruções e a legislação.' },
            { name: 'q11', answer: 'c', title: 'Encarregado', explanation: 'O encarregado atua como canal de comunicação entre controlador, titulares e ANPD.' },
            { name: 'q12', answer: 'a', title: 'Dados de crianças e adolescentes', explanation: 'O melhor interesse da criança e do adolescente deve prevalecer.' },
            { name: 'q13', answer: 'b', title: 'Incidente de segurança', explanation: 'É preciso conter e avaliar o incidente e observar as regras aplicáveis de comunicação.' },
            { name: 'q14', answer: 'b', title: 'Segurança e prevenção', explanation: 'Controles de acesso e medidas proporcionais ajudam a proteger os dados.' },
            { name: 'q15', answer: 'c', title: 'Exercício de direitos', explanation: 'O titular pode procurar o controlador pelos canais de atendimento disponibilizados.' }
        ];
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.evaluate();
        });

        this.retry?.addEventListener('click', () => {
            this.form.reset();
            this.result.hidden = true;
            this.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    evaluate() {
        let correct = 0;
        const answersReview = this.questions.map((question) => {
            const selected = this.form.elements[question.name].value;
            const isCorrect = selected === question.answer;
            if (isCorrect) correct += 1;

            return {
                title: question.title,
                explanation: question.explanation,
                isCorrect
            };
        });

        const result = {
            score: correct,
            total: this.questions.length,
            completedAt: new Date().toISOString()
        };
        const previousBest = loadProgress('conectalgpd.quiz.best');
        saveProgress('conectalgpd.quiz.last', result);
        saveProgress('conectalgpd.quiz.best', {
            score: Math.max(correct, Number(previousBest?.score) || 0),
            total: this.questions.length,
            completedAt: correct >= (Number(previousBest?.score) || 0)
                ? result.completedAt
                : previousBest.completedAt
        });

        this.score.textContent = `${correct} de ${this.questions.length} respostas corretas`;
        this.message.textContent = this.getMessage(correct);
        this.feedback.innerHTML = answersReview.map((answer) => `
            <li class="${answer.isCorrect ? 'is-correct' : 'is-incorrect'}">
                <strong>${answer.isCorrect ? 'Correto' : 'Revise'}: ${answer.title}</strong>
                <span>${answer.explanation}</span>
            </li>
        `).join('');
        this.result.hidden = false;
        this.result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    getMessage(score) {
        if (score === this.questions.length) return 'Excelente! Você acertou todas as perguntas.';
        if (score >= 11) return 'Muito bem! Você tem um ótimo conhecimento sobre a LGPD.';
        if (score >= 7) return 'Bom trabalho! Revise os tópicos indicados para fortalecer seus conhecimentos.';
        return 'Continue aprendendo: consulte o guia e tente novamente.';
    }
}

class UserPanel {
    init() {
        if (!document.querySelector('#user-panel')) return;

        const latestQuiz = loadProgress('conectalgpd.quiz.last');
        const bestQuiz = loadProgress('conectalgpd.quiz.best');
        const simulator = loadProgress('conectalgpd.simulator.last');

        this.setText('#panel-quiz-latest', this.formatScore(latestQuiz));
        this.setText('#panel-quiz-best', this.formatScore(bestQuiz));
        this.setText('#panel-simulator', this.formatScore(simulator));
        this.setText('#panel-quiz-date', this.formatDate(latestQuiz?.completedAt));
        this.setText('#panel-simulator-date', this.formatDate(simulator?.completedAt));
        this.setText('#panel-activity', latestQuiz || simulator ? 'Seu progresso é salvo somente neste dispositivo.' : 'Complete um quiz ou simulador para acompanhar seu progresso aqui.');
    }

    setText(selector, value) {
        const element = document.querySelector(selector);
        if (element) element.textContent = value;
    }

    formatScore(result) {
        if (!result || !Number.isFinite(Number(result.score)) || !Number.isFinite(Number(result.total))) {
            return 'Ainda não realizado';
        }
        return `${result.score} / ${result.total}`;
    }

    formatDate(value) {
        if (!value) return 'Sem atividade registrada';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return 'Data indisponível';
        return date.toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' });
    }
}

function loadProgress(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.warn('Não foi possível ler o progresso salvo neste dispositivo.', error);
        return null;
    }
}

function saveProgress(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn('Não foi possível salvar o progresso neste dispositivo.', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LogoLink().init();
    new InicioLink().init();
    new LGPDSimulator().init();
    new QuizSimulator().init();
    new UserPanel().init();
});
