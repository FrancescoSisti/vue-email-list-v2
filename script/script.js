console.log(`JS OK`);

const { createApp } = Vue;

createApp({
    data() {
        return {
            emails: [],
            loadingCompleted: false,
            copiedIndex: null,
            password: '',
            passwordLength: 12,
            includeUppercase: true,
            includeNumbers: true,
            includeSpecialChars: false,
            passwordCopied: false,
            isDarkTheme: false
        }
    },
    methods: {
        async generateEmails() {
            try {
                const requests = Array(10).fill().map(() =>
                    axios.get('https://flynn.boolean.careers/exercises/api/random/mail')
                );
                const responses = await Promise.all(requests);
                this.emails = responses.map(response => response.data.response);
                this.loadingCompleted = true;
            } catch (error) {
                console.error('Error while generating emails:', error);
            }
        },
        copyEmail(email, index) {
            navigator.clipboard.writeText(email).then(() => {
                this.copiedIndex = index;
                setTimeout(() => {
                    this.copiedIndex = null;
                }, 2000);
            }).catch(err => {
                console.error('Errore durante la copia: ', err);
            });
        },
        handleMouseMove(event, index) {
            const listItem = event.currentTarget;
            const neonEffect = listItem.querySelector('.neon-effect');

            const rect = listItem.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Rimuoviamo la sottrazione qui
            neonEffect.style.left = `${x}px`;
            neonEffect.style.top = `${y}px`;
        },
        generatePassword() {
            const lowercase = 'abcdefghijklmnopqrstuvwxyz';
            const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numbers = '0123456789';
            const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

            let chars = lowercase;
            if (this.includeUppercase) chars += uppercase;
            if (this.includeNumbers) chars += numbers;
            if (this.includeSpecialChars) chars += specialChars;

            let password = '';
            for (let i = 0; i < this.passwordLength; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            this.password = password;
        },
        copyPassword() {
            navigator.clipboard.writeText(this.password).then(() => {
                this.passwordCopied = true;
                setTimeout(() => {
                    this.passwordCopied = false;
                }, 2000);
            }).catch(err => {
                console.error('Errore durante la copia della password: ', err);
            });
        },
        toggleTheme() {
            this.isDarkTheme = !this.isDarkTheme;
            document.body.classList.toggle('dark-theme', this.isDarkTheme);
        }
    },
    mounted() {
        this.generateEmails();
        this.generatePassword();
    }
}).mount('#app');


