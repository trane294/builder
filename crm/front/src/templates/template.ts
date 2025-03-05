import { Config } from '@measured/puck';
import { photo1Config } from 'src/templates/photo-1/config';

export interface TemplatesLibrary {
    [index: string]: Config<any, any>;
}

export const templatesLibrary: TemplatesLibrary = {
    photo1Config: photo1Config,
};
