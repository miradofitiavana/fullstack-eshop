import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: (field) => `Le champ ${field} est requis.`
})

extend('email', {
    ...email,
    message: (field) => `L'email n'est pas valide.`
})

extend('verify_password', {
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\?\.#\$%\^&\*])(?=.{8,})");
        return strongRegex.test(value);
    },
    message: (field) => `Le mot de passe doit contenir au moins : 1 majuscule, 1 minuscule, 1 chiffre et une caractère spéciale.`
})