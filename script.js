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
        this.result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LogoLink().init();
    new InicioLink().init();
    new LGPDSimulator().init();
});
