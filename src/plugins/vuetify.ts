import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles'
import { createVuetify } from 'vuetify';

import theme from './theme';
import icons from './icons';

export default createVuetify({
    theme: theme,
    icons: icons,
    components: components,
    directives: directives,
});
