import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import fr from 'vuetify/lib/locale/fr';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#751A2C',
                secondary: '#B33A3A',
                accent: '#FFDAC8',
                white: '#ffffff',
                dark: '#000000',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107'
            },
        },
    },
    lang: {
        locales: {fr},
        current: 'fr',
    },
});
