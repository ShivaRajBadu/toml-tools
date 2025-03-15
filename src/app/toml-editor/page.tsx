import { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
    title: 'TOML Editor - Edit and Validate TOML Files Online',
    description: 'Use our online TOML editor to edit and validate TOML files with ease. Access templates for server, database, app, and deployment configurations.',
    keywords: 'TOML Editor, Edit TOML Online, TOML Validation, Server Config Templates, Database Config Templates, App Config Templates, Deployment Config Templates',
    alternates: {
        canonical: 'https://toml-tools.com/toml-editor'
    }

};

export default function TomlEditorPage() {
    return <Home />;
} 