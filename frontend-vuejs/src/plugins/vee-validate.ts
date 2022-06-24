import { extend, localize } from 'vee-validate';
import { required, email, numeric } from "vee-validate/dist/rules";
import fr from 'vee-validate/dist/locale/fr.json'

extend("required", required);
extend("email", email);
extend("numeric", numeric);

localize('fr', fr);