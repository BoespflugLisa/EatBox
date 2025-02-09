import { extend, localize } from 'vee-validate';
import { required, email, numeric, digits, max, min, alpha } from "vee-validate/dist/rules";
import fr from 'vee-validate/dist/locale/fr.json'

extend("required", required);
extend("email", email);
extend("numeric", numeric);
extend("digits", digits);
extend("max", max);
extend("min", min);
extend('alpha', alpha);

localize('fr', fr);